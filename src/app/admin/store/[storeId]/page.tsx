import { CreditCard, DollarSign, Package } from 'lucide-react';

import { Overview } from '@/components/Overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { formatter, isUUID } from '@/lib/utils';
import { getGraphRevenue } from '@/lib/utils/db/get-graph-revenue';
import { getSalesCount } from '@/lib/utils/db/get-sales-count';
import { getStockCount } from '@/lib/utils/db/get-stock-count';
import { getTotalRevenue } from '@/lib/utils/db/get-total-revenue';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
	params: {
		storeId: string;
	};
}

const DashboardPage = async ({ params }: Props) => {
	if (!isUUID(params.storeId)) redirect('/admin');

	const totalRevenue = await getTotalRevenue(params.storeId);
	const graphRevenue = await getGraphRevenue(params.storeId);
	const salesCount = await getSalesCount(params.storeId);
	const stockCount = await getStockCount(params.storeId);

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 px-8 pt-6'>
				<Heading title='Dashboard' description='Overview of your store' />
				<Separator />
				<div className='grid grid-cols-3 gap-4'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Total Revenue
							</CardTitle>
							<DollarSign className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>
								{formatter.format(totalRevenue)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Sales</CardTitle>
							<CreditCard className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>+{salesCount}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Products In Stock
							</CardTitle>
							<Package className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{stockCount}</div>
						</CardContent>
					</Card>
				</div>
				<Card className='col-span-4'>
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent className='pl-2'>
						<Suspense fallback='Loading...'>
							<Overview data={graphRevenue} />
						</Suspense>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default DashboardPage;
