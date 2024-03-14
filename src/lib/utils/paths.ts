export const paths = {
	home: '/',
	poker: (roomId: string) => `/room/${roomId}/poker`,
	repository: 'https://github.com/wmalarski/svelte-planning-poker',
	room: (roomId: string) => `/room/${roomId}`,
	rooms: '/rooms',
	signIn: '/sign-in',
	signUp: '/sign-up'
};
