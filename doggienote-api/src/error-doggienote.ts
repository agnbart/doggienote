import { NotFoundException } from '@nestjs/common';

export class ErrorDoggienote {
  readonly message: string;
  readonly statusCode: number;
  readonly error: string;

  constructor(message: string, statusCode: number, error: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}
