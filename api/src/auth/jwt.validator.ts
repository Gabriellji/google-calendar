import { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient, { JwksClient, SigningKey } from "jwks-rsa";
import { verify, VerifyOptions, JwtPayload } from 'jsonwebtoken';
import { GetPublicKeyOrSecret } from 'jsonwebtoken';

const client: JwksClient = jwksClient({
  jwksUri: process.env.CERT_URL,
});

function getKey (header: JwtHeader, callback: SigningKeyCallback): void {
  client.getSigningKey(header.kid, (err: Error | null, key: SigningKey) => {
    const signingKey: string = key.getPublicKey();
    callback(null, signingKey);
  });
};

export async function verifyIdToken(idToken: string, clientId: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
        verify(idToken, getKey as GetPublicKeyOrSecret, {
            algorithms: ['RS256'],
            issuer: process.env.ISSUER,
            audience: clientId,
        } as VerifyOptions, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            if (decoded) {
                resolve(decoded as JwtPayload);
            } else {
                reject(new Error('Invalid token'));
            }
        });
    });
}
