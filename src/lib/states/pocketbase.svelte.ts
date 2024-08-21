import PocketBase from 'pocketbase';
import { getContext, setContext } from 'svelte';
import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';

export class PocketBaseInstance {
	pb = $state(new PocketBase(PUBLIC_POCKETBASE_HOST));
}

const POCKETBASE_KEY = Symbol('POCKETBASE');

export function setPocketBaseInstance() {
	return setContext(POCKETBASE_KEY, new PocketBaseInstance());
}

export function getPocketBaseInstance() {
	return getContext<ReturnType<typeof setPocketBaseInstance>>(POCKETBASE_KEY);
}
