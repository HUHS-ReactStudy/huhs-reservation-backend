import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

export const generateJwt = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
};

type VerifyJwtResult = {
  decoded: string | jwt.JwtPayload | null;
  error: string | null;
};
export const verifyJwt = (token: string): VerifyJwtResult => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return { decoded, error: null };
  } catch (error) {
    return { decoded: null, error: '유효하지 않은 JWT입니다.' };
  }
};

export const decodeJwt = (token: string) => {
  return jwt.decode(token);
};

export const jwtMiddleware = (ctx: Context, next: Next) => {
  if (!ctx.request.headers.authorization) {
    ctx.status = 401;
    ctx.body = {
      status: 'error',
      statusCode: 401,
      data: null,
      message: 'Header에 Authorization를 설정해주세요.',
    };
    return;
  }
  const { decoded, error } = verifyJwt(ctx.request.headers.authorization.replace(/bearer /i, ''));
  if (error) {
    ctx.status = 401;
    ctx.body = {
      status: 'error',
      statusCode: 401,
      data: null,
      message: error,
    };
    return;
  }
  if (decoded && typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
    ctx.state['userId'] = decoded['userId'];
    return next();
  }
  ctx.status = 401;
  ctx.body = {
    status: 'error',
    statusCode: 401,
    data: null,
    message: '잘못된 접근입니다.',
  };
  return;
};
