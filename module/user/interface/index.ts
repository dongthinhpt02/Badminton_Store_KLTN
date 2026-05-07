import { StringValue } from "ms";
import { TokenType } from "../../../src/shared/interface";
import {
  IAuthen,
  IChangePasswordForm,
  ILoginForm,
  IResetPasswordForm,
  ISignupForm,
  IUpdateProfileForm,
  IUpdateUserForm,
  IUserCondForm,
  User,
} from "../model";

export interface IUserRepository {
  insert: (user: User) => Promise<User>;
  update: (id: string, form: IUpdateUserForm) => Promise<boolean>;
  findById: (id: string) => Promise<User | null>;
  findByCond: (id: IUserCondForm) => Promise<User | null>;
  generateToken: (
    userId: string,
    type: TokenType,
    expiresIn: StringValue,
  ) => Promise<string>;
  generateTokenAdmin: (
    userId: string,
    type: TokenType,
    expiresIn: StringValue,
  ) => Promise<string>;
  generateTokenManager: (
    userId: string,
    type: TokenType,
    expiresIn: StringValue,
  ) => Promise<string>;
  //   renewToken: (oldRefreshToken: string) => Promise<IAuthen>;
  //   renewTokenAdmin: (oldRefreshToken: string) => Promise<IAuthen>;
  //   renewTokenManager: (oldRefreshToken: string) => Promise<IAuthen>;
}
export interface IUserService {
  login: (form: ILoginForm) => Promise<IAuthen>;
  signup: (form: ISignupForm) => Promise<IAuthen>;
  signupAdmin(form: ISignupForm): Promise<IAuthen>;
  signupManager(form: ISignupForm): Promise<IAuthen>;

  getProfile: (id: string) => Promise<User>;
  renewToken(oldRefreshToken: string): Promise<IAuthen>;
  updateUser(id: string, form: IUpdateUserForm): Promise<User>;
  sendEmailToResetPassword: (form: IResetPasswordForm) => Promise<string>;
  changePassword: (
    token: string,
    form: IChangePasswordForm,
  ) => Promise<boolean>;

  renewToken: (oldRefreshToken: string) => Promise<IAuthen>;
  renewTokenAdmin: (oldRefreshToken: string) => Promise<IAuthen>;
  renewTokenManager: (oldRefreshToken: string) => Promise<IAuthen>;

  logout: (refreshToken: string) => Promise<boolean>;
  //   signupAdmin(form: ISignupForm): Promise<IAuthen>;
  //   signupShipper(form: ISignupForm): Promise<IAuthen>;
  //   signupManager(form: ISignupForm): Promise<IAuthen>;
  //   getProfile: (id: string) => Promise<User>;
  //   updateProfile: (id: string, form: IUpdateProfileForm) => Promise<User>;
  //   updateUser: (id: string, form: IUpdateUserForm) => Promise<User>;
}
