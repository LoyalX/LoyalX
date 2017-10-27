
const CONFIG = {
	HTTP_PROVIDER: 'http://46.101.58.199:22000',
	CONTRACTS_URL: 'http://165.165.131.155:3000/',
	NETWORK_ID: null,

	SERVERS: {
		LOCAL: {
			HTTP_PROVIDER: 'http://localhost:8545',
			CONTRACTS_URL: 'http://localhost:3000',
			NETWORK_ID: null
		},
		LIVE_TEST: {
			HTTP_PROVIDER: 'http://46.101.58.199:22000',
			CONTRACTS_URL: 'http://165.165.131.155:3000/',
			NETWORK_ID: null
		}
	}

};

export default CONFIG;