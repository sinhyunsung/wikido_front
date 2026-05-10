interface WindowControls {
  minimize: () => void
  toggleMaximize: () => void
  close: () => void
}

interface Api {
  window: WindowControls
}

declare global {
  interface Window {
    api: Api
  }
}

export {}
