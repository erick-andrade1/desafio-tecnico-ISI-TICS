import { z } from 'zod';
import { AppValidationError } from '../../errors';
import { FieldValidateError } from './FieldValidateError';
import { ValidateErrorDetails } from './ValidateErrorDetails';

export abstract class AbstractValidator {
  public static safeParse<T>(
    schema:
      | z.ZodObject<any, any, any, T>
      | z.ZodEffects<z.ZodObject<any, any, any, T>>,
    input: any,
  ): T {
    const { success, error, data } = schema.safeParse(input);
    if (!success) {
      const detail = this.createValidateError(error);
      throw new AppValidationError('Erro de validação', 422, detail);
    }
    return data;
  }

  protected static createValidateError(
    error: z.ZodError,
  ): ValidateErrorDetails {
    const fieldErrors: FieldValidateError[] = [];
    console.log(JSON.stringify(error, null, 2));
    for (const fieldError of error.issues) {
      fieldErrors.push({
        field: fieldError.path.join('.'),
        message: fieldError.message,
      });
    }

    return {
      errors: fieldErrors,
    };
  }
}
