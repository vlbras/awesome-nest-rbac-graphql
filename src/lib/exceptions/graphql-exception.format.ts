import { HttpException } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';

export function graphQLExceptionFormat(error: GraphQLFormattedError) {
  const originalError = error.extensions?.originalError as HttpException & {
    statusCode?: string;
  };

  if (!originalError) {
    return {
      message: error.message,
      code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
    };
  }

  return {
    message: originalError.message || error.message,
    code: originalError.statusCode || error.extensions?.code,
  };
}
