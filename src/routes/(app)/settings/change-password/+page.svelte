<script lang="ts">
	import MdiArrowLeft from '~icons/mdi/arrow-left';

	import { getPocketBaseInstance } from '$lib/states/pocketbase.svelte';
	import Alert from '$lib/components/Alert.svelte';

	const { pb } = getPocketBaseInstance();

	let alertType = $state('');
	let alertMessage = $state('');

	const handleChangePasswordClick = async () => {
		try {
			await pb.collection('users').requestPasswordReset(pb.authStore.model?.email);
			alertType = 'success';
			alertMessage = 'Please check your inbox.';
		} catch (e) {
			alertType = 'error';
			alertMessage = (e as Error)?.message;
		}
	};
</script>

<div class="flex-grow flex items-center justify-center">
	<div class="container mx-auto p-4">
		<div
			class="card bg-base-100 shadow-xl p-6
        max-w-md mx-auto lg:rounded-lg"
		>
			<a href="/settings" class="btn btn-ghost text-left btn-circle text-xl"
				><MdiArrowLeft></MdiArrowLeft></a
			>
			<h2 class="text-2xl font-bold text-center mb-4">Change Password</h2>
			<p class="text-center mb-4">
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
