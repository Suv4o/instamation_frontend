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
  return {
    notification,
    NotificationType,
  };
}
