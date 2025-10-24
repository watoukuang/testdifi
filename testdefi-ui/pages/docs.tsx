import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function DocsPage() {
  const [selectedSection, setSelectedSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: '快速开始',
      icon: '🚀',
      content: `
# 快速开始

欢迎使用 TEST DEFI 测试平台！这是一个专为 DeFi 开发者和测试人员设计的综合性测试环境。

## 平台概述

TEST DEFI 提供了完整的 DeFi 测试工具链，包括：

- **代币交换测试** - 模拟各种 DEX 交易场景
- **流动性管理** - 测试流动性添加和移除
- **合约交互** - 直接与智能合约交互
- **一键部署** - 快速部署测试合约
- **Fork 管理** - 创建主网分叉环境
- **交易追踪** - 详细的交易调试分析

## 开始使用

1. **连接钱包** - 使用 MetaMask 或其他兼容钱包
2. **选择网络** - 切换到合适的测试网络
3. **获取测试代币** - 从水龙头获取测试资金
4. **开始测试** - 使用各种工具进行 DeFi 测试

## 系统要求

- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- Web3 钱包 (MetaMask 推荐)
- 稳定的网络连接
      `
    },
    {
      id: 'swap-guide',
      title: 'Swap 工具',
      icon: '⇄',
      content: `
# Swap 工具使用指南

Swap 工具允许您测试代币交换功能，模拟 Uniswap、SushiSwap 等 DEX 的交易体验。

## 功能特性

- **多代币支持** - 支持 ETH、USDC、USDT、DAI 等主流代币
- **实时汇率** - 显示当前市场汇率
- **滑点控制** - 可调节滑点容忍度
- **Gas 估算** - 实时 Gas 费用预估

## 使用步骤

### 1. 选择交易对
- 在"从"字段选择要交换的代币
- 在"到"字段选择目标代币
- 输入交换数量

### 2. 检查交易信息
- 确认汇率是否合理
- 检查滑点设置
- 查看 Gas 费用估算

### 3. 执行交换
- 点击"交换代币"按钮
- 在钱包中确认交易
- 等待交易确认

## 注意事项

⚠️ **重要提醒**
- 这是测试环境，请勿使用真实资金
- 交易可能需要几分钟才能确认
- 确保钱包中有足够的 ETH 支付 Gas 费用

## 常见问题

**Q: 为什么交易失败了？**
A: 可能原因包括 Gas 费用不足、滑点过低、或网络拥堵。

**Q: 如何设置滑点？**
A: 在交易界面点击设置图标，调整滑点容忍度。

**Q: 支持哪些代币？**
A: 目前支持 ETH、USDC、USDT、DAI，后续会添加更多代币。
      `
    },
    {
      id: 'console-guide',
      title: '合约控制台',
      icon: '🖥️',
      content: `
# 合约控制台使用指南

合约控制台是一个强大的工具，允许您直接与智能合约交互，进行函数调用和交易发送。

## 主要功能

- **合约加载** - 通过地址和 ABI 加载合约
- **函数调用** - 执行只读函数调用
- **交易发送** - 发送状态改变的交易
- **常用合约** - 预置常用 DeFi 合约

## 使用流程

### 1. 加载合约
\`\`\`
1. 输入合约地址
2. 粘贴合约 ABI (JSON 格式)
3. 点击"加载合约"
\`\`\`

### 2. 选择函数
- 从下拉菜单选择要调用的函数
- 查看函数参数要求
- 输入相应的参数值

### 3. 执行调用
- **Call**: 用于只读函数，不消耗 Gas
- **Send**: 用于状态改变函数，需要 Gas 费用

## ABI 格式示例

\`\`\`json
[
  {
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  }
]
\`\`\`

## 常用合约模板

### ERC20 代币
- **balanceOf**: 查询余额
- **transfer**: 转账
- **approve**: 授权

### Uniswap V2
- **getAmountsOut**: 查询交换输出
- **swapExactTokensForTokens**: 精确输入交换

## 安全提醒

🔒 **安全注意事项**
- 仅在测试网络使用
- 验证合约地址的正确性
- 小心处理私钥和助记词
- 不要在主网进行未经验证的操作
      `
    },
    {
      id: 'deploy-guide',
      title: '一键部署',
      icon: '🚀',
      content: `
# 一键部署使用指南

一键部署功能让您可以快速部署和测试智能合约，支持多种常用合约模板。

## 支持的合约类型

### ERC20 代币
标准的 ERC20 代币合约，支持：
- 基本转账功能
- 授权机制
- 总供应量管理

### ERC721 NFT
不可替代代币合约，包含：
- 唯一代币铸造
- 所有权管理
- 元数据支持

### 多重签名钱包
安全的多重签名钱包：
- 多人共同控制
- 交易确认机制
- 安全资金管理

## 部署步骤

### 1. 选择模板
- 从左侧选择合约模板
- 查看模板代码和说明
- 或上传自定义合约

### 2. 配置参数
- 设置合约名称
- 输入构造函数参数
- 检查代码无误

### 3. 编译部署
- 点击"编译合约"检查语法
- 点击"部署合约"执行部署
- 等待交易确认

## 构造函数参数示例

### ERC20 代币
\`\`\`json
["MyToken", "MTK", 1000000]
\`\`\`
- 参数1: 代币名称
- 参数2: 代币符号  
- 参数3: 初始供应量

### 多重签名钱包
\`\`\`json
[["0x123...", "0x456...", "0x789..."], 2]
\`\`\`
- 参数1: 所有者地址数组
- 参数2: 所需确认数量

## 部署后操作

✅ **部署成功后**
- 记录合约地址
- 验证合约功能
- 在区块浏览器查看
- 添加到合约控制台

## 常见错误

❌ **编译失败**
- 检查 Solidity 语法
- 确认导入路径正确
- 验证编译器版本

❌ **部署失败**
- 检查 Gas 费用是否足够
- 确认网络连接正常
- 验证构造函数参数格式
      `
    },
    {
      id: 'forks-guide',
      title: 'Fork 管理',
      icon: '🌿',
      content: `
# Fork 管理使用指南

Fork 管理功能允许您创建主网的分叉环境，在真实数据基础上进行安全的测试。

## Fork 的优势

- **真实数据** - 使用主网的实际状态
- **安全测试** - 不影响主网资产
- **完整环境** - 包含所有已部署的合约
- **灵活控制** - 可以修改账户余额和状态

## 创建 Fork

### 1. 基本设置
- **Fork 名称**: 为您的 Fork 起一个描述性名称
- **RPC URL**: 选择或输入主网 RPC 端点
- **区块高度**: 指定分叉的起始区块（可选）

### 2. 网络选择
支持的网络：
- **Ethereum Mainnet** - 以太坊主网
- **Arbitrum One** - Arbitrum L2
- **Polygon** - Polygon 侧链
- **Optimism** - Optimism L2

### 3. 高级配置
- **自定义 RPC** - 使用您自己的节点
- **特定区块** - 从历史区块开始分叉
- **账户预设** - 预配置测试账户

## Fork 操作

### 启动和停止
- **启动**: 激活 Fork 环境
- **停止**: 暂停 Fork 以节省资源
- **重启**: 重新启动已停止的 Fork

### 连接钱包
1. 复制 Fork 的 RPC URL
2. 在 MetaMask 中添加自定义网络
3. 切换到 Fork 网络
4. 开始测试

### 状态管理
- **重置状态** - 恢复到分叉时的状态
- **导出状态** - 保存当前状态快照
- **导入状态** - 加载之前的状态

## 使用场景

### DeFi 协议测试
\`\`\`
1. Fork Ethereum 主网
2. 连接到 Uniswap 合约
3. 测试大额交易的滑点影响
4. 验证套利机会
\`\`\`

### 合约升级测试
\`\`\`
1. Fork 包含目标合约的网络
2. 部署升级版本
3. 测试迁移流程
4. 验证向后兼容性
\`\`\`

## 最佳实践

💡 **建议**
- 为不同测试场景创建专门的 Fork
- 定期清理不需要的 Fork
- 使用描述性的 Fork 名称
- 记录重要的测试配置

⚠️ **注意事项**
- Fork 会消耗存储空间
- 长时间运行可能影响性能
- 某些时间敏感的合约可能需要特殊处理
      `
    },
    {
      id: 'api-reference',
      title: 'API 参考',
      icon: '📚',
      content: `
# API 参考文档

TEST DEFI 提供了完整的 REST API，支持程序化访问所有平台功能。

## 基础信息

- **Base URL**: \`http://localhost:8181\`
- **认证**: 暂不需要（测试环境）
- **格式**: JSON
- **编码**: UTF-8

## 通用响应格式

\`\`\`json
{
  "success": true,
  "data": {...},
  "message": "操作成功",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

## 元数据 API

### 健康检查
\`\`\`http
GET /health
GET /healthz
\`\`\`

### 版本信息
\`\`\`http
GET /version
\`\`\`

### Ping 测试
\`\`\`http
GET /api/ping
\`\`\`

## Fork 管理 API

### 创建 Fork
\`\`\`http
POST /api/forks
Content-Type: application/json

{
  "label": "My Test Fork",
  "rpcUrl": "https://mainnet.infura.io/v3/YOUR_KEY",
  "baseBlock": 18500000
}
\`\`\`

### 获取 Fork 列表
\`\`\`http
GET /api/forks
\`\`\`

### 删除 Fork
\`\`\`http
DELETE /api/forks/{id}
\`\`\`

## 合约交互 API

### 调用合约函数
\`\`\`http
POST /api/contracts/call
Content-Type: application/json

{
  "address": "0x...",
  "method": "balanceOf",
  "params": ["0x..."],
  "rpcUrl": "http://localhost:8545"
}
\`\`\`

### 发送交易
\`\`\`http
POST /api/contracts/send
Content-Type: application/json

{
  "from": "0x...",
  "address": "0x...",
  "method": "transfer",
  "params": ["0x...", "1000000000000000000"],
  "value": "0"
}
\`\`\`

### 部署合约
\`\`\`http
POST /api/contracts/deploy
Content-Type: application/json

{
  "template": "erc20",
  "args": ["MyToken", "MTK", 1000000]
}
\`\`\`

## 交易追踪 API

### 追踪交易
\`\`\`http
POST /api/trace/tx
Content-Type: application/json

{
  "txHash": "0x...",
  "rpcUrl": "http://localhost:8545"
}
\`\`\`

## 错误处理

### 错误响应格式
\`\`\`json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "参数无效",
    "details": "..."
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

### 常见错误码
- \`INVALID_PARAMETER\` - 参数无效
- \`NETWORK_ERROR\` - 网络连接错误
- \`CONTRACT_ERROR\` - 合约执行错误
- \`INSUFFICIENT_FUNDS\` - 余额不足

## SDK 示例

### JavaScript/TypeScript
\`\`\`javascript
const client = new TestDefiClient('http://localhost:8181');

// 创建 Fork
const fork = await client.forks.create({
  label: 'My Fork',
  rpcUrl: 'https://mainnet.infura.io/v3/...'
});

// 调用合约
const result = await client.contracts.call({
  address: '0x...',
  method: 'balanceOf',
  params: ['0x...']
});
\`\`\`

### Python
\`\`\`python
import requests

# 创建 Fork
response = requests.post('http://localhost:8181/api/forks', json={
    'label': 'My Fork',
    'rpcUrl': 'https://mainnet.infura.io/v3/...'
})

fork = response.json()['data']
\`\`\`

## 限制和配额

- **请求频率**: 100 请求/分钟
- **Fork 数量**: 最多 10 个并发 Fork
- **存储限制**: 每个 Fork 最大 5GB
      `
    },
    {
      id: 'troubleshooting',
      title: '故障排除',
      icon: '🔧',
      content: `
# 故障排除指南

遇到问题？这里提供了常见问题的解决方案。

## 连接问题

### 钱包连接失败
**症状**: 无法连接 MetaMask 或其他钱包

**解决方案**:
1. 确保已安装钱包扩展
2. 刷新页面重试
3. 检查钱包是否已解锁
4. 尝试手动连接钱包

### 网络连接错误
**症状**: 显示"网络连接失败"

**解决方案**:
1. 检查网络连接
2. 确认 RPC 端点可用
3. 尝试切换到其他网络
4. 检查防火墙设置

## 交易问题

### 交易失败
**症状**: 交易被拒绝或失败

**可能原因**:
- Gas 费用不足
- 滑点设置过低
- 合约执行错误
- 网络拥堵

**解决方案**:
1. 增加 Gas 限制
2. 调高滑点容忍度
3. 检查合约参数
4. 等待网络拥堵缓解

### 交易卡住
**症状**: 交易长时间未确认

**解决方案**:
1. 检查 Gas 价格是否合理
2. 在钱包中加速交易
3. 取消并重新发送
4. 等待网络处理

## 合约问题

### 合约加载失败
**症状**: 无法加载智能合约

**检查项目**:
- 合约地址是否正确
- ABI 格式是否有效
- 网络是否匹配
- 合约是否已部署

### 函数调用错误
**症状**: 合约函数调用失败

**常见原因**:
- 参数类型不匹配
- 权限不足
- 合约状态不允许
- Gas 限制过低

## Fork 问题

### Fork 创建失败
**症状**: 无法创建网络分叉

**解决方案**:
1. 检查 RPC URL 有效性
2. 确认网络支持分叉
3. 验证区块号是否存在
4. 检查存储空间

### Fork 性能问题
**症状**: Fork 运行缓慢

**优化方法**:
1. 减少并发 Fork 数量
2. 清理不需要的 Fork
3. 使用更快的 RPC 端点
4. 重启 Fork 服务

## 界面问题

### 页面加载缓慢
**解决方案**:
1. 清除浏览器缓存
2. 禁用不必要的扩展
3. 检查网络连接
4. 尝试其他浏览器

### 数据显示异常
**解决方案**:
1. 刷新页面
2. 检查网络连接
3. 清除本地存储
4. 重新连接钱包

## 获取帮助

### 日志收集
在报告问题时，请提供：
1. 浏览器控制台日志
2. 网络请求详情
3. 钱包交易记录
4. 具体操作步骤

### 联系支持
- **GitHub Issues**: 提交技术问题
- **Discord**: 实时社区支持
- **Email**: support@testdefi.org
- **文档**: 查看最新文档更新

### 常用调试命令

#### 浏览器控制台
\`\`\`javascript
// 检查钱包连接
console.log(window.ethereum);

// 查看网络信息
console.log(await window.ethereum.request({
  method: 'eth_chainId'
}));

// 检查账户
console.log(await window.ethereum.request({
  method: 'eth_accounts'
}));
\`\`\`

#### 网络测试
\`\`\`bash
# 测试 RPC 连接
curl -X POST -H "Content-Type: application/json" \\
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \\
  https://mainnet.infura.io/v3/YOUR_KEY

# 检查端口连通性
telnet localhost 8545
\`\`\`

## 预防措施

### 最佳实践
- 定期备份重要配置
- 使用测试网络进行实验
- 保持软件版本更新
- 监控系统资源使用

### 安全建议
- 不要在主网使用测试工具
- 保护好私钥和助记词
- 验证合约地址的正确性
- 使用官方 RPC 端点
      `
    }
  ];

  const currentSection = sections.find(s => s.id === selectedSection);

  const renderMarkdown = (content: string) => {
    // Simple markdown renderer for demo purposes
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">{line.slice(4)}</h3>;
        }
        if (line.startsWith('```')) {
          return <div key={index} className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm my-4 overflow-x-auto"></div>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="text-gray-700 dark:text-gray-300 mb-1">{line.slice(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{line}</p>;
      });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          帮助文档
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                文档导航
              </h2>
              
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      selectedSection === section.id
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  快速链接
                </h3>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-blue-600 dark:text-blue-400 hover:underline">
                    GitHub 仓库
                  </a>
                  <a href="#" className="block text-blue-600 dark:text-blue-400 hover:underline">
                    Discord 社区
                  </a>
                  <a href="#" className="block text-blue-600 dark:text-blue-400 hover:underline">
                    问题反馈
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              {currentSection && (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {renderMarkdown(currentSection.content)}
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div>
                  {(() => {
                    const currentIndex = sections.findIndex(s => s.id === selectedSection);
                    const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
                    return prevSection ? (
                      <button
                        onClick={() => setSelectedSection(prevSection.id)}
                        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>上一页: {prevSection.title}</span>
                      </button>
                    ) : null;
                  })()}
                </div>
                
                <div>
                  {(() => {
                    const currentIndex = sections.findIndex(s => s.id === selectedSection);
                    const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
                    return nextSection ? (
                      <button
                        onClick={() => setSelectedSection(nextSection.id)}
                        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>下一页: {nextSection.title}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : null;
                  })()}
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                文档反馈
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                这个页面对您有帮助吗？我们很乐意听到您的反馈。
              </p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  👍 有帮助
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  👎 需要改进
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  💬 提供建议
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
