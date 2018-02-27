export const isNumber = n => typeof n === 'number' && !isNaN(n)
export const px = n => (isNumber(n) ? n + 'px' : n)
