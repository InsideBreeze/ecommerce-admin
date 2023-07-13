import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params } : { params: { storeId: string, billboardId: string } }
) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { storeId, billboardId } = params;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    if (!billboardId) {
        return new NextResponse("Billboard id is required", { status: 400 });
    }
    const { label, imageUrl } = await req.json();

    if (!label) {
        return new NextResponse("Name is required", { status: 400 })
    }
    if (!imageUrl) {
        return new NextResponse("Image url required", { status: 400 })
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
        const updatedBillboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId
            },
            data: {
                label,
                imageUrl
            }
        })
        console.log(updatedBillboard, "updatedStore");
        return NextResponse.json(updatedBillboard);
    } catch (err) {
        // Do something
        console.log("[PUT_BILLBOARD]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function DELETE(
    _req: Request,
    { params } : { params: { storeId: string, billboardId: string } }
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
        const result = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        })
        return NextResponse.json(result);
    } catch (err) {
        // Do something
        console.log("[DELETE_BILLBOARD]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}
