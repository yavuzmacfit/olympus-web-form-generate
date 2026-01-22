
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  CreditCard, 
  Megaphone, 
  DollarSign, 
  UserCog, 
  Lock,
  ChevronRight,
  ChevronDown,
  Layout
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'kampanya': true 
  });

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Layout size={20} />, path: '/' },
    { id: 'aday', label: 'Aday Üye', icon: <Users size={20} />, children: [] },
    { id: 'onaday', label: 'Ön Aday Üye', icon: <UserPlus size={20} />, children: [] },
    { id: 'uyelik', label: 'Üyelik İşlemleri', icon: <CreditCard size={20} />, children: [] },
    { 
      id: 'kampanya', 
      label: 'Kampanya İşlemleri', 
      icon: <Megaphone size={20} />, 
      children: [
        { label: 'Web Formlar', path: '/web-formlar' },
        { label: 'Ek İndirim Tanımlamaları', path: '#' },
        { label: 'Promosyon Kodu Oluşturma', path: '#' },
        { label: 'Promosyon Kodu Listeleme - Sorgulama', path: '#' },
        { label: 'Yeni Banka İndirimi Ekleme', path: '#' },
        { label: 'Referans Kampanyası', path: '#' },
        { label: 'Dondurma Kampanyası', path: '#' }
      ] 
    },
    { id: 'borclu', label: 'Borçlu Üye Tahsilatı', icon: <DollarSign size={20} />, children: [] },
    { id: 'guncelleme', label: 'Üye Bilgisi Güncelleme', icon: <UserCog size={20} />, children: [] },
    { id: 'yetkilendirme', label: 'Yetkilendirme', icon: <Lock size={20} />, children: [] },
  ];

  return (
    <div 
      className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col ${
        isOpen ? 'w-72' : 'w-0 overflow-hidden'
      }`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <Link to="/" className="flex items-center">
            <span className="text-3xl font-black tracking-tighter text-gray-900">MAC</span>
            <span className="text-3xl font-bold text-red-600 ml-1">+</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1 px-3">
            {item.path ? (
              <Link
                to={item.path}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors group ${
                  location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            ) : (
              <button
                onClick={() => toggleMenu(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors group ${
                  item.id === 'kampanya' || (item.children && item.children.some(c => typeof c !== 'string' && (c.path === location.pathname || location.pathname.startsWith(c.path)))) ? 'text-blue-500' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.children && item.children.length > 0 && (
                  expandedMenus[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                )}
              </button>
            )}

            {/* Sub-menu */}
            {item.children && item.children.length > 0 && expandedMenus[item.id] && (
              <div className="ml-10 mt-1 space-y-1">
                {item.children.map((child, idx) => {
                  const label = typeof child === 'string' ? child : child.label;
                  const path = typeof child === 'string' ? '#' : child.path;
                  const isActive = location.pathname === path || (path !== '#' && location.pathname.startsWith(path));

                  return (
                    <Link
                      key={idx}
                      to={path}
                      className={`block py-2 pr-4 text-[13px] transition-colors border-l border-gray-100 pl-4 relative ${
                        isActive ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-blue-500'
                      }`}
                    >
                      <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-px ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}></span>
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
