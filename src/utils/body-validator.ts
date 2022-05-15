import Joi from 'joi';

type BodyValidatorResult<T> = {
  error?: string;
  value: T;
};

// 에러 메세지를 리턴한다.
const bodyValidator = <T>(body: any, schema: Joi.ObjectSchema<any>, options?: Joi.ValidationOptions): BodyValidatorResult<T> => {
  const { error, value } = schema.validate(body, options);
  return { error: error?.message, value };
};

export default bodyValidator;
