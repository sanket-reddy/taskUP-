import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const PUT = async (request: Request) => {
  try {
    console.log("the handler has been reached")
    let { email } = await request.json();
    let tasks = await prisma.task.findMany({
      where: { userEmail: email, finished: false },
    });
    if (tasks) {
      return NextResponse.json({ message: "fetched", status: 200, tasks });
    }
    return NextResponse.json({ message: "no tasks found", status: 200 });
  } catch (error) {
    console.log("an error has occured here :  ", error);
    return NextResponse.json({ message: "an error has occured ", error });
  }
};
