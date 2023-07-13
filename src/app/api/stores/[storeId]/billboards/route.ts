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
    const { label, imageUrl } = await req.json();

    if (!label) {
        return new NextResponse("Strore name is required", { status: 400 });
    }

    if (!imageUrl) {
        return new NextResponse("Image url is required", { status: 400 });
    }

    try {
        const createdBillboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });
        return NextResponse.json(createdBillboard);
    } catch (err) {
        // Do something
        console.log("[POST_BILLBOARDS]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}
