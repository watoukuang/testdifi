import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function GovernancePage() {
  const [selectedDAO, setSelectedDAO] = useState('compound');
  const [votingPower, setVotingPower] = useState('1000');
  const [selectedProposal, setSelectedProposal] = useState('');

  const daos = [
    {
      id: 'compound',
      name: 'Compound',
      token: 'COMP',
      totalSupply: '10M',
      activeProposals: 3,
      quorum: '400K',
      votingPeriod: '3 days'
    },
    {
      id: 'uniswap',
      name: 'Uniswap',
      token: 'UNI',
      totalSupply: '1B',
      activeProposals: 2,
      quorum: '40M',
      votingPeriod: '7 days'
    },
    {
      id: 'aave',
      name: 'Aave',
      token: 'AAVE',
      totalSupply: '16M',
      activeProposals: 4,
      quorum: '320K',
      votingPeriod: '5 days'
    }
  ];

  const proposals = [
    {
      id: 'prop-1',
      title: '提高借贷利率上限',
      description: '将 USDC 借贷利率上限从 20% 提高到 25%',
      status: 'Active',
      forVotes: '450K',
      againstVotes: '120K',
      quorum: '400K',
      timeLeft: '2天 5小时',
      proposer: '0x1234...5678'
    },
    {
      id: 'prop-2',
      title: '添加新的抵押品类型',
      description: '将 LINK 代币添加为借贷抵押品',
      status: 'Pending',
      forVotes: '0',
      againstVotes: '0',
      quorum: '400K',
      timeLeft: '即将开始',
      proposer: '0xabcd...efgh'
    },
    {
      id: 'prop-3',
      title: '协议费用分配调整',
      description: '调整协议收入在储备基金和代币持有者之间的分配比例',
      status: 'Executed',
      forVotes: '520K',
      againstVotes: '80K',
      quorum: '400K',
      timeLeft: '已执行',
      proposer: '0x9876...5432'
    }
  ];

  const attackScenarios = [
    {
      name: '闪电贷治理攻击',
      description: '使用闪电贷临时获得大量治理代币',
      risk: 'Critical',
      method: '借入代币 → 投票 → 立即还款'
    },
    {
      name: '贿赂攻击',
      description: '通过经济激励影响投票结果',
      risk: 'High',
      method: '向代币持有者支付费用换取投票'
    },
    {
      name: '女巫攻击',
      description: '创建多个身份稀释投票权重',
      risk: 'Medium',
      method: '分散代币到多个地址增加影响力'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Executed': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'Failed': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      case 'High': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            DAO 治理测试
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            测试去中心化治理机制，模拟投票过程和治理攻击场景
          </p>
        </div>

        {/* DAO 选择 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {daos.map((dao) => (
            <div
              key={dao.id}
              onClick={() => setSelectedDAO(dao.id)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-colors ${
                selectedDAO === dao.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {dao.name}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">治理代币</span>
                  <span className="text-gray-900 dark:text-white font-medium">{dao.token}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">总供应量</span>
                  <span className="text-gray-900 dark:text-white">{dao.totalSupply}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">活跃提案</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{dao.activeProposals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">法定人数</span>
                  <span className="text-gray-900 dark:text-white">{dao.quorum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">投票期</span>
                  <span className="text-gray-900 dark:text-white">{dao.votingPeriod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* 提案列表 */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                治理提案
              </h2>
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedProposal === proposal.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedProposal(proposal.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {proposal.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {proposal.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">支持</span>
                          <span className="text-green-600 dark:text-green-400">{proposal.forVotes}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">反对</span>
                          <span className="text-red-600 dark:text-red-400">{proposal.againstVotes}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>法定人数: {proposal.quorum}</span>
                      <span>{proposal.timeLeft}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 投票面板 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                投票操作
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    投票权重
                  </label>
                  <input
                    type="number"
                    value={votingPower}
                    onChange={(e) => setVotingPower(e.target.value)}
                    placeholder="代币数量"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    支持
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                    反对
                  </button>
                </div>

                <button className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                  弃权
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">投票统计</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">我的投票权</span>
                    <span className="text-gray-900 dark:text-white">{votingPower} COMP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">投票权占比</span>
                    <span className="text-gray-900 dark:text-white">0.01%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">委托状态</span>
                    <span className="text-green-600 dark:text-green-400">自主投票</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 委托功能 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                投票委托
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="委托地址"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm">
                  委托投票权
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 治理攻击模拟 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            治理攻击模拟
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {attackScenarios.map((scenario, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {scenario.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(scenario.risk)}`}>
                    {scenario.risk}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {scenario.description}
                </p>
                <div className="mb-4">
                  <span className="text-xs text-gray-500">攻击方法: </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">{scenario.method}</span>
                </div>
                <button className="w-full px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                  模拟攻击
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">安全提醒</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  治理攻击模拟仅用于教育和测试目的，请勿在主网环境中进行恶意治理操作。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
