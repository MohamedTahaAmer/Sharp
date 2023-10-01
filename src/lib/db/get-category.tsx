import { Category } from '@/types';
import { NEXT_PUBLIC_API_URL } from '@/config';
import axios from 'axios';

const URL = `${NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category> => {
	const {data} = await axios.get(`${URL}/${id}`);

	return data
};

export default getCategory;
