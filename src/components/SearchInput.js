import glamorous from 'glamorous'
import { rgba } from 'polished'
import { spacing, colors, opacities } from '../theme'

const SearchInput = glamorous('input', {
  withProps: { type: 'text', spellCheck: false, autoFocus: true },
})({
  flex: '0 0 auto',
  width: '100%',
  padding: spacing[3],
  fontSize: 16,
  fontWeight: 500,
  color: rgba(colors.black, opacities[5]),
  border: 'none',
  boxShadow: `0 1px 0 ${rgba(colors.black, opacities[1])}`,
  outline: 0,
  zIndex: 0,

  '&::placeholder': {
    color: rgba(colors.black, opacities[3]),
  },
})

export default SearchInput
