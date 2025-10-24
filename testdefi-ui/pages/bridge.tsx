import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function BridgePage() {
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('polygon');
  const [selectedAsset, setSelectedAsset] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [selectedBridge, setSelectedBridge] = useState('polygon-pos');
  const [isBridging, setIsBridging] = useState(false);

  const chains = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '🔷',
      gasPrice: '25 gwei',
      blockTime: '12s',
      tvl: '$45.2B'
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      logo: '🟣',
      gasPrice: '30 gwei',
      blockTime: '2s',
      tvl: '$1.8B'
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum',
      symbol: 'ARB',
      logo: '🔵',
      gasPrice: '0.1 gwei',
      blockTime: '1s',
      tvl: '$2.1B'
    },
    {
      id: 'optimism',
      name: 'Optimism',
      symbol: 'OP',
      logo: '🔴',
      gasPrice: '0.001 gwei',
      blockTime: '2s',
      tvl: '$950M'
    }
  ];

  const bridges = [
    {
      id: 'polygon-pos',
      name: 'Polygon PoS Bridge',
      type: 'Official',
      fee: '0.1%',
      time: '7-8 minutes',
      security: 'High',
      supportedAssets: ['ETH', 'USDC', 'DAI', 'WBTC']
    },
    {
      id: 'hop',
      name: 'Hop Protocol',
      type: 'Third-party',
      fee: '0.04%',
      time: '1-2 minutes',
      security: 'Medium',
      supportedAssets: ['ETH', 'USDC', 'DAI']
    },
    {
      id: 'synapse',
      name: 'Synapse Bridge',
      type: 'Third-party',
      fee: '0.05%',
      time: '2-3 minutes',
      security: 'Medium',
      supportedAssets: ['ETH', 'USDC', 'USDT']
    },
    {
      id: 'multichain',
      name: 'Multichain',
      type: 'Third-party',
      fee: '0.1%',
      time: '10-30 minutes',
      security: 'High',
      supportedAssets: ['ETH', 'USDC', 'DAI', 'WBTC', 'LINK']
    }
  ];

  const riskFactors = [
    {
      name: '智能合约风险',
      level: 'Medium',
      description: '桥接合约可能存在漏洞'
    },
    {
      name: '验证者风险',
      description: '多签验证者可能作恶',
      level: 'High'
    },
    {
      name: '流动性风险',
      level: 'Low',
      description: '目标链流动性不足'
    },
    {
      name: '审查风险',
      level: 'Low',
      description: '交易可能被审查或延迟'
    }
  ];

  const attackScenarios = [
    {
      name: '51% 攻击',
      description: '攻击者控制验证者多数',
      impact: '资金被盗或双花'
    },
    {
      name: '重放攻击',
      description: '重复执行跨链交易',
      impact: '重复铸造代币'
    },
    {
      name: '预言机操纵',
      description: '操纵价格预言机数据',
      impact: '不公平的汇率转换'
    }
  ];

  const executeBridge = async () => {
    setIsBridging(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsBridging(false);
    alert('跨链转账已提交！');
  };

  const switchChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const getSecurityColor = (security: string) => {
    switch (security) {
      case 'High': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Low': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'High': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            跨链桥测试平台
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            测试跨链资产转移的安全性、效率和可靠性
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* 跨链操作 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                跨链转账
              </h2>

              {/* 链选择 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    源链
                  </label>
                  <select
                    value={fromChain}
                    onChange={(e) => setFromChain(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {chains.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.logo} {chain.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    目标链
                  </label>
                  <select
                    value={toChain}
                    onChange={(e) => setToChain(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {chains.filter(chain => chain.id !== fromChain).map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.logo} {chain.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 切换按钮 */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={switchChains}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>

              {/* 资产和数量 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    资产
                  </label>
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                    <option value="DAI">DAI</option>
                    <option value="WBTC">WBTC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    数量
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* 桥选择 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  选择跨链桥
                </label>
                <div className="space-y-3">
                  {bridges.map((bridge) => (
                    <div
                      key={bridge.id}
                      onClick={() => setSelectedBridge(bridge.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedBridge === bridge.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {bridge.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getSecurityColor(bridge.security)}`}>
                          {bridge.security}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">手续费: </span>
                          <span className="text-gray-900 dark:text-white">{bridge.fee}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">时间: </span>
                          <span className="text-gray-900 dark:text-white">{bridge.time}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">类型: </span>
                          <span className="text-gray-900 dark:text-white">{bridge.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 执行按钮 */}
              <button
                onClick={executeBridge}
                disabled={!amount || isBridging}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                {isBridging ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    跨链中...
                  </>
                ) : (
                  '开始跨链转账'
                )}
              </button>
            </div>
          </div>

          {/* 链信息 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                链信息对比
              </h2>
              
              <div className="space-y-4">
                {[fromChain, toChain].map((chainId) => {
                  const chain = chains.find(c => c.id === chainId);
                  if (!chain) return null;
                  
                  return (
                    <div key={chainId} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                        <span className="mr-2">{chain.logo}</span>
                        {chain.name}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Gas 价格</span>
                          <span className="text-gray-900 dark:text-white">{chain.gasPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">出块时间</span>
                          <span className="text-gray-900 dark:text-white">{chain.blockTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">TVL</span>
                          <span className="text-gray-900 dark:text-white">{chain.tvl}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 风险因素 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                风险评估
              </h2>
              <div className="space-y-3">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {risk.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(risk.level)}`}>
                        {risk.level}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {risk.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 攻击场景模拟 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            跨链攻击模拟
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {attackScenarios.map((scenario, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {scenario.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {scenario.description}
                </p>
                <div className="mb-4">
                  <span className="text-xs text-gray-500">潜在影响: </span>
                  <span className="text-xs text-red-600 dark:text-red-400">{scenario.impact}</span>
                </div>
                <button className="w-full px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                  模拟攻击
                </button>
              </div>
            ))}
          </div>

          {/* 监控面板 */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                99.8%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">成功率</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                5.2min
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">平均时间</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                $125M
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">24h 交易量</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                $2.8M
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">桥内 TVL</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
