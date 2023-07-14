import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: {
        params: { storeId: string }
    }) {

    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }
    const { name, value } = await req.json();

    if (!name) {
        return new NextResponse("Size name is required", { status: 400 });
    }

    if (!value) {
        return new NextResponse("Size value is required", { status: 400 });
    }

    try {
        const createdSize = await prismadb.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        });
        return NextResponse.json(createdSize);
    } catch (err) {
        // Do something
        console.log("[POST_SIZES]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    _req: Request,
    { params }: {
        params: { storeId: string }
    }
) {
    const storeId = params.storeId;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    try {
        const sizes = await prismadb.size.findMany({
            where: {
                storeId
            }
        })
        return NextResponse.json(sizes);
    } catch (err) {
        // Do something
        console.log("[GET_SIZES]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}
