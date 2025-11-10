import { NextResponse } from 'next/server';
import { ValidationError } from './validation';

export function createErrorResponse(error: ValidationError | Error, status: number = 500) {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: 400 }
    );
  };

  return NextResponse.json(
    {
      error: 'Internal server error: ' + error.message,
    },
    { status }
  );
};

export function createSuccessResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
};

export function createAuthErrorResponse() {
  return NextResponse.json(
    {
      error: 'Authentication required',
      code: 'AUTHENTICATION_REQUIRED',
    },
    { status: 401 }
  );
};