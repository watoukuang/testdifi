import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function HistoryPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');

  const transactions = [
    {
      id: '1',
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      type: 'swap',
      description: 'Swap 1 ETH for 1,800 USDC',
      from: 'ETH',
      to: 'USDC',
      amount: '1.0',
      value: '$1,800',
      status: 'success',
      timestamp: '2024-01-15 14:30:25',
      gasUsed: '150,000',
      gasFee: '$12.50',
      block: '18,500,123'
    },
    {
      id: '2',
      hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      type: 'deploy',
      description: 'Deploy ERC20 Token Contract',
      contractName: 'MyToken',
      contractAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d4d4',
      status: 'success',
      timestamp: '2024-01-15 13:15:10',
      gasUsed: '1,200,000',
      gasFee: '$45.80',
      block: '18,500,089'
    },
    {
      id: '3',
      hash: '0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef',
      type: 'liquidity',
      description: 'Add Liquidity to ETH/USDC Pool',
      tokenA: 'ETH',
      tokenB: 'USDC',
      amountA: '0.5',
      amountB: '900',
      status: 'success',
      timestamp: '2024-01-15 12:45:33',
      gasUsed: '200,000',
      gasFee: '$18.20',
      block: '18,500,045'
    },
    {
      id: '4',
      hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
      type: 'faucet',
      description: 'Claim Test Tokens from Faucet',
      token: 'ETH',
      amount: '1.0',
      status: 'success',
      timestamp: '2024-01-15 11:20:15',
      gasUsed: '21,000',
      gasFee: '$2.10',
      block: '18,499,980'
    },
    {
      id: '5',
      hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
      type: 'trace',
      description: 'Transaction Trace Analysis',
      tracedTx: '0x1234...abcd',
      status: 'completed',
      timestamp: '2024-01-15 10:55:42',
      duration: '2.3s',
      calls: '15',
      block: '18,499,920'
    }
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filter === 'all' || tx.type === filter;
    const matchesSearch = searchTerm === '' || 
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'swap':
        return '⇄';
      case 'deploy':
        return '🚀';
      case 'liquidity':
        return '💧';
      case 'faucet':
        return '🚰';
      case 'trace':
        return '🔍';
      default:
        return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'swap':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'deploy':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'liquidity':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'faucet':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'trace':
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          交易历史
        </h1>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                交易类型
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">全部</option>
                <option value="swap">代币交换</option>
                <option value="deploy">合约部署</option>
                <option value="liquidity">流动性</option>
                <option value="faucet">水龙头</option>
                <option value="trace">交易追踪</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                搜索
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索交易哈希或描述..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                时间范围
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="1d">最近 1 天</option>
                <option value="7d">最近 7 天</option>
                <option value="30d">最近 30 天</option>
                <option value="90d">最近 90 天</option>
                <option value="all">全部时间</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {filteredTransactions.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">总交易数</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {filteredTransactions.filter(tx => tx.status === 'success' || tx.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">成功交易</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              $78.60
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">总 Gas 费用</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              98.5%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">成功率</div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              交易记录 ({filteredTransactions.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Type Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getTypeColor(tx.type)}`}>
                      {getTypeIcon(tx.type)}
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {tx.description}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(tx.status)}`}>
                          {tx.status === 'success' ? '成功' : 
                           tx.status === 'completed' ? '完成' :
                           tx.status === 'pending' ? '待确认' : '失败'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div>
                          <span className="font-medium">交易哈希:</span>
                          <div className="font-mono break-all">{tx.hash.slice(0, 20)}...</div>
                        </div>
                        <div>
                          <span className="font-medium">时间:</span>
                          <div>{tx.timestamp}</div>
                        </div>
                        <div>
                          <span className="font-medium">区块:</span>
                          <div>{tx.block}</div>
                        </div>
                        <div>
                          <span className="font-medium">Gas 费用:</span>
                          <div>{tx.gasFee || tx.duration || 'N/A'}</div>
                        </div>
                      </div>

                      {/* Type-specific details */}
                      {tx.type === 'swap' && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {tx.amount} {tx.from} → {tx.to}
                            </span>
                            <span className="ml-2 text-gray-600 dark:text-gray-400">
                              (≈ {tx.value})
                            </span>
                          </div>
                        </div>
                      )}

                      {tx.type === 'deploy' && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900 dark:text-white">
                              合约: {tx.contractName}
                            </div>
                            <div className="font-mono text-gray-600 dark:text-gray-400">
                              地址: {tx.contractAddress}
                            </div>
                          </div>
                        </div>
                      )}

                      {tx.type === 'liquidity' && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {tx.amountA} {tx.tokenA} + {tx.amountB} {tx.tokenB}
                            </span>
                          </div>
                        </div>
                      )}

                      {tx.type === 'trace' && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900 dark:text-white">
                              追踪交易: {tx.tracedTx}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                              耗时: {tx.duration}, 调用次数: {tx.calls}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors">
                      查看详情
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                      复制哈希
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                没有找到匹配的交易记录
              </p>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="mt-8 flex justify-end space-x-3">
          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
            导出 CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            导出 JSON
          </button>
        </div>
      </div>
    </Layout>
  );
}
