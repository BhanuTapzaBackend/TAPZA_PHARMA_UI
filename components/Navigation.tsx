import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  FileText, 
  Settings, 
  Users, 
  BarChart3,
  LogOut,
  Keyboard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface NavigationProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isCollapsed, onToggle }) => {
  const menuItems = [
    { icon: ShoppingCart, label: 'Sales Entry', active: true, shortcut: 'Alt+S' },
    { icon: Package, label: 'Purchase', active: false, shortcut: 'Alt+P' },
    { icon: FileText, label: 'Stock', active: false, shortcut: 'Alt+K' },
    { icon: Users, label: 'Patients', active: false, shortcut: 'Alt+C' },
    { icon: BarChart3, label: 'Reports', active: false, shortcut: 'Alt+R' },
    { icon: Settings, label: 'Settings', active: false, shortcut: 'Alt+O' },
  ];

  return (
    <div className={`h-full bg-gradient-to-b from-marg-teal to-teal-800 text-white flex flex-col shadow-xl transition-all duration-300 relative`}>
      {/* Header */}
      <div className={`p-4 border-b border-teal-600 flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 flex-shrink-0 bg-white rounded-md flex items-center justify-center text-marg-teal font-bold text-xl shadow-inner cursor-pointer" onClick={onToggle}>
          M
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="font-bold text-lg leading-none">PHARMA</h1>
            <p className="text-[10px] text-teal-200 uppercase tracking-widest">ERP System</p>
          </div>
        )}
      </div>

      {/* Toggle Button (Floating) */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-6 bg-teal-900 border border-teal-500 text-white p-0.5 rounded-full shadow-md z-50 hover:bg-teal-700 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-2 overflow-x-hidden">
        {menuItems.map((item, index) => (
          <button
            key={index}
            title={isCollapsed ? item.label : ''}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all border-l-4 group
              ${item.active 
                ? 'bg-teal-900/50 border-yellow-400 text-yellow-100 font-medium' 
                : 'border-transparent hover:bg-teal-700/50 hover:border-teal-400 text-teal-100'
              }
              ${isCollapsed ? 'justify-center px-2' : ''}
            `}
          >
            <item.icon size={isCollapsed ? 20 : 18} className="flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>
                <span className="text-[10px] opacity-60 font-mono bg-black/20 px-1 rounded">{item.shortcut}</span>
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className={`p-4 bg-teal-900/40 border-t border-teal-600 ${isCollapsed ? 'flex flex-col items-center p-2' : ''}`}>
        <div className={`bg-teal-800 rounded p-3 mb-2 ${isCollapsed ? 'hidden' : ''}`}>
          <div className="flex items-center gap-2 text-xs text-yellow-200 mb-1">
             <Keyboard size={12} />
             <span className="font-bold uppercase">Quick Keys</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-teal-100 font-mono whitespace-nowrap">
            <div>F2: Search</div>
            <div>F3: New</div>
            <div>F10: Save</div>
            <div>Del: Remove</div>
          </div>
        </div>
        
        <button 
          title="Logout"
          className={`flex items-center gap-2 text-xs text-teal-200 hover:text-white w-full ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={isCollapsed ? 18 : 14} />
          {!isCollapsed && <span>Logout User</span>}
        </button>
      </div>
    </div>
  );
};