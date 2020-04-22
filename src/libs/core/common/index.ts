// import { ErrorHandlerInterceptorProvider } from './errors-handler.interceptor';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';

export { LoadingService, ToastService };
// export { ErrorHandlerInterceptorProvider, LoadingService, ToastService };

export const Common = [LoadingService, ToastService];
// export const Common = [ErrorHandlerInterceptorProvider, LoadingService, ToastService];
