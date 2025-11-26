import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Box, Calendar } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Flattened list: Show ALL batches directly, not just unique product names
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.salt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearchTerm('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll selected item into view
    if (listRef.current && listRef.current.children[selectedIndex]) {
      listRef.current.children[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredProducts.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredProducts[selectedIndex]) {
        onSelect(filteredProducts[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-[850px] flex flex-col rounded-lg shadow-2xl border-2 border-marg-teal overflow-hidden h-[600px]">
        {/* Header */}
        <div className="bg-marg-teal text-white p-3 flex justify-between items-center shadow-md z-10">
          <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <Search size={16} /> Select Medicine & Batch
          </h3>
          <button onClick={onClose} className="hover:bg-teal-700 p-1 rounded transition-colors"><X size={18} /></button>
        </div>

        {/* Search Input */}
        <div className="p-3 bg-teal-50 border-b border-teal-200">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input
                ref={inputRef}
                type="text"
                placeholder="Search by Product Name, Batch or Salt..."
                className="w-full border border-gray-300 rounded pl-10 pr-4 py-3 text-lg font-bold text-gray-800 uppercase focus:ring-2 focus:ring-marg-teal focus:border-marg-teal outline-none shadow-inner"
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
             />
          </div>
        </div>

        {/* List Header */}
        <div className="grid grid-cols-12 bg-gray-100 text-[11px] font-bold text-gray-600 p-2 border-b border-gray-300 uppercase tracking-tight select-none">
           <div className="col-span-5 pl-2">Product Description</div>
           <div className="col-span-1 text-center">Pack</div>
           <div className="col-span-2 text-center">Batch</div>
           <div className="col-span-1 text-center">Exp</div>
           <div className="col-span-1 text-center">Stock</div>
           <div className="col-span-1 text-right pr-2">MRP</div>
           <div className="col-span-1 text-right pr-2">Rate</div>
        </div>

        {/* List */}
        <div ref={listRef} className="flex-1 overflow-y-auto bg-white">
          {filteredProducts.map((product, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={product.id}
                onClick={() => onSelect(product)}
                className={`grid grid-cols-12 py-2 px-1 text-xs border-b border-gray-100 cursor-pointer transition-colors ${
                  isSelected 
                    ? 'bg-marg-teal text-white' 
                    : 'hover:bg-teal-50 text-gray-800 odd:bg-gray-50/50'
                }`}
              >
                <div className="col-span-5 pl-2 font-bold flex flex-col justify-center">
                    <span className="truncate text-sm">{product.name}</span>
                    <span className={`text-[10px] truncate ${isSelected ? 'text-teal-200' : 'text-gray-400'}`}>
                        {product.salt}
                    </span>
                </div>
                <div className="col-span-1 flex items-center justify-center font-medium">{product.pack}</div>
                <div className="col-span-2 flex items-center justify-center font-mono uppercase tracking-wide">
                    {product.batch}
                </div>
                <div className={`col-span-1 flex items-center justify-center font-medium ${!isSelected && 'text-red-600'}`}>
                    {product.expiry}
                </div>
                <div className={`col-span-1 flex items-center justify-center font-bold ${!isSelected && (product.stock < 50 ? 'text-orange-500' : 'text-green-600')}`}>
                    {product.stock}
                </div>
                <div className="col-span-1 flex items-center justify-end pr-2 font-mono">
                    {product.mrp.toFixed(2)}
                </div>
                <div className="col-span-1 flex items-center justify-end pr-2 font-mono font-bold">
                    {product.rate.toFixed(2)}
                </div>
              </div>
            );
          })}
          
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <Box size={48} className="mb-2 opacity-50" />
                <span className="text-sm">No items match your search</span>
            </div>
          )}
        </div>
        
        {/* Footer Hint */}
        <div className="bg-gray-50 p-2 text-[10px] text-gray-500 border-t border-gray-200 flex justify-between px-4">
           <span>Found: <b>{filteredProducts.length}</b> batches</span>
           <span>Use <b>↑ ↓</b> to Navigate, <b>Enter</b> to Select, <b>Esc</b> to Close</span>
        </div>
      </div>
    </div>
  );
};