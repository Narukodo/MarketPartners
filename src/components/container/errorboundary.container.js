import React, { PureComponent } from 'react'

export class ErrorBoundary extends PureComponent {
  state = {
    hasError: false,
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
