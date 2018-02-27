import React from 'react'
import { bool, string, oneOfType, number } from 'prop-types'
import styled, { css } from 'styled-components'
import { hideVisually, rgba } from 'polished'
import { px } from '../utils'

const Container = styled.div`
  display: inline-block;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  ${hideVisually()};
`

const Icon = styled.svg`
  fill: none;
  stroke: ${props => props.theme.colors.white};
  stroke-width: 1.5px;
`

const uncheckedStyles = css`
  background-color: white;
  border-color: ${props =>
    rgba(props.theme.colors.black, props.theme.opacities[2])};

  &:hover {
    border-color: ${props =>
      rgba(props.theme.colors.black, props.theme.opacities[3])};
  }

  ${Icon} {
    visibility: hidden;
  }
`

const checkedStyles = css`
  background-color: ${props => props.theme.colors.blue};
  border-color: ${props => props.theme.colors.blue};
`

const StyledCheckbox = styled.div`
  box-sizing: border-box;
  width: ${props => px(props.size)};
  height: ${props => px(props.size)};
  border-width: 1px;
  border-style: solid;
  border-radius: ${props => px(props.theme.radius)};
  transition: all 150ms;

  ${props => (props.checked ? checkedStyles : uncheckedStyles)};

  ${HiddenCheckbox}:focus + & {
    border-color: ${props => props.theme.colors.blue};
    box-shadow: 0 0 0 3px
      ${props => rgba(props.theme.colors.blue, props.theme.opacities[3])};
  }}
`

const Checkbox = ({ className, checked, size, ...props }) => (
  <Container className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked} size={size}>
      <Icon viewBox="0 0 24 24">
        <polyline vector-effect="non-scaling-stroke" points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </Container>
)

Checkbox.propTypes = {
  className: string,
  checked: bool,
  size: oneOfType([number, string]),
}

Checkbox.defaultProps = {
  className: '',
  checked: false,
  size: 16,
}

export default Checkbox
