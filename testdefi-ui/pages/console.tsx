import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function ConsolePage() {
  const [contractAddress, setContractAddress] = useState('');
  const [abi, setAbi] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [functionParams, setFunctionParams] = useState('');
  const [result, setResult] = useState('');

  const commonContracts = [
    { name: 'ERC20 Token', address: '0x...', type: 'ERC20' },
    { name: 'Uniswap V2 Router', address: '0x...', type: 'Router' },
    { name: 'Compound cToken', address: '0x...', type: 'Lending' },
  ];

  const handleCall = async () => {
    try {
      // TODO: Implement contract call logic
      setResult('Function called successfully');
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          合约控制台
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Contract Input */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                合约信息
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  合约地址
                </label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ABI (JSON)
                </label>
                <textarea
                  value={abi}
                  onChange={(e) => setAbi(e.target.value)}
                  placeholder="粘贴合约 ABI..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                加载合约
              </button>
            </div>

            {/* Common Contracts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                常用合约
              </h3>
              <div className="space-y-2">
                {commonContracts.map((contract, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setContractAddress(contract.address)}
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {contract.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {contract.type}
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      加载
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Function Interaction */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                函数调用
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  选择函数
                </label>
                <select
                  value={selectedFunction}
                  onChange={(e) => setSelectedFunction(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">请选择函数...</option>
                  <option value="balanceOf">balanceOf(address)</option>
                  <option value="transfer">transfer(address,uint256)</option>
                  <option value="approve">approve(address,uint256)</option>
                  <option value="totalSupply">totalSupply()</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  函数参数 (JSON)
                </label>
                <textarea
                  value={functionParams}
                  onChange={(e) => setFunctionParams(e.target.value)}
                  placeholder='["0x...", "1000000000000000000"]'
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                />
              </div>

              <div className="flex space-x-3 mb-6">
                <button
                  onClick={handleCall}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  调用 (Call)
                </button>
                <button
                  onClick={handleCall}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  发送 (Send)
                </button>
              </div>

              {/* Result */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  执行结果
                </label>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[100px]">
                  <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                    {result || '等待执行...'}
                  </pre>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                调用历史
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      balanceOf(0x...)
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      成功
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    2 分钟前
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
