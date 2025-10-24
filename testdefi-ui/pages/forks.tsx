import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function ForksPage() {
  const [forkName, setForkName] = useState('');
  const [rpcUrl, setRpcUrl] = useState('');
  const [blockNumber, setBlockNumber] = useState('');

  const forks = [
    { id: 'fork-1', name: 'Mainnet Fork', rpc: 'http://localhost:8545', block: '18500000', status: 'running', created: '2 小时前' },
    { id: 'fork-2', name: 'Arbitrum Fork', rpc: 'http://localhost:8546', block: '150000000', status: 'stopped', created: '1 天前' },
    { id: 'fork-3', name: 'Polygon Fork', rpc: 'http://localhost:8547', block: '48000000', status: 'running', created: '3 天前' },
  ];

  const handleCreateFork = () => {
    console.log('Creating fork:', { forkName, rpcUrl, blockNumber });
    // TODO: Implement fork creation logic
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Fork 管理
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Create Fork */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                创建新 Fork
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fork 名称
                  </label>
                  <input
                    type="text"
                    value={forkName}
                    onChange={(e) => setForkName(e.target.value)}
                    placeholder="输入 Fork 名称..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    RPC URL
                  </label>
                  <select
                    value={rpcUrl}
                    onChange={(e) => setRpcUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">选择网络...</option>
                    <option value="https://eth-mainnet.g.alchemy.com/v2/...">Ethereum Mainnet</option>
                    <option value="https://arb-mainnet.g.alchemy.com/v2/...">Arbitrum One</option>
                    <option value="https://polygon-mainnet.g.alchemy.com/v2/...">Polygon</option>
                    <option value="https://opt-mainnet.g.alchemy.com/v2/...">Optimism</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    区块高度 (可选)
                  </label>
                  <input
                    type="number"
                    value={blockNumber}
                    onChange={(e) => setBlockNumber(e.target.value)}
                    placeholder="留空使用最新区块"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <button
                  onClick={handleCreateFork}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  创建 Fork
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  快速模板
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setForkName('Mainnet Fork');
                      setRpcUrl('https://eth-mainnet.g.alchemy.com/v2/...');
                      setBlockNumber('');
                    }}
                    className="w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Ethereum 主网
                  </button>
                  <button
                    onClick={() => {
                      setForkName('DeFi Testing Fork');
                      setRpcUrl('https://eth-mainnet.g.alchemy.com/v2/...');
                      setBlockNumber('18500000');
                    }}
                    className="w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    DeFi 测试环境
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Fork List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Fork 列表
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {forks.map((fork) => (
                    <div
                      key={fork.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {fork.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              fork.status === 'running'
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                            }`}
                          >
                            {fork.status === 'running' ? '运行中' : '已停止'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                            {fork.status === 'running' ? '停止' : '启动'}
                          </button>
                          <button className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                            删除
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">RPC:</span>
                          <div className="font-mono text-gray-900 dark:text-white break-all">
                            {fork.rpc}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">区块:</span>
                          <div className="font-mono text-gray-900 dark:text-white">
                            {fork.block}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">创建时间:</span>
                          <div className="text-gray-900 dark:text-white">
                            {fork.created}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex space-x-4 text-sm">
                          <button className="text-blue-600 dark:text-blue-400 hover:underline">
                            连接钱包
                          </button>
                          <button className="text-blue-600 dark:text-blue-400 hover:underline">
                            查看日志
                          </button>
                          <button className="text-blue-600 dark:text-blue-400 hover:underline">
                            导出配置
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fork Statistics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">总 Fork 数</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">运行中</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">1.2GB</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">存储使用</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
