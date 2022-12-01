const { network, ethers } = require("hardhat");
const { developmentChians } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployment }) => {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;
	let vrfCoordinatorV2Address;
	let FUND_AMOUNT = 100000;

	let tokenUris; // these are the uris containing the images of all the nfts

	if (developmentChians.includes(network.name)) {
		const vrfCoordinatorV2Mock = await ethers.getContractAt(
			"VRFCoordinatorV2Mock"
		);
		vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
		const tx = await vrfCoordinatorV2Mock.createSubscription();
		const txRecipt = await tx.wait(1);
		subscriptionId = txRecipt.events[0].args.subId;
		await vrfCoordinatorV2Mock.fundSubscription(
			subscriptionId,
			FUND_AMOUNT
		);
	} else {
		vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
		subscriptionId = networkConfig[chainId].subscriptionId;
	}
	log("------------------------------------------");
	const args = [
		vrfCoordinatorV2Address,
		subscriptionId,
		networkConfig[chainId].gasLane,
		networkConfig[chainId].callbackGasLimit,
		tokenUris,
		networkConfig[chainId].mintFee,
	];

	const randomIpfsNft = await deploy("RandomIpfsNft", {
		from: deployer,
		args: args,
		log: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	});

	log("------------------------------------");
};
