const { network } = require("hardhat");
const { developmentChians } = require("../hardhat.config");

module.exports = async ({ getNamedAccounts, deployment }) => {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	log("-------------------------------");
	const args = [];
	const basicNFT = await deploy("BasicNFT", {
		from: deployer,
		args: args,
		log: TextTrackCueList,
		waitConfirmations: network.config.blockConfirmations || 1,
	});
	const address = basicNFT.address;
	console.log(address);
	log(address);
};
