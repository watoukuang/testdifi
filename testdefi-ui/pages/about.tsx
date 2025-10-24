import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function About(): React.ReactElement {
    const [activeTab, setActiveTab] = useState('about');

    const docSections = [
        {
            id: 'getting-started',
            title: '快速开始',
            icon: '🚀',
            content: 'TEST DEFI 是一个专为 DeFi 开发者设计的测试平台。连接钱包、选择网络、获取测试代币，即可开始测试。'
        },
        {
            id: 'swap-guide',
            title: 'Swap 工具',
            icon: '⇄',
            content: '测试代币交换功能，支持多种代币，实时汇率显示，滑点控制和 Gas 估算。'
        },
        {
            id: 'console-guide',
            title: '合约控制台',
            icon: '🖥️',
            content: '直接与智能合约交互，支持函数调用和交易发送，预置常用 DeFi 合约模板。'
        },
        {
            id: 'deploy-guide',
            title: '一键部署',
            icon: '🚀',
            content: '快速部署测试合约，支持 ERC20、NFT、多重签名等常用合约模板。'
        },
        {
            id: 'lending-guide',
            title: '借贷协议测试',
            icon: '🏦',
            content: '测试 Compound、Aave 等主流借贷协议的存款、借款和清算功能，支持多种资产和利率模型。'
        },
        {
            id: 'yield-farming-guide',
            title: '收益农场',
            icon: '🌾',
            content: '测试流动性挖矿策略，分析收益率和无常损失，支持多种 DEX 和流动性池。'
        },
        {
            id: 'oracle-guide',
            title: '价格预言机',
            icon: '🔮',
            content: '测试 Chainlink、Band Protocol 等预言机的价格准确性、延迟和安全性，模拟价格操纵攻击。'
        },
        {
            id: 'flashloan-guide',
            title: '闪电贷测试',
            icon: '⚡',
            content: '测试闪电贷套利策略和攻击场景，支持 Aave、dYdX 等协议，模拟价格操纵和治理攻击。'
        },
        {
            id: 'security-guide',
            title: '安全测试',
            icon: '🛡️',
            content: '全面的 DeFi 安全测试套件，包括合约审计、漏洞扫描、攻击模拟和风险评估工具。'
        }
    ];

    return (
        <Layout>
            <div className="max-w-6xl mx-auto mt-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    关于 TEST DEFI
                </h1>

                {/* 标签页导航 */}
                <div className="flex justify-center mb-8">
                    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'about'
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            平台介绍
                        </button>
                        <button
                            onClick={() => setActiveTab('docs')}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'docs'
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            使用文档
                        </button>
                    </div>
                </div>

                {activeTab === 'about' && (
                    <div className="space-y-8">
                        {/* 平台介绍 */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                专业的 DeFi 测试平台
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                TEST DEFI 致力于为 DeFi 开发者和测试人员提供最专业、最完整的测试环境。我们相信，只有在安全可控的测试环境中，才能构建出真正可靠的去中心化金融应用。
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                通过提供真实的主网分叉环境、完整的合约交互工具和详细的交易分析功能，我们帮助开发者在部署到主网之前充分验证其 DeFi 协议的安全性和可靠性。
                            </p>
                        </div>

                    {/* 我们做什么 */}
                    <section className="mb-10 md:mb-12">
                        <h2 className="text-lg md:text-xl font-bold mb-4">我们做什么</h2>
                        <div className="grid gap-4 md:gap-5 md:grid-cols-3">
                            <div
                                className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31]">
                                <div className="mb-2 text-violet-500">◎</div>
                                <h3 className="font-semibold mb-1">精选AI工具</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">筛选优质与高价值的AI工具，帮助用户快速落地高效方案。</p>
                            </div>
                            <div
                                className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31]">
                                <div className="mb-2 text-indigo-500">◎</div>
                                <h3 className="font-semibold mb-1">连接社区</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">连接产品与用户的双向桥梁，分享最佳实践与洞见。</p>
                            </div>
                            <div
                                className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31]">
                                <div className="mb-2 text-emerald-500">◎</div>
                                <h3 className="font-semibold mb-1">探索前沿</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">关注AI技术趋势与应用机会，助你把握最新方向。</p>
                            </div>
                        </div>
                    </section>

                    {/* 核心价值观 */}
                    <section className="mb-10 md:mb-12">
                        <h2 className="text-lg md:text-xl font-bold mb-4">核心价值观</h2>
                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                            <div
                                className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31]">
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2"><span
                                        className="mt-1 h-2 w-2 rounded-full bg-violet-500"/> 创新与开放
                                    </li>
                                    <li className="flex items-start gap-2"><span
                                        className="mt-1 h-2 w-2 rounded-full bg-sky-500"/> 用户价值优先
                                    </li>
                                    <li className="flex items-start gap-2"><span
                                        className="mt-1 h-2 w-2 rounded-full bg-emerald-500"/> 品质与专业
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31]">
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2"><span
                                        className="mt-1 h-2 w-2 rounded-full bg-amber-500"/> 协作与共赢
                                    </li>
                                    <li className="flex items-start gap-2"><span
                                        className="mt-1 h-2 w-2 rounded-full bg-pink-500"/> 负责的开发与应用
                                    </li>
                                    <li className="flex items-start gap-2"><span
                                        className="mt-1 h-2 w-2 rounded-full bg-cyan-500"/> 长期主义
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 号召行动 */}
                    <section className="text-center mb-6 md:mb-8">
                        <h2 className="text-xl font-semibold mb-2">加入我们的旅程</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
                            无论你是AI开发者、技术爱好者，还是寻求升级效率工具的专业人士，挖头矿欢迎你的参与。
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <Link href="/"
                                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 dark:bg-[#1a1b1e] dark:border-[#2a2c31]">探索工具</Link>
                            <Link href="/subscribe"
                                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-sm hover:opacity-90 transition-opacity dark:from-emerald-400 dark:to-lime-400">订阅更新</Link>
                        </div>
                    </section>

                    {/* 联系方式 */}
                    <div
                        className="mt-6 p-4 md:p-5 rounded-2xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31]">
                        <h3 className="font-semibold mb-2">联系我们</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            如需商务合作、收录与纠错，请发送邮件至：
                            <a className="ml-1 text-blue-600 dark:text-sky-400 underline"
                               href="mailto:hello@testdefi.org">hello@testdifi.org</a>
                        </p>
                    </div>
                </div>
                )}

                {activeTab === 'docs' && (
                    <div className="space-y-6">
                        {docSections.map((section) => (
                            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-3">{section.icon}</span>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {section.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
