import { Bounce, toast as t, ToastPosition } from "react-toastify";

export const toast = {
  info: createToastFunction(t.info),
  success: createToastFunction(t.success),
  error: createToastFunction(t.error),
};

const template = {
  position: "bottom-right" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Bounce,
};

function createToastFunction(
  toastType: (msg: string, options?: object) => void
) {
  return (msg: string, theme: string) => {
    return toastType(msg, {
      ...template,
      theme,
    });
  };
}
