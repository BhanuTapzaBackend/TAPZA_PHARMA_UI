import React from 'react';
import { BillItem } from '../types';

interface BillFooterProps {
  items: BillItem[];
  activeItem?: BillItem;
}

export const BillFooter: React.FC<BillFooterProps> = ({ items, activeItem }) => {
  // Calculate Totals
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const discount = items.reduce((sum, item) => sum + (item.mrp * (item.discountPercent/100) * ((item.strips * (parseInt(item.pack)/15||1)) + item.tabs)), 0); 
  // Note: Simplified logic for demo
  const gst = subtotal * 0.12; 
  const gross = subtotal + discount; 
  const netPayable = Math.round(subtotal + gst);
  
  // Dummy values for margin/cost logic visualization
  const activeRate = activeItem ? activeItem.rate.toFixed(2) : '0.00';
  const activeCost = activeItem ? (activeItem.rate * 0.8).toFixed(2) : '0.00';
  const activeMargin = activeItem ? '20.00%' : '0.00%';

  return (
    <div className="h-32 bg-white border-t border-gray-400 flex flex-col shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        {/* Top Info Bar - Mimicking the "Item Details" part of the screenshot */}
        <div className="flex border-b border-gray-300">
            <div className="w-1/2 p-2 grid grid-cols-2 gap-x-8 gap-y-1 text-xs font-mono border-r border-gray-300 bg-blue-50/30">
                <div className="flex justify-between">
                    <span className="text-blue-600 font-bold">PurRate:</span>
                    <span className="text-gray-800">{activeRate}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-blue-600 font-bold">M.R.P. :</span>
                    <span className="text-gray-800">{activeItem?.mrp.toFixed(2) || '0.00'}</span>
                </div>
                
                <div className="flex justify-between">
                    <span className="text-blue-600 font-bold">Cost :</span>
                    <span className="text-gray-800">{activeCost}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-blue-600 font-bold">Rate-A :</span>
                    <span className="text-gray-800">{activeRate}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-blue-600 font-bold">Margin%:</span>
                    <span className="text-gray-800">{activeMargin}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-blue-600 font-bold">Tax-T-I:</span>
                    <span className="text-gray-800">{activeItem?.gst.toFixed(2) || '0.00'}</span>
                </div>
            </div>

            {/* Manufacturer / Other details */}
            <div className="w-1/2 p-2 text-xs bg-white">
                <div className="grid grid-cols-[80px_1fr] gap-1 mb-1">
                    <span className="text-blue-600 font-bold">Company:</span>
                    <span className="font-bold text-gray-700 truncate">{activeItem?.manufacturer || '---'}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-1 mb-1">
                    <span className="text-blue-600 font-bold">Salt:</span>
                    <span className="text-gray-600 truncate">{activeItem?.salt || '---'}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-1">
                     <span className="text-blue-600 font-bold">Category:</span>
                     <span className="text-gray-600">SCHEDULE H</span>
                </div>
            </div>
        </div>

        {/* Bottom Totals Bar */}
        <div className="flex-1 bg-gray-100 flex divide-x divide-gray-300">
            {/* Left Totals */}
            <div className="flex-1 p-2 grid grid-cols-2 gap-x-4 text-xs">
                 <div className="flex justify-between">
                    <span className="font-bold text-gray-600">MRP Value :</span>
                    <span className="font-mono">{gross.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="font-bold text-gray-600">VALUE OF GOODS :</span>
                    <span className="font-mono">{gross.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="font-bold text-gray-600">Amount :</span>
                    <span className="font-mono">{gross.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="font-bold text-blue-600">DISCOUNT :</span>
                    <span className="font-mono text-blue-600">-{discount.toFixed(2)}</span>
                 </div>
            </div>

            {/* Middle Totals */}
            <div className="flex-1 p-2 grid grid-cols-2 gap-x-4 text-xs">
                <div className="flex justify-between">
                    <span className="font-bold text-gray-600">SGST :</span>
                    <span className="font-mono">{(gst/2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold text-blue-600">GST% :</span>
                    <span className="font-mono">{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold text-gray-600">CGST :</span>
                    <span className="font-mono">{(gst/2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold text-blue-600">CASH DISCOUNT :</span>
                    <span className="font-mono">0.00</span>
                </div>
            </div>
            
            {/* Right Main Total */}
            <div className="w-1/3 bg-blue-50 p-2 flex flex-col justify-between border-l-2 border-blue-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 text-[10px] text-blue-400 font-bold">NET PAYABLE</div>
                <div className="flex items-end justify-end h-full">
                    <span className="text-4xl font-black text-blue-900 font-mono tracking-tighter drop-shadow-sm">
                        {netPayable.toFixed(2)}
                    </span>
                </div>
                <div className="text-right text-[10px] text-gray-500">
                    Round Off: {(netPayable - (subtotal + gst)).toFixed(2)}
                </div>
            </div>
        </div>
    </div>
  );
};
