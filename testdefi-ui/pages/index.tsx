import React from 'react';
import Layout from '../components/Layout';

export default function Home(): React.ReactElement {
  return (
    <Layout>
      <div className="container px-4 md:px-6 py-6 pb-20 lg:pb-10">
        {/* Hero */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-400 dark:to-emerald-300 headline-glow">
            TestSwap.org：为开发者而生的 DeFi 测试沙盒
          </h1>
          <p className="text-[13.5px] md:text-base leading-relaxed max-w-3xl subtle-muted">
            一个面向 Web3 开发者的在线平台，提供测试网交易工具、合约交互控制台、主网 Fork 模拟器、调试与分析工具，帮助你快速验证、调试、部署和模拟真实 DeFi 场景。
          </p>
        </div>

        {/* Core features */}
        <section className="mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4">核心功能</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard title="Swap 模拟工具" desc="在测试网上模拟真实代币交换，显示模拟输出、slippage、gas 成本"/>
            <FeatureCard title="合约交互控制台" desc="上传 ABI 或选择模板，调用函数，自动识别 view/storage"/>
            <FeatureCard title="一键部署标准合约" desc="ERC20、池子、FlashLoan 等，一键部署与记录"/>
            <FeatureCard title="主网 Fork 测试环境" desc="本地 fork 主网，分配余额，复现实战交易逻辑"/>
            <FeatureCard title="交易可视化与日志分析" desc="展示 receipt、gas 使用、revert 原因与 trace"/>
            <FeatureCard title="API & SDK 接口" desc="提供后端 API 与 SDK，方便脚本与 CI 集成"/>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4">技术架构</h2>
          <pre className="text-xs md:text-sm p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31] overflow-auto">
User (Developer)
  └─ Front-end (Next.js + Wagmi)
       ├─ Swap UI (Testnet / Fork)
       ├─ Contract Interaction Console
       ├─ Fork Manager Interface
       └─ Token Deployment Wizard

Back-end (Rust + Axum API)
  ├─ Fork Manager (Anvil)
  ├─ Contract Execution Engine
  ├─ RPC Proxy Layer
  ├─ Transaction Trace & Analysis
  └─ Deployment Service
          </pre>
        </section>

        {/* Roadmap */}
        <section className="mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4">路线图（MVP → V1）</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <ListCard title="阶段 1：MVP（进行中）" items={[
              '钱包连接', '测试网 Swap 工具', '合约交互控制台', '部署 ERC20 合约', '基础后端 + RPC 转发'
            ]}/>
            <ListCard title="阶段 2：功能增强" items={[
              'Fork 测试管理器', 'Gas / Trace 分析', '池子合约 + 策略模拟', '导出调用脚本（SDK）'
            ]}/>
            <ListCard title="阶段 3：商业化基础" items={[
              '注册 / 登录 / 项目管理', '配额限制（fork / API）', '高级套餐与团队支持'
            ]}/>
          </div>
        </section>

        {/* API preview */}
        <section className="mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4">API 预览</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <CodeCard title="健康检查">
{`GET /healthz → { success, data: { status: "ok" } }`}
            </CodeCard>
            <CodeCard title="Fork 管理">
{`POST /api/forks { label, rpcUrl?, baseBlock? } → Fork
GET /api/forks → Fork[]
DELETE /api/forks/:id → { deleted: true }`}
            </CodeCard>
            <CodeCard title="合约交互">
{`POST /api/contracts/call
POST /api/contracts/send
POST /api/contracts/deploy`}
            </CodeCard>
            <CodeCard title="交易 Trace">
{`POST /api/trace/tx { txHash, rpcUrl? } → { callStack, storageDiff }`}
            </CodeCard>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31]">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31]">
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
        {items.map((it) => (<li key={it}>{it}</li>))}
      </ul>
    </div>
  );
}

function CodeCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white dark:bg-[#1a1b1e] dark:border-[#2a2c31]">
      <h3 className="font-semibold mb-2">{title}</h3>
      <pre className="text-xs md:text-sm whitespace-pre-wrap">{children}</pre>
    </div>
  );
}
