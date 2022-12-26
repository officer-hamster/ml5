import basicSsl from '@vitejs/plugin-basic-ssl';
import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	server: {
		https: true
	},
	plugins: [basicSsl(), sveltekit()]
};

export default config;
