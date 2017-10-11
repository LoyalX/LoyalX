module.exports = {
  networks: {
    testrpc: {
      host: "localhost",
      port: 8545,
	  gas: 1712388,
      gasPrice: 1000000000,
      network_id: "*" // Match any network id
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
	"kovan": {
      network_id: 42,
      host: "localhost",
      port: 8545,
	  gas: 800000, //1712388,
      gasPrice: 10000000000,
    },
    ocean: {
      host: "46.101.58.199",
      port: 22000, 
      network_id: "*" 
    }
  }
};
