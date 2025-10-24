import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function AuditPage() {
  const [contractAddress, setContractAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [auditResults, setAuditResults] = useState<any>(null);

  const auditTools = [
    {
      name: 'Slither',
      description: '静态分析工具，检测常见漏洞',
      type: 'Static Analysis',
      coverage: '95%'
    },
    {
      name: 'Mythril',
      description: '符号执行引擎，深度安全分析',
      type: 'Symbolic Execution',
      coverage: '88%'
    },
    {
      name: 'Securify',
      description: '学术级安全验证工具',
      type: 'Formal Verification',
      coverage: '92%'
    }
  ];

  const vulnerabilityTypes = [
    { name: '重入攻击', severity: 'Critical', count: 0 },
    { name: '整数溢出', severity: 'High', count: 1 },
    { name: '访问控制', severity: 'Medium', count: 2 },
    { name: '时间戳依赖', severity: 'Low', count: 3 },
    { name: '未检查返回值', severity: 'Medium', count: 1 }
  ];

  const runAudit = async () => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const mockResults = {
      score: Math.floor(Math.random() * 30 + 70),
      totalIssues: Math.floor(Math.random() * 10 + 5),
      criticalIssues: Math.floor(Math.random() * 2),
      highIssues: Math.floor(Math.random() * 3 + 1),
      mediumIssues: Math.floor(Math.random() * 4 + 2),
      lowIssues: Math.floor(Math.random() * 5 + 3),
      gasOptimizations: Math.floor(Math.random() * 8 + 5),
      recommendations: [
        '建议添加重入保护修饰符',
        '优化 gas 消耗，减少不必要的存储操作',
        '添加更严格的输入验证',
        '实现紧急暂停机制',
        '增加事件日志记录'
      ]
    };
    
    setAuditResults(mockResults);
    setIsScanning(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
            智能合约审计
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            使用多种静态分析工具对智能合约进行全面安全审计
          </p>
        </div>

        {/* 审计工具 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {auditTools.map((tool, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {tool.description}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">类型</span>
                  <span className="text-gray-900 dark:text-white">{tool.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">覆盖率</span>
                  <span className="text-green-600 dark:text-green-400">{tool.coverage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 审计配置 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              开始审计
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  审计选项
                </label>
                <div className="space-y-2">
                  {['静态分析', '符号执行', '形式化验证', 'Gas 优化分析'].map((option, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={runAudit}
              disabled={!contractAddress || isScanning}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {isScanning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  扫描中...
                </>
              ) : (
                '开始审计'
              )}
            </button>
          </div>

          {/* 漏洞类型统计 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              常见漏洞类型
            </h2>
            
            <div className="space-y-3">
              {vulnerabilityTypes.map((vuln, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {vuln.name}
                    </span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    检测到 {vuln.count} 个
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 审计结果 */}
        {auditResults && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              审计报告
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  auditResults.score >= 80 ? 'text-green-600 dark:text-green-400' :
                  auditResults.score >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {auditResults.score}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">安全评分</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {auditResults.totalIssues}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">总问题数</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {auditResults.criticalIssues}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">严重问题</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {auditResults.gasOptimizations}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">优化建议</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">问题分布</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">严重</span>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">{auditResults.criticalIssues}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">高危</span>
                    <span className="text-red-600 dark:text-red-400 font-medium">{auditResults.highIssues}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">中危</span>
                    <span className="text-yellow-600 dark:text-yellow-400 font-medium">{auditResults.mediumIssues}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">低危</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">{auditResults.lowIssues}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">修复建议</h3>
                <div className="space-y-2">
                  {auditResults.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
