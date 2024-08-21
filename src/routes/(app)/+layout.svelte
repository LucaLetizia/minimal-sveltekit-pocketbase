<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import { setPocketBaseInstance, getPocketBaseInstance } from '$lib/states/pocketbase.svelte';
	import { setNotificationsState } from '$lib/states/notifications.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import BottomNavigation from '$lib/components/BottomNavigation.svelte';

	setPocketBaseInstance();
	setNotificationsState();
	const { pb } = getPocketBaseInstance();

	pb.authStore.onChange(async (token, model) => {
		if (!token) await goto('/');
	});
	onMount(async () => {
		try {
			// validate server-side the auth state
			pb.authStore.isValid && (await pb.collection('users').authRefresh());
		} catch (error) {
			pb.authStore.clear();
		}

		if (!pb.authStore.isValid) {
			await goto('/');
		}
	});
	let {
		children,
		data
	}: {
		children: Snippet;
		data: any[];
	} = $props();
</script>

{#if pb.authStore.isValid}
	<div class="flex flex-col min-h-screen">
		<Navbar></Navbar>
		{@render children()}
		<BottomNavigation></BottomNavigation>
	</div>
{/if}
