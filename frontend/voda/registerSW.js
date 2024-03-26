if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/voda-sw.js', { scope: '/' })
    })
  }