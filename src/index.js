import React, { Component } from 'react'
import { render } from 'react-dom'
import { shape, func } from 'prop-types'
import sortBy from 'lodash/sortBy'
import Fuse from 'fuse.js'
import theme from './theme'
import Checkbox from './components/Checkbox'

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
    query: '',
    extensions: [],
  }

  componentDidMount() {
    this.props.chrome.management.getAll(extensions =>
      this.setState({
        loading: false,
        extensions: sortBy(extensions, 'shortName'),
      }),
    )
  }

  handleQueryChange = query => this.setState({ query })

  handleEnabledChange = (id, enabled) => {
    this.props.chrome.management.setEnabled(id, enabled, () => {
      this.setState({
        extensions: this.state.extensions.map(
          extension =>
            extension.id === id ? { ...extension, ...{ enabled } } : extension,
        ),
      })
    })
  }

  searchExtensions = (extensions, query) => {
    if (query === '') {
      return extensions
    }

    const options = {
      threshold: 0.5,
      keys: ['name', 'shortName', 'description'],
    }

    const fuse = new Fuse(extensions, options)

    return fuse.search(query)
  }

  render() {
    const extensions = this.searchExtensions(
      this.state.extensions,
      this.state.query,
    )

    return (
      <div style={{ width: 360 }}>
        <input
          type="text"
          value={this.state.query}
          placeholder="Search"
          onChange={event => this.handleQueryChange(event.target.value)}
          style={{ width: '100%' }}
        />
        {!this.state.loading && extensions.length === 0 ? (
          <div>No matches found.</div>
        ) : (
          extensions.map(({ id, enabled, shortName }) => (
            <div key={id}>
              <Checkbox
                id={id}
                checked={enabled}
                onChange={event =>
                  this.handleEnabledChange(id, event.target.checked)
                }
              />
              <label htmlFor={id}>{shortName}</label>
            </div>
          ))
        )}
      </div>
    )
  }
}

render(<App chrome={chrome} />, document.getElementById('root'))
