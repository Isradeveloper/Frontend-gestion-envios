export interface ResponseApiAuth {
  message: string;
  data: Data;
}

export interface Data {
  user: User;
  token: string;
  refreshToken: string;
}

export interface UserApi {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  active: number;
}

export class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly role: string,
    public readonly createdAt: Date,
    public readonly active: number,
    public readonly token: string,
    public readonly refreshToken: string
  ) {}

  static fromApi(data: Data) {
    return new User(
      data.user.id,
      data.user.name,
      data.user.email,
      data.user.role,
      data.user.createdAt,
      data.user.active,
      data.token,
      data.refreshToken
    );
  }
}
