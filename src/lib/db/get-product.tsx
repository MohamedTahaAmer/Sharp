import { Product } from '@/types';
import { NEXT_PUBLIC_API_URL } from '@/config';
import axios from 'axios';

const URL = `${NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
	console.log(`${URL}/${id}`);
	const { data } = await axios.get(`${URL}/${id}`);

	return data;
};

export default getProduct;
