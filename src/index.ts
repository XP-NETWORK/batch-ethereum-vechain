import {Config} from './setup';
import {
    ChainFactory,
    ChainFactoryConfigs,
    AppConfigs,
    Chain, 
    NftInfo
} from "xp.network";
import {BigNumber} from "bignumber.js";


const main = async () => {
    // Setup ================================================================================
    const mainnetConfig = await ChainFactoryConfigs.MainNet();
    const factory = ChainFactory(AppConfigs.MainNet(), mainnetConfig);
    const ethereum = await factory.inner(Chain.ETHEREUM);
    const vechain = await factory.inner(Chain.VECHAIN);
    
    // Indexing =============================================================================
    // const NFTs = await factory.nftList(ethereum, Config.signer.address);
    console.log("Looking for NFTs...");
    const NFTs = await factory.nftList(ethereum, "0x2401347d2BDC63aec24B34e3252952f1f3d09e4B");

    const filteredNFTs = NFTs.filter(item => {
        return item.native.contract == Config.from_contract
    });

    let counter = 0;
    const total = filteredNFTs.length;
    console.log(`Found ${total} NFTs`);

    for await (const selected of filteredNFTs){

        counter++;

        // Approving ==========================
        console.log(`${counter}/${total} - Approving...`);
        const approved = await ethereum.approveForMinter(
            selected,
            Config.signer,
            new BigNumber(0),
            undefined
        );
        console.log(`${counter}/${total} - Approved:`, approved);
        

        // Transferring =======================
        console.log(`${counter}/${total} - Transferring...`);
        const transferred = await factory.transferNft(
            ethereum,
            vechain,
            selected,
            Config.signer,
            Config.receiver as string
        );
        console.log(`${counter}/${total} - Transferred:`, transferred);
    }
    
}


(async () => {
    await main();
    process.exit(0);
})().catch(e => {
    console.error(e);
    process.exit(1);
})