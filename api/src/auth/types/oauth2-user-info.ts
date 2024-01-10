import { OpenidTokenPayload } from "./oauth2-token";

export interface Oauth2UserInfo extends Pick<OpenidTokenPayload, "sub" | "email" | "email_verified"> {
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
}
