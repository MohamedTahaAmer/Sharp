import { clsx, type ClassValue } from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

const formatDistanceLocale = {
	lessThanXSeconds: 'just now',
	xSeconds: 'just now',
	halfAMinute: 'just now',
	lessThanXMinutes: '{{count}}m',
	xMinutes: '{{count}}m',
	aboutXHours: '{{count}}h',
	xHours: '{{count}}h',
	xDays: '{{count}}d',
	aboutXWeeks: '{{count}}w',
	xWeeks: '{{count}}w',
	aboutXMonths: '{{count}}m',
	xMonths: '{{count}}m',
	aboutXYears: '{{count}}y',
	xYears: '{{count}}y',
	overXYears: '{{count}}y',
	almostXYears: '{{count}}y',
};

function formatDistance(token: string, count: number, options?: any): string {
	options = options || {};

	const result = formatDistanceLocale[
		token as keyof typeof formatDistanceLocale
	].replace('{{count}}', count.toString());

	if (options.addSuffix) {
		if (options.comparison > 0) {
			return result + ' ago';
		} else {
			if (result === 'just now') return result;
			return result + ' ago';
		}
	}

	return result;
}

export function formatTimeToNow(date: Date): string {
	return formatDistanceToNowStrict(date, {
		addSuffix: true,
		locale: {
			...locale,
			formatDistance,
		},
	});
}

export function delay(i: number) {
	return new Promise((resolve) => setInterval(() => resolve(i), i));
}

export function generateArray(n: number): number[] {
	const result: number[] = [];

	for (let i = 1; i <= n; i++) {
		result.push(i);
	}

	return result;
}

export function isUUID(input: string): boolean {
	// this will be used to check the id we get from the url is UUID before using it to query the db
	const uuidPattern =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidPattern.test(input);
}

export function arrRemoveValue<T>(value: T, arr: T[]): T[] {
	const index = arr.indexOf(value);

	if (index !== -1) {
		arr.splice(index, 1);
	}

	return arr;
}

export function shuffleArray<T>(array: T[]): T[] {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

export const posts = [
	{ id: 1, title: 'Post 1-1' },
	{ id: 2, title: 'Post 2-2' },
	{ id: 3, title: 'Post 3-3' },
	{ id: 4, title: 'Post 4-4' },
];
