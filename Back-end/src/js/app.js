App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there is an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to the TestRPC.
  App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(App.web3Provider);
}

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('LoyaltyTokenFactory.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract.
  var LoyaltyFactoryArtifact = data;
  App.contracts.LoyaltyFactory = TruffleContract(LoyaltyFactoryArtifact);

  // Set the provider for our contract.
  App.contracts.LoyaltyFactory.setProvider(App.web3Provider);

});

  $.getJSON('LoyaltyToken.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract.
  var LoyaltyTokenArtifact = data;
  App.contracts.LoyaltyToken = TruffleContract(LoyaltyTokenArtifact);

  // Set the provider for our contract.
  App.contracts.LoyaltyToken.setProvider(App.web3Provider);

});


    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-onboard', App.handleOnboard);
    $(document).on('click', '.btn-getBal', App.getBalance);

  },

  

   handleOnboard: function() {
    event.preventDefault();

    var retailSymbol = document.getElementById('retail-symbol').value;
    var retailName = document.getElementById('retail-name').value;
    var retailAmount = parseInt(document.getElementById('retail-amount').value,10);
    var retailDecimal = parseInt(document.getElementById('retail-decimal').value,10);

      retailAmount = retailAmount * 10 ^ retailDecimal;


    console.log("Sysmbol: " , retailSymbol, "Name: ", retailName, "Amount: ", retailAmount, " Decimal:" , retailDecimal);

    var loyaltyInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.LoyaltyFactory.deployed().then(function(instance) {
    loyaltyInstance = instance;

    return loyaltyInstance.initialiseRetail(retailAmount,retailName,retailDecimal, retailSymbol ,{from: account});
  }).then(function(result) {
   // return App.markAdopted();
   console.log("success Address",result);
   addToLog("#blockchain", "address : " + result);
  }).catch(function(err) {
    console.log(err.message);
  });
});
  },

     getBalance: function() {
    event.preventDefault();

    var retailAddress = document.getElementById('retail-address').value;


    console.log(retailAddress);

    var loyaltyInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.LoyaltyToken.deployed().then(function(instance) {
    loyaltyInstance = instance;

    return loyaltyInstance.balanceOf(retailAddress,{from: account});
  }).then(function(result) {
   // return App.markAdopted();
   console.log("success",result.toNumber());
  }).catch(function(err) {
    console.log(err.message);
  });
});
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
