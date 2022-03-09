export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}


export class PayerNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Payer with id ${id} not found`);
    this.name = "PayerNotFoundError";
  }
}

export class ItemNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Item with id ${id} not found`);
    this.name = "ItemNotFoundError";
  }
}