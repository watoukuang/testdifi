import {ReactNode} from 'react';

export interface LayoutProps {
    children: ReactNode;
}

export interface HeaderProps {
    toggleSidebar: () => void;
}
