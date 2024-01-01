import { NotFoundException } from '@nestjs/common';
/**
 * Error description
 * ('This dog has activity. It cannot be removed.', 403, 'dn_3')
 * ('This dictActivity cannot be removed', 403, 'dn_4')
 * ('This email already exist',403, 'dn_6')
 * ('This dict-activity already exist. You can not add the same.', 403, 'dn_7')
 */
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

export class ErrorDoggienoteNotFound extends ErrorDoggienote {
  constructor() {
    super('No record found in the database', 404, 'dn_1');
  };
}

export class ErrorDoggienoteNotCreated extends ErrorDoggienote {
  constructor() {
    super('The record was not created', 400, 'dn_2');
  }
}

export class ErrorDoggienoteIsEmpty extends ErrorDoggienote {
  constructor() {
    super('The field cannot be empty.', 400, 'dn_5');
  }
}