<script lang="ts">
	import MdiArrowLeft from '~icons/mdi/arrow-left';

	import { getPocketBaseInstance } from '$lib/states/pocketbase.svelte';

	import { EmailSchema } from '$lib/schemas/auth';
	import { ZodError } from 'zod';

	import Alert from '$lib/components/Alert.svelte';

	const { pb } = getPocketBaseInstance();

	let formErrors: Record<string, string[] | undefined> = $state({});

	let alertType = $state('');
	let alertMessage = $state('');

	let email = $state(pb.authStore.record?.email ?? '');

	const handleChangeEmailClick = async () => {
		try {
			formErrors = {};
			EmailSchema.parse({ email });
			await pb.collection('users').requestEmailChange(email);
			alertType = 'success';
			alertMessage = 'Please check your inbox.';
		} catch (e) {
			if (e instanceof ZodError) {
				const { fieldErrors: errors } = e.flatten();
				formErrors = errors;
			} else {
				console.error('Unexpected error:', e);
				alertType = 'error';
				alertMessage = (e as Error)?.message;
			}
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
			<h2 class="mb-4 text-center text-2xl font-bold">Change Email Address</h2>
			<div class="form-control relative mb-4">
				<label class="label" for="email">
					<span class="label-text">Current Email Address</span>
				</label>
				<input type="email" id="email" class="input input-bordered" bind:value={email} />
				{#if formErrors?.email}
					<label class="label" for="email">
						<span class="label-text text-error">{formErrors?.email}</span>
					</label>
				{/if}
			</div>
			<p class="mb-4 text-center">
				Upon clicking the "Change Email" button, you'll receive an email with a link to confirm your
				new email address.
			</p>
			{#if alertType && alertMessage}
				<div class=" mb-4">
					<Alert type={alertType} message={alertMessage}></Alert>
				</div>
			{/if}
			<div class="text-center">
				<button class="btn btn-primary min-w-full" onclick={handleChangeEmailClick}>Save</button>
			</div>
		</div>
	</div>
</div>
