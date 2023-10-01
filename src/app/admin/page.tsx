import ShowStoreModal from '@/components/ShowStoreModal';
import { db } from '@/lib/db';
import { getUserId } from '@/lib/utils/serverOnly';
import { redirect } from 'next/navigation';

const Page = async () => {
	const userId = await getUserId();

	const store = await db.store.findFirst({
		where: {
			userId,
		},
	});

	if (store) {
		// - this redirection on the home page, depends on db call, so we can't or we shouldn't make it from the middleware
		redirect(`/admin/store/${store.id}`);
	}

	return <ShowStoreModal />;
};

export default Page;
