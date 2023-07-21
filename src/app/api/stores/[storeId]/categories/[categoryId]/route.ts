import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params } : { params: { storeId: string, categoryId: string } }
) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { storeId, categoryId } = params;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    if (!categoryId) {
        return new NextResponse("Category id is required", { status: 400 });
    }
    const { name, billboardId } = await req.json();

    if (!name) {
        return new NextResponse("Name is required", { status: 400 })
    }
    if (!billboardId) {
        return new NextResponse("Image url required", { status: 400 })
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
        const updatedCategory = await prismadb.category.updateMany({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                billboardId
            }
        })
        return NextResponse.json(updatedCategory);
    } catch (err) {
        // Do something
        console.log("[PUT_CATEGORY]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function DELETE(
    _req: Request,
    { params } : { params: { storeId: string, categoryId: string } }
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
        const result = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId
            }
        })
        return NextResponse.json(result);
    } catch (err) {
        // Do something
        console.log("[DELETE_CATEGORY]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}


export async function GET(
    _req: Request,
    { params }: {
        params: { storeId: string, categoryId: string }
    }
) {
    const { storeId, categoryId } = params;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    if (!categoryId) {
        return new NextResponse("Category id is required", { status: 400 });
    }


    try {
        const category = await prismadb.category.findFirst({
            where: {
                id: categoryId
            },
            include: {
                billboard: true
            }
        })
        return NextResponse.json(category);
    } catch (err) {
        // Do something
        console.log("[GET_CATEGORY]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}
