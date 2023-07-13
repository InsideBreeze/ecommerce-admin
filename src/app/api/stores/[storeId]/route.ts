import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params } : { params: { storeId: string } }
) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const storeId = params.storeId;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }
    const { name } = await req.json();

    if (!name) {
        return new NextResponse("Name is required", { status: 400 })
    }

    const storeByUser = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!storeByUser) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    try {
        const updatedStore = await prismadb.store.updateMany({
            where: {
                id: params.storeId
            },
            data: {
                name
            }
        })
        console.log(updatedStore, "updatedStore");
        return NextResponse.json(updatedStore);
    } catch (err) {
        // Do something
        console.log("[PUT STORE]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function DELETE(
    _req: Request,
    { params } : { params: { storeId: string } }
) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const storeId = params.storeId;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUser = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!storeByUser) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    try {
        const updatedStore = await prismadb.store.deleteMany({
            where: {
                id: params.storeId
            }
        })
        return NextResponse.json(updatedStore);
    } catch (err) {
        // Do something
        console.log("[DELETE_STORE]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}
