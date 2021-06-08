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
      !profile && (token.loggedIn = true); // объект профиль доступен только при логине,
      // проверка что этот вызов уже после логина

      return token;
    },
    session: async (session, token) => {
      session.user.userId = token.userId;
      if (token.loggedIn) {
        // Если пользователь залогинен проверям актуальность данных в базе
        const res = await fetch(
          `http://localhost:8000/api/users/${token.userId}`,
        );
        const data = await res.json();

        // Перезаписываем данные из базы в сессию
        session.user.name = data.data.name;
        session.user.image = data.data.avatar;
        session.user.about = data.data.about;

        return session;
      }

      return session;
    },
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email })
          .select('+password')
          .orFail(new Error('Пользователь не найден'));

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
