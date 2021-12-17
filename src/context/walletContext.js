import { useContext, createContext, useState } from "react";

const WalletIndexContext = createContext();
const WalletIndexUpdateContext = createContext();

export const useWalletIndex = () => useContext(WalletIndexContext);
export const useWalletIndexUpdate = () => useContext(WalletIndexUpdateContext);

export function WalletProvider({ children }) {
  const [walletIndex, setWalletIndex] = useState(0);

  return (
    <WalletIndexContext.Provider value={walletIndex}>
      <WalletIndexUpdateContext.Provider value={setWalletIndex}>{children}</WalletIndexUpdateContext.Provider>
    </WalletIndexContext.Provider>
  );
}
