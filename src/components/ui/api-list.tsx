'use client';

import { ApiAlert } from '@/components/ui/api-alert';
import { useParams } from 'next/navigation';

interface ApiListProps {
	name: string;
	id: string;
	host: string;
}

export const ApiList: React.FC<ApiListProps> = ({ name, id, host }) => {
	const params = useParams();

	const baseUrl = `${host}/api/${params.storeId}`;

	return (
		<>
			<ApiAlert
				title='GET'
				variant='public'
				description={`${baseUrl}/${name}`}
			/>
			<ApiAlert
				title='GET'
				variant='public'
				description={`${baseUrl}/${name}/[${id}]`}
			/>
			<ApiAlert
				title='POST'
				variant='admin'
				description={`${baseUrl}/${name}`}
			/>
			<ApiAlert
				title='PATCH'
				variant='admin'
				description={`${baseUrl}/${name}/[${id}]`}
			/>
			<ApiAlert
				title='DELETE'
				variant='admin'
				description={`${baseUrl}/${name}/[${id}]`}
			/>
		</>
	);
};
