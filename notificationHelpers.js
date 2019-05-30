


export function sendNotification (message: RemoteMessage) {
    if (message.data) {
      // ... create and display notification
    }
    return Promise.resolve()  // for HeadlessJS
  }
  
  // shared by onNotificationOpened & getInitialNotification
  export function handleNotification (data: NotificationOpen, initial?: boolean) {
    const { notification } = data
    if (notification) {
      // ... handle it
    }
  }