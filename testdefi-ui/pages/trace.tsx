import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function TracePage() {
  const [txHash, setTxHash] = useState('');
  const [traceResult, setTraceResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrace = async () => {
    if (!txHash) return;
    
    setLoading(true);
    try {
      // TODO: Implement actual trace logic
      setTimeout(() => {
        setTraceResult({
          hash: txHash,
          status: 'success',
          gasUsed: '21000',
          gasLimit: '21000',
          gasPrice: '20 gwei',
          calls: [
            {
              type: 'CALL',
              from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d4d4',
              to: '0xA0b86a33E6441e8e4E2f4e4e4e4e4e4e4e4e4e4e',
              value: '1.0 ETH',
              gas: '21000',
              gasUsed: '21000',
              input: '0x',
              output: '0x',
              calls: []
            }
          ],
          logs: [
            {
              address: '0xA0b86a33E6441e8e4E2f4e4e4e4e4e4e4e4e4e4e',
              topics: ['0x...'],
              data: '0x...'
            }
          ]
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Trace error:', error);
      setLoading(false);
    }
  };

  const renderCallTree = (calls: any[], depth = 0) => {
    return calls.map((call: any, index: number) => (
      <div key={index} className={`ml-${depth * 4} mb-2`}>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 text-xs rounded ${
              call.type === 'CALL' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
              call.type === 'DELEGATECALL' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
              'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}>
              {call.type}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Gas: {call.gasUsed}/{call.gas}
            </span>
          </div>
          
          <div className="text-sm space-y-1">
            <div>
              <span className="text-gray-600 dark:text-gray-400">From:</span>
              <span className="ml-2 font-mono text-gray-900 dark:text-white">{call.from}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">To:</span>
              <span className="ml-2 font-mono text-gray-900 dark:text-white">{call.to}</span>
            </div>
            {call.value && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">Value:</span>
                <span className="ml-2 text-green-600 dark:text-green-400">{call.value}</span>
              </div>
            )}
          </div>
        </div>
        
        {call.calls && call.calls.length > 0 && (
          <div className="mt-2">
            {renderCallTree(call.calls, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          交易 Trace
        </h1>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            交易哈希追踪
          </h2>
          
          <div className="flex space-x-4">
            <input
              type="text"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="输入交易哈希 (0x...)"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
            />
            <button
              onClick={handleTrace}
              disabled={!txHash || loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? '追踪中...' : '开始追踪'}
            </button>
          </div>

          <div className="mt-4 flex space-x-4 text-sm">
            <button
              onClick={() => setTxHash('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              示例: Uniswap 交换
            </button>
            <button
              onClick={() => setTxHash('0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              示例: ERC20 转账
            </button>
          </div>
        </div>

        {/* Results Section */}
        {traceResult && (
          <div className="space-y-6">
            {/* Transaction Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                交易概览
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">状态</div>
                  <div className={`text-lg font-semibold ${
                    traceResult.status === 'success' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {traceResult.status === 'success' ? '成功' : '失败'}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Gas 使用</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {traceResult.gasUsed}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Gas 限制</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {traceResult.gasLimit}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Gas 价格</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {traceResult.gasPrice}
                  </div>
                </div>
              </div>
            </div>

            {/* Call Trace */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                调用追踪
              </h3>
              
              <div className="max-h-96 overflow-y-auto">
                {renderCallTree(traceResult.calls)}
              </div>
            </div>

            {/* Event Logs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                事件日志
              </h3>
              
              <div className="space-y-3">
                {traceResult.logs.map((log: any, index: number) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">合约地址:</span>
                        <span className="ml-2 font-mono text-gray-900 dark:text-white">{log.address}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Topics:</span>
                        <div className="mt-1 font-mono text-xs text-gray-900 dark:text-white break-all">
                          {log.topics.join(', ')}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Data:</span>
                        <div className="mt-1 font-mono text-xs text-gray-900 dark:text-white break-all">
                          {log.data}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* State Changes */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                状态变更
              </h3>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                状态变更追踪功能开发中...
              </div>
            </div>
          </div>
        )}

        {/* Recent Traces */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            最近追踪
          </h3>
          
          <div className="space-y-2">
            {[
              { hash: '0x1234...abcd', time: '2 分钟前', status: 'success' },
              { hash: '0x5678...efgh', time: '5 分钟前', status: 'failed' },
              { hash: '0x9abc...ijkl', time: '10 分钟前', status: 'success' },
            ].map((trace: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => setTxHash(trace.hash)}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm text-gray-900 dark:text-white">
                    {trace.hash}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    trace.status === 'success'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {trace.status === 'success' ? '成功' : '失败'}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {trace.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
