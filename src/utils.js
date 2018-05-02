function isNumber(value) {
  return typeof value === 'number' && !isNaN(value)
}

export function toPx(value) {
  return isNumber(value) && value !== 0 ? value + 'px' : value
}
