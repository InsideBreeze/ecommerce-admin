import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PUT(
    req: Request,
    { params }: {
        params: { storeId: string, productId: string }
    }) {

    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { name, price, categoryId, sizeId, colorId, isFeatured, isArchived, images } = await req.json();

    if (!params.storeId) {
        return new NextResponse("Store id is required")
    }

    if (!name) {
        return new NextResponse("Product name is required", { status: 400 });
    }

    if (!price) {
        return new NextResponse("Product price is required", { status: 400 });
    }
    if (!categoryId) {
        return new NextResponse("Product category id is required", { status: 400 });
    }

    if (!sizeId) {
        return new NextResponse("Product size id is required", { status: 400 });
    }
    if (!colorId) {
        return new NextResponse("Product color id is required", { status: 400 });
    }

    if (!images || !images.length) {
        return new NextResponse("Images is required", { status: 400 });
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
        await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                isArchived,
                isFeatured,
                images: {
                    deleteMany: {}
                },
                storeId: params.storeId
            }
        });

        const product = await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                images: {
                    createMany: {
                        data: images.map((image: { url: string}) => image)
                    }
                }
            }
        })
        return NextResponse.json(product);
    } catch (err) {
        // Do something
        console.log("[UPDATE_PRODUCT]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}



export async function DELETE(
    _req: Request,
    { params } : { params: { storeId: string, productId: string } }
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
        const result = await prismadb.product.deleteMany({
            where: {
                id: params.productId
            }
        })
        return NextResponse.json(result);
    } catch (err) {
        // Do something
        console.log("[DELETE_PRODUCT]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function GET(
    _req: Request,
    { params }: {
        params: { storeId: string, productId: string }
    }
) {
    const { storeId, productId } = params;

    if (!storeId) {
        return new NextResponse("Store id is required", { status: 400 });
    }

    if (!productId) {
        return new NextResponse("Product id is required", { status: 400 });
    }

    try {
        const product = await prismadb.product.findFirst({
            where: {
                id: productId
            },
            include: {
                images: true,
                color: true,
                size: true,
                category: true
            }
        })
        return NextResponse.json(product);
    } catch (err) {
        // Do something
        console.log("[GET_PRODUCT]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}
