import { Web3Service } from './web3-service';
import SERVERS from './Servers';
import { ServerInfo } from './Servers';

import { Badge } from './contract-wraper/badge';
import { ExtendedRewardProgram } from './contract-wraper/extended-reward-program';
import { OrganizationFactory } from './contract-wraper/organization-factory';
import { Organization } from './contract-wraper/organization';
import { RewardProgram } from './contract-wraper/reward-program';

export default class LoyalX {
	public Web3Service;
	public static SERVERS = SERVERS;

	public Badge = Badge;
	public ExtendedRewardProgram = ExtendedRewardProgram;
	public OrganizationFactory = new OrganizationFactory();
	public Organization = Organization;
	public RewardProgram = RewardProgram;

	private constructor() { }

	public static async init(TruffleContract, server: ServerInfo = SERVERS.LOCALHOST) {
		var ret = new LoyalX();
		ret.Web3Service = await Web3Service.getInstance();
		return ret;
	}
}