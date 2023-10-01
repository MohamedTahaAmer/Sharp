import { getHeaders } from './lib/utils/serverOnly';

const { host } = getHeaders();
console.log(host);
const http = host.includes('localhost') ? 'http://' : 'https://';
const url = http + host + '/api/573ae13b-576a-48e4-9a04-d8d029024ac6';
export const NEXT_PUBLIC_API_URL = url;
