// export interface IImageKitService {
//   generateImageToken: (payload: any) => Promise<string | null>;
// }
export interface IImageKitService {
  generateImageToken: (payload?: any) => Promise<{
    token: string;
    expire: number;
    signature: string;
  } | null>;
}
