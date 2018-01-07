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