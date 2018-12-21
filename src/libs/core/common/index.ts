import { ErrorHandlerInterceptorProvider } from './errors-handler.interceptor';
import { LoadingService } from './loading.service';

export { ErrorHandlerInterceptorProvider, LoadingService };

export const Common = [ErrorHandlerInterceptorProvider, LoadingService];
