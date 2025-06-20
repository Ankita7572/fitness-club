import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { cookies } from "next/headers";
import { getAuth, SessionCookieOptions } from "firebase-admin/auth";

export const firebaseApp =
  getApps().find((it) => it.name === "Test") ||
  initializeApp(
    {
      credential: cert({
        projectId:process.env.NEXT_PUBLIC_PROJECT_ID,
        privateKey:process.env.NEXT_PUBLIC_PRIVATE_KEY,
        clientEmail:process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    
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
