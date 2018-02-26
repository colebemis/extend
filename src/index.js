import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
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
