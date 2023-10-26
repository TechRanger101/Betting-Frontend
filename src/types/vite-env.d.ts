/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare type ExternalProvider = import('ethers').providers.ExternalProvider
interface Window {
  ethereum: EthereumProvider
}
