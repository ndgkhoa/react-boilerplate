import { AxiosError } from 'axios';

interface ServiceMessageOptions {
  errorDefaultMessage?: string;
  successDefaultMessage?: string;
}

const defaultOptions: ServiceMessageOptions = {
  errorDefaultMessage: 'Có lỗi xảy ra',
  successDefaultMessage: 'Thành công',
};

export class ServiceMessage {
  message: string = '';

  constructor(
    status: 'success' | 'failure',
    responseObject: unknown,
    options?: ServiceMessageOptions
  ) {
    if (status === 'success') {
      this.message = this.successHandler(responseObject, options);
    }
    if (status === 'failure') {
      this.message = this.failureHandler(responseObject, options);
    }
  }

  static success(responseObject: unknown, options?: ServiceMessageOptions) {
    return new ServiceMessage('success', responseObject, options);
  }
  static error(responseObject: unknown, options?: ServiceMessageOptions) {
    return new ServiceMessage('failure', responseObject, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successHandler(responseObject: any, options: ServiceMessageOptions = defaultOptions) {
    return responseObject?.data.Message ?? options.successDefaultMessage;
  }
  failureHandler(responseObject: unknown, options: ServiceMessageOptions = defaultOptions) {
    if (responseObject instanceof AxiosError) {
      return responseObject.response?.data?.Message ?? options?.errorDefaultMessage;
    }
    return options?.errorDefaultMessage;
  }
}
