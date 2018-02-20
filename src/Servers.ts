
const SERVERS = {
	LOCALHOST: <ServerInfo>{
		HTTP_PROVIDER: 'http://localhost:8545',
		CONTRACTS_URL: 'http://localhost:3000',
		NETWORK_ID: 5777,
		HD_PATH: "m/44'/60'/0'/0" // BIP44 
	},
	PRODUCTION: <ServerInfo>{
		HTTP_PROVIDER: 'https://rinkeby.infura.io/39L4CW0Z7li9TKB58aTN',
		CONTRACTS_URL: null,
		NETWORK_ID: null,
		HD_PATH: "m/44'/60'/0'/0" // BIP44 
	}
};

export default SERVERS;

export interface ServerInfo {
	HTTP_PROVIDER: string,
	CONTRACTS_URL: string | null,
	NETWORK_ID: number | null,
	HD_PATH: string | null
}