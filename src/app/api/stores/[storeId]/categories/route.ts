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
    const { billboardId, name } = await req.json();

    if (!billboardId) {
        return new NextResponse("Billboard id name is required", { status: 400 });
    }

    if (!name) {
        return new NextResponse("Name is required", { status: 400 });
    }

    try {
        const createdCategory = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });
        return NextResponse.json(createdCategory);
    } catch (err) {
        // Do something
        console.log("[POST_CATEGORIES]", err);
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
        const categories = await prismadb.category.findMany({
            where: {
                storeId
            }
        })
        return NextResponse.json(categories);
    } catch (err) {
        // Do something
        console.log("[GET_CATEGORIES]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}
