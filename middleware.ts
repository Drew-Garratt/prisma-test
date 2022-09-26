import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      if (req.method === "PUT" || req.method === "PURGE") return true;
      // `/api/reports` or `/reports` requires login
      return !!token;
    },
  },
});

export const config = { matcher: ["/reports/:path*"] };
