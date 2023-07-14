import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params } : { params: { storeId: string, colorId: string } }
) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { storeId, colorId } = params;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    if (!colorId) {
        return new NextResponse("Color id is required", { status: 400 });
    }
    const { name, value } = await req.json();

    if (!name) {
        return new NextResponse("Value name is required", { status: 400 })
    }
    if (!value) {
        return new NextResponse("Color value required", { status: 400 })
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
        const updatedColor = await prismadb.color.updateMany({
            where: {
                id: params.colorId
            },
            data: {
                name,
                value
            }
        })
        return NextResponse.json(updatedColor);
    } catch (err) {
        // Do something
        console.log("[PUT_COLOR]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function DELETE(
    _req: Request,
    { params } : { params: { storeId: string, colorId: string } }
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
        const result = await prismadb.color.deleteMany({
            where: {
                id: params.colorId
            }
        })
        return NextResponse.json(result);
    } catch (err) {
        // Do something
        console.log("[DELETE_COLOR]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}


export async function GET(
    _req: Request,
    { params }: {
        params: { storeId: string, colorId: string }
    }
) {
    const { storeId, colorId } = params;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    if (!colorId) {
        return new NextResponse("Color id is required", { status: 400 });
    }


    try {
        const color = await prismadb.color.findFirst({
            where: {
                id: colorId
            }
        })
        return NextResponse.json(color);
    } catch (err) {
        // Do something
        console.log("[GET_COLOR]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}
