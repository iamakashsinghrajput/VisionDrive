import NextAuth, { SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials.password) {
          throw new Error('Please enter an email and password');
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error('No user found with this email');
        }

        if (!user.emailVerified) {
          throw new Error('Please verify your email address first.');
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
          throw new Error('Incorrect password');
        }

        const userObj = user.toObject();
        return {
          id: String(userObj._id),
          name: userObj.name,
          firstName: userObj.firstName,
          lastName: userObj.lastName,
          email: userObj.email,
          emailVerified: userObj.emailVerified,
          image: userObj.image,
          password: userObj.password,
          otp: userObj.otp,
          otpExpires: userObj.otpExpires,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
