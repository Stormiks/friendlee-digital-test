export default {
  name: 'VueLoadingIndicator',
  functional: true,
  render(h, { data, children }) {
    return <div class="loading-indicator" {...data}>
      <div class="animation" />
      {children}
    </div>
  }
}
