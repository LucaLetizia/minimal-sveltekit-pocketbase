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

	let email = $state('');

	const handleResetPasswordClick = async () => {
		try {
			formErrors = {};
			EmailSchema.parse({ email });
			await pb.collection('users').requestPasswordReset(email);
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
			<a href="/login" class="btn btn-circle text-left text-xl btn-ghost"
				><MdiArrowLeft></MdiArrowLeft></a
			>
			<h2 class="mb-4 text-center text-2xl font-bold">Forgot your password?</h2>
			<p class="mb-4 text-center">
				No worries! Simply enter your registered email address below, and we'll send you
				instructions on how to reset it.
			</p>
			<div class="form-control relative mb-4">
				<label class="label" for="email">
					<span class="label-text">Email Address</span>
				</label>
				<input
					type="email"
					id="email"
					class="input-bordered input w-full"
					placeholder="Current Email Address"
					bind:value={email}
				/>
				{#if formErrors?.email}
					<label class="label" for="email">
						<span class="label-text text-error">{formErrors?.email}</span>
					</label>
				{/if}
			</div>

			{#if alertType && alertMessage}
				<div class=" mb-4">
					<Alert type={alertType} message={alertMessage}></Alert>
				</div>
			{/if}
			<div class="text-center">
				<button class="btn min-w-full btn-primary" onclick={handleResetPasswordClick}
					>Reset Password</button
				>
			</div>
		</div>
	</div>
</div>
