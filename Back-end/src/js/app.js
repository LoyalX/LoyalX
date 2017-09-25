App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    // $.getJSON('../pets.json', function(data) {
    //   var petsRow = $('#petsRow');
    //   var petTemplate = $('#petTemplate');

    //   for (i = 0; i < data.length; i ++) {
    //     petTemplate.find('.panel-title').text(data[i].name);
    //     petTemplate.find('img').attr('src', data[i].picture);
    //     petTemplate.find('.pet-breed').text(data[i].breed);
    //     petTemplate.find('.pet-age').text(data[i].age);
    //     petTemplate.find('.pet-location').text(data[i].location);
    //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

    //     petsRow.append(petTemplate.html());
    //   }
    // });

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
    $.getJSON('LoyaltyToken.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract.
  var LoyaltyArtifact = data;
  App.contracts.Loyalty = TruffleContract(LoyaltyArtifact);

  // Set the provider for our contract.
  App.contracts.Loyalty.setProvider(App.web3Provider);

  // Use our contract to retieve and mark the adopted pets.
 // return App.markAdopted();
});

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-getBal', App.getBalance);
    $(document).on('click', '.btn-onboard', App.handleOnboard);

  },

  handleAdopt: function() {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    return adoptionInstance.adopt(petId, {from: account});
  }).then(function(result) {
    return App.markAdopted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
  },

   handleOnboard: function() {
    event.preventDefault();

    var retailAddress = document.getElementById('retail-address').value;
    var retailName = document.getElementById('retail-name').value;
    var retailAmount = parseInt(document.getElementById('retail-amount').value);

    console.log(retailAddress, " ", retailName, " ", retailAmount);

    var loyaltyInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Loyalty.deployed().then(function(instance) {
    loyaltyInstance = instance;

    return loyaltyInstance.initialiseRetail(retailAddress,retailAmount, {from: account});
  }).then(function(result) {
   // return App.markAdopted();
   console.log("success",result);
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

  App.contracts.Loyalty.deployed().then(function(instance) {
    loyaltyInstance = instance;

    return loyaltyInstance.balanceOf(retailAddress,{from: account});
  }).then(function(result) {
   // return App.markAdopted();
   console.log("success",result);
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
