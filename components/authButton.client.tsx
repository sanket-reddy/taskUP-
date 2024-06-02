import Link from "next/link";
import { auth } from "@/auth";

export default async function AuthButtonClient() {
  const session = await auth();
    if(session){
      return <Link href= "/api/auth/signout">
        <button className="btn btn-active btn-primary">{session.user?.name} : Log out</button>
      </Link>
    }
    else{
      return <Link href = "/api/auth/signin">
        <button className="btn btn-primary btn-active">Login</button>
        
      </Link>
    }


}
