import React, {useEffect, useState} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Footer from './Footer';
import {LayoutProps} from '../types';

export default function Layout({children}: LayoutProps): React.ReactElement {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Check if we're on mobile
    useEffect(() => {
        const checkIfMobile = (): void => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            const target = event.target as Element;
            if (isMobile && isSidebarOpen && !target.closest('.sidebar')) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMobile, isSidebarOpen]);

    return (
        <div className="flex flex-col min-h-screen dark:bg-[#121212]">
            <div className={`hidden lg:block`}>
                <Sidebar/>
            </div>
            <div className="lg:pl-56 flex flex-col flex-1">
                <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
                {/* 顶部分隔渐隐（仅暗色） */}
                <div aria-hidden className="h-3 bg-transparent dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent"/>
                <div className="flex flex-1">
                    {/* Mobile sidebar */}
                    <div
                        className={`lg:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    <div
                        className={`sidebar fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-[#1a1b1e] transform transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        <div
                            className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center dark:text-white">
                            <h2 className="font-bold">挖头矿</h2>
                            <button onClick={() => setIsSidebarOpen(false)}>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <Sidebar/>
                    </div>

                    {/* Main content */}
                    <main className="flex-1 pt-8 md:pt-10 px-4 lg:px-12 max-w-screen-2xl mx-auto w-full">
                        {children}
                    </main>
                </div>
                <Footer/>
                <div className="lg:hidden">
                    <MobileNav/>
                </div>
            </div>
        </div>
    );
}
