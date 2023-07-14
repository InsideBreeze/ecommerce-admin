import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params } : { params: { storeId: string, sizeId: string } }
) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { storeId, sizeId } = params;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    if (!sizeId) {
        return new NextResponse("Size id is required", { status: 400 });
    }
    const { name, value } = await req.json();

    if (!name) {
        return new NextResponse("Value name is required", { status: 400 })
    }
    if (!value) {
        return new NextResponse("Size value required", { status: 400 })
    }

    const storeByUser = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        }
    })

    if (!storeByUser) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    try {
        const updatedSize = await prismadb.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value
            }
        })
        return NextResponse.json(updatedSize);
    } catch (err) {
        // Do something
        console.log("[PUT_SIZE]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function DELETE(
    _req: Request,
    { params } : { params: { storeId: string, sizeId: string } }
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
        const result = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId
            }
        })
        return NextResponse.json(result);
    } catch (err) {
        // Do something
        console.log("[DELETE_SIZE]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function GET(
    _req: Request,
    { params }: {
        params: { storeId: string, sizeId: string }
    }
) {
    const { storeId, sizeId } = params;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    if (!sizeId) {
        return new NextResponse("Size id is required", { status: 400 });
    }


    try {
        const size = await prismadb.size.findFirst({
            where: {
                id: sizeId
            }
        })
        return NextResponse.json(size);
    } catch (err) {
        // Do something
        console.log("[GET_SIZE]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}
