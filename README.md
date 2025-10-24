# TestSwap.org：为开发者而生的 DeFi 测试沙盒

一个面向 Web3 开发者的在线平台，提供测试网交易工具、合约交互控制台、主网 Fork 模拟器、调试与分析工具，帮助开发者快速验证、调试、部署和模拟真实 DeFi 场景。

## 目录
- 概述
- 核心功能
- 技术架构
- 项目目录结构
- 快速开始
- 开发与运行
- API 参考
- 路线图（MVP → V1）
- 商业化路径
- 技术栈
- 许可证

## 概述
TestSwap.org 致力于为开发者提供一站式的 DeFi 实验与验证平台：从测试网 Swap、合约交互，到主网 Fork 环境的创建与调试分析，覆盖开发、调试、教学、演示等全流程。

> Badges（可选，占位）：Build | License | Rust | Node | Docs
> 例如：`![Build](https://img.shields.io/badge/build-passing-brightgreen)` `![Rust](https://img.shields.io/badge/rust-1.70+-orange)`

## 核心功能

| 模块名称 | 功能定位 |
| --- | --- | 
| Swap 模拟工具 | 在测试网上模拟真实代币交换 | 
| 合约交互控制台 | 上传 ABI，调用任意函数 | 
| 一键部署标准合约 | 部署 ERC20、池子、FlashLoan 等 | 
| 主网 Fork 测试环境 | 在本地 fork 主网，模拟真实交易逻辑 | 
| 交易可视化与日志分析 | 提供交易 trace、状态变更、调试日志 | 
| API & SDK 接口 | 开放后端服务供脚本使用 | 

### 详细能力
1. 测试网 Swap 工具
    - 钱包连接（测试网：Sepolia、Holesky）
    - 输入 token0 / token1 地址
    - 自动或手动选择 fee tier
    - 发起 `swapExactInputSingle`
    - 提供模拟输出、slippage、gas 成本显示

2. 合约交互控制台
    - 上传 ABI 或选择标准模板
    - 显示函数列表 + 参数输入框
    - 支持 call 和 sendTransaction
    - 读取 `storage` / `view` 方法自动处理

3. 合约快速部署
    - 一键部署：ERC20、Uniswap Pool、Vesting 等
    - 自定义参数（name、supply、fee 等）
    - 自动记录部署地址、生成交互链接

4. 主网 Fork 模拟器
    - 选择主网 block 号 → 创建 fork 实例（Anvil）
    - 分配测试 ETH / 自定义代币余额
    - 在 fork 上测试 swap、部署、策略验证
    - 实时销毁 / 重启 fork 环境

5. 交易调试与分析
    - 展示交易 receipt / gas 使用 / revert 原因
    - 使用 `debug_traceTransaction` 获取 call stack、storage 变化
    - 高亮常见错误（如 `INSUFFICIENT_OUTPUT_AMOUNT`）

6. API / SDK 支持
    - 提供 API（合约调用、部署、trace 等）
    - SDK（Go / JS）封装调用流程，支持本地与 CI

## 技术架构

```text
User (Developer)
  └─ Front-end (Next.js + Wagmi)
       ├─ Swap UI (Testnet / Fork)
       ├─ Contract Interaction Console
       ├─ Fork Manager Interface
       └─ Token Deployment Wizard

Back-end (Rust + Axum/Actix-web API)
  ├─ Fork Manager (Anvil Containers)
  ├─ Contract Execution Engine
  ├─ RPC Proxy Layer (Testnet / Fork)
  ├─ Transaction Trace & Analysis
  └─ Deployment Service

Blockchain Layer
  ├─ Public Testnets (Sepolia, Holesky)
  └─ Local Forks (Anvil, Hardhat, Foundry)
```

## 项目目录结构

```text
/ (repo root)
├─ testswap-api/                 # 后端（Rust + Axum/Actix-web）
│  ├─ Cargo.toml                # Rust 项目配置文件
│  ├─ Cargo.lock                # 依赖锁定文件
│  └─ src/
│     ├─ main.rs                # 应用入口点
│     ├─ lib.rs                 # 库入口（可选）
│     ├─ handlers/              # API 处理器（路由处理函数）
│     ├─ services/              # 业务逻辑层
│     ├─ models/                # 数据模型
│     ├─ utils/                 # 工具函数
│     └─ config/                # 配置管理
├─ testswap-ui/                  # 前端（Next.js + TypeScript）
├─ README.md
└─ .gitignore
```

