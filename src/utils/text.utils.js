export const truncate = (toTruncate, maxLength) => {
  return toTruncate && toTruncate.length > maxLength
    ? toTruncate.slice(0, maxLength).trim() + '...'
    : toTruncate
}