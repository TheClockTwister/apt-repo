export function divideBytes(n: number): [number, string] {
  if (n < 1024) return [n, 'B'];
  n /= 1024;
  if (n < 1024) return [n, 'KiB'];
  n /= 1024;
  if (n < 1024) return [n, 'MiB'];
  n /= 1024;
  if (n < 1024) return [n, 'GiB'];
  n /= 1024;
  if (n < 1024) return [n, 'TiB'];
  n /= 1024;
  return [n, 'PiB'];
}

export function divideNumber(n: number): [number, string] {
  if (n < 1000) return [n, ''];
  n /= 1000;
  if (n < 1000) return [n, 'k'];
  n /= 1000;
  if (n < 1000) return [n, 'M'];
  n /= 1000;
  if (n < 1000) return [n, 'B'];
  n /= 1000;
  return [n, 'T'];
}

export function divideNumberSI(n: number): [number, string] {
  if (n < 1000) return [n, ''];
  n /= 1000;
  if (n < 1000) return [n, 'k'];
  n /= 1000;
  if (n < 1000) return [n, 'M'];
  n /= 1000;
  if (n < 1000) return [n, 'G'];
  n /= 1000;
  return [n, 'T'];
}

export function divideMilliseconds(milliseconds: number): [number, string] {
  let n = milliseconds;
  if (n < 1000) return [n, 'ms'];
  n /= 1000;
  if (n < 60) return [n, 's'];
  n /= 60;
  if (n < 60) return [n, 'm'];
  n /= 60;
  if (n < 24) return [n, 'h'];
  n /= 24;
  return [n, 'd'];
}

export function formatBytes(n: number, decimals: number = 2) {
  const [value, unit] = divideBytes(n);
  return `${value.toFixed(decimals)} ${unit}`;
}

export function formatNumber(n: number, decimals: number = 2) {
  const [value, unit] = divideNumber(n);
  return `${value.toFixed(decimals)} ${unit}`;
}

export const makeTimeRange = (lastNSeconds: number): [Date, Date] => {
  const now = new Date();
  return [new Date(now.getTime() - 1000 * lastNSeconds), now];
};
