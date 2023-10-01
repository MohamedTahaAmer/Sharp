import { Color } from '@/types';
import { NEXT_PUBLIC_API_URL } from '@/config';
import axios from 'axios';

const URL = `${NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[]> => {
	const { data } = await axios.get(URL);

	return data;
};

export default getColors;
