import { pageTitles } from '$lib/constants.js';

export const ssr = false;
export const prerender = false;

export const load = async ({ url }) => {
	return {
		title: pageTitles?.[url?.pathname] || ''
	};
};
