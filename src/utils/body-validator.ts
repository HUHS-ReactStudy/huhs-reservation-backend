import Joi from 'joi';

// 에러 메세지를 리턴한다.
const bodyValidator = (body: any, schema: Joi.ObjectSchema<any>) => {
  const { error } = schema.validate(body);
  return error?.message;
};

export default bodyValidator;
