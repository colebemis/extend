import React from 'react'
import { bool, string, oneOfType, number } from 'prop-types'
import styled, { css } from 'styled-components'
import { hideVisually, rgba } from 'polished'
import { px } from '../utils'
import { colors, opacities, radius } from '../theme'

const Container = styled.div`
  display: inline-block;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  ${hideVisually()};
`

const Icon = styled.svg`
  fill: none;
  stroke: ${colors.white};
  stroke-width: 1.5px;
`

const uncheckedStyles = css`
  background-color: ${props =>
    props.disabled ? rgba(colors.black, opacities[1]) : colors.white};
  border-color: ${props =>
    props.disabled
      ? rgba(colors.black, opacities[1])
      : rgba(colors.black, opacities[2])};

  ${Icon} {
    visibility: hidden;
  }
`

const checkedStyles = css`
  background-color: ${props =>
    props.disabled ? rgba(colors.black, opacities[3]) : colors.blue};
  border-color: transparent;
`

const StyledCheckbox = styled.div`
  box-sizing: border-box;
  width: ${props => px(props.size)};
  height: ${props => px(props.size)};
  border-width: 1px;
  border-style: solid;
  border-radius: ${px(radius)};
  transition: all 150ms;

  ${props => (props.checked ? checkedStyles : uncheckedStyles)};

  ${HiddenCheckbox}:focus + & {
    border-color: ${colors.blue};
    box-shadow: 0 0 0 3px ${rgba(colors.blue, opacities[3])};
  }}
`

const Checkbox = ({ className, checked, disabled, size, ...props }) => (
  <Container className={className}>
    <HiddenCheckbox checked={checked} disabled={disabled} {...props} />
    <StyledCheckbox checked={checked} disabled={disabled} size={size}>
      <Icon viewBox="0 0 24 24">
        <polyline vectorEffect="non-scaling-stroke" points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </Container>
)

Checkbox.propTypes = {
  className: string,
  checked: bool,
  disabled: bool,
  size: oneOfType([number, string]),
}

Checkbox.defaultProps = {
  className: '',
  checked: false,
  disabled: false,
  size: 16,
}

export default Checkbox
