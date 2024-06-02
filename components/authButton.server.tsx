import { SessionProvider } from "next-auth/react";
import AuthButtonClient from "./authButton.client";
import { BASE_PATH, auth } from "@/auth";

export default async function AuthButton (){
    const session = await auth();
    if(session && session.user){
        session.user = {
            name  : session.user.name,
            email  : session.user.email
        }
    }
    return <SessionProvider session={session} basePath={BASE_PATH}>
        <AuthButtonClient></AuthButtonClient>
    </SessionProvider>
}