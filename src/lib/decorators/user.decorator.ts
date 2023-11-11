import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayloadWithRefresh } from '../interfaces';

export const User = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefresh | undefined,
    context: ExecutionContext,
  ): JwtPayloadWithRefresh | string => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    if (data) return req.user[data];

    return req.user;
  },
);
