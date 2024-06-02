import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const BASE_PATH = "/api/auth";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "johnDoe@gmail.com",
        },
        username : {
            label : "username",
            type : "text", 
            placeholder : "JohnDoe"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter ur password",
        },
    
      },
      async authorize(credentials): Promise<User | null> {
        // const users = [
        //     {
        //         id : "test-user-1",
        //         userName : "test1",
        //         name : "Test 1",
        //         password : "pass",
        //         email : "test1@gmail.com"
        //     },
        //     {
        //         id : "test-user-2",
        //         userName : "test2",
        //         name : "Test 2",
        //         password : "pass",
        //         email : "test2@gmail.com"
        //     }
        // ];
        // const user = users.find(
        //     (user)=>
        //         user.userName === credentials.username &&
        //     user.password === credentials.password
        // )
        // return user
        //     ? {id : user.id , name : user.name,email : user.email } : null
        if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });
  
          if (user) {
            const validPassword = await bcrypt.compare(
              credentials.password as string,
              user.hashedPassword
            );
  
            if (validPassword) {
              return { id: user.id, name: user.username, email: user.email } as User;
            }
  
            return null;
          } else {
            const hashedPassword = await bcrypt.hash(credentials.password as string, 7);
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email as string,
                hashedPassword,
                username: credentials.username as string,
              },
            });
  
            if (newUser) {
              return { id: newUser.id, name: newUser.username, email: newUser.email } as User;
            }
          }
  
          return null;       
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
