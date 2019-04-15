export interface ErrorData {
  error: string;
  field: string;
}

export class GqlError extends Error {
  public errors?: ErrorData[];
  public error: string;
  public field?: string;
  constructor({
    error = '',
    field,
    errors,
  }: {
    error?: string;
    field?: string;
    errors?: ErrorData[];
  }) {
    super(error);
    if (errors) {
      this.errors = errors;
      return;
    }
    this.error = error;
    this.field = field;
  }
}
