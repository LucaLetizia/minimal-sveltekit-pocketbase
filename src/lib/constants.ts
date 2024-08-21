import MdiEmailOutline from '~icons/mdi/email-outline';
import MdiKeyOutline from '~icons/mdi/key-outline';

export const pageTitles: Record<string, string> = {
	'/login': 'Log In',
	'/signup': 'Sign Up',
	'/settings': 'Settings',
	'/settings/change-email': 'Change Email',
	'/settings/change-password': 'Change Password',
	'/create': 'Create',
	'/notifications': 'Notifications'
};

export const accountSettings = [
	{
		name: 'Change Password',
		description: 'Update your password regularly to keep your account secure.',
		pathName: '/settings/change-password',
		icon: MdiKeyOutline
	},
	{
		name: 'Change Email',
		description: 'Ensure your email address is up to date to receive important notifications.',
		pathName: '/settings/change-email',
		icon: MdiEmailOutline
	}
];
