import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { BillHeader } from './components/BillHeader';
import { ProductTable } from './components/ProductTable';
import { BillFooter } from './components/BillFooter';
import { SalesHistory } from './components/SalesHistory';
import { ProductSearch } from './components/ProductSearch';
import { BillItem, Product } from './types';
import { MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [items, setItems] = useState<BillItem[]>([]);
  const [activeRowIndex, setActiveRowIndex] = useState<number>(0);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  
  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize with dummy data
  useEffect(() => {
    // Initial dummy data load
    const initialItem = {
        ...MOCK_PRODUCTS[0],
        id: 'init-1',
        strips: 1,
        tabs: 0,
        discountPercent: 0,
        amount: 32.00
    };
    setItems([initialItem]);
    setActiveRowIndex(1); // Set focus to the "Add new" row
  }, []);

  const handleRowClick = (index: number) => {
    setActiveRowIndex(index);
  };

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  // Direct Product Selection (Merged Batch & Product)
  const handleProductSelect = (product: Product) => {
    setIsSearchOpen(false);
    
    // Add item to bill immediately
    const newItem: BillItem = {
        ...product,
        id: `${product.id}-${Date.now()}`,
        strips: 1, // Default 1 strip
        tabs: 0,
        discountPercent: 0,
        amount: product.rate // Default amount calculation
    };
    
    setItems(prev => [...prev, newItem]);
    setActiveRowIndex(prev => prev + 1); // Move to next empty row
  };

  const handleCopyBill = (billItems: BillItem[]) => {
      // Generate unique IDs for copied items
      const newItems = billItems.map(item => ({
          ...item,
          id: `${item.id}-${Date.now()}-${Math.random()}`
      }));
      setItems(prev => [...prev, ...newItems]);
      setActiveRowIndex(prev => prev + newItems.length);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not interfere if modals are open
      if (isSearchOpen) return;

      if (e.key === 'ArrowDown') {
        setActiveRowIndex(prev => Math.min(prev + 1, items.length));
      } else if (e.key === 'ArrowUp') {
        setActiveRowIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
         if (activeRowIndex === items.length) {
             setIsSearchOpen(true);
         }
      } else if (e.key === 'Delete' && activeRowIndex < items.length) {
          const itemToRemove = items[activeRowIndex];
          if(itemToRemove) handleRemove(itemToRemove.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, activeRowIndex, isSearchOpen]);

  return (
    <div className="h-screen w-screen bg-gray-200 overflow-hidden font-sans text-gray-900 flex flex-col">
      {/* Top Banner */}
      <div className="h-8 bg-gray-800 text-white flex items-center justify-between px-4 text-xs select-none flex-shrink-0">
        <span className="font-mono font-bold tracking-wider">Marg-Style Pharma POS</span>
        <div className="flex gap-4">
             <span className="opacity-70">User:</span> <span className="font-bold text-yellow-400">ADMIN</span>
             <span className="opacity-70">Station:</span> <span className="font-bold">MAIN-PC</span>
             <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Navigation */}
        <aside className={`flex-shrink-0 z-20 transition-all duration-300 ease-in-out hidden md:block ${isNavCollapsed ? 'w-16' : 'w-64'}`}>
          <Navigation isCollapsed={isNavCollapsed} onToggle={() => setIsNavCollapsed(!isNavCollapsed)} />
        </aside>

        {/* Center Pane: Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-gray-100 p-2 gap-2 relative z-10">
          <div className="flex items-center gap-2 mb-1">
             <div className="bg-marg-teal w-1 h-6 shadow-sm"></div>
             <h2 className="font-bold text-gray-700 uppercase tracking-tight text-sm">Retail Invoice Entry</h2>
             <span className="ml-auto bg-white px-2 py-0.5 rounded border border-gray-300 text-[10px] font-mono text-gray-500 shadow-sm">FY 2024-25</span>
          </div>
          
          <BillHeader />
          
          {/* Main Table Area */}
          <div className="flex-1 flex flex-col min-h-0 shadow-md border border-gray-300 bg-white">
             <ProductTable 
                items={items} 
                onRemove={handleRemove}
                activeRowIndex={activeRowIndex}
                onRowClick={handleRowClick}
                onOpenSearch={() => setIsSearchOpen(true)}
             />
             
             {/* New Footer Integrated Here */}
             <BillFooter 
                items={items} 
                activeItem={items[activeRowIndex]} 
             />
          </div>

          <div className="bg-marg-header p-1 text-[10px] text-marg-darkTeal border border-marg-teal/20 flex justify-between rounded-sm select-none">
             <span>Press <b className="text-black bg-white px-1 border border-gray-300 rounded mx-1">Enter</b> to Add Product, <b className="text-black bg-white px-1 border border-gray-300 rounded mx-1">F10</b> to Save</span>
             <span className="font-bold text-green-700">System Ready</span>
          </div>
        </main>

        {/* Right Pane: History Only */}
        <aside className="w-72 bg-white border-l border-gray-300 shadow-xl z-20 flex-shrink-0 hidden lg:flex flex-col">
          <SalesHistory onCopyBill={handleCopyBill} />
        </aside>
      </div>

      {/* Simplified Modal - Single Step */}
      <ProductSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelect={handleProductSelect} 
      />

    </div>
  );
};

export default App;