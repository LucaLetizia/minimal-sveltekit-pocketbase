<script lang="ts">
	import '../app.css';
	import { type Snippet } from 'svelte';
	import { setThemeState } from '$lib/states/theme.svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { page } from '$app/stores';
	setThemeState();
	let {
		children,
		data
	}: {
		children: Snippet;
		data: any[];
	} = $props();
</script>

<svelte:head>
	<title
		>{$page?.data?.title ? `${PUBLIC_APP_NAME} - ${$page?.data?.title}` : PUBLIC_APP_NAME}</title
	>
</svelte:head>
{@render children()}
