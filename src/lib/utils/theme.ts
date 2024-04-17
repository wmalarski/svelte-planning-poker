import type { Cookies } from '@sveltejs/kit';

export const THEME_COOKIE_KEY = 'theme';

const DARK_THEME = 'dark';
const LIGHT_THEME = '';

export const getThemeModeCookie = (cookies: Cookies) => {
	const value = cookies.get(THEME_COOKIE_KEY) ?? LIGHT_THEME;
	return value;
};

export const toggleThemeMode = () => {
	const classList = document.querySelector('html')?.classList;

	if (!classList) {
		return;
	}

	const hasDark = classList.contains(DARK_THEME);

	classList.toggle(DARK_THEME);
	document.cookie = `${THEME_COOKIE_KEY}=${hasDark ? LIGHT_THEME : DARK_THEME}`;
};
