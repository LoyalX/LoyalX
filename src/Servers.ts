
const SERVERS = {
	LOCALHOST: {
		HTTP_PROVIDER: 'http://localhost:8545',
		CONTRACTS_URL: 'http://localhost:3000',
		NETWORK_ID: null
	},
	PRODUCTION: {
		HTTP_PROVIDER: 'http://46.101.58.199:22000',
		CONTRACTS_URL: 'http://165.165.131.155:3000/',
		NETWORK_ID: null
	}
};

export default SERVERS;

export interface ServerInfo {
	HTTP_PROVIDER: string,
	CONTRACTS_URL: string,
	NETWORK_ID: number
}