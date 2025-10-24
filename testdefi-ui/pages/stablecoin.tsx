import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function StablecoinPage() {
  const [selectedCoin, setSelectedCoin] = useState('usdc');
  const [testScenario, setTestScenario] = useState('peg-stability');
  const [isRunning, setIsRunning] = useState(false);

  const stablecoins = [
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      type: '法币抵押',
      marketCap: '$52.8B',
      peg: '1.0001',
      collateral: '现金及等价物',
      risk: 'Low'
    },
    {
      id: 'dai',
      name: 'Dai',
      symbol: 'DAI',
      type: '加密抵押',
      marketCap: '$5.2B',
      peg: '0.9998',
      collateral: 'ETH, WBTC等',
      risk: 'Medium'
    },
    {
      id: 'frax',
      name: 'Frax',
      symbol: 'FRAX',
      type: '算法稳定币',
      marketCap: '$1.1B',
      peg: '1.0003',
      collateral: '部分抵押',
      risk: 'High'
    },
    {
      id: 'ust',
      name: 'TerraUSD',
      symbol: 'UST',
      type: '算法稳定币',
      marketCap: '$已脱锚',
      peg: '0.0234',
      collateral: 'LUNA (已崩溃)',
      risk: 'Critical'
    }
  ];

  const testScenarios = [
    {
      id: 'peg-stability',
      name: '锚定稳定性测试',
      description: '测试在市场波动下的价格稳定性',
      duration: '24小时',
      metrics: ['价格偏差', '交易量', '流动性']
    },
    {
      id: 'stress-test',
      name: '压力测试',
      description: '模拟极端市场条件下的表现',
      duration: '1小时',
      metrics: ['最大偏差', '恢复时间', '流动性枯竭']
    },
    {
      id: 'arbitrage-test',
      name: '套利机制测试',
      description: '测试套利者如何帮助维持锚定',
      duration: '6小时',
      metrics: ['套利机会', '价格收敛', '交易成本']
    },
    {
      id: 'depeg-simulation',
      name: '脱锚模拟',
      description: '模拟大规模赎回导致的脱锚风险',
      duration: '2小时',
      metrics: ['脱锚程度', '恢复能力', '系统风险']
    }
  ];

  const riskFactors = [
    { name: '抵押品风险', level: 'Medium', description: '抵押品价格波动影响' },
    { name: '流动性风险', level: 'Low', description: '市场流动性不足风险' },
    { name: '治理风险', level: 'Medium', description: '治理决策影响稳定性' },
    { name: '技术风险', level: 'Low', description: '智能合约漏洞风险' },
    { name: '监管风险', level: 'High', description: '监管政策变化影响' }
  ];

  const runTest = async () => {
    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRunning(false);
    alert('测试完成！');
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'High': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'Critical': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            稳定币测试平台
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            测试各类稳定币的锚定机制、风险因素和市场表现
          </p>
        </div>

        {/* 稳定币选择 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stablecoins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => setSelectedCoin(coin.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedCoin === coin.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {coin.symbol}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(coin.risk)}`}>
                  {coin.risk}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {coin.name}
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">类型</span>
                  <span className="text-gray-900 dark:text-white">{coin.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">市值</span>
                  <span className="text-gray-900 dark:text-white">{coin.marketCap}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">当前价格</span>
                  <span className={`font-medium ${
                    Math.abs(parseFloat(coin.peg) - 1) < 0.01 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    ${coin.peg}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* 测试场景 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                测试场景
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {testScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    onClick={() => setTestScenario(scenario.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      testScenario === scenario.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      {scenario.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {scenario.description}
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">持续时间</span>
                        <span className="text-gray-900 dark:text-white">{scenario.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">监控指标: </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {scenario.metrics.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={runTest}
                disabled={isRunning}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                {isRunning ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    运行测试中...
                  </>
                ) : (
                  '开始测试'
                )}
              </button>
            </div>
          </div>

          {/* 风险因素 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                风险因素分析
              </h2>
              <div className="space-y-3">
                {riskFactors.map((factor, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {factor.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(factor.level)}`}>
                        {factor.level}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {factor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 实时监控面板 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            实时监控面板
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                $1.0001
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">当前价格</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                0.01%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">偏差程度</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                $125M
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">24h交易量</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                98.5%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">抵押率</div>
            </div>
          </div>

          {/* 价格图表模拟 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">24小时价格走势</h3>
            <div className="h-32 flex items-end justify-center">
              <div className="flex items-end space-x-1 w-full max-w-md">
                {Array.from({length: 24}, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500 dark:bg-blue-400 rounded-t"
                    style={{
                      height: `${Math.random() * 20 + 80}%`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>24h前</span>
              <span className="text-red-500">目标: $1.00</span>
              <span>现在</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
