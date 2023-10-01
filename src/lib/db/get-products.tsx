import { NEXT_PUBLIC_API_URL } from '@/config';
import { Product } from '@/types';
import axios from 'axios';
import qs from 'query-string';

const URL = `${NEXT_PUBLIC_API_URL}/products`;

interface Query {
	categoryId?: string;
	colorId?: string;
	sizeId?: string;
	isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
	const url = qs.stringifyUrl({
		url: URL,
		query: {
			colorId: query.colorId,
			sizeId: query.sizeId,
			categoryId: query.categoryId,
			isFeatured: query.isFeatured,
		},
	});
	console.log(url);

	const { data } = await axios.get(url);
	console.log(data.length);

	return data;
};

export default getProducts;
