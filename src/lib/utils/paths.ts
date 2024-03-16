export const paths = {
	home: '/',
	notFound: '/404',
	poker: (roomId: string) => `/room/${roomId}/poker`,
	repository: 'https://github.com/wmalarski/svelte-planning-poker',
	room: (roomId: string) => `/room/${roomId}`,
	rooms: '/rooms',
	signIn: '/sign-in',
	signOut: '/api/auth/sign-out',
	signUp: '/sign-up',
	signUpSuccess: '/sign-up/success'
};
