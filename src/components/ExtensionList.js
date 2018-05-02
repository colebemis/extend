import React, { Fragment } from 'react'
import { Div } from 'glamorous'
import { spacing } from '../theme'
import { joinSpacing } from '../utils'
import ExtensionItem from './ExtensionItem'

function ExtensionList({ extensions, setEnabled }) {
  return (
    <Div padding={joinSpacing(spacing[1], 0)}>
      {extensions.map(extension => (
        <ExtensionItem
          key={extension.id}
          extension={extension}
          setEnabled={setEnabled}
        />
      ))}
    </Div>
  )
}

export default ExtensionList
