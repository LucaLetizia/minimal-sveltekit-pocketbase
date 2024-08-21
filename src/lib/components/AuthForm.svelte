<script lang="ts">
	import MdiEye from '~icons/mdi/eye';
	import MdiEyeOff from '~icons/mdi/eye-off';
	import MdiGithub from '~icons/mdi/github';
	import { getPocketBaseInstance } from '$lib/states/pocketbase.svelte.js';
	import { signUpSchema, loginSchema } from '$lib/schemas/auth';
	import { ZodError } from 'zod';
	import Alert from './Alert.svelte';
	import { goto } from '$app/navigation';
	const { pb } = getPocketBaseInstance();

	type Props = {
		signUp: boolean;
	};
	let { signUp }: Props = $props();

	let email: string = $state('');
	let username: string = $state('');
	let password: string = $state('');
	let confirmPassword: string = $state('');
	let showPassword: boolean = $state(false);
	let showConfirmPassword: boolean = $state(false);
	let formErrors: Record<string, string[] | undefined> = $state({});
	let alertType: string = $state('');
	let alertMessage: string = $state('');

	const handleSignUpClick = async () => {
		try {
			formErrors = {};
			signUpSchema.parse({ email, username, password, confirmPassword });
			const data = {
				username,
				email,
				emailVisibility: true,
				password,
				passwordConfirm: confirmPassword
			};
			await pb.collection('users').create(data);
			await pb.collection('users').requestVerification(email);
			await pb.collection('users').authWithPassword(email, password);
			await goto('/home');
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

	const handleLoginClick = async () => {
		try {
			formErrors = {};
			loginSchema.parse({ email, password });
			await pb.collection('users').authWithPassword(email, password);
			await goto('/home');
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

	const handleProviderLoginClick = async (provider: string) => {
		try {
			await pb.collection('users').authWithOAuth2({ provider });
			await goto('/home');
		} catch (e) {
			console.error('Unexpected error:', e);
			alertType = 'error';
			alertMessage = (e as Error)?.message;
		}
	};
</script>

<div class="flex-grow flex items-center justify-center">
	<div class="card w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-center">{signUp ? 'Sign Up' : 'Log In'}</h2>
			{#if signUp}
				<div class="form-control mb-4 relative">
					<input
						type="text"
						id="username"
						class="input input-bordered"
						class:border-error={formErrors?.username}
						placeholder="Username"
						required
						bind:value={username}
					/>
					{#if formErrors?.username}
						<label class="label" for="name">
							<span class="label-text text-error">{formErrors?.username}</span>
						</label>
					{/if}
				</div>
			{/if}
			<div class="form-control mb-4 relative">
				<input
					type="email"
					id="email"
					class="input input-bordered"
					class:border-error={formErrors?.email}
					placeholder="Email Address"
					required
					bind:value={email}
				/>
				{#if formErrors?.email}
					<label class="label" for="email">
						<span class="label-text text-error">{formErrors?.email}</span>
					</label>
				{/if}
			</div>
			<div class="form-control mb-4 relative">
				<input
					type={showPassword ? 'text' : 'password'}
					id="password"
					class="input input-bordered"
					class:border-error={formErrors?.password}
					placeholder="Password"
					required
					bind:value={password}
				/>
				{#if showPassword}
					<button
						class="absolute right-0 top-0 mt-3 mr-3 cursor-pointer"
						onclick={() => (showPassword = !showPassword)}
					>
						<MdiEyeOff></MdiEyeOff>
					</button>
				{:else}
					<button
						class="absolute right-0 top-0 mt-3 mr-3 cursor-pointer"
						onclick={() => (showPassword = !showPassword)}
					>
						<MdiEye></MdiEye>
					</button>
				{/if}
				{#if formErrors?.password}
					<label class="label" for="password">
						<span class="label-text text-error">{formErrors?.password}</span>
					</label>
				{/if}
			</div>
			{#if signUp}
				<div class="form-control mb-4 relative">
					<input
						type={showConfirmPassword ? 'text' : 'password'}
						id="confirm-password"
						class="input input-bordered"
						class:border-error={formErrors?.confirmPassword}
						placeholder="Confirm Password"
						required
						bind:value={confirmPassword}
					/>
					{#if showConfirmPassword}
						<button
							class="absolute right-0 top-0 mt-3 mr-3 cursor-pointer"
							onclick={() => (showConfirmPassword = !showConfirmPassword)}
						>
							<MdiEyeOff></MdiEyeOff>
						</button>
					{:else}
						<button
							class="absolute right-0 top-0 mt-3 mr-3 cursor-pointer"
							onclick={() => (showConfirmPassword = !showConfirmPassword)}
						>
							<MdiEye></MdiEye>
						</button>
					{/if}
					{#if formErrors?.confirmPassword}
						<label class="label" for="confirm-password">
							<span class="label-text text-error">{formErrors?.confirmPassword}</span>
						</label>
					{/if}
				</div>
			{/if}
			{#if alertType && alertMessage}
				<Alert type={alertType} message={alertMessage}></Alert>
			{/if}
			<div class="form-control">
				<button
					type="button"
					class="btn btn-primary w-full"
					onclick={signUp ? handleSignUpClick : handleLoginClick}
					>{signUp ? 'Sign Up' : 'Log In'}</button
				>
			</div>
			<div class="divider">OR</div>
			<button
				class="btn btn-primary flex items-center space-x-2"
				onclick={async () => await handleProviderLoginClick('github')}
			>
				<MdiGithub class="text-lg"></MdiGithub>
				<span>Continue with GitHub</span>
			</button>
			{#if !signUp}
				<p class="text-sm text-center">
					<a href="/forgot-password" class="text-primary">Forgot your password?</a>
				</p>
			{/if}
			<div class="mt-4 text-center">
				<p class="text-sm">
					{#if signUp}
						Already have an account? <a href="/login" class="text-primary">Log In</a>
					{:else}
						Don't have an account? <a href="/signup" class="text-primary">Sign Up</a>
					{/if}
				</p>
			</div>
		</div>
	</div>
</div>
