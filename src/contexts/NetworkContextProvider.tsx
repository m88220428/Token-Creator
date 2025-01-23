import { createContext, useState, useContext } from 'react';
import { networkConfig } from '../config';
import { AutoConnectProvider } from './AutoConnectProvider';

const NetworkContext = createContext({
  network: 'mainnet',
  toggleNetwork: () => {},
});

const ContextProvider: React.FC = ({ children }) => {
  const [autoConnect, setAutoConnect] = useState(false);
  const [network, setNetwork] = useState('mainnet');

  const toggleNetwork = () => {
    setNetwork(prev => prev === 'mainnet' ? 'devnet' : 'mainnet');
  };

  return (
    <NetworkContext.Provider value={{ network, toggleNetwork }}>
      <AutoConnectProvider>
        {children}
      </AutoConnectProvider>
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
export default ContextProvider;
