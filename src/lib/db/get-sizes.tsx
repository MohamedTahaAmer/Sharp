import { Size } from '@/types';
import { NEXT_PUBLIC_API_URL } from '@/config';
import axios from 'axios';

const URL = `${NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
	const { data } = await axios.get(URL);

	return data;
};

export default getSizes;
