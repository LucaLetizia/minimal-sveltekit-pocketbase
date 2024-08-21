import { getContext, setContext } from 'svelte';

const getSystemTheme = () => {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	return 'light';
};

const saveTheme = (newTheme: string) => {
	document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
};

const getSavedTheme = () => {
	const currentTheme = localStorage.getItem('theme') ?? '';
	if (currentTheme === 'system') return getSystemTheme();
	return currentTheme;
};

export class ThemeState {
	theme = $state(getSavedTheme() || getSystemTheme());

	update(newTheme: string) {
		saveTheme(newTheme);
		this.theme = newTheme;
	}
	reset() {
		const systemTheme = getSystemTheme();
		if (systemTheme) {
			saveTheme(systemTheme);
			this.theme = systemTheme;
		}
	}
}

const THEME_CONTEXT = Symbol('THEME');

export function setThemeState() {
	return setContext(THEME_CONTEXT, new ThemeState());
}

export function getThemeState() {
	return getContext<ReturnType<typeof setThemeState>>(THEME_CONTEXT);
}
