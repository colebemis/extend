import React, { Component } from 'react'
import { shape, func } from 'prop-types'
import sortBy from 'lodash/sortBy'
import { render } from 'react-dom'

class App extends Component {
  static propTypes = {
    chrome: shape({
      management: shape({
        getAll: func.isRequired,
        setEnabled: func.isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    loading: true,
    extensions: [],
  }

  componentDidMount() {
    const { chrome } = this.props

    chrome.management.getAll(extensions =>
      this.setState({
        loading: false,
        extensions: sortBy(extensions, 'shortName'),
      }),
    )
  }

  handleCheckboxChange = (id, checked) => {
    const { chrome } = this.props
    const { extensions } = this.state

    chrome.management.setEnabled(id, checked, () => {
      this.setState({
        extensions: extensions.map(
          extension =>
            extension.id === id
              ? { ...extension, ...{ enabled: checked } }
              : extension,
        ),
      })
    })
  }

  render() {
    const { extensions } = this.state

    return (
      <div style={{ width: 360 }}>
        {extensions.map(({ id, enabled, shortName }) => (
          <div key={id}>
            <input
              id={id}
              type="checkbox"
              checked={enabled}
              onChange={event =>
                this.handleCheckboxChange(id, event.target.checked)
              }
            />
            <label htmlFor={id}>{shortName}</label>
          </div>
        ))}
      </div>
    )
  }
}

render(<App chrome={chrome} />, document.getElementById('root'))
