import type {
	Product as dbProduct,
	Category as dbCategory,
	Billboard as dbBillboard,
	Size as dbSize,
	Color as dbColor,
} from '@prisma/client';

export type Product = dbProduct & {
	category: Category;
	size: Size;
	color: Color;
};

export type Category = dbCategory & {
	billboard: Billboard;
};

export type Billboard = dbBillboard;
export type Color = dbColor;
export type Size = dbSize;
