<script lang="ts">
	import MdiWarningOutline from '~icons/mdi/warning-outline';
	import MdiInformationOutline from '~icons/mdi/information-outline';
	import MdiErrorOutline from '~icons/mdi/error-outline';
	import MdiTickCircleOutline from '~icons/mdi/tick-circle-outline';

	type Props = {
		type: string;
		message: string;
	};
	let { type, message }: Props = $props();
</script>

<div
	role="alert"
	class="alert flex items-center"
	class:alert-info={type === 'info'}
	class:alert-success={type === 'success'}
	class:alert-error={type === 'error'}
	class:alert-warning={type === 'warning'}
>
	{#if type === 'info'}
		<MdiInformationOutline></MdiInformationOutline>
	{/if}
	{#if type === 'success'}
		<MdiTickCircleOutline></MdiTickCircleOutline>
	{/if}
	{#if type === 'error'}
		<MdiErrorOutline></MdiErrorOutline>
	{/if}
	{#if type === 'warning'}
		<MdiWarningOutline></MdiWarningOutline>
	{/if}
	<span>{message}</span>
</div>
