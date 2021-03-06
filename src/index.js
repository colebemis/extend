import React, { Component } from 'react'
import { render } from 'react-dom'
import { shape, func } from 'prop-types'
import { Div } from 'glamorous'
import { css } from 'glamor'
import sortBy from 'lodash/sortBy'
import Fuse from 'fuse.js'
import theme from './theme'
import SearchInput from './components/SearchInput'
import ExtensionList from './components/ExtensionList'

css.global('body', {
  boxSizing: 'border-box',
  margin: 0,
})

css.global('*, *:before, *:after', {
  boxSizing: 'inherit',
})
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

  setEnabled = (id, enabled) => {
    this.props.chrome.management.setEnabled(id, enabled, () => {
      this.setState(state => ({
        extensions: state.extensions.map(
          extension =>
            extension.id === id ? { ...extension, ...{ enabled } } : extension,
        ),
      }))
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
      <Div display="flex" flexDirection="column" width={360} maxHeight={600}>
        <Div flex="0 0 auto">
          <SearchInput
            type="text"
            value={query}
            placeholder={
              isLoading
                ? 'Search extensions'
                : `Search ${extensions.length} extensions`
            }
            onChange={event => this.handleQueryChange(event.target.value)}
          />
        </Div>
        <Div flex="1 1 auto" overflowY="auto">
          {!isLoading && extensions.length === 0 ? (
            <div>No matches found.</div>
          ) : (
            <ExtensionList
              extensions={extensions}
              setEnabled={this.setEnabled}
            />
          )}
        </Div>
      </Div>
    )
  }
}

render(<App chrome={chrome} />, document.getElementById('root'))
