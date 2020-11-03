export const enableNotifications = () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!')
    return;
  }

  Notification.requestPermission(status => {
    console.log('Notification permission status:', status)
  })
}

export const displayNotification = () => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      const options = {
        body: 'Choose your break content on Som Timer',
        icon: '/favicon.ico',
        vibrate: [300, 300, 300],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 999
        },
        actions: [
          { action: 'close', title: 'Close notification', icon: '' }
        ]
      }
      reg.showNotification('Time\'s up!', options)
    })
  }
}