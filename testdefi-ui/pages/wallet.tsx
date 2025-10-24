import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function WalletPage() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');

  const networks = [
    { id: 'ethereum', name: 'Ethereum Mainnet', chainId: '1', rpc: 'https://mainnet.infura.io/v3/...', color: 'blue' },
    { id: 'goerli', name: 'Goerli Testnet', chainId: '5', rpc: 'https://goerli.infura.io/v3/...', color: 'orange' },
    { id: 'sepolia', name: 'Sepolia Testnet', chainId: '11155111', rpc: 'https://sepolia.infura.io/v3/...', color: 'purple' },
    { id: 'polygon', name: 'Polygon Mainnet', chainId: '137', rpc: 'https://polygon-rpc.com/', color: 'purple' },
    { id: 'arbitrum', name: 'Arbitrum One', chainId: '42161', rpc: 'https://arb1.arbitrum.io/rpc', color: 'blue' },
    { id: 'optimism', name: 'Optimism', chainId: '10', rpc: 'https://mainnet.optimism.io', color: 'red' },
  ];

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.5', value: '$4,500', change: '+2.3%' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1,000', value: '$1,000', change: '0%' },
    { symbol: 'USDT', name: 'Tether USD', balance: '500', value: '$500', change: '0%' },
    { symbol: 'DAI', name: 'Dai Stablecoin', balance: '750', value: '$750', change: '+0.1%' },
  ];

  const transactions = [
    { hash: '0x1234...abcd', type: 'Send', amount: '-0.5 ETH', to: '0x5678...efgh', time: '2 分钟前', status: 'confirmed' },
    { hash: '0x5678...efgh', type: 'Receive', amount: '+1000 USDC', from: '0x9abc...ijkl', time: '1 小时前', status: 'confirmed' },
    { hash: '0x9abc...ijkl', type: 'Swap', amount: '1 ETH → 1800 USDC', via: 'Uniswap', time: '3 小时前', status: 'confirmed' },
    { hash: '0xdef0...1234', type: 'Send', amount: '-100 USDT', to: '0x5678...efgh', time: '1 天前', status: 'pending' },
  ];

  const connectWallet = async () => {
    try {
      // TODO: Implement actual wallet connection
      setConnected(true);
      setWalletAddress('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d4d4');
      setBalance('2.5');
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress('');
    setBalance('0');
  };

  const switchNetwork = (networkId: string) => {
    setSelectedNetwork(networkId);
    // TODO: Implement network switching
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          钱包连接
        </h1>

        {!connected ? (
          /* Wallet Connection */
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  连接钱包
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  连接您的钱包以开始使用 DeFi 测试平台
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={connectWallet}
                  className="w-full flex items-center justify-center space-x-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <img src="/metamask-icon.png" alt="MetaMask" className="w-6 h-6" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <span className="font-medium text-gray-900 dark:text-white">MetaMask</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                  <span className="font-medium text-gray-900 dark:text-white">WalletConnect</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-6 h-6 bg-orange-600 rounded"></div>
                  <span className="font-medium text-gray-900 dark:text-white">Coinbase Wallet</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                连接钱包即表示您同意我们的服务条款和隐私政策
              </p>
            </div>
          </div>
        ) : (
          /* Wallet Dashboard */
          <div className="space-y-8">
            {/* Wallet Info & Network Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    钱包信息
                  </h2>
                  <button
                    onClick={disconnectWallet}
                    className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    断开连接
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">钱包地址</label>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-gray-900 dark:text-white">{walletAddress}</span>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">ETH 余额</label>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {balance} ETH
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ≈ $4,500 USD
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  网络选择
                </h3>
                
                <div className="space-y-2">
                  {networks.map((network) => (
                    <button
                      key={network.id}
                      onClick={() => switchNetwork(network.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedNetwork === network.id
                          ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${network.color}-500`}></div>
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {network.name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Chain ID: {network.chainId}
                          </div>
                        </div>
                      </div>
                      {selectedNetwork === network.id && (
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Token Balances */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  代币余额
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">代币</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">余额</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">价值</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">24h 变化</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tokens.map((token, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-bold">{token.symbol[0]}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{token.symbol}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{token.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {token.balance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {token.value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`${token.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : token.change.startsWith('-') ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            {token.change}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 dark:text-blue-400 hover:underline">发送</button>
                            <button className="text-blue-600 dark:text-blue-400 hover:underline">交换</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  交易历史
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'Send' ? 'bg-red-100 dark:bg-red-900' :
                          tx.type === 'Receive' ? 'bg-green-100 dark:bg-green-900' :
                          'bg-blue-100 dark:bg-blue-900'
                        }`}>
                          {tx.type === 'Send' && <span className="text-red-600 dark:text-red-400">↗</span>}
                          {tx.type === 'Receive' && <span className="text-green-600 dark:text-green-400">↙</span>}
                          {tx.type === 'Swap' && <span className="text-blue-600 dark:text-blue-400">⇄</span>}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{tx.type}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{tx.amount}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">{tx.hash}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 text-xs rounded ${
                          tx.status === 'confirmed' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {tx.status === 'confirmed' ? '已确认' : '待确认'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tx.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
