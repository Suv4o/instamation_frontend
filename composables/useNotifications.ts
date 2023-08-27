export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
}

const notification = ref({
  isOpen: false,
  title: "",
  message: "",
  type: NotificationType.SUCCESS,
});

export default function useNotifications() {
  const timeout = ref();

  function setNotification(
    title: string,
    message: string,
    type: NotificationType,
  ) {
    notification.value = {
      isOpen: true,
      title,
      message,
      type,
    };

    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      resetNotification();
    }, 3000);
  }

  function resetNotification() {
    notification.value = {
      isOpen: false,
      title: "",
      message: "",
      type: NotificationType.SUCCESS,
    };
  }

  return {
    notification,
    NotificationType,
    setNotification,
  };
}
