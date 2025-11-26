import React, { useState } from 'react';
import { History, Copy, Filter, CalendarDays } from 'lucide-react';
import { MOCK_HISTORY } from '../constants';
import { BillItem } from '../types';

interface SalesHistoryProps {
  onCopyBill: (items: BillItem[]) => void;
}

export const SalesHistory: React.FC<SalesHistoryProps> = ({ onCopyBill }) => {
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  const filteredHistory = MOCK_HISTORY.filter(bill => {
    if (filter === 'all') return true;
    // Simple mock filter logic
    if (filter === 'month') return bill.date.includes('2025-10'); 
    if (filter === 'week') return bill.billNo === 'A00101'; // Mock
    return true;
  });

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-300">
      {/* Header with Filter */}
      <div className="bg-gray-100 p-3 border-b border-gray-200">
         <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-700 uppercase flex items-center gap-2">
                <History size={14} className="text-marg-teal" /> Sales History
            </h3>
            <button className="p-1 hover:bg-gray-200 rounded">
                <Filter size={12} className="text-gray-500" />
            </button>
         </div>
         <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="w-full text-xs border border-gray-300 rounded p-1 bg-white focus:outline-none focus:border-marg-teal"
         >
             <option value="all">All Time</option>
             <option value="week">Last 7 Days</option>
             <option value="month">This Month</option>
         </select>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-slate-50">
         {filteredHistory.map(bill => (
            <div 
                key={bill.billNo} 
                className="bg-white border border-gray-200 rounded p-2 shadow-sm hover:shadow-md transition-shadow group relative"
            >
                <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-xs text-blue-800">{bill.billNo}</span>
                    <span className="text-[10px] text-gray-500 bg-gray-100 px-1 rounded flex items-center gap-1">
                        <CalendarDays size={10} /> {bill.date}
                    </span>
                </div>
                <div className="text-xs text-gray-600 mb-1 truncate font-medium">
                    {bill.patientName}
                </div>
                
                <div className="flex justify-between items-center mt-2 border-t border-dashed border-gray-100 pt-1">
                    <span className={`text-[10px] px-1 rounded ${bill.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {bill.status}
                    </span>
                    <span className="font-mono font-bold text-sm">₹{bill.amount.toFixed(2)}</span>
                </div>

                {/* Copy Overlay/Button */}
                {bill.items.length > 0 && (
                     <button 
                        onClick={() => onCopyBill(bill.items)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-marg-teal text-white p-1.5 rounded-full shadow-lg hover:bg-teal-700"
                        title="Copy items to current bill"
                     >
                        <Copy size={12} />
                     </button>
                )}
            </div>
         ))}
      </div>
    </div>
  );
};
