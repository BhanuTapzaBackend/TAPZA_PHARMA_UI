import React from 'react';
import { BillItem } from '../types';

interface ProductTableProps {
  items: BillItem[];
  onRemove: (id: string) => void;
  activeRowIndex: number;
  onRowClick: (index: number) => void;
  onOpenSearch: () => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ 
  items, 
  onRemove, 
  activeRowIndex, 
  onRowClick,
  onOpenSearch
}) => {
  return (
    <div className="flex-1 bg-white border border-gray-400 overflow-hidden flex flex-col relative shadow-inner">
      {/* Table Header */}
      <div className="bg-marg-header text-marg-teal text-[11px] font-bold border-b border-gray-400 flex items-center select-none sticky top-0 z-10">
        <div className="w-8 p-1 text-center border-r border-gray-300">#</div>
        <div className="flex-1 p-1 pl-2 border-r border-gray-300">PRODUCT NAME</div>
        <div className="w-16 p-1 text-center border-r border-gray-300">PACK</div>
        <div className="w-24 p-1 text-center border-r border-gray-300">BATCH</div>
        <div className="w-16 p-1 text-center border-r border-gray-300 text-red-600">EXP</div>
        <div className="w-12 p-1 text-center border-r border-gray-300">STRIP</div>
        <div className="w-12 p-1 text-center border-r border-gray-300">TAB</div>
        <div className="w-16 p-1 text-right border-r border-gray-300 pr-2">MRP</div>
        <div className="w-24 p-1 text-right pr-2">AMOUNT</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto bg-white">
        {items.map((item, index) => {
          const isActive = index === activeRowIndex;
          return (
            <div 
              key={item.id}
              onClick={() => onRowClick(index)}
              className={`flex items-center text-xs font-medium border-b border-gray-200 cursor-pointer transition-colors h-7
                ${isActive ? 'bg-marg-teal text-white' : 'hover:bg-blue-50 text-gray-800'}
                ${index % 2 === 0 && !isActive ? 'bg-gray-50' : ''}
              `}
            >
              <div className="w-8 text-center border-r border-gray-300/50 h-full flex items-center justify-center">{index + 1}</div>
              <div className="flex-1 pl-2 border-r border-gray-300/50 h-full flex items-center font-bold">{item.name}</div>
              <div className="w-16 text-center border-r border-gray-300/50 h-full flex items-center justify-center">{item.pack}</div>
              <div className="w-24 text-center border-r border-gray-300/50 h-full flex items-center justify-center uppercase">{item.batch}</div>
              <div className={`w-16 text-center border-r border-gray-300/50 h-full flex items-center justify-center ${isActive ? 'text-pink-200' : 'text-red-600'}`}>{item.expiry}</div>
              <div className="w-12 text-center border-r border-gray-300/50 h-full flex items-center justify-center">{item.strips > 0 ? item.strips : ''}</div>
              <div className={`w-12 text-center border-r border-gray-300/50 h-full flex items-center justify-center ${item.tabs > 0 ? 'font-bold' : ''}`}>{item.tabs}</div>
              <div className="w-16 text-right pr-2 border-r border-gray-300/50 h-full flex items-center justify-end font-mono">{item.mrp.toFixed(2)}</div>
              <div className="w-24 text-right pr-2 h-full flex items-center justify-end font-bold font-mono">{item.amount.toFixed(2)}</div>
            </div>
          );
        })}
        
        {/* Input Trigger Row */}
        <div 
            onClick={onOpenSearch}
            className={`flex items-center text-xs border-b border-gray-200 h-7 cursor-text ${activeRowIndex === items.length ? 'bg-yellow-100 ring-2 ring-inset ring-blue-400' : 'bg-white'}`}
        >
           <div className="w-8 text-center border-r border-gray-300/50 h-full flex items-center justify-center text-gray-400">{items.length + 1}</div>
           <div className="flex-1 pl-2 border-r border-gray-300/50 h-full flex items-center text-blue-600 italic">
             {activeRowIndex === items.length && <span className="animate-pulse mr-1">|</span>} Press Enter to Add Product
           </div>
        </div>
        
        {/* Fill remaining space to look like a grid */}
        {Array.from({ length: Math.max(0, 15 - items.length) }).map((_, i) => (
             <div key={`empty-${i}`} className="flex items-center text-xs border-b border-gray-100 h-7">
                <div className="w-8 border-r border-gray-100 h-full"></div>
                <div className="flex-1 border-r border-gray-100 h-full"></div>
             </div>
        ))}
      </div>
    </div>
  );
};
