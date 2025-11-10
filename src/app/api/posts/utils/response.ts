import { NextResponse } from 'next/server';
import { ValidationError } from '../types';

export class ResponseHelper {
  static success(data: any, status: number = 200) {
    return NextResponse.json(data, { status });
  };

  static error(message: string, status: number = 500) {
    return NextResponse.json(
      { error: message },
      { status }
    );
  };

  static validationError(errors: ValidationError[]) {
    const error = errors.length === 1 
      ? errors[0] 
      : {
          message: "Multiple validation errors occurred",
          code: "MULTIPLE_VALIDATION_ERRORS",
          details: errors
        };;

    return NextResponse.json(error, { status: 400 });
  };

  static unauthorized(message: string = 'Unauthorized') {
    return NextResponse.json({ error: message }, { status: 401 });
  };

  static serverError(error: unknown) {
    console.error('Server error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error: ' + message },
      { status: 500 }
    );
  };
};