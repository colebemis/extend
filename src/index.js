import React, { Component } from 'react'
import { shape, func } from 'prop-types'
import { render } from 'react-dom'

class App extends Component {
  static propTypes = {
    chrome: shape({
      management: shape({
        getAll: func.isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    loading: true,
    extensions: [],
  }

  componentDidMount() {
    this.props.chrome.management.getAll(extensions =>
      this.setState({
        loading: false,
        extensions,
      }),
    )
  }

  render() {
    return (
      <div style={{ width: 360 }}>
        {this.state.extensions.map(extension => (
          <div key={extension.id}>
            <input
              id={extension.id}
              type="checkbox"
              checked={extension.enabled}
            />
            <label htmlFor={extension.id}>{extension.shortName}</label>
          </div>
        ))}
      </div>
    )
  }
}

render(<App chrome={chrome} />, document.getElementById('root'))
