import type { Rule } from 'antd/es/form';

const REQUIRED_ERROR_MESSAGE = 'Vui lòng nhập trường này';
const FORMAT_ERROR_MESSAGE = 'Vui lòng nhập trường này';

export const Rules = {
  required(message = REQUIRED_ERROR_MESSAGE): Rule {
    return { required: true, message };
  },
  email(message = FORMAT_ERROR_MESSAGE): Rule {
    return { type: 'email', message };
  },
  regex(pattern: RegExp, message = FORMAT_ERROR_MESSAGE): Rule {
    return { pattern, message };
  },
  required2Field(alternateField: string, message = REQUIRED_ERROR_MESSAGE): Rule {
    return ({ getFieldValue }) => ({
      validator(_, value) {
        if (value || getFieldValue(alternateField)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(message));
      },
    });
  },
};
