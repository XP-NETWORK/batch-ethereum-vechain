import { getEnv } from './utils';
import {ethers, Wallet} from 'ethers';

const SK = getEnv("SK");
const rpc = getEnv("RPC");

const providerRPC = {
    ethereum: {
        name: 'ethereum',
        rpc,
        chainId: 1
    }
}

const provider = new ethers.providers.JsonRpcProvider(
    providerRPC.ethereum.rpc,
    {
        name: providerRPC.ethereum.name,
        chainId: providerRPC.ethereum.chainId
    }
);

export const Config = {
    SK,
    rpc,
    provider,
    signer: new Wallet(SK as string, provider),
    receiver: getEnv("RECEIVER"),
    from_contract: getEnv("FROM_CONTRACT"),
    to_contract: getEnv("TO_CONTRACT", true)
}