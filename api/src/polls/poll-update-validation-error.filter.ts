import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { ChoiceDoesNotExistError } from './errors';

@Catch(ChoiceDoesNotExistError)
export class PollUpdateValidationErrorFilter
  implements ExceptionFilter<ChoiceDoesNotExistError>
{
  catch(exception: ChoiceDoesNotExistError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      message: exception.message,
      errors: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
