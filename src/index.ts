import { Web3Service } from './web3-service';
import SERVERS from './Servers';
import { ServerInfo } from './Servers';

import { Badge } from './contract-wraper/badge';
import { ExtendedRewardProgram } from './contract-wraper/extended-reward-program';
import { OrganizationFactory } from './contract-wraper/organization-factory';
import { Organization } from './contract-wraper/organization';
import { RewardProgram } from './contract-wraper/reward-program';
import { BadgeProgram } from './contract-wraper/badge-program';

import Config from './config';

export default class LoyalX {
	public Web3Service;
	public static SERVERS = SERVERS;

	public Badge = Badge;
	public ExtendedRewardProgram = ExtendedRewardProgram;
	public OrganizationFactory = new OrganizationFactory();
	public Organization = Organization;
	public RewardProgram = RewardProgram;
	public BadgeProgram = BadgeProgram;

	private constructor() { }

	public static async init({ TruffleContract, lightwallet, server = SERVERS.LOCALHOST }) {
		Config.TruffleContract = TruffleContract;
		Config.LightWallet = lightwallet;
		Config.server = server;

		var ret = new LoyalX();
		ret.Web3Service = await Web3Service.getInstance();
		return ret;
	}
}

import TruffleContract = require("truffle-contract");
import lightwallet = require("eth-lightwallet");

async function x() {

	var loyalX = await LoyalX.init({
		TruffleContract: TruffleContract,
		lightwallet: lightwallet
	});


	/*
	await loyalX.OrganizationFactory.createOrganization({
		name: "name",
		website: "website",
		email: "email",
		logoURL: "logoURL",
		tokenIconURL: "tokenIconURL",
		about: "about",
		tokenInitialAmount: 10000000,
		tokenName: "tokenName",
		tokenDecimal: 2,
		tokenSymbol: "tokenSymbol"
	});
*/
	var org = await loyalX.OrganizationFactory.findOrganizationByOwner();
	/*
	var badge = await org.issueBadge({
		badgeName: "Test",
		badgeClass: "novice",
		ownerName: "John Smith",
		ownerAddress: "0xf2beae25b23f0ccdd234410354cb42d08ed54981"
	});
	*/
	var orgInfo = await org.getAttribs();
	var result = await orgInfo.rewardProgram.transfer(200, "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef");

	//var aaa = await Lx.OrganizationFactory.getOrganizationsAddresses();

	//new Lx.Organization(aaa[0]).getMetaData();

	var orgatt = await org.getAttribs();

	var orgcont = await orgatt.rewardProgram.getContractInstance();

	var account = await loyalX.Web3Service.getAccount();

	var event = await orgcont.Transfer({ _from: account }, {
		//fromBlock: 0,
		//toBlock: 'latest',
		filter: { to: "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef" }
	});

	console.log("==========================================");
	console.log("==========================================");
	console.log("==========================================");
	//console.log(event);
	console.log("==========================================");
	console.log("==========================================");
	console.log("==========================================");
	event.get((error, logs) => {
		// we have the logs, now print them
		console.log(logs);
		//logs.forEach(log => console.log(log.args))
	})
	//orgatt.rewardProgram.getTransactions();
	//event.watch(function(error, result){console.log(result)});
}
x();

