import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { cookies } from "next/headers";
import { getAuth, SessionCookieOptions } from "firebase-admin/auth";

export const firebaseApp =
  getApps().find((it) => it.name === "Test") ||
  initializeApp(
    {
      credential: cert({
        projectId: "fitness-club-29c91",
        privateKey:
         "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDTikohmLpVXKj9\n33Mjg/FzFJBEQG5MwA5u6mis8TDmL76RVC0mTh35S5v2WezHAO/Zq19qQLw+EGuw\nyVnV70VJXxEerFVQX6eKubGL8Z36nACpuS37XjbGeb/ffHTpVQNpApWk2yrgtjYX\n3CESAYmQv5PMJvZkjXPXCG4/sIkDgWqbgzLp3O4QQG/gRzx2oo6RK1cf6Ie+EBBq\nLa0kk5gcShcmh8T+lsaqc4cHG1GYtSR3E2O+n25uZYsewRTDv7TU0A2YG5cZL9AA\nmoB+DtBQhX1zHbHaFj0gfQ7cDXGIuVh2a1pK9n61nzE5nBTRXkT8m9Ta5VIG8h65\nuz9zHTfJAgMBAAECggEALZDmdnWsP2pp8WOCLOaFKh2GFNmPGMOu6Dfga845Uv/6\nS9omro9ZmAMwGWDV5qjeQVQPhbbjhXfqhoZcrj8vvMX4TVPgPaOZFoH4y1T0i1Cy\nuNxtWe25nUeI68YmdcNM7H/0xXG7OvOs07dkPTltDSujFbDX1qF8kBdeDiSD4ufH\nPlhmym6c6DBMRATPDvZJYV7/rdf2F3ja2kqYF9sWod7wXVPzuND8Wxl1VnF8+9w6\nQPsOoGO8Q1+tF4twDUSH6aMM7pBx6GpjYmc2j+dzjbGg+5WR4YTtS3u5qwx7iC/5\ngzbPjseIqKTbWHisTguu+AOTOxyVZBGgOF5fzi9fTQKBgQD8W40OIvnk8LdA1Hsf\nhrs99JbqRTnxGQ8n6ugUI1VOQHZcLcxJUKxat/ilxwQoikBHArliJcF5GpAvfl+e\nOMMWw3H798s+q0QT2aqgKwbi0iZvAZhF/2eqPEygNO7rrvJmbcK2eBy7pLSNQkj4\ns9ZYX8PpSGk3TIp+stPqMcEhjQKBgQDWl+uRnAhDnXLu/5dprpA0RzbBUYYXPe7B\nFEZbXLOIX6CRlqH1Ot3kY+7GJB3cxZ/kPyKEbenY4//IvysCCxLdfXs8pxpYkWLz\nPnEr1rgE1ICVeTa6MrgiUGkwwBQgNC1rd82+IW9M0SMl0jrvovXOLe6f6pE9d23m\nIDxd9EoaLQKBgQC850NFi8UILXDf5K5twQs0q3y0zTE8WwfPV7Z2LKTUuMhg5B+B\n2hPKrOBCKCHivuqyvUVMRPr4znuUMcMdy1uuFIukk67esJF7Unq4/rxe2fTPL6Bu\n9WsCMbUiT71xSzpElnEk6fCIPhixjSbWlLgk2zrpy7yHGpKpmO+s5aWumQKBgHLc\nuFulIAtJEIb6ygnoRQmmgJlzUInKPayddJdchEBfpyumbCQ+ER05nEn0dQOByHa8\nkHY/+uZ8C6JhKN0cHknt63PoocJ8d3Fpn9vuP2teb0ESs4dwtHyxe8x7U4p1Q0Z9\nxuOZM+DzJJQO9jrkiBuHHG3+eSVkcq+123oS00M1AoGBALnuJp36dp14bmODwmNv\ndJT8PTl9PTtfUr2lmJ+UvwVbViR7nH3RMANmNOGN69OcF7xZ5ELVZRj9BE8iUQV3\ncKASFde7DgG6f7HpH3nJwBN0KFQW2nCKT/drNhrPOCPBaxvt41cnJgYfTP3X6rDP\nHIzLHp8cpxx/7l665z/zvgHe\n-----END PRIVATE KEY-----\n",
        clientEmail:
          "firebase-adminsdk-2akej@fitness-club-29c91.iam.gserviceaccount.com",
    
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
