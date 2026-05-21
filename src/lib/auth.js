import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { client, db } from "./mongodb";
import { jwt } from "better-auth/plugins";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    transaction: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
      
      google: { 
    clientId: process.env.GOOGLE_CLIENT_ID , 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
}, 
  },
session: {
    cookieCache: {
      enabled: true,
	 
      maxAge: 7 * 24 * 60 * 60,
    }
  },

  plugins: [
    nextCookies(), 
    jwt() 
  ],
});


