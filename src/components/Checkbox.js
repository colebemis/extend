import React from 'react'
import { bool, string, oneOfType, number, func } from 'prop-types'
import glamorous, { Div } from 'glamorous'
import { hideVisually, rgba } from 'polished'
import { colors, opacities, radius } from '../theme'

const hiddenCheckboxClassName = 'hidden-checkbox'
const HiddenCheckbox = glamorous('input', { withProps: { type: 'checkbox' } })(
  hiddenCheckboxClassName,
  hideVisually,
)

const iconClassName = 'icon'
const Icon = glamorous.svg(iconClassName, {
  fill: 'none',
  stroke: colors.white,
  strokeWidth: 1.5,
})

const uncheckedStyle = props => ({
  backgroundColor: props.disabled
    ? rgba(colors.black, opacities[1])
    : colors.white,
  borderColor: props.disabled
    ? rgba(colors.black, opacities[1])
    : rgba(colors.black, opacities[2]),

  [`& .${iconClassName}`]: {
    visibility: 'hidden',
  },
})

const checkedStyle = props => ({
  backgroundColor: props.disabled
    ? rgba(colors.black, opacities[3])
    : colors.blue,
  borderColor: 'transparent',
})

const StyledCheckbox = glamorous.div(
  props => ({
    boxSizing: 'border-box',
    width: props.size,
    height: props.size,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: radius,
    transition: 'all 100ms',

    [`.${hiddenCheckboxClassName}:focus + &`]: {
      borderColor: colors.blue,
      boxShadow: `0 0 0 3px ${rgba(colors.blue, opacities[3])}`,
    },
  }),
  props => (props.checked ? checkedStyle : uncheckedStyle),
)

function Checkbox({ className, checked, disabled, size, ...props }) {
  return (
    <Div className={className} display="inline-block">
      <HiddenCheckbox checked={checked} disabled={disabled} {...props} />
      <StyledCheckbox checked={checked} disabled={disabled} size={size}>
        <Icon viewBox="0 0 24 24">
          <polyline vectorEffect="non-scaling-stroke" points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </Div>
  )
}

Checkbox.propTypes = {
  className: string,
  checked: bool,
  disabled: bool,
  size: oneOfType([number, string]),
  onChange: func,
}

Checkbox.defaultProps = {
  className: '',
  checked: false,
  disabled: false,
  size: 16,
  onChange: () => {},
}

export default Checkbox
