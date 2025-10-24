import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

interface MenuItem {
  icon: string;
  name: string;
  href: string;
  colorIcon?: string;   // 图标颜色（浅色 + 深色）
  colorBar?: string;    // 选中条颜色（浅色 + 深色）
}

export default function Sidebar(): React.ReactElement {
  const router = useRouter();
  const {pathname} = router;
  // 渲染合适的 SVG 图标
  const renderIcon = (label: string, className?: string) => {
    const cn = `h-5 w-5 ${className || ''}`;
    switch (label) {
      case '概览':
        // Home
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4a2 2 0 01-2-2v-5H9v5a2 2 0 01-2 2H3v-9z"/>
          </svg>
        );
      case 'Swap 工具':
        // Arrows left-right
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M7 7h11l-3-3 1.4-1.4L22.8 8l-6.4 5.4L15 12l3-3H7V7zm10 10H6l3 3-1.4 1.4L1.2 16l6.4-5.4L9 12l-3 3h11v2z"/>
          </svg>
        );
      case '合约控制台':
        // Terminal
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M3 4h18v16H3V4zm3 3l4 4-4 4-1.4-1.4L7.2 11 4.6 8.4 6 7zm6 8h6v2h-6v-2z"/>
          </svg>
        );
      case '一键部署':
        // Rocket
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2l4 4-3 3 2 2 3-3 4 4-7 7-4-4-4 4-3-3 4-4-4-4 7-7z"/>
          </svg>
        );
      case 'Fork 管理':
        // Branch
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M6 3a3 3 0 100 6 3 3 0 000-6zm0 8a3 3 0 100 6 3 3 0 000-6zm12-8a3 3 0 100 6 3 3 0 000-6zM9 6h6a3 3 0 013 3v2a3 3 0 01-3 3h-6"/>
          </svg>
        );
      case '交易 Trace':
        // Search/Trace
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M10 2a8 8 0 105.3 14.3l4.2 4.2 1.5-1.5-4.2-4.2A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"/>
          </svg>
        );
      case '钱包连接':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M21 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2h18zM3 10v8a2 2 0 002 2h14a2 2 0 002-2v-8H3zm14 4a1 1 0 100-2 1 1 0 000 2z"/>
          </svg>
        );
      case '代币水龙头':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case '流动性池':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case '借贷协议':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
          </svg>
        );
      case 'NFT 市场':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        );
      case '跨链桥':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2zm-1 8v6l4.5-2.7L12 10z"/>
          </svg>
        );
      case '价格预言机':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        );
      case '治理投票':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        );
      case '多签钱包':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
        );
      case '闪电贷':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
        );
      case '套利机器人':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        );
      case '数据分析':
        // Analytics
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M3 3v18h18v-2H5V3H3zm4 14h2v-6H7v6zm4 0h2V9h-2v8zm4 0h2V5h-2v12z"/>
          </svg>
        );
      case '风险监控':
        // Risk Monitor
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2zm0 4.5L9.5 11l-2.5.5 2 1.5-.5 2.5L12 13.5l3.5 1.5-.5-2.5 2-1.5L14.5 11 12 6.5z"/>
          </svg>
        );
      case '性能测试':
        // Performance Test
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case '历史记录':
        // History
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
          </svg>
        );
      case '网络设置':
        // Network Settings
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case '气体费用':
        // Gas Fee
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6v-2.59c0-1.42 1.17-2.59 2.59-2.59H16c1.1 0 2-.9 2-2V9.77l1.77-2.54z"/>
          </svg>
        );
      case '帮助文档':
        // Help Documentation
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        );
      case '关于项目':
        // Info
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        );
      case '价格预言机':
        // Oracle/Globe
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        );
      case '闪电贷测试':
        // Lightning
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
        );
      case '借贷协议':
        // Handshake/Deal
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
          </svg>
        );
      case '收益农场':
        // Agriculture/Farm
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case '稳定币测试':
        // Stable/Balance
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case '跨链桥':
        // Bridge
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2zm-1 8v6l4.5-2.7L12 10z"/>
          </svg>
        );
      case '治理投票':
        // Vote/Ballot
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        );
      case '合约审计':
        // Security/Shield Check
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
        );
      case '漏洞扫描':
        // Bug/Search
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8z"/>
          </svg>
        );
      case '攻击模拟':
        // Target/Crosshair
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        );
      case '风险评估':
        // Warning/Alert
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        );
      case '价格':
        // Tag
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <path d="M10 3l10 10-7 7L3 10V3h7zm-2 5a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn}>
            <circle cx="12" cy="12" r="8"/>
          </svg>
        );
    }
  };
  // 核心交易功能
  const coreTrading: MenuItem[] = [
    { icon: "", name: "Swap 工具", href: "/swap", colorIcon: "text-emerald-600 dark:text-emerald-400", colorBar: "bg-emerald-600 dark:bg-emerald-400" },
    { icon: "", name: "流动性池", href: "/pools", colorIcon: "text-blue-600 dark:text-blue-400", colorBar: "bg-blue-600 dark:bg-blue-400" },
  ];

  // 开发者工具
  const devTools: MenuItem[] = [
    { icon: "", name: "合约控制台", href: "/console", colorIcon: "text-indigo-600 dark:text-indigo-400", colorBar: "bg-indigo-600 dark:bg-indigo-400" },
    { icon: "", name: "一键部署", href: "/deploy", colorIcon: "text-violet-600 dark:text-violet-400", colorBar: "bg-violet-600 dark:bg-violet-400" },
    { icon: "", name: "Fork 管理", href: "/forks", colorIcon: "text-amber-600 dark:text-amber-400", colorBar: "bg-amber-600 dark:bg-amber-400" },
    { icon: "", name: "交易 Trace", href: "/trace", colorIcon: "text-rose-600 dark:text-rose-400", colorBar: "bg-rose-600 dark:bg-rose-400" },
  ];
  
  // 测试工具
  const testingTools: MenuItem[] = [
    { icon: "", name: "代币水龙头", href: "/faucet", colorIcon: "text-pink-600 dark:text-pink-400", colorBar: "bg-pink-600 dark:bg-pink-400" },
    { icon: "", name: "钱包连接", href: "/wallet", colorIcon: "text-teal-600 dark:text-teal-400", colorBar: "bg-teal-600 dark:bg-teal-400" },
    { icon: "", name: "价格预言机", href: "/oracle", colorIcon: "text-cyan-600 dark:text-cyan-400", colorBar: "bg-cyan-600 dark:bg-cyan-400" },
    { icon: "", name: "闪电贷测试", href: "/flashloan", colorIcon: "text-yellow-600 dark:text-yellow-400", colorBar: "bg-yellow-600 dark:bg-yellow-400" },
  ];
  
  // DeFi 协议测试
  const defiProtocols: MenuItem[] = [
    { icon: "", name: "借贷协议", href: "/lending", colorIcon: "text-green-600 dark:text-green-400", colorBar: "bg-green-600 dark:bg-green-400" },
    { icon: "", name: "收益农场", href: "/yield-farming", colorIcon: "text-lime-600 dark:text-lime-400", colorBar: "bg-lime-600 dark:bg-lime-400" },
    { icon: "", name: "稳定币测试", href: "/stablecoin", colorIcon: "text-emerald-600 dark:text-emerald-400", colorBar: "bg-emerald-600 dark:bg-emerald-400" },
    { icon: "", name: "跨链桥", href: "/bridge", colorIcon: "text-sky-600 dark:text-sky-400", colorBar: "bg-sky-600 dark:bg-sky-400" },
    { icon: "", name: "治理投票", href: "/governance", colorIcon: "text-purple-600 dark:text-purple-400", colorBar: "bg-purple-600 dark:bg-purple-400" },
  ];
  
  // 安全测试
  const securityTools: MenuItem[] = [
    { icon: "", name: "合约审计", href: "/audit", colorIcon: "text-red-600 dark:text-red-400", colorBar: "bg-red-600 dark:bg-red-400" },
    { icon: "", name: "漏洞扫描", href: "/vulnerability", colorIcon: "text-orange-600 dark:text-orange-400", colorBar: "bg-orange-600 dark:bg-orange-400" },
    { icon: "", name: "攻击模拟", href: "/attack-simulation", colorIcon: "text-rose-600 dark:text-rose-400", colorBar: "bg-rose-600 dark:bg-rose-400" },
    { icon: "", name: "风险评估", href: "/risk-assessment", colorIcon: "text-amber-600 dark:text-amber-400", colorBar: "bg-amber-600 dark:bg-amber-400" },
  ];
  
  // 其他功能
  const others: MenuItem[] = [
    { icon: "", name: "交易历史", href: "/history", colorIcon: "text-purple-500 dark:text-purple-300", colorBar: "bg-purple-500 dark:bg-purple-300" },
    { icon: "", name: "网络设置", href: "/network", colorIcon: "text-blue-500 dark:text-blue-300", colorBar: "bg-blue-500 dark:bg-blue-300" },
    { icon: "", name: "气体费用", href: "/gas", colorIcon: "text-orange-500 dark:text-orange-300", colorBar: "bg-orange-500 dark:bg-orange-300" },
  ];
  

  const renderMenuSection = (title: string, icon: string, items: MenuItem[]) => (
    <div key={title} className="mb-6">
      <div className="mb-2 pb-1 border-b border-gray-100 dark:border-gray-800">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
          <span aria-hidden>{icon}</span>
          {title}
        </span>
      </div>
      <nav className="space-y-1">
        {items.map((item, index) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link href={item.href} key={index}
                  className={`sidebar-link relative pl-3 ${active ? 'active' : ''}`}>
              {active && <span aria-hidden
                               className={`absolute left-0.5 top-1/2 -translate-y-1/2 h-6 w-1.5 rounded-full ${item.colorBar || ''}`}/>}
              <span className={`mr-2 ${item.colorIcon || ''}`}>{renderIcon(item.name, '')}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
    return (
        <aside
            className="w-full lg:w-56 overflow-y-auto py-2 px-2 lg:px-4 lg:border-r lg:border-gray-200 dark:lg:border-[#2a2c31] lg:fixed lg:top-0 lg:h-screen dark:bg-[#1a1b1e]">
            {/* 顶部紧凑LOGO，仅作品牌展示，不占用太多空间 */}
            <div className="hidden lg:flex items-center gap-2 py-3 mb-1">
                <Link href="/" className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="h-8 w-auto"/>
                    <span className="ml-2 text-base font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-emerald-300">TEST DEFI</span>
                </Link>
            </div>
            <div className="mt-4">
              {renderMenuSection("核心交易", "💱", coreTrading)}
              {renderMenuSection("开发工具", "🛠️", devTools)}
              {renderMenuSection("测试工具", "🔧", testingTools)}
              {renderMenuSection("DeFi 协议", "🏦", defiProtocols)}
              {renderMenuSection("安全测试", "🛡️", securityTools)}
              {renderMenuSection("其他功能", "⚙️", others)}
            </div>
        </aside>
    );
}
