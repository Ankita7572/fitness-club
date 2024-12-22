import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { cookies } from "next/headers";
import { getAuth, SessionCookieOptions } from "firebase-admin/auth";

export const firebaseApp =
  getApps().find((it) => it.name === "Test") ||
  initializeApp(
    {
      credential: cert({
        projectId:"pulse-fitness-bfac0",
        privateKey:
         "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyMtJ17CVsn4vS\nmO5O9Vr2ol4oYUastBojAssQ/N2Sj9qZdrvSsiVT1DO0DCGn60KC6/yWqLi3pKqY\nl2lzWw+i5D6QBp3RCbdHiZd7hGk2I+LsHZFjrHY2xFNYh3GjmNwdvdG/zft3UGRA\nyFTOTOlZVSXMvRsxUjvmnA5j/Nxhg4Q3az8lDp1JEn+KIlxqZvsSJn2Et2kKBmjS\n9SyotvP//oOCbDScFLn9fgcQTOo5/jtgFC4SUgnXufaSKs2nHmKDHEyQn2g7LEn9\n9Kb85DdZzjjOe+v8NHo9UoI0Oe8o+mRuBFVnbIK/2lNY8pvN6z2lBw/LpsjdpdZQ\nlMiUP24ZAgMBAAECggEAIJZ8uIX7/hZbSqMfCZ+DCBF/aKEJfLHfCcIMAspLdu8J\nygDVrl1XyDHJVsbVLNEwM6MWaTLnvOXHMOqXpTnk7SQScOJU4BKHyvRVmIgJeZYs\nfIOXwAOdBrz2hP0YAhQFRQceoZX4w8QW4WYBZEzaa7TPmdaHb4ibXbvyQcTPRKGr\nSBX9l5ylcSv9UdVTXR97Tma3wnzL4BVi1JzvcRMS54ZHfY7uZsOHj0Z6UmD50gdw\n3XGjuk318xscwVPREbIjiINxHBEzeyR8LnHmuTnjc9jM0UcoRtHsgU66iVRXG0ri\n7vrh/ZSdpAMj76rNKA9BfEZc7hUOt0GCryeAm1iNZQKBgQDgbYcbmEjJsMdXPyQg\nb08lrjU/zXRrNbhksQELDSim5a3rXWSTiPlJE+0o0o9GI+kK6sYUtRlph13A9hq6\nif1YsXH+/GyyR50C6dBzmglYi1HDw4WMfXzkcxmuGEMUtakS/uD/ZU3YmhOkQdtb\nbLT+JxUnV5L9F+ywESue/9M2GwKBgQDLRGgQuAWQUI6v9EzgsyfjGyWXURsrLeIV\n8mlEvqOu2tmpTNt1H0isuYFIrmiaN8MP7eoWddsgwBfcOtdQBYsLFjBS7ezJo1UF\nnJZowxyPLpnVnCAvIuhM55DQWT+z/Sdylnc9IqNeq01nHGpCpZkRujnoh4Pl0yzb\npO5Y6ra/2wKBgF9qUZHK2c9eKDIQtzRO/pBfk2YP3JokGcQ9eNsQ+iKS7bFuYG9V\nQd7u6Np9QsqoQ9EPZa2yHR6/nX2HZG/AcQS/VF77RN87EScG70fmymhpuxaGzwWe\n6HVb9iQNTp/EaCCaWmBa2pDnWMhx82fYPM79IMI8OlL+U/O7KReNXmfXAoGAd+zS\nIRsRXUXKCZHvUZsh62H22cHmb6FQhHZTGVYIqH9CcBqCWCWu8Qk5d7I+0M4ZbeqG\nc93w/O+YpDyrD/FVSaM7u5HYZFbTMM5kB0cmMGvkIx1L98N2nvj4fZRKe1zey0Ju\n80jeblpO/ojLQKsHFmhzBff+H7hp/OTgIuHIFIUCgYBnJOe9xTMPKVYJs+YatAYe\nYxsVZ+8jGSNKkLVa61+xa12o0oFke2hDNfpvLxw7V9VTlRAYgQQHZQ3cauL9MKrn\n376AZ+CupRMZLXr+2cUaFai64/zBMiG1JmFZE8eNVMjwux7j8zBHqnTBfkvtlpt1\naiHPreiPWGH6UXeDM6mVWw==\n-----END PRIVATE KEY-----\n",
        clientEmail:
          "firebase-adminsdk-asflk@pulse-fitness-bfac0.iam.gserviceaccount.com",
    
      }),
    },
    "Test"
  );
export const auth = getAuth(firebaseApp);

export async function isUserAuthenticated(
  session: string | undefined = undefined
) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session, true));
    return !isRevoked;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!(await isUserAuthenticated(session))) {
    return null;
  }

  const decodedIdToken = await auth.verifySessionCookie(session!);
  const currentUser = await auth.getUser(decodedIdToken.uid);

  return { ...currentUser, role: "user" };
}

async function getSession() {
  try {
    return (await cookies()).get("__session")?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions
) {
  return auth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await auth.verifySessionCookie(session);

  return await auth.revokeRefreshTokens(decodedIdToken.sub);
}

export async function verifyCustomToken(token: string) {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying custom token:", error);
    return null;
  }
}

export async function verifyIdToken(idToken: string) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    
    return decodedToken;
  } catch (error) {
    console.error("Error verifying ID token:", error);
    throw error;
  }
}
