function isNumber(value) {
  return typeof value === 'number' && !isNaN(value)
}

export function toPx(value) {
  return isNumber(value) && value !== 0 ? value + 'px' : value
}

export function joinSpacing(...args) {
  if (args.length > 4) {
    throw new Error('Too many arguments')
  }

  return args.map(toPx).join(' ')
}
