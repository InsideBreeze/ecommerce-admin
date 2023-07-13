import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }
    const { name } = await req.json();

    if (!name) {
        return new NextResponse("Strore name is required", { status: 400 });
    }

    try {
        const createdStore = await prismadb.store.create({
            data: {
                userId,
                name
            }
        });
        return NextResponse.json(createdStore);
    } catch (err) {
        // Do something
        console.log("[POST_STORES]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}
