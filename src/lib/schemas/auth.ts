import { z } from 'zod';

export const signUpSchema = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.max(100, { message: 'Email must be less than 100 characters' })
			.email(),
		username: z
			.string({ required_error: 'Username is required' })
			.min(1, { message: 'Username is required' })
			.max(64, { message: 'Username must be less than 64 characters' })
			.trim(),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(64, { message: 'Password must be less than 64 characters' })
			.trim(),
		confirmPassword: z.string({ required_error: 'Confirm password is required' }).trim()
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and confirm password must match',
				path: ['confirmPassword']
			});
		}
	});

export const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email().trim(),
	password: z.string({ required_error: 'Password is required' }).trim()
});

export const EmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email()
		.max(100, { message: 'Email must be less than 100 characters' })
		.trim()
});
