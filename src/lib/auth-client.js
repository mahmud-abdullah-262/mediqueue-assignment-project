import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        jwtClient() // ইম্পোর্ট করতে হবে।
    ]
}

);
export const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

export const { signUp, signOut, useSession } = authClient;
