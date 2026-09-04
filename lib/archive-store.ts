import { ArchiveItem, initialArchive } from '@/data/archive';

const META_KEY = 'living-archive:v3:items';
const LEGACY_META_KEY = 'living-archive:v2:items';
const DB_NAME = 'living-archive-media';
const STORE_NAME = 'files';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME))
        request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readFile(key: string): Promise<Blob | undefined> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = database
      .transaction(STORE_NAME, 'readonly')
      .objectStore(STORE_NAME)
      .get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function storeFile(file: File, key: string) {
  const database = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const request = database
      .transaction(STORE_NAME, 'readwrite')
      .objectStore(STORE_NAME)
      .put(file, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
  return `idb:${key}`;
}

export async function deleteStoredFile(mediaUrl?: string) {
  if (!mediaUrl?.startsWith('idb:')) return;
  const database = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const request = database
      .transaction(STORE_NAME, 'readwrite')
      .objectStore(STORE_NAME)
      .delete(mediaUrl.slice(4));
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function hydrate(items: ArchiveItem[]) {
  return Promise.all(
    items.map(async (item) => {
      if (!item.mediaUrl.startsWith('idb:')) return item;
      const blob = await readFile(item.mediaUrl.slice(4));
      return blob ? { ...item, resolvedUrl: URL.createObjectURL(blob) } : item;
    }),
  );
}

export async function loadArchive() {
  const saved = localStorage.getItem(META_KEY);
  const legacySaved = saved ? null : localStorage.getItem(LEGACY_META_KEY);
  let items: ArchiveItem[];

  if (saved) {
    items = JSON.parse(saved);
  } else if (legacySaved) {
    const initialById = new Map(initialArchive.map((item) => [item.id, item]));
    items = (JSON.parse(legacySaved) as ArchiveItem[]).map((item) => {
      const initial = initialById.get(item.id);
      return initial?.collection === 'images'
        ? { ...item, note: initial.note }
        : item;
    });
    localStorage.setItem(META_KEY, JSON.stringify(items));
  } else {
    items = initialArchive;
  }

  return hydrate(items);
}

export function saveArchive(items: ArchiveItem[]) {
  localStorage.setItem(
    META_KEY,
    JSON.stringify(items.map(({ resolvedUrl: _resolvedUrl, ...item }) => item)),
  );
}