## 快速开始
> 当前代码库为结构化初始化阶段，后端/前端实现将逐步补全。以下为建议的环境与启动方式，具体命令会在实现落地后补充。

- 前置要求
    - Rust 1.70+（推荐使用 rustup 安装）
    - Cargo（Rust 包管理器，随 Rust 一起安装）
    - Node.js 18+ / pnpm 8+
    - Foundry（含 anvil），或等效本地链
    - 可用的以太坊节点服务（Infura/Alchemy/自建 Geth）

- 克隆与安装
  ```bash
  git clone https://github.com/your-org/testswap.git
  cd testswap
  ```

> Postman/Insomnia：后续可提供导入文件（占位：`docs/api.postman_collection.json`）。

- 启动本地 fork（示例）
  ```bash
  anvil --fork-url $MAINNET_RPC --fork-block-number 21000000
  ```

- 启动后端（Rust）
  ```bash
  cd testswap-api
  # 方式一：开发运行（带热重载）
  cargo watch -x run
  
  # 方式二：直接运行
  RUST_LOG=info SERVER_PORT=8080 cargo run

  # 方式三：构建优化版本并运行
  cargo build --release
  RUST_LOG=info SERVER_PORT=8080 ./target/release/testswap-api
  ```

- 启动前端（占位说明）
  ```bash
  cd testswap-ui
  npm install
  npm run dev
  ```

> Windows 环境变量设置示例（PowerShell）
> - `$env:SERVER_PORT=8080; $env:RUST_LOG="info"; cargo run`
> - 构建后运行：`$env:SERVER_PORT=8080; $env:RUST_LOG="info"; .\target\release\testswap-api.exe`

## 开发工具推荐

### Rust 开发环境
- **IDE/编辑器**：
    - VS Code + rust-analyzer 插件（推荐）
    - IntelliJ IDEA + Rust 插件
    - Neovim + rust-analyzer LSP

- **有用的 Cargo 工具**：
  ```bash
  # 安装开发工具
  cargo install cargo-watch    # 文件变化时自动重新编译
  cargo install cargo-edit     # 命令行管理依赖
  cargo install cargo-audit    # 安全审计
  cargo install cargo-outdated # 检查过期依赖
  ```

- **代码质量工具**：
  ```bash
  # 格式化代码
  cargo fmt
  
  # 代码检查
  cargo clippy
  
  # 安全审计
  cargo audit
  ```

## 开发与运行
- 配置
    - 环境变量：RPC_URL、FORK_BLOCK、CHAIN_ID、DATABASE_URL（可选）
    - 针对 Fork 管理：容器化 anvil 实例或进程级管理
    - 前后端统一配置：
        - 后端：`SERVER_PORT`（默认 8080）
        - 前端：`NEXT_PUBLIC_API_BASE`（默认 `http://localhost:8080`）
    - Rust 后端配置（通过环境变量或配置文件）：
        - `DATABASE_URL`：数据库连接字符串（可选，如：`postgres://user:pass@localhost/testswap`）
        - `RPC_URL`：以太坊节点 RPC 地址
        - `FORK_BLOCK`：Fork 基准区块号（可选）
        - `RUST_LOG`：日志级别（如：`info`, `debug`, `warn`, `error`）
    - 配置文件支持（可选）：
        - 使用 `config.toml` 或 `settings.yaml` 进行配置管理
        - 支持不同环境的配置文件（`config.dev.toml`, `config.prod.toml`）
    - 安全与限流（环境变量，可选）：
        - `TESTSWAP_API_KEY`：API Key（设置后需通过请求头 `X-API-Key` 鉴权；未设置则不启用鉴权）
        - `TESTSWAP_RATE_LIMIT_PER_MIN`：每分钟限流次数（默认 60，基于客户端 IP）
- 调试
    - 开启 trace：`debug_traceTransaction`
    - 事务回放：对关键调用打点记录 & 复现
- 测试
    - 后端：Rust `cargo test` / 集成测试
    - 合约：Foundry `forge test`
    - 前端：Playwright / Vitest（视脚手架而定）
    - 性能测试：使用 `criterion` crate 进行基准测试

