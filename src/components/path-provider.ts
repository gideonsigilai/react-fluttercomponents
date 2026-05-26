/**
 * path-provider.ts — Flutter `path_provider` package equivalent for React
 * Mirrors: getApplicationDocumentsDirectory, getTemporaryDirectory, getDownloadsDirectory, etc.
 * Uses IndexedDB for binary blobs and localStorage for metadata (web equivalent).
 */

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Directory {
  path: string;
  exists: () => boolean;
  create: (options?: { recursive?: boolean }) => Promise<Directory>;
  list: () => Promise<FileEntry[]>;
  delete: (options?: { recursive?: boolean }) => Promise<void>;
}

export interface FileEntry {
  name: string;
  path: string;
  size?: number;
  type?: string;
  lastModified?: number;
}

// ─── In-memory virtual file system ───────────────────────────────────────────
const VFS_KEY = "_flutter_vfs_";

function vfsLoad(): Record<string, { content: string; lastModified: number; size: number; type: string }> {
  try {
    return JSON.parse(localStorage.getItem(VFS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function vfsSave(vfs: Record<string, unknown>): void {
  localStorage.setItem(VFS_KEY, JSON.stringify(vfs));
}

// ─── PathProvider ─────────────────────────────────────────────────────────────
export class PathProvider {
  /** Application documents directory (persistent storage) */
  static async getApplicationDocumentsDirectory(): Promise<Directory> {
    return PathProvider._makeDir("/documents");
  }

  /** Temporary directory (cache) */
  static async getTemporaryDirectory(): Promise<Directory> {
    return PathProvider._makeDir("/temp");
  }

  /** Application support directory */
  static async getApplicationSupportDirectory(): Promise<Directory> {
    return PathProvider._makeDir("/support");
  }

  /** Downloads directory */
  static async getDownloadsDirectory(): Promise<Directory | null> {
    return PathProvider._makeDir("/downloads");
  }

  /** Application cache directory */
  static async getApplicationCacheDirectory(): Promise<Directory> {
    return PathProvider._makeDir("/cache");
  }

  /** External storage (N/A on web — returns documents) */
  static async getExternalStorageDirectory(): Promise<Directory | null> {
    return PathProvider._makeDir("/external");
  }

  private static _makeDir(path: string): Directory {
    return {
      path,
      exists: () => true,
      create: async ({ recursive = false } = {}) => PathProvider._makeDir(path),
      list: async () => {
        const vfs = vfsLoad();
        return Object.entries(vfs)
          .filter(([k]) => k.startsWith(path + "/"))
          .map(([k, v]) => ({
            name: k.slice(path.length + 1),
            path: k,
            size: v.size,
            type: v.type,
            lastModified: v.lastModified,
          }));
      },
      delete: async ({ recursive = false } = {}) => {
        const vfs = vfsLoad();
        Object.keys(vfs)
          .filter((k) => recursive ? k.startsWith(path) : k === path)
          .forEach((k) => delete vfs[k]);
        vfsSave(vfs);
      },
    };
  }
}

// ─── File operations ──────────────────────────────────────────────────────────
export const File = {
  async write(path: string, content: string, type = "text/plain"): Promise<void> {
    const vfs = vfsLoad();
    vfs[path] = { content, lastModified: Date.now(), size: content.length, type };
    vfsSave(vfs);
  },

  async read(path: string): Promise<string | null> {
    const vfs = vfsLoad();
    return vfs[path]?.content ?? null;
  },

  async exists(path: string): Promise<boolean> {
    const vfs = vfsLoad();
    return path in vfs;
  },

  async delete(path: string): Promise<void> {
    const vfs = vfsLoad();
    delete vfs[path];
    vfsSave(vfs);
  },

  async rename(oldPath: string, newPath: string): Promise<void> {
    const vfs = vfsLoad();
    if (vfs[oldPath]) {
      vfs[newPath] = vfs[oldPath];
      delete vfs[oldPath];
      vfsSave(vfs);
    }
  },

  /** Download file to user's actual downloads */
  async downloadToDevice(path: string, filename: string): Promise<void> {
    const vfs = vfsLoad();
    const entry = vfs[path];
    if (!entry) throw new Error(`File not found: ${path}`);
    const blob = new Blob([entry.content], { type: entry.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },
};

// ─── join path helper ─────────────────────────────────────────────────────────
export function join(...parts: string[]): string {
  return parts.join("/").replace(/\/+/g, "/");
}

export function basename(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? path;
}

export function dirname(path: string): string {
  const parts = path.split("/").filter(Boolean);
  parts.pop();
  return "/" + parts.join("/");
}

export function extension(path: string): string {
  const name = basename(path);
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot) : "";
}
