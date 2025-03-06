import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

interface ExtendedUser {
    id: string;
    email: string;
    name: string;
    accessToken: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const response = await fetch("http://localhost:5000/api/auth/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Invalid credentials");
                }

                return {
                    id: data.userId,
                    email: data.email,
                    name: data.fullName,
                    accessToken: data.token,
                } as ExtendedUser;
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const extendedUser = user as ExtendedUser;
                token.id = extendedUser.id;
                token.name = extendedUser.name;
                token.email = extendedUser.email;
                token.accessToken = extendedUser.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    id: token.id as string,
                    name: token.name,
                    email: token.email,
                    accessToken: token.accessToken,
                },
            };
        },
    },    
});
