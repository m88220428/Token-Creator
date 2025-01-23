import { FC } from 'react';
import { useNetwork } from '../contexts/NetworkContextProvider';

export const NetworkToggle: FC = () => {
  const { network, toggleNetwork } = useNetwork();

  return (
    <div className="flex items-center justify-end p-4">
      <button
        onClick={toggleNetwork}
        className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors"
        style={{ backgroundColor: network === 'mainnet' ? '#14F195' : '#9945FF' }}
      >
        <span className="sr-only">Switch Network</span>
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            network === 'mainnet' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="ml-2 text-sm font-medium">
        {network === 'mainnet' ? 'Mainnet' : 'Devnet'}
      </span>
    </div>
  );
};
