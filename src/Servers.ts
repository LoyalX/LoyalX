
const SERVERS = {
	LOCALHOST: <ServerInfo>{
		HTTP_PROVIDER: 'http://localhost:8545',
		CONTRACTS_URL: 'http://localhost:3000',
		NETWORK_ID: 5777,
		HD_PATH: "m/44'/60'/0'/0" // BIP44 
	},
	PRODUCTION: <ServerInfo>{
		HTTP_PROVIDER: 'http://46.101.58.199:22000',
		CONTRACTS_URL: 'http://165.165.131.155:3000/',
		NETWORK_ID: null,
		HD_PATH: "m/44'/60'/0'/0" // BIP44 
	},
	ROPSTEN: <ServerInfo>{
		HTTP_PROVIDER: 'https://ropsten.infura.io/hSW2jjSUcvcnXAKw5357',
		CONTRACTS_URL: 'http://localhost:3000',
		NETWORK_ID: null,
		HD_PATH: "m/44'/60'/0'/0" // BIP44
	}
};

export default SERVERS;

export interface ServerInfo {
	HTTP_PROVIDER: string,
	CONTRACTS_URL: string,
	NETWORK_ID: number | null,
	HD_PATH: string | null
}