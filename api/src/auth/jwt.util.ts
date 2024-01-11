import {
  JwtHeader,
  SigningKeyCallback,
  VerifyOptions,
  JwtPayload,
  verify,
  sign,
} from "jsonwebtoken";
import jwksClient, { JwksClient, SigningKey } from "jwks-rsa";

function getKey(header: JwtHeader, callback: SigningKeyCallback): void {
  const client: JwksClient = jwksClient({
    jwksUri: process.env.GOOGLE_CERT_URL || "",
  });

  client.getSigningKey(header.kid, (err: Error | null, key?: SigningKey) => {
    if (err) {
      return callback(err, undefined);
    }

    if (key) {
      const signingKey: string = key.getPublicKey();
      callback(null, signingKey);
    } else {
      callback(new Error("Signing key not found"), undefined);
    }
  });
}

export function createSessionToken(userId: string) {
  return sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

export async function verifyIdToken(
  idToken: string,
  clientId: string
): Promise<JwtPayload> {
  const verifyOptions: VerifyOptions = {
    algorithms: ["RS256"],
    issuer: process.env.ISSUER,
    audience: clientId,
  };

  return new Promise((resolve, reject) => {
    verify(idToken, getKey, verifyOptions, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      if (decoded) {
        resolve(decoded as JwtPayload);
      } else {
        reject(new Error("Invalid token"));
      }
    });
  });
}
