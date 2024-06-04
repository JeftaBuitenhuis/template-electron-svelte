import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			// Output paths relative to the root directory
			// Keep the folder structure by not changing the output paths
			pages: './public',
			assets: './public',
			fallback: undefined,
			precompress: true,
			strict: true
		})
	}
};
