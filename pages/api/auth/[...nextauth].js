import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import User from "../../../backend/models/userModel";
import dbConnect from "../../../backend/config/dbConnect";
import { comparePassword } from "../../../backend/utils/authHelpers";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",

      async authorize(credentials) {
        dbConnect();
        const { email, password } = credentials;

        // Check if email and password is entered
        if (!email || !password) {
          throw new Error("Please enter email or password");
        }

        // Find user in the database
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        // Check if password is correct or not
        // const isPasswordMatched = await user.comparePassword(password);

        const isPasswordMatched = await comparePassword(
          password,
          user.password
        );
        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }
        user.password = undefined;
        user.posts = undefined;
        return user;
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // token.id = user.id;
        // token.role = user.role;
        token.user = user;
      }

      token.posts = undefined;
      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        // session.id = token.id;
        // session.role = token.role;
        // session.username = token.username;
        session.user = token.user;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    auth: "auth",
  },
});
