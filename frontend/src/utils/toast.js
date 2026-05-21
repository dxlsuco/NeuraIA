import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (msg) => sonnerToast.success(msg),
  error: (msg) => sonnerToast.error(msg),
  info: (msg) => sonnerToast.info(msg),
  loading: (msg) => sonnerToast.loading(msg),
  dismiss: (id) => sonnerToast.dismiss(id),
};

export default toast;
