import React from 'react'
import { Div, Label, Img, Span } from 'glamorous'
import find from 'lodash/find'
import { spacing, opacities } from '../theme'
import { joinSpacing } from '../utils'
import Checkbox from './Checkbox'

function getIconUrl(icons = []) {
  return icons.length > 0 ? icons[0].url : null
}

function ExtensionItem({ extension, setEnabled }) {
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
          boxSizing="content-box"
          paddingLeft={spacing[3]}
          opacity={extension.enabled ? 1 : opacities[4]}
          filter={extension.enabled ? 'none' : 'grayscale(100%)'}
        />
        <Span
          paddingLeft={spacing[1]}
          fontSize={14}
          opacity={extension.enabled ? 1 : opacities[4]}
        >
          {extension.shortName}
        </Span>
      </Label>
    </Div>
  )
}

export default ExtensionItem
