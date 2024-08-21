<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		id: string;
		isDrawerOpen: boolean;
		optionSnippet: Snippet;
		overlaySnippet: Snippet;
	};
	let { id, isDrawerOpen, optionSnippet, overlaySnippet }: Props = $props();
</script>

<div class="drawer drawer-end z-50">
	<input {id} type="checkbox" class="drawer-toggle" bind:checked={isDrawerOpen} />
	<div class="drawer-content"></div>
	<div class="drawer-side">
		{@render overlaySnippet()}
		<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
			{@render optionSnippet()}
		</ul>
	</div>
</div>
