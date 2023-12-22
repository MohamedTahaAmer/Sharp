import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { getUserIdNotProtected } from "@/lib/utils/serverOnly"

export async function GET(
	req: Request,
	{ params }: { params: { productId: string } },
) {
	console.log("\x1b[31m%s\x1b[0m", "in")
	try {
		if (!params.productId) {
			return new NextResponse("Product id is required", { status: 400 })
		}

		const product = await db.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				category: true,
				size: true,
				color: true,
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log("[PRODUCT_GET]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { productId: string; storeId: string } },
) {
	try {
		const userId = await getUserIdNotProtected()

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 403 })
		}

		if (!params.productId) {
			return new NextResponse("Product id is required", { status: 400 })
		}

		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		})

		if (!storeByUserId) {
			return new NextResponse("Unauthorized", { status: 405 })
		}

		const product = await db.product.delete({
			where: {
				id: params.productId,
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log("[PRODUCT_DELETE]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { productId: string; storeId: string } },
) {
	try {
		const userId = await getUserIdNotProtected()

		const body = await req.json()

		const {
			name,
			price,
			categoryId,
			imageUrls,
			colorId,
			sizeId,
			isFeatured,
			isArchived,
		} = body

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 403 })
		}

		if (!params.productId) {
			return new NextResponse("Product id is required", { status: 400 })
		}

		if (!name) {
			return new NextResponse("Name is required", { status: 400 })
		}

		if (!imageUrls || !imageUrls.length) {
			return new NextResponse("Images are required", { status: 400 })
		}

		if (!price) {
			return new NextResponse("Price is required", { status: 400 })
		}

		if (!categoryId) {
			return new NextResponse("Category id is required", { status: 400 })
		}

		if (!colorId) {
			return new NextResponse("Color id is required", { status: 400 })
		}

		if (!sizeId) {
			return new NextResponse("Size id is required", { status: 400 })
		}

		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		})

		if (!storeByUserId) {
			return new NextResponse("Unauthorized", { status: 405 })
		}

		const product = await db.product.update({
			where: {
				id: params.productId,
			},
			data: {
				name,
				price,
				categoryId,
				colorId,
				sizeId,
				imageUrls,
				isFeatured,
				isArchived,
			},
		})

		return NextResponse.json(product)
	} catch (error) {
		console.log("[PRODUCT_PATCH]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
