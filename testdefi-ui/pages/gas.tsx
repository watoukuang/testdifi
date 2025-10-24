import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function GasPage() {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [gasData, setGasData] = useState({
    slow: { price: '15', time: '5+ min', usd: '$3.20' },
    standard: { price: '20', time: '2-3 min', usd: '$4.30' },
    fast: { price: '25', time: '< 1 min', usd: '$5.40' }
  });

  const networks = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC' },
    { id: 'arbitrum', name: 'Arbitrum', symbol: 'ETH' },
    { id: 'optimism', name: 'Optimism', symbol: 'ETH' }
  ];

  const transactionTypes = [
    { type: 'transfer', name: 'ETH 转账', gasLimit: '21000' },
    { type: 'erc20', name: 'ERC20 转账', gasLimit: '65000' },
    { type: 'swap', name: 'Uniswap 交换', gasLimit: '150000' },
    { type: 'liquidity', name: '添加流动性', gasLimit: '200000' },
    { type: 'deploy', name: '部署合约', gasLimit: '1200000' }
  ];

  const [selectedTxType, setSelectedTxType] = useState('transfer');
  const [customGasLimit, setCustomGasLimit] = useState('21000');
  const [customGasPrice, setCustomGasPrice] = useState('20');

  const gasHistory = [
    { time: '14:30', slow: 15, standard: 20, fast: 25 },
    { time: '14:25', slow: 16, standard: 21, fast: 26 },
    { time: '14:20', slow: 14, standard: 19, fast: 24 },
    { time: '14:15', slow: 15, standard: 20, fast: 25 },
    { time: '14:10', slow: 17, standard: 22, fast: 27 },
    { time: '14:05', slow: 16, standard: 21, fast: 26 },
    { time: '14:00', slow: 15, standard: 20, fast: 25 }
  ];

  const calculateCost = (gasPrice: string, gasLimit: string) => {
    const price = parseFloat(gasPrice);
    const limit = parseFloat(gasLimit);
    const costInGwei = price * limit;
    const costInEth = costInGwei / 1e9;
    const costInUsd = costInEth * 1800; // Assuming ETH = $1800
    return {
      gwei: costInGwei.toLocaleString(),
      eth: costInEth.toFixed(6),
      usd: costInUsd.toFixed(2)
    };
  };

  const getCurrentTxGasLimit = () => {
    const txType = transactionTypes.find(t => t.type === selectedTxType);
    return txType ? txType.gasLimit : customGasLimit;
  };

  // Simulate real-time gas price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGasData(prev => ({
        slow: {
          price: (parseInt(prev.slow.price) + Math.floor(Math.random() * 3) - 1).toString(),
          time: '5+ min',
          usd: '$' + (parseFloat(prev.slow.price) * 21000 / 1e9 * 1800).toFixed(2)
        },
        standard: {
          price: (parseInt(prev.standard.price) + Math.floor(Math.random() * 3) - 1).toString(),
          time: '2-3 min',
          usd: '$' + (parseFloat(prev.standard.price) * 21000 / 1e9 * 1800).toFixed(2)
        },
        fast: {
          price: (parseInt(prev.fast.price) + Math.floor(Math.random() * 3) - 1).toString(),
          time: '< 1 min',
          usd: '$' + (parseFloat(prev.fast.price) * 21000 / 1e9 * 1800).toFixed(2)
        }
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Gas 费用监控
        </h1>

        {/* Network Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            选择网络
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => setSelectedNetwork(network.id)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  selectedNetwork === network.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {network.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {network.symbol}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Gas Prices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                慢速 🐌
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {gasData.slow.time}
              </span>
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {gasData.slow.price} gwei
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ≈ {gasData.slow.usd} (21k gas)
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                标准 ⚡
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {gasData.standard.time}
              </span>
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {gasData.standard.price} gwei
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ≈ {gasData.standard.usd} (21k gas)
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                快速 🚀
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {gasData.fast.time}
              </span>
            </div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {gasData.fast.price} gwei
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ≈ {gasData.fast.usd} (21k gas)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gas Calculator */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Gas 费用计算器
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  交易类型
                </label>
                <select
                  value={selectedTxType}
                  onChange={(e) => setSelectedTxType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {transactionTypes.map((tx) => (
                    <option key={tx.type} value={tx.type}>
                      {tx.name} ({tx.gasLimit} gas)
                    </option>
                  ))}
                  <option value="custom">自定义</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gas 限制
                  </label>
                  <input
                    type="number"
                    value={selectedTxType === 'custom' ? customGasLimit : getCurrentTxGasLimit()}
                    onChange={(e) => setCustomGasLimit(e.target.value)}
                    disabled={selectedTxType !== 'custom'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gas 价格 (gwei)
                  </label>
                  <input
                    type="number"
                    value={customGasPrice}
                    onChange={(e) => setCustomGasPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  预估费用
                </h4>
                {(() => {
                  const cost = calculateCost(customGasPrice, selectedTxType === 'custom' ? customGasLimit : getCurrentTxGasLimit());
                  return (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">总 Gas:</span>
                        <span className="font-mono text-gray-900 dark:text-white">{cost.gwei}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ETH 费用:</span>
                        <span className="font-mono text-gray-900 dark:text-white">{cost.eth} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">USD 费用:</span>
                        <span className="font-mono text-gray-900 dark:text-white">${cost.usd}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setCustomGasPrice(gasData.slow.price)}
                  className="px-3 py-2 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  慢速
                </button>
                <button
                  onClick={() => setCustomGasPrice(gasData.standard.price)}
                  className="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  标准
                </button>
                <button
                  onClick={() => setCustomGasPrice(gasData.fast.price)}
                  className="px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  快速
                </button>
              </div>
            </div>
          </div>

          {/* Gas Price History */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Gas 价格历史
            </h3>
            
            <div className="space-y-3">
              {gasHistory.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {entry.time}
                  </span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-green-600 dark:text-green-400">
                      {entry.slow}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {entry.standard}
                    </span>
                    <span className="text-red-600 dark:text-red-400">
                      {entry.fast}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>🟢 慢速</span>
              <span>🔵 标准</span>
              <span>🔴 快速</span>
            </div>
          </div>
        </div>

        {/* Gas Optimization Tips */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Gas 优化建议
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                💡 节省 Gas 的技巧
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 在网络拥堵较少时进行交易</li>
                <li>• 使用批量操作减少交易次数</li>
                <li>• 选择合适的 Gas 价格，避免过高设置</li>
                <li>• 考虑使用 Layer 2 解决方案</li>
                <li>• 优化智能合约代码减少 Gas 消耗</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                ⚠️ 注意事项
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Gas 价格过低可能导致交易长时间未确认</li>
                <li>• 复杂合约交互需要更高的 Gas 限制</li>
                <li>• 网络拥堵时 Gas 价格会显著上升</li>
                <li>• 失败的交易仍会消耗 Gas 费用</li>
                <li>• 建议设置合理的 Gas 限制避免浪费</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gas Tracker Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {gasData.standard.price}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">当前标准 Gas</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.min(...gasHistory.map(h => h.slow))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">24h 最低</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {Math.max(...gasHistory.map(h => h.fast))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">24h 最高</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round(gasHistory.reduce((sum, h) => sum + h.standard, 0) / gasHistory.length)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">平均 Gas</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
