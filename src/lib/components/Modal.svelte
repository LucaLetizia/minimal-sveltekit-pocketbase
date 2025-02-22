<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		dialogRef: HTMLDialogElement | undefined;
		id: string;
		title: string;
		description?: string;
		orientation?: string;
		dismissable?: boolean;
		bodySnippet?: Snippet;
		actionSnippet?: Snippet;
		onClose?: () => void;
	};
	let {
		dialogRef = $bindable(),
		id,
		title,
		description,
		orientation,
		dismissable,
		bodySnippet,
		actionSnippet,
		onClose = () => {}
	}: Props = $props();
</script>

<dialog
	{id}
	class="modal"
	class:modal-top={orientation === 'top'}
	class:modal-bottom={orientation === 'bottom'}
	bind:this={dialogRef}
	onclose={onClose}
>
	<div class="modal-box">
		{#if dismissable}
			<form method="dialog">
				<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
			</form>
		{/if}

		<h3 class="text-lg font-bold">{title}</h3>
		<p class="py-4">{description}</p>
		{#if bodySnippet}
			{@render bodySnippet()}
		{/if}
		<div class="modal-action">
			{#if actionSnippet}
				{@render actionSnippet()}
			{/if}
		</div>
	</div>
	{#if dismissable}
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	{/if}
</dialog>
