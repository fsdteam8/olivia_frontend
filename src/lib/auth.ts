import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";

// Extend the built-in types
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    isSurvey: boolean;
    profileImage: string | undefined;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      isSurvey: boolean;
      profileImage: string | undefined;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    isSurvey: boolean;
    profileImage: string | undefined;
    accessToken: string;
    refreshToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          const response = await res.json();

          if (!res.ok) {
            throw new Error(
              response?.message || response?.error || "Invalid credentials",
            );
          }

          // Access the nested data structure based on your response
          const { accessToken, refreshToken, user } = response?.data || {};
          if (!user?.id || !accessToken) {
            throw new Error("Invalid server response");
          }
          // Construct full name from firstName and lastName
          const fullName =
            `${user.firstName || ""} ${user.lastName || ""}`.trim();

          // Extract profile image if it exists in the image object
          let profileImage: string | undefined = undefined;
          if (user.image && typeof user.image === "object") {
            // Handle different possible image structures
            profileImage = user.image.url || user.image.path || undefined;
          } else if (typeof user.image === "string") {
            profileImage = user.image;
          }

          // Return the user object that matches the extended User type
          return {
            id: user.id,
            name: fullName || user.email, // Fallback to email if no name
            email: user.email,
            role: user.role,
            isSurvey: user.isSurvey,
            profileImage: profileImage,
            accessToken: accessToken,
            refreshToken: refreshToken,
          } as NextAuthUser;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Login failed");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.isSurvey = user.isSurvey;
        token.profileImage = user.profileImage;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        isSurvey: token.isSurvey as boolean,
        profileImage: token.profileImage as string | undefined,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
