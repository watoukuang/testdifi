import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function OraclePage() {
  const [selectedOracle, setSelectedOracle] = useState('chainlink');
  const [selectedAsset, setSelectedAsset] = useState('ETH/USD');
  const [customPrice, setCustomPrice] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [priceHistory, setPriceHistory] = useState<Array<{time: string, price: number}>>([]);

  const oracles = [
    {
      id: 'chainlink',
      name: 'Chainlink',
      description: '去中心化预言机网络',
      latency: '~30s',
      accuracy: '99.9%',
      feeds: 150
    },
    {
      id: 'band',
      name: 'Band Protocol',
      description: '跨链数据预言机',
      latency: '~15s',
      accuracy: '99.7%',
      feeds: 85
    },
    {
      id: 'uma',
      name: 'UMA',
      description: '乐观预言机系统',
      latency: '~2h',
      accuracy: '99.5%',
      feeds: 45
    }
  ];

  const assets = [
    { pair: 'ETH/USD', price: 2456.78, change: '+2.34%', volatility: 'High' },
    { pair: 'BTC/USD', price: 43287.91, change: '+1.87%', volatility: 'Medium' },
    { pair: 'USDC/USD', price: 1.0001, change: '+0.01%', volatility: 'Low' },
    { pair: 'LINK/USD', price: 14.67, change: '+5.23%', volatility: 'High' },
    { pair: 'UNI/USD', price: 8.92, change: '-1.45%', volatility: 'High' },
  ];

  const scenarios = [
    {
      name: '价格操纵攻击',
      description: '模拟恶意操纵预言机价格',
      severity: 'High',
      impact: '可能导致协议损失'
    },
    {
      name: '预言机故障',
      description: '模拟预言机服务中断',
      severity: 'Medium',
      impact: '交易暂停或使用备用价格'
    },
    {
      name: '价格延迟',
      description: '模拟价格更新延迟',
      severity: 'Low',
      impact: '轻微套利机会'
    },
    {
      name: '闪电贷攻击',
      description: '结合闪电贷的价格操纵',
      severity: 'Critical',
      impact: '严重资金损失风险'
    }
  ];

  useEffect(() => {
    // 模拟价格历史数据
    const generatePriceHistory = () => {
      const history = [];
      const basePrice = assets.find(a => a.pair === selectedAsset)?.price || 2456.78;
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(Date.now() - i * 60 * 60 * 1000).toLocaleTimeString('zh-CN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        const variation = (Math.random() - 0.5) * 0.1;
        const price = basePrice * (1 + variation);
        history.push({ time, price });
      }
      setPriceHistory(history);
    };

    generatePriceHistory();
    const interval = setInterval(generatePriceHistory, 30000); // 每30秒更新
    return () => clearInterval(interval);
  }, [selectedAsset]);

  const handlePriceUpdate = async () => {
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUpdating(false);
    alert(`${selectedAsset} 价格已更新为 $${customPrice}`);
    setCustomPrice('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
            价格预言机测试
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            测试价格预言机的准确性、延迟和安全性
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* 预言机选择 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                选择预言机
              </h2>
              <div className="space-y-3">
                {oracles.map((oracle) => (
                  <div
                    key={oracle.id}
                    onClick={() => setSelectedOracle(oracle.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedOracle === oracle.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {oracle.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {oracle.description}
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">延迟</span>
                        <span className="text-gray-900 dark:text-white">{oracle.latency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">准确率</span>
                        <span className="text-green-600 dark:text-green-400">{oracle.accuracy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">价格源</span>
                        <span className="text-gray-900 dark:text-white">{oracle.feeds}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 价格监控 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  实时价格监控
                </h2>
                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {assets.map((asset) => (
                    <option key={asset.pair} value={asset.pair}>
                      {asset.pair}
                    </option>
                  ))}
                </select>
              </div>

              {/* 当前价格显示 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {assets
                  .filter(asset => asset.pair === selectedAsset)
                  .map((asset) => (
                    <React.Fragment key={asset.pair}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${asset.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">当前价格</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-semibold ${
                          asset.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {asset.change}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">24h 变化</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          {asset.volatility}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">波动性</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium text-green-600 dark:text-green-400">
                          在线
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">状态</div>
                      </div>
                    </React.Fragment>
                  ))}
              </div>

              {/* 价格历史图表 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">24小时价格走势</h3>
                <div className="h-32 flex items-end space-x-1">
                  {priceHistory.map((point, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-blue-500 dark:bg-blue-400 rounded-t"
                      style={{
                        height: `${((point.price - Math.min(...priceHistory.map(p => p.price))) / 
                          (Math.max(...priceHistory.map(p => p.price)) - Math.min(...priceHistory.map(p => p.price)))) * 100 + 10}%`
                      }}
                      title={`${point.time}: $${point.price.toFixed(2)}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>24h前</span>
                  <span>现在</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 价格操作 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              价格操作测试
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  设置自定义价格
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="输入价格"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handlePriceUpdate}
                    disabled={!customPrice || isUpdating}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    {isUpdating ? '更新中...' : '更新'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                  模拟价格崩盘 (-50%)
                </button>
                <button className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                  模拟价格暴涨 (+100%)
                </button>
                <button className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">
                  模拟价格延迟
                </button>
                <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                  模拟预言机故障
                </button>
              </div>
            </div>
          </div>

          {/* 攻击场景 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              攻击场景测试
            </h2>
            
            <div className="space-y-3">
              {scenarios.map((scenario, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {scenario.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(scenario.severity)}`}>
                      {scenario.severity === 'Low' ? '低风险' : 
                       scenario.severity === 'Medium' ? '中风险' : 
                       scenario.severity === 'High' ? '高风险' : '严重'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {scenario.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    影响: {scenario.impact}
                  </p>
                  <button className="mt-2 px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    运行测试
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
