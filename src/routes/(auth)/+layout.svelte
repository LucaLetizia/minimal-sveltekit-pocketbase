<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import { setPocketBaseInstance, getPocketBaseInstance } from '$lib/states/pocketbase.svelte';

	setPocketBaseInstance();
	const { pb } = getPocketBaseInstance();
	pb.authStore.onChange(async (token, record) => {
		if (token) await goto('/home');
	});
	onMount(async () => {
		try {
			// validate server-side the auth state
			pb.authStore.isValid && (await pb.collection('users').authRefresh());
		} catch (error) {
			pb.authStore.clear();
		}

		if (pb.authStore.isValid) {
			await goto('/home');
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

{#if !pb.authStore.isValid}
	<div class="flex min-h-screen flex-col">
		<div class="flex flex-grow items-center justify-center bg-base-200">
			{@render children()}
		</div>
	</div>
{/if}
