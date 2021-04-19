import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { checkPassword } from '../../../helpers/auth';
import connectDB from '../../../middleware/mongodb';
import User from '../../../models/user';

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt(token, profile) {
      profile && (token.userId = profile.userId);

      return token;
    },
    session: async (session, user) => {
      session.user.userId = user.userId;

      return session;
    },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email })
          .select('+password')
          .orFail(new Error('user not found'));

        const isValidPassword = await checkPassword(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) {
          throw new Error('Неправильные почта или пароль');
        }

        return {
          name: user.name,
          email: user.email,
          image: user.avatar,
          userId: user._id,
        };
      },
    }),
  ],
});
