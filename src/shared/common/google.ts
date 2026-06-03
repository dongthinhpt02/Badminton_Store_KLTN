import { OAuth2Client } from "google-auth-library";
import appConfig from "./config";

export const googleClient = new OAuth2Client(appConfig.google.googleClientId);
