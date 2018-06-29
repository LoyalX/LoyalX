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
	private static _instance;

	public Web3Service;
	public static SERVERS = SERVERS;

	public Badge = Badge;
	public ExtendedRewardProgram = ExtendedRewardProgram;
	public OrganizationFactory = new OrganizationFactory();
	public Organization = Organization;
	public RewardProgram = RewardProgram;
	public BadgeProgram = BadgeProgram;

	public static passwordGetter;
	public static passwordSetter;

	private constructor() { }

	public static setPasswordGetter(passwordGetter) {
		LoyalX.passwordGetter = passwordGetter;
	}

	public static setPasswordSetter(passwordSetter) {
		LoyalX.passwordSetter = passwordSetter;
	}

	public static async init({ TruffleContract, lightwallet, server = SERVERS.LOCALHOST }) {
		if (!LoyalX._instance) {
			Config.TruffleContract = TruffleContract;
			Config.LightWallet = lightwallet;
			Config.server = server;

			var ret = new LoyalX();
			ret.Web3Service = await Web3Service.getInstance();
			LoyalX._instance = ret;
		}
		return LoyalX._instance;
	}

}