import { NEXT_PUBLIC_API_URL } from '@/config';
import { Billboard } from '@/types';
import axios from 'axios';

const URL = `${NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard> => {
	const { data } = await axios.get(`${URL}/${id}`);

	return data;
};

export default getBillboard;
