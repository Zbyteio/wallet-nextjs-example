const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
		prependData: '@import "./base.scss";',
		logger: {
			debug: s => console.log(s)
		}
	},
	env: {
		WEB3_BASE_URL: process.env.WEB3_BASE_URL,
		WEB3_TOKEN_EXPIRY: process.env.WEB3_TOKEN_EXPIRY,
		WEB3_TYPE_OF_TOKEN: process.env.WEB3_TYPE_OF_TOKEN,
		WEB3_DOMAIN: process.env.WEB3_DOMAIN,
		WEB3_CLIENT_ID: process.env.WEB3_CLIENT_ID,
		WEB3_VERIFIER: process.env.WEB3_VERIFIER,
		WEB3_AUTH_NETWORK_TYPE: process.env.WEB3_AUTH_NETWORK_TYPE,
		WEB3_AUTH_CLIENT_ID: process.env.WEB3_AUTH_CLIENT_ID,
		WEB3_ENABLE_LOGGING: process.env.WEB3_ENABLE_LOGGING
	}
};
