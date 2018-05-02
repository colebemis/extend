import React from 'react'
import { Div, Label, Img, Span } from 'glamorous'
import find from 'lodash/find'
import { spacing } from '../theme'
import { joinSpacing } from '../utils'
import Checkbox from './Checkbox'

function getIconUrl(icons = []) {
  return icons.length > 0 ? icons[0].url : null
}

function Extension({ extension, setEnabled }) {
  return (
    <Div padding={joinSpacing(spacing[1], spacing[3])}>
      <Label display="flex" alignItems="center">
        <Checkbox
          checked={extension.enabled}
          onChange={event => setEnabled(extension.id, event.target.checked)}
        />
        <Img
          src={getIconUrl(extension.icons)}
          width={16}
          paddingLeft={spacing[3]}
        />
        <Span paddingLeft={spacing[1]} fontSize={14}>
          {extension.shortName}
        </Span>
      </Label>
    </Div>
  )
}

export default Extension
