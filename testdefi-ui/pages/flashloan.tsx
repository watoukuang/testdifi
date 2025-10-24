import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function FlashLoanPage() {
  const [selectedProtocol, setSelectedProtocol] = useState('aave');
  const [selectedStrategy, setSelectedStrategy] = useState('arbitrage');
  const [loanAmount, setLoanAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('ETH');
  const [isExecuting, setIsExecuting] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any>(null);

  const protocols = [
    {
      id: 'aave',
      name: 'Aave',
      fee: '0.09%',
      maxLoan: '$50M',
      assets: ['ETH', 'USDC', 'DAI', 'WBTC'],
      gasEstimate: '~300k'
    },
    {
      id: 'dydx',
      name: 'dYdX',
      fee: '0%',
      maxLoan: '$10M',
      assets: ['ETH', 'USDC', 'DAI'],
      gasEstimate: '~250k'
    },
    {
      id: 'uniswap',
      name: 'Uniswap V3',
      fee: '动态',
      maxLoan: '无限制',
      assets: ['所有 ERC20'],
      gasEstimate: '~400k'
    }
  ];

  const strategies = [
    {
      id: 'arbitrage',
      name: '套利交易',
      description: '利用不同交易所价格差异获利',
      complexity: 'Medium',
      profitPotential: 'Medium',
      riskLevel: 'Low'
    },
    {
      id: 'liquidation',
      name: '清算套利',
      description: '清算抵押不足的借贷头寸',
      complexity: 'High',
      profitPotential: 'High',
      riskLevel: 'Medium'
    },
    {
      id: 'collateral-swap',
      name: '抵押品置换',
      description: '无需额外资金更换抵押品类型',
      complexity: 'Low',
      profitPotential: 'Low',
      riskLevel: 'Low'
    },
    {
      id: 'attack-simulation',
      name: '攻击模拟',
      description: '模拟恶意闪电贷攻击场景',
      complexity: 'Very High',
      profitPotential: 'Variable',
      riskLevel: 'High'
    }
  ];

  const attackScenarios = [
    {
      name: '价格操纵攻击',
      description: '通过大额交易操纵 AMM 价格',
      target: 'DEX 流动性池',
      method: '闪电贷 → 大额交易 → 价格操纵 → 套利 → 还款'
    },
    {
      name: '治理攻击',
      description: '临时获得大量治理代币影响投票',
      target: 'DAO 治理系统',
      method: '闪电贷 → 购买治理代币 → 投票 → 卖出代币 → 还款'
    },
    {
      name: '重入攻击',
      description: '利用合约重入漏洞重复提取资金',
      target: '存在重入漏洞的合约',
      method: '闪电贷 → 调用漏洞函数 → 重入提取 → 还款'
    }
  ];

  const executeFlashLoan = async () => {
    setIsExecuting(true);
    
    // 模拟闪电贷执行
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 模拟结果
    const mockResults = {
      success: Math.random() > 0.3,
      profit: (Math.random() * 1000).toFixed(2),
      gasUsed: Math.floor(Math.random() * 100000 + 200000),
      executionTime: (Math.random() * 5 + 1).toFixed(2),
      steps: [
        '1. 从 Aave 借入 100 ETH',
        '2. 在 Uniswap 交换 ETH → USDC',
        '3. 在 SushiSwap 交换 USDC → ETH',
        '4. 偿还闪电贷 + 手续费',
        '5. 获得套利利润'
      ]
    };
    
    setSimulationResults(mockResults);
    setIsExecuting(false);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'High': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'Very High': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            闪电贷测试平台
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            测试闪电贷策略，模拟套利和攻击场景
          </p>
        </div>

        {/* 警告提示 */}
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">安全提醒</h3>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                闪电贷是高风险操作，仅用于测试环境。请勿在主网上执行未经充分测试的策略。
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
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
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {protocol.name}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">手续费</span>
                        <span className="text-gray-900 dark:text-white">{protocol.fee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">最大借款</span>
                        <span className="text-gray-900 dark:text-white">{protocol.maxLoan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Gas 估算</span>
                        <span className="text-gray-900 dark:text-white">{protocol.gasEstimate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 策略配置 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                配置闪电贷策略
              </h2>

              {/* 策略选择 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  选择策略
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strategies.map((strategy) => (
                    <div
                      key={strategy.id}
                      onClick={() => setSelectedStrategy(strategy.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedStrategy === strategy.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {strategy.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getComplexityColor(strategy.complexity)}`}>
                          {strategy.complexity === 'Low' ? '简单' : 
                           strategy.complexity === 'Medium' ? '中等' : 
                           strategy.complexity === 'High' ? '复杂' : '极复杂'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {strategy.description}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                        <span>利润: {strategy.profitPotential}</span>
                        <span>风险: {strategy.riskLevel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 参数配置 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    借款资产
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
                    借款数量
                  </label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="输入数量"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* 执行按钮 */}
              <button
                onClick={executeFlashLoan}
                disabled={!loanAmount || isExecuting}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                {isExecuting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    执行中...
                  </>
                ) : (
                  '执行闪电贷'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 执行结果 */}
        {simulationResults && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              执行结果
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className={`p-4 rounded-lg mb-4 ${
                  simulationResults.success 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center">
                    {simulationResults.success ? (
                      <svg className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className={`font-medium ${
                      simulationResults.success 
                        ? 'text-green-800 dark:text-green-300' 
                        : 'text-red-800 dark:text-red-300'
                    }`}>
                      {simulationResults.success ? '执行成功' : '执行失败'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">利润</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      ${simulationResults.profit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Gas 消耗</span>
                    <span className="text-gray-900 dark:text-white">{simulationResults.gasUsed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">执行时间</span>
                    <span className="text-gray-900 dark:text-white">{simulationResults.executionTime}s</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">执行步骤</h3>
                <div className="space-y-2">
                  {simulationResults.steps.map((step: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 攻击场景 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            攻击场景模拟
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {attackScenarios.map((scenario, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {scenario.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {scenario.description}
                </p>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-500">目标: </span>
                    <span className="text-gray-900 dark:text-white">{scenario.target}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">方法: </span>
                    <span className="text-gray-700 dark:text-gray-300">{scenario.method}</span>
                  </div>
                </div>
                <button className="mt-3 w-full px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                  模拟攻击
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
