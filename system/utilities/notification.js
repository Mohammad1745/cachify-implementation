import { toast } from "react-toastify";

export const notify = (data) => {
    if (data.status === false) {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.status(data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };