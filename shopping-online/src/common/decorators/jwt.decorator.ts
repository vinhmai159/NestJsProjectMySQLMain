import { createParamDecorator } from '@nestjs/common';

export const Jwt = createParamDecorator((_, req) => req.user);
