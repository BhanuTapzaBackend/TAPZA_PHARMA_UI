import React from 'react';
import { History, Printer, Save, Trash, Clock } from 'lucide-react';
import { MOCK_HISTORY } from '../constants';
import { BillItem } from '../types';

interface InvoiceSummaryProps {
  items: BillItem[];
  onSave: () => void;
  onClear: () => void;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ items, onSave, onClear }) => {
  const gross = items.reduce((sum, item) => sum + (item.rate * (item.strips * (parseInt(item.pack)/15 || 1) + item.tabs)), 0); 
  // Simplified calculation for demo
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const discount = items.reduce((sum, item) => sum + (item.mrp * 0.05), 0); // Mock discount logic
  const gst = subtotal * 0.12; // Mock GST
  const netPayable = Math.round(subtotal + gst);
  const savings = (gross + gst) - netPayable;

  return (
    <div className="h-full flex flex-col bg-slate-50 border-l border-gray-300">
      
      {/* Patient History Section */}
      <div className="flex-1 flex flex-col overflow-hidden border-b border-gray-300">
        <div className="bg-gray-100 p-2 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-600 uppercase flex items-center gap-2">
                <History size={14} /> Patient History
            </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {MOCK_HISTORY.map((hist) => (
                <div key={hist.billNo} className="bg-white p-2 rounded border border-gray-200 shadow-sm text-xs hover:border-marg-teal cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-blue-700 flex items-center gap-1">
                            <FileIcon size={10} /> {hist.billNo}
                        </span>
                        <span className="text-gray-400 flex items-center gap-1">
                            <Clock size={10} /> {hist.date}
                        </span>
                    </div>
                    <div className="text-gray-600 truncate mb-1">
                        {hist.items.map(item => item.name).join(', ') || 'No Items'}
                    </div>
                    <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-1 mt-1">
                        <span className="text-gray-400 text-[10px]">Paid via Cash</span>
                        <span className="font-bold text-green-700 font-mono">₹{hist.amount.toFixed(2)}</span>
                    </div>
                </div>
            ))}
            <div className="text-center p-2">
                <button className="text-[10px] text-blue-600 hover:underline">View All History (F4)</button>
            </div>
        </div>
      </div>

      {/* Financial Summary Section */}
      <div className="bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        
        {savings > 0 && (
           <div className="mb-3 bg-blue-50 border border-blue-100 rounded p-2 text-center">
              <span className="text-blue-800 text-xs font-bold">Last Visit: 12 days ago</span>
              <div className="text-blue-600 text-[10px]">Total Savings: ₹{savings.toFixed(2)}</div>
           </div>
        )}

        <div className="space-y-1 mb-4">
           <SummaryRow label="Gross Amount" value={subtotal.toFixed(2)} />
           <SummaryRow label="Total Discount" value={`-${discount.toFixed(2)}`} isRed />
           <SummaryRow label="Total Taxable" value={(subtotal - discount).toFixed(2)} />
           <SummaryRow label="Total GST" value={gst.toFixed(2)} isBlue />
        </div>

        <div className="border-t-2 border-gray-800 pt-2 mb-4">
            <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-gray-500 uppercase">Net Payable</span>
                <span className="text-4xl font-black text-marg-teal font-mono tracking-tighter">
                    <span className="text-xl align-top mr-1">₹</span>{netPayable.toFixed(2)}
                </span>
            </div>
            <div className="text-right text-[10px] text-gray-400 mt-1">
                Round Off: {(netPayable - (subtotal+gst)).toFixed(2)}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <button 
                onClick={onSave}
                className="bg-marg-teal hover:bg-marg-darkTeal text-white py-3 px-2 rounded shadow flex items-center justify-center gap-2 text-xs font-bold transition-colors"
            >
                <Save size={16} /> Save & Print (F10)
            </button>
            <button 
                onClick={onClear}
                className="bg-white border border-gray-300 hover:bg-red-50 hover:border-red-300 text-gray-700 py-3 px-2 rounded shadow-sm flex items-center justify-center gap-2 text-xs font-bold transition-colors"
            >
                <Trash size={16} /> Clear (Esc)
            </button>
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, isRed, isBlue }: { label: string, value: string, isRed?: boolean, isBlue?: boolean }) => (
    <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className={`font-mono font-bold ${isRed ? 'text-red-500' : isBlue ? 'text-blue-500' : 'text-gray-800'}`}>
            {value}
        </span>
    </div>
);

const FileIcon = ({ size }: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);