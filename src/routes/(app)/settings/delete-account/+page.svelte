<script lang="ts">
	import MdiArrowLeft from '~icons/mdi/arrow-left';

	import { getPocketBaseInstance } from '$lib/states/pocketbase.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { sleep } from '$lib';

	const { pb } = getPocketBaseInstance();

	let alertType = $state('');
	let alertMessage = $state('');
	let email = $state('');
	let dialogRef: HTMLDialogElement | undefined = $state();

	const handleConfirmDeleteAccountClick = async () => {
		if (pb.authStore.record) {
			if (email !== pb.authStore.record.email) {
				alertType = 'error';
				alertMessage = 'Please confirm your email address and try again';
				dialogRef?.close?.();
				return;
			}

			alertType = 'success';
			alertMessage = `So long, ${pb.authStore.record.username}!`;
			dialogRef?.close?.();

			await sleep(2500);

			try {
				await pb.collection('users').delete(pb.authStore.record.id);
			} catch (e) {
				alertType = 'error';
				alertMessage = 'Something went wrong while deleting your account.';
			}
		}
	};
</script>

{#snippet modalActions()}
	<button class="btn" onclick={() => dialogRef?.close?.()}>Cancel</button>
	<button class="btn btn-error" onclick={handleConfirmDeleteAccountClick}>Confirm</button>
{/snippet}

<Modal
	bind:dialogRef
	id="delete-account-modal"
	title="Delete Account"
	description="Are you sure you want to delete your account? This cannot be undone."
	dismissable={true}
	actionSnippet={modalActions}
></Modal>

<div class="flex flex-grow items-center justify-center">
	<div class="container mx-auto p-4">
		<div
			class="card mx-auto max-w-md bg-base-100
        p-6 shadow-xl lg:rounded-lg"
		>
			<a href="/settings" class="btn btn-circle btn-ghost text-left text-xl"
				><MdiArrowLeft></MdiArrowLeft></a
			>
			<h2 class="mb-4 text-center text-2xl font-bold">Delete Account</h2>
			<p class="mb-4 text-center">
				We're sad to see you go - but if you must, confirm your email address and click the button
				below to proceed.
			</p>
			{#if alertType && alertMessage}
				<div class="mb-4">
					<Alert type={alertType} message={alertMessage}></Alert>
				</div>
			{/if}
			<div class="form-control relative mb-4">
				<input
					type="email"
					id="email"
					class="input input-bordered"
					placeholder="Current Email Address"
					bind:value={email}
				/>
			</div>
			<div class="text-center">
				<button
					class="btn btn-primary min-w-full"
					onclick={() => dialogRef?.showModal?.()}
					disabled={email !== pb?.authStore?.record?.email}>Delete My Account Forever</button
				>
			</div>
		</div>
	</div>
</div>
