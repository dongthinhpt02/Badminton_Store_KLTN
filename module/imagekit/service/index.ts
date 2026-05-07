import crypto from "crypto";
import appConfig from "../../../src/shared/common/config";

export class ImagekitService {
  async generateImageToken() {
    try {
      const privateKey = appConfig.imagekit.privateKey;
      if (!privateKey) {
        throw new Error("Missing IMAGEKIT_PRIVATE_KEY in config");
      }

      const token = crypto.randomBytes(16).toString("hex");
      const expire = Math.floor(Date.now() / 1000) + 600;

      const signature = crypto
        .createHmac("sha1", privateKey)
        .update(token + expire)
        .digest("hex");

      return { token, expire, signature };
    } catch (e) {
      console.error("Error generating image token:", e);
      return null;
    }
  }
}