## API 参考

> 当前 API 为占位实现，便于前端联调与演示；返回示例与结构已稳定，可逐步替换为真实逻辑。

> 在线文档：启动后访问 Swagger UI
> - `http://localhost:8080/swagger-ui.html`（将重定向至）
> - `http://localhost:8080/swagger-ui/index.html`

- 元信息与健康检查
    - GET `/` → `{ name, status }`
    - GET `/healthz` → `{ status }`
    - GET `/version` → `{ version }`
    - GET `/api/ping` → `{ message: "pong" }`

- Fork 管理
    - POST `/api/forks`
        - 请求体：
          ```json
          {
            "label": "local-fork",
            "rpcUrl": "http://localhost:8545", // 可选，缺省使用 testswap.rpc.url
            "baseBlock": 21000000                 // 可选
          }
          ```
        - 响应体：
          ```json
          {
            "id": "<uuid>",
            "label": "local-fork",
            "rpcUrl": "http://localhost:8545",
            "baseBlock": 21000000,
            "createdAt": "2025-01-01T00:00:00Z"
          }
          ```
    - GET `/api/forks` → `Fork[]`
    - DELETE `/api/forks/{id}` → `{ deleted: true }`

- 合约交互（占位模拟）
    - POST `/api/contracts/call`
        - 请求体（示例）：
          ```json
          {
            "address": "0x...",
            "method": "balanceOf",
            "params": { "account": "0x..." },
            "rpcUrl": "http://localhost:8545"
          }
          ```
        - 响应体：`{ success, message, data: { address, method, params, rpcUrl } }`
    - POST `/api/contracts/send`
        - 请求体（示例）：
          ```json
          {
            "from": "0x...",
            "address": "0x...",
            "method": "transfer",
            "params": { "to": "0x...", "amount": "1000000000000000000" },
            "value": "0"
          }
          ```
        - 响应体：`{ success, message, data: { txHash, ... } }`
    - POST `/api/contracts/deploy`
        - 请求体（示例）：
          ```json
          {
            "template": "ERC20",
            "args": { "name": "TST", "symbol": "TST", "supply": "1000000" }
          }
          ```
        - 响应体：`{ success, message, data: { address, ... } }`

- 交易 Trace（占位模拟）
    - POST `/api/trace/tx`
        - 请求体：`{ "txHash": "0x...", "rpcUrl": "http://localhost:8545" }`
        - 响应体：`{ success, message, data: { callStack: string[], storageDiff: string[] } }`

- Curl 快速验证
  ```bash
  # 健康
  curl http://localhost:8080/healthz
  # Fork 创建 + 列表 + 删除
  curl -X POST http://localhost:8080/api/forks -H 'Content-Type: application/json' \
    -d '{"label":"local-fork","rpcUrl":"http://localhost:8545","baseBlock":21000000}'
  curl http://localhost:8080/api/forks
  curl -X DELETE http://localhost:8080/api/forks/<id>
  # 合约交互（示例）
  curl -X POST http://localhost:8080/api/contracts/call -H 'Content-Type: application/json' \
    -d '{"address":"0x...","method":"balanceOf","params":{"account":"0x..."}}'
  # Trace
  curl -X POST http://localhost:8080/api/trace/tx -H 'Content-Type: application/json' \
    -d '{"txHash":"0x..."}'
  
  # 若设置了 API Key，需带上请求头
  # export APIK=your_api_key
  curl -H "X-API-Key: $APIK" http://localhost:8080/healthz
  ```

## 路线图（MVP → V1）

- 阶段 1：MVP 测试版（进行中）
    - 钱包连接
    - 测试网 Swap 工具
    - 合约交互控制台
    - 部署 ERC20 合约
    - 简单的后端服务 + RPC 转发

- 阶段 2：功能增强（计划）
    - Fork 测试管理器（支持多个实例）
    - Gas / Trace 分析
    - 部署池子合约 + Swap 策略模拟
    - 导出调用脚本（支持 SDK）

- 阶段 3：商业化基础（计划）
    - 注册 / 登录 / 项目管理
    - 配额限制（fork 时间 / API 次数）
    - 高级套餐（更大内存、更多节点）
    - 团队账户 / 教学支持

## 商业化路径

