const configuredBase = import.meta.env.BASE_URL || '/';

export const siteBase =
  configuredBase === '/' ? '' : configuredBase.replace(/\/+$/, '');

export function sitePath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteBase}${normalizedPath}`;
}

export function routeFromLocation(pathname: string) {
  if (!siteBase) return pathname || '/';
  if (!pathname.startsWith(siteBase)) return pathname || '/';
  return pathname.slice(siteBase.length) || '/';
}
