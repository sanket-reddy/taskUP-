import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface reqType {
  title: string;
  description: string;
  time: string;
  email: string;
}

export const POST = async (req: Request) => {
  try {
    let { title, description, time, email }: reqType = await req.json();
    const task = await prisma.task.create({
      data: { title, description, deadLine: time, userEmail :email, finished : false },
    });
    if (task) {
      return NextResponse.json({ message: "added", status: 200 });
    }
    return NextResponse.json({ message: "unsucessful", status: 400 });
  } catch (error) {
    console.log("An error has occured : ", error);
    return NextResponse.json({ status: 400, error });
  }
};
