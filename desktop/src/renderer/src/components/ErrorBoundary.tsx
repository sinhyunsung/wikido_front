import { Component, type ReactNode } from 'react'

/**
 * Renderer-side safety net. Wrap each major panel (LeftExplorer, EditorPanel,
 * RightContext) so a single-component render error doesn't blank the whole
 * window — instead the specific panel shows a recoverable error message and
 * the user can keep using the rest of the app.
 *
 * Reset by calling `setKey()` from the parent or by clicking "다시 시도".
 */
interface Props {
  /** Display label for the boundary (shown in the error UI). */
  label: string
  children: ReactNode
}
interface State {
  err: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { err: null }

  static getDerivedStateFromError(err: Error): State {
    return { err }
  }

  componentDidCatch(err: Error, info: React.ErrorInfo): void {
    /* Surface to devtools — production should ship this somewhere observable. */
    console.error(`[${this.props.label}] render crash:`, err, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.err) {
      return (
        <div className="errbnd">
          <div className="errbnd-title">{this.props.label}에서 오류가 발생했습니다</div>
          <pre className="errbnd-msg">{this.state.err.message}</pre>
          <button className="errbnd-retry" onClick={() => this.setState({ err: null })}>
            다시 시도
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
