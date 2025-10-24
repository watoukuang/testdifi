import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function YieldFarmingPage() {
  const [selectedPool, setSelectedPool] = useState('eth-usdc');
  const [action, setAction] = useState('stake');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pools = [
    {
      id: 'eth-usdc',
      name: 'ETH/USDC',
      protocol: 'Uniswap V3',
      apy: '45.2%',
      tvl: '$125M',
      rewards: ['UNI', 'COMP'],
      risk: 'Medium',
      impermanentLoss: '2.1%'
    },
    {
      id: 'dai-usdc',
      name: 'DAI/USDC',
      protocol: 'Curve',
      apy: '12.8%',
      tvl: '$89M',
      rewards: ['CRV', 'CVX'],
      risk: 'Low',
      impermanentLoss: '0.1%'
    },
    {
      id: 'wbtc-eth',
      name: 'WBTC/ETH',
      protocol: 'SushiSwap',
      apy: '38.7%',
      tvl: '$67M',
      rewards: ['SUSHI'],
      risk: 'High',
      impermanentLoss: '5.3%'
    }
  ];

  const strategies = [
    {
      name: '稳定币策略',
      desc: '低风险稳定收益，适合保守投资者',
      expectedApy: '8-15%',
      risk: 'Low',
      pools: ['DAI/USDC', 'USDT/USDC']
    },
    {
      name: '蓝筹策略',
      desc: '主流代币对，平衡收益与风险',
      expectedApy: '20-40%',
      risk: 'Medium',
      pools: ['ETH/USDC', 'WBTC/ETH']
    },
    {
      name: '高收益策略',
      desc: '追求最高收益，承担较高风险',
      expectedApy: '50-100%',
      risk: 'High',
      pools: ['新币/ETH', 'MEME/USDC']
    }
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert(`${action === 'stake' ? '质押' : '取消质押'} 成功！`);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'High': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/30';
      case 'High': return 'bg-red-100 dark:bg-red-900/30';
      default: return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            收益农场测试
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            测试流动性挖矿策略，分析收益率和无常损失
          </p>
        </div>

        {/* 策略概览 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {strategy.name}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getRiskBg(strategy.risk)} ${getRiskColor(strategy.risk)}`}>
                  {strategy.risk === 'Low' ? '低风险' : strategy.risk === 'Medium' ? '中风险' : '高风险'}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {strategy.desc}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">预期 APY</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">{strategy.expectedApy}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  推荐池: {strategy.pools.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 流动性池选择 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                选择流动性池
              </h2>
              <div className="space-y-4">
                {pools.map((pool) => (
                  <div
                    key={pool.id}
                    onClick={() => setSelectedPool(pool.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedPool === pool.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {pool.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{pool.protocol}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">
                          {pool.apy}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">APY</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">TVL</span>
                        <div className="font-medium text-gray-900 dark:text-white">{pool.tvl}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">风险</span>
                        <div className={`font-medium ${getRiskColor(pool.risk)}`}>
                          {pool.risk === 'Low' ? '低' : pool.risk === 'Medium' ? '中' : '高'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">无常损失</span>
                        <div className="font-medium text-gray-900 dark:text-white">{pool.impermanentLoss}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">奖励代币</span>
                        <div className="flex space-x-1">
                          {pool.rewards.map((reward, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
                              {reward}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 操作面板 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                流动性操作
              </h2>

              {/* 操作类型 */}
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-4">
                <button
                  onClick={() => setAction('stake')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    action === 'stake'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  添加流动性
                </button>
                <button
                  onClick={() => setAction('unstake')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    action === 'unstake'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  移除流动性
                </button>
              </div>

              {/* 数量输入 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LP 代币数量
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-16"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                    MAX
                  </button>
                </div>
              </div>

              {/* 收益预览 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">收益预览</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">日收益</span>
                    <span className="text-green-600 dark:text-green-400">~$12.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">月收益</span>
                    <span className="text-green-600 dark:text-green-400">~$375.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">年收益</span>
                    <span className="text-green-600 dark:text-green-400">~$4,500.00</span>
                  </div>
                </div>
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
                  action === 'stake' ? '添加流动性' : '移除流动性'
                )}
              </button>
            </div>

            {/* 风险提示 */}
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">风险提示</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                    流动性挖矿存在无常损失风险，请根据自身风险承受能力谨慎投资。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
