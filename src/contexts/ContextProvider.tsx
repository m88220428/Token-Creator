import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
    // LedgerWalletAdapter,
    // SlopeWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useCallback, useMemo } from 'react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import NetworkContextProvider, { useNetwork } from './NetworkContextProvider';
import { notify } from "../utils/notifications";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const { network } = useNetwork();
    console.log('Current network:', network);
    const walletNetwork = network === 'mainnet' 
      ? WalletAdapterNetwork.Mainnet 
      : WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => {
      const endpoint = network === 'mainnet' 
        ? 'https://api.mainnet.solana.com' 
        : 'https://api.devnet.solana.com';
      console.log('Using endpoint:', endpoint);
      return endpoint;
    }, [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolletWalletAdapter({ network: walletNetwork }),
            new SolletExtensionWalletAdapter({ network: walletNetwork }),
            new TorusWalletAdapter(),
            // new LedgerWalletAdapter(),
            // new SlopeWalletAdapter(),
        ],
        [network]
    );

    const onError = useCallback(
        (error: WalletError) => {
            notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
            console.error(error);
        },
        []
    );

    return (
        // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <NetworkContextProvider>
            <AutoConnectProvider>
                <WalletContextProvider>{children}</WalletContextProvider>
            </AutoConnectProvider>
        </NetworkContextProvider>
    );
};
