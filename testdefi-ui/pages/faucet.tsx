import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function FaucetPage() {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [claiming, setClaiming] = useState(false);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '100 ETH', limit: '1 ETH/day', icon: '⟠' },
    { symbol: 'USDC', name: 'USD Coin', balance: '50,000 USDC', limit: '1,000 USDC/day', icon: '💵' },
    { symbol: 'USDT', name: 'Tether USD', balance: '50,000 USDT', limit: '1,000 USDT/day', icon: '💰' },
    { symbol: 'DAI', name: 'Dai Stablecoin', balance: '50,000 DAI', limit: '1,000 DAI/day', icon: '🏛️' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '5 WBTC', limit: '0.1 WBTC/day', icon: '₿' },
    { symbol: 'LINK', name: 'Chainlink', balance: '10,000 LINK', limit: '100 LINK/day', icon: '🔗' },
  ];

  const recentClaims = [
    { address: '0x742d...4d4d', token: 'ETH', amount: '1.0', time: '2 分钟前', status: 'success' },
    { address: '0xA0b8...4e4e', token: 'USDC', amount: '1000', time: '5 分钟前', status: 'success' },
    { address: '0x1234...abcd', token: 'DAI', amount: '500', time: '10 分钟前', status: 'failed' },
  ];

  const handleClaim = async () => {
    if (!walletAddress || !amount) return;
    
    setClaiming(true);
    try {
      // TODO: Implement actual faucet claim logic
      setTimeout(() => {
        alert(`成功领取 ${amount} ${selectedToken} 到地址 ${walletAddress}`);
        setClaiming(false);
        setAmount('');
      }, 2000);
    } catch (error) {
      console.error('Claim error:', error);
      setClaiming(false);
    }
  };

  const connectWallet = () => {
    // TODO: Implement wallet connection
    setWalletAddress('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d4d4');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          代币水龙头
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Token Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                选择代币
              </h2>
              
              <div className="space-y-3">
                {tokens.map((token) => (
                  <div
                    key={token.symbol}
                    onClick={() => setSelectedToken(token.symbol)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedToken === token.symbol
                        ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{token.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {token.symbol}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {token.name}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>余额: {token.balance}</div>
                      <div>限制: {token.limit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Claim Interface */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                领取 {selectedToken}
              </h2>
              
              {/* Wallet Connection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  钱包地址
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="输入钱包地址或连接钱包"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                  />
                  <button
                    onClick={connectWallet}
                    className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    连接钱包
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  领取数量
                </label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="输入数量"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
                    {selectedToken}
                  </div>
                </div>
                
                {/* Quick Amount Buttons */}
                <div className="mt-3 flex space-x-2">
                  {selectedToken === 'ETH' && (
                    <>
                      <button onClick={() => setAmount('0.1')} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">0.1</button>
                      <button onClick={() => setAmount('0.5')} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">0.5</button>
                      <button onClick={() => setAmount('1.0')} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">1.0</button>
                    </>
                  )}
                  {(selectedToken === 'USDC' || selectedToken === 'USDT' || selectedToken === 'DAI') && (
                    <>
                      <button onClick={() => setAmount('100')} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">100</button>
                      <button onClick={() => setAmount('500')} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">500</button>
                      <button onClick={() => setAmount('1000')} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">1000</button>
                    </>
                  )}
                </div>
              </div>

              {/* Claim Button */}
              <button
                onClick={handleClaim}
                disabled={!walletAddress || !amount || claiming}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {claiming ? '领取中...' : `领取 ${selectedToken}`}
              </button>

              {/* Info */}
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <div className="font-medium mb-1">注意事项:</div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>每个地址每天只能领取一次</li>
                    <li>测试代币仅用于测试目的，无实际价值</li>
                    <li>请勿在主网使用这些代币</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recent Claims */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                最近领取记录
              </h3>
              
              <div className="space-y-3">
                {recentClaims.map((claim, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {claim.address}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {claim.amount} {claim.token}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        claim.status === 'success'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {claim.status === 'success' ? '成功' : '失败'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {claim.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,234</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">今日领取次数</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">98.5%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">成功率</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">567</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">活跃用户</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
