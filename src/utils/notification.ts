import { AxiosError } from 'axios';

interface Options {
  errorDefaultMessage?: string;
  successDefaultMessage?: string;
}

const defaultOptions: Options = {
  errorDefaultMessage: 'Có lỗi xảy ra',
  successDefaultMessage: 'Thành công',
};

export class Notification {
  message: string = '';

  constructor(status: 'success' | 'failure', responseObject: unknown, options?: Options) {
    if (status === 'success') {
      this.message = this.successHandler(responseObject, options);
    }
    if (status === 'failure') {
      this.message = this.failureHandler(responseObject, options);
    }
  }

  static success(responseObject: unknown, options?: Options) {
    return new Notification('success', responseObject, options);
  }
  static error(responseObject: unknown, options?: Options) {
    return new Notification('failure', responseObject, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successHandler(responseObject: any, options: Options = defaultOptions) {
    return responseObject?.data.Message ?? options.successDefaultMessage;
  }
  failureHandler(responseObject: unknown, options: Options = defaultOptions) {
    if (responseObject instanceof AxiosError) {
      return responseObject.response?.data?.Message ?? options?.errorDefaultMessage;
    }
    return options?.errorDefaultMessage;
  }
}