| 模式 | 示例 |
| --- | --- |
| 高级订阅 | $9/月：更多 Fork 实例、更长运行时间 |
| API 接入 | 提供策略模拟 API，按调用量计费 |
| 教育合作 | DAO / 学校教学，提供定制版 |
| 白标部署 | 给 DeFi 团队部署专属版本 |

## 技术栈

| 组件 | 技术选型 |
| --- | --- |
| 前端 | Next.js + TailwindCSS + Wagmi + Ethers.js |
| 后端 | Rust + Axum/Actix-web + SQLx + PostgreSQL（可选） |
| 合约 | Solidity + Foundry |
| Fork 引擎 | Anvil（Foundry 内置） |
| 区块链服务 | Infura / Alchemy / 自建 Geth |
| 部署 | Docker + Fly.io / Railway / Shuttle.rs |

## 故障排查（Troubleshooting）

- 端口被占用
    - 后端：修改环境变量 `SERVER_PORT` 或配置文件中的端口设置
    - 前端：`npm run dev -- -p 3001`
- 数据库连接失败
    - 确认 `DATABASE_URL` 环境变量设置正确
    - 如不使用数据库，可以注释掉相关的数据库依赖和初始化代码
- Rust 版本不匹配
    - 使用 `rustup update` 更新到最新稳定版本
    - 检查 `Cargo.toml` 中的最小支持版本要求
- 编译错误
    - 运行 `cargo clean` 清理构建缓存
    - 使用 `cargo check` 进行快速语法检查

## 常见问题（FAQ）

- 是否必须有数据库？
    - 否。当前后端可在无数据库下启动；只有需要持久化时才配置数据源与 SQLx 连接池。
- 能否在本地没有节点的情况下使用？
    - 可以。可使用公有节点（Infura/Alchemy），或本地 `anvil` 启动 fork 环境。
- 生产环境是否安全？
    - 当前 API 多为占位，未进行鉴权、限流与安全加固。生产前需补充认证、审计与安全策略。

## 性能优化建议

### Rust 后端性能优化
- **编译优化**：
  ```toml
  # Cargo.toml 中的 release 配置
  [profile.release]
  lto = true              # 链接时优化
  codegen-units = 1       # 减少代码生成单元
  panic = "abort"         # 减少二进制大小
  ```

- **异步运行时**：
    - 使用 Tokio 作为异步运行时
    - 合理配置线程池大小
    - 避免阻塞操作在异步上下文中执行

- **内存管理**：
    - 使用 `Arc<T>` 和 `Mutex<T>` 进行线程安全的共享状态
    - 考虑使用 `dashmap` 替代 `std::collections::HashMap` 在高并发场景

## 贡献（Contributing）

- **分支策略**：`main`（稳定）/ `develop`（集成）/ `feature/*`（特性）
- **提交规范**：`feat: ...`、`fix: ...`、`docs: ...`、`refactor: ...`
- **代码规范**：
    - 运行 `cargo fmt` 格式化代码
    - 运行 `cargo clippy` 通过所有检查
    - 确保 `cargo test` 全部通过
- **PR 要求**：说明动机、变更范围、测试方式、对 README 的影响

## 安全与隐私（Security & Privacy）

- 不要在代码库中提交私钥、助记词、RPC 凭据等敏感信息
- 推荐通过环境变量或密钥管理服务注入敏感配置
- 对公开 API 应添加鉴权、速率限制与审计日志

## Docker 部署

### 多阶段构建 Dockerfile 示例
```dockerfile
# 构建阶段
FROM rust:1.70 as builder
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release

# 运行阶段
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/target/release/testswap-api .
EXPOSE 8080
CMD ["./testswap-api"]
```

### Docker Compose 示例
```yaml
version: '3.8'
services:
  testswap-api:
    build: ./testswap-api
    ports:
      - "8080:8080"
    environment:
      - RUST_LOG=info
      - SERVER_PORT=8080
      - RPC_URL=${RPC_URL}
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=testswap
      - POSTGRES_USER=testswap
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 版本策略（Versioning）

- 采用语义化版本（SemVer）：`MAJOR.MINOR.PATCH`
- 重大变更需在 RELEASE NOTES 中列明迁移指南
- 使用 `cargo-release` 工具自动化版本发布流程

## 许可证
本项目采用 MIT License，见 [LICENSE](./LICENSE) 文件。