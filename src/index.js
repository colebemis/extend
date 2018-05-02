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
    isLoading: true,
    query: '',
    extensions: [],
  }

  componentDidMount() {
    // setTimeout prevents popup window from getting stuck at the wrong size
    // https://bugs.chromium.org/p/chromium/issues/detail?id=428044
    setTimeout(() => {
      this.props.chrome.management.getAll(extensions =>
        this.setState({
          isLoading: false,
          extensions: sortBy(extensions, 'shortName'),
        }),
      )
    }, 200)
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
    const { isLoading, query } = this.state

    const extensions = this.searchExtensions(this.state.extensions, query)

    return (
      <div style={{ width: 360 }}>
        <input
          type="text"
          value={query}
          placeholder="Search"
          onChange={event => this.handleQueryChange(event.target.value)}
          style={{ width: '100%' }}
        />
        {!isLoading && extensions.length === 0 ? (
          <div>No matches found.</div>
        ) : (
          extensions.map(({ id, enabled, shortName }) => (
            <label key={id}>
              <Checkbox
                checked={enabled}
                onChange={event =>
                  this.handleEnabledChange(id, event.target.checked)
                }
              />
              <span>{shortName}</span>
            </label>
          ))
        )}
      </div>
    )
  }
}

render(<App chrome={chrome} />, document.getElementById('root'))
