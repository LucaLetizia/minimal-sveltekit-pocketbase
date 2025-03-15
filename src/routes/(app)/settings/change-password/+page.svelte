<script lang="ts">
	import MdiArrowLeft from '~icons/mdi/arrow-left';

	import { getPocketBaseInstance } from '$lib/states/pocketbase.svelte';
	import Alert from '$lib/components/Alert.svelte';

	const { pb } = getPocketBaseInstance();

	let alertType = $state('');
	let alertMessage = $state('');

	const handleChangePasswordClick = async () => {
		try {
			await pb.collection('users').requestPasswordReset(pb.authStore.record?.email);
			alertType = 'success';
			alertMessage = 'Please check your inbox.';
		} catch (e) {
			alertType = 'error';
			alertMessage = (e as Error)?.message;
		}
	};
</script>

<div class="flex flex-grow items-center justify-center">
	<div class="container mx-auto p-4">
		<div
			class="card mx-auto max-w-md bg-base-100
        p-6 shadow-xl lg:rounded-lg"
		>
			<a href="/settings" class="btn btn-circle btn-ghost text-left text-xl"
				><MdiArrowLeft></MdiArrowLeft></a
			>
			<h2 class="mb-4 text-center text-2xl font-bold">Change Password</h2>
			<p class="mb-4 text-center">
				Upon clicking the "Change Password" button, you'll receive an email with a link to update
				your password.
			</p>
			{#if alertType && alertMessage}
				<div class="mb-4">
					<Alert type={alertType} message={alertMessage}></Alert>
				</div>
			{/if}
			<div class="text-center">
				<button class="btn btn-primary min-w-full" onclick={handleChangePasswordClick}
					>Change Password</button
				>
			</div>
		</div>
	</div>
</div>
