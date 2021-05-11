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
      profile && (token.about = profile.about);
      return token;
    },
    session: async (session, user) => {
      // console.log('session: ', session, 'user: ', user);
      const res = await fetch('http://localhost:3000/api/users/me');
      // console.log(res);
      session.user.userId = user.userId;
      session.user.about = user.about;
      return session;
    },
    // session: async (session) => {
    //   const newSession = session;

    //   const res = await fetch('http://localhost:3000/api/users/me');
    //   // if (res.status === 200) {
    //   //   const user = await res.json();
    //   //   newSession.user.name = user.name;
    //   // }
    //   console.log(res);
    //   return Promise.resolve(newSession);
    // },
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
          about: user.about,
        };
      },
    }),
  ],
});
