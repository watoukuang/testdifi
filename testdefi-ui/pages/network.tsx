import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function NetworkPage() {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [customRpc, setCustomRpc] = useState('');
  const [showAddNetwork, setShowAddNetwork] = useState(false);

  const networks = [
    {
      id: 'ethereum',
      name: 'Ethereum Mainnet',
      chainId: '1',
      rpc: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
      explorer: 'https://etherscan.io',
      currency: 'ETH',
      status: 'connected',
      latency: '45ms',
      blockHeight: '18,500,123'
    },
    {
      id: 'goerli',
      name: 'Goerli Testnet',
      chainId: '5',
      rpc: 'https://goerli.infura.io/v3/YOUR_PROJECT_ID',
      explorer: 'https://goerli.etherscan.io',
      currency: 'GoerliETH',
      status: 'available',
      latency: '52ms',
      blockHeight: '9,800,456'
    },
    {
      id: 'sepolia',
      name: 'Sepolia Testnet',
      chainId: '11155111',
      rpc: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
      explorer: 'https://sepolia.etherscan.io',
      currency: 'SepoliaETH',
      status: 'available',
      latency: '38ms',
      blockHeight: '4,500,789'
    },
    {
      id: 'polygon',
      name: 'Polygon Mainnet',
      chainId: '137',
      rpc: 'https://polygon-rpc.com/',
      explorer: 'https://polygonscan.com',
      currency: 'MATIC',
      status: 'available',
      latency: '28ms',
      blockHeight: '48,000,123'
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum One',
      chainId: '42161',
      rpc: 'https://arb1.arbitrum.io/rpc',
      explorer: 'https://arbiscan.io',
      currency: 'ETH',
      status: 'available',
      latency: '35ms',
      blockHeight: '150,000,456'
    },
    {
      id: 'optimism',
      name: 'Optimism',
      chainId: '10',
      rpc: 'https://mainnet.optimism.io',
      explorer: 'https://optimistic.etherscan.io',
      currency: 'ETH',
      status: 'available',
      latency: '42ms',
      blockHeight: '112,000,789'
    },
    {
      id: 'local',
      name: 'Local Hardhat',
      chainId: '31337',
      rpc: 'http://localhost:8545',
      explorer: 'N/A',
      currency: 'ETH',
      status: 'disconnected',
      latency: 'N/A',
      blockHeight: 'N/A'
    }
  ];

  const [newNetwork, setNewNetwork] = useState({
    name: '',
    chainId: '',
    rpc: '',
    explorer: '',
    currency: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'available':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'disconnected':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return '已连接';
      case 'available':
        return '可用';
      case 'disconnected':
        return '未连接';
      default:
        return '未知';
    }
  };

  const handleSwitchNetwork = (networkId: string) => {
    setSelectedNetwork(networkId);
    // TODO: Implement actual network switching
    console.log('Switching to network:', networkId);
  };

  const handleAddNetwork = () => {
    // TODO: Implement adding custom network
    console.log('Adding network:', newNetwork);
    setShowAddNetwork(false);
    setNewNetwork({ name: '', chainId: '', rpc: '', explorer: '', currency: '' });
  };

  const testConnection = async (rpc: string) => {
    // TODO: Implement actual connection test
    console.log('Testing connection to:', rpc);
    return Math.random() > 0.2; // Mock success rate
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          网络设置
        </h1>

        {/* Current Network Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            当前网络状态
          </h2>
          
          {(() => {
            const currentNetwork = networks.find(n => n.id === selectedNetwork);
            return currentNetwork ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">网络名称</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentNetwork.name}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">链 ID</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentNetwork.chainId}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">延迟</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentNetwork.latency}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">区块高度</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentNetwork.blockHeight}
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>

        {/* Network List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              可用网络
            </h2>
            <button
              onClick={() => setShowAddNetwork(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              添加网络
            </button>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {networks.map((network) => (
              <div key={network.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      network.status === 'connected' ? 'bg-green-500' :
                      network.status === 'available' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {network.name}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Chain ID: {network.chainId} • Currency: {network.currency}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(network.status)}`}>
                      {getStatusText(network.status)}
                    </span>
                    
                    {network.status !== 'connected' && (
                      <button
                        onClick={() => handleSwitchNetwork(network.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        连接
                      </button>
                    )}
                    
                    {network.status === 'connected' && (
                      <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                        当前网络
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">RPC URL:</span>
                    <div className="font-mono text-gray-900 dark:text-white break-all">
                      {network.rpc}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">区块浏览器:</span>
                    <div className="text-gray-900 dark:text-white">
                      {network.explorer !== 'N/A' ? (
                        <a href={network.explorer} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                          {network.explorer}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">延迟:</span>
                    <div className="text-gray-900 dark:text-white">
                      {network.latency}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => testConnection(network.rpc)}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded transition-colors"
                  >
                    测试连接
                  </button>
                  <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    编辑
                  </button>
                  {network.id !== 'ethereum' && (
                    <button className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:underline">
                      删除
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Network Modal */}
        {showAddNetwork && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                添加自定义网络
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    网络名称
                  </label>
                  <input
                    type="text"
                    value={newNetwork.name}
                    onChange={(e) => setNewNetwork({...newNetwork, name: e.target.value})}
                    placeholder="例如: My Custom Network"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    链 ID
                  </label>
                  <input
                    type="text"
                    value={newNetwork.chainId}
                    onChange={(e) => setNewNetwork({...newNetwork, chainId: e.target.value})}
                    placeholder="例如: 1337"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    RPC URL
                  </label>
                  <input
                    type="text"
                    value={newNetwork.rpc}
                    onChange={(e) => setNewNetwork({...newNetwork, rpc: e.target.value})}
                    placeholder="例如: https://rpc.example.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    区块浏览器 URL (可选)
                  </label>
                  <input
                    type="text"
                    value={newNetwork.explorer}
                    onChange={(e) => setNewNetwork({...newNetwork, explorer: e.target.value})}
                    placeholder="例如: https://explorer.example.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    货币符号
                  </label>
                  <input
                    type="text"
                    value={newNetwork.currency}
                    onChange={(e) => setNewNetwork({...newNetwork, currency: e.target.value})}
                    placeholder="例如: ETH"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddNetwork(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleAddNetwork}
                  disabled={!newNetwork.name || !newNetwork.chainId || !newNetwork.rpc || !newNetwork.currency}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  添加网络
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Network Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {networks.filter(n => n.status === 'connected' || n.status === 'available').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">可用网络</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {networks.filter(n => n.status === 'connected').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">已连接</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {(() => {
                const connectedNetworks = networks.filter(n => n.status === 'connected' && n.latency !== 'N/A');
                if (connectedNetworks.length === 0) return 'N/A';
                const avgLatency = connectedNetworks.reduce((sum, n) => sum + parseInt(n.latency), 0) / connectedNetworks.length;
                return Math.round(avgLatency) + 'ms';
              })()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">平均延迟</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
