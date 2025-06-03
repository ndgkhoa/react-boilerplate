import { fakerVI as faker } from '@faker-js/faker';

export const generateStrArray = ({
  length = 10,
  strLength = 5,
}: { length?: number; strLength?: number } = {}) => {
  const dataSource: string[] = [];
  for (let i = 0; i < length; i++) {
    dataSource.push(faker.string.alpha({ length: strLength }));
  }
  return dataSource;
};
