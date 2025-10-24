import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function LendingPage() {
  const [selectedProtocol, setSelectedProtocol] = useState('compound');
  const [action, setAction] = useState('supply');
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('ETH');
  const [isLoading, setIsLoading] = useState(false);

  const protocols = [
    { id: 'compound', name: 'Compound', tvl: '$2.1B', apy: '4.2%' },
    { id: 'aave', name: 'Aave', tvl: '$5.8B', apy: '3.8%' },
    { id: 'maker', name: 'MakerDAO', tvl: '$8.2B', apy: '5.1%' },
  ];

  const assets = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.5', apy: '4.2%', utilization: '75%' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1000', apy: '6.8%', utilization: '82%' },
    { symbol: 'DAI', name: 'Dai Stablecoin', balance: '500', apy: '5.9%', utilization: '78%' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.1', apy: '2.1%', utilization: '45%' },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    // 模拟交易处理
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert(`${action === 'supply' ? '存入' : '借出'} ${amount} ${selectedAsset} 成功！`);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            借贷协议测试
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            测试主流 DeFi 借贷协议的存款、借款和清算功能
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 协议选择 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                选择协议
              </h2>
              <div className="space-y-3">
                {protocols.map((protocol) => (
                  <div
                    key={protocol.id}
                    onClick={() => setSelectedProtocol(protocol.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedProtocol === protocol.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {protocol.name}
                      </h3>
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {protocol.apy}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      TVL: {protocol.tvl}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 主要操作区域 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              {/* 操作类型选择 */}
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6">
                <button
                  onClick={() => setAction('supply')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    action === 'supply'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  存入资产
                </button>
                <button
                  onClick={() => setAction('borrow')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    action === 'borrow'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  借出资产
                </button>
              </div>

              {/* 资产选择和数量输入 */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    选择资产
                  </label>
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {assets.map((asset) => (
                      <option key={asset.symbol} value={asset.symbol}>
                        {asset.symbol} - {asset.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {action === 'supply' ? '存入数量' : '借出数量'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-20"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      MAX
                    </button>
                  </div>
                </div>
              </div>

              {/* 资产信息 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  资产信息
                </h3>
                {assets
                  .filter(asset => asset.symbol === selectedAsset)
                  .map((asset) => (
                    <div key={asset.symbol} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">钱包余额</span>
                        <span className="text-gray-900 dark:text-white">{asset.balance} {asset.symbol}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {action === 'supply' ? '存款 APY' : '借款 APR'}
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-medium">{asset.apy}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">利用率</span>
                        <span className="text-gray-900 dark:text-white">{asset.utilization}</span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* 提交按钮 */}
              <button
                onClick={handleSubmit}
                disabled={!amount || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    处理中...
                  </>
                ) : (
                  `${action === 'supply' ? '存入' : '借出'} ${selectedAsset}`
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 测试场景 */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            测试场景
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: '正常存取', desc: '测试基本的存款和取款功能', status: 'ready' },
              { name: '利率变化', desc: '模拟利率波动对收益的影响', status: 'ready' },
              { name: '清算测试', desc: '模拟抵押品价格下跌触发清算', status: 'ready' },
              { name: '闪电贷', desc: '测试闪电贷攻击和套利场景', status: 'coming' },
            ].map((scenario, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{scenario.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    scenario.status === 'ready' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {scenario.status === 'ready' ? '可用' : '即将推出'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{scenario.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
