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

<div class="flex-grow flex items-center justify-center">
	<div class="container mx-auto p-4">
		<div
			class="card bg-base-100 shadow-xl p-6
        max-w-md mx-auto lg:rounded-lg"
		>
			<a href="/login" class="btn btn-ghost text-left btn-circle text-xl"
				><MdiArrowLeft></MdiArrowLeft></a
			>
			<h2 class="text-2xl font-bold text-center mb-4">Forgot your password?</h2>
			<p class="text-center mb-4">
				No worries! Simply enter your registered email address below, and we'll send you
				instructions on how to reset it.
			</p>
			<div class="form-control mb-4 relative">
				<label class="label" for="email">
					<span class="label-text">Email Address</span>
				</label>
				<input type="email" id="email" class="input input-bordered" bind:value={email} />
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
				<button class="btn btn-primary min-w-full" onclick={handleResetPasswordClick}
					>Reset Password</button
				>
			</div>
		</div>
	</div>
</div>
