import { Injectable } from '@angular/core';

@Injectable()
export class UserIdService {
  private userId: string | null = null;

  constructor() {}

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string | null {
    return this.userId;
  }
}
