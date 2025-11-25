import { MenuProps } from 'antd';

export interface HeaderSharedProps {
  cartCount: number;
  wishlistCount: number;
  notificationCount: number;
  isAuthenticated: boolean;
  user: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar?: string;
  } | null;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onSearch: (value: string) => void;
  userMenuItems: MenuProps['items'];
  categoryMenuItems: MenuProps['items'];
  navLinks: Array<{
    href: string;
    label: string;
    icon: React.ReactNode;
  }>;
  scrolled: boolean;
  hasAnimated: boolean;
  onLogout: () => void;
  logoutLoading: boolean;
}
