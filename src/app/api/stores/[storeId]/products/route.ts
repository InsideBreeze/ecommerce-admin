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
        const createdProduct = await prismadb.product.create({
            data: {
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                isArchived,
                isFeatured,
                images: {
                    createMany: {
                        data: images.map((image: { url: string }) => image)
                    }
                },
                storeId: params.storeId
            }
        });
        return NextResponse.json(createdProduct);
    } catch (err) {
        // Do something
        console.log("[POST_PRODUCTS]", err);
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

    const { searchParams } = new URL(_req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured")

    try {
        const products = await prismadb.product.findMany({
            where: {
                storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                color: true,
                category: true,
                size: true,
                images: true
            }
        })
        return NextResponse.json(products);
    } catch (err) {
        // Do something
        console.log("[GET_PRODUCTS]", err);
        return new NextResponse("Internal error", { status: 500 });
    }

}
