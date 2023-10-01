import { Category } from '@/types';
import { NEXT_PUBLIC_API_URL } from '@/config';
import axios from 'axios';

const getCategories = async (): Promise<Category[]> => {
	const URL = `${NEXT_PUBLIC_API_URL}/categories`;
	const { data } = await axios.get(URL);
	return data;
};

export default getCategories;
