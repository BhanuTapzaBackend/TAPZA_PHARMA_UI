import React, { useState, useEffect, useRef } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface BatchSelectionProps {
  productName: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
}

export const BatchSelection: React.FC<BatchSelectionProps> = ({ productName, isOpen, onClose, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Get all batches for this product name
  const batches = MOCK_PRODUCTS.filter(p => p.name === productName);

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
    }
  }, [isOpen, productName]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, batches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (batches[selectedIndex]) {
        onSelect(batches[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // Add global keydown listener when modal is open to capture events even if focus is lost
  useEffect(() => {
    if(!isOpen) return;
    const handler = (e: KeyboardEvent) => {
        // We map standard JS KeyboardEvent to React.KeyboardEvent manually for simplicity in logic sharing
        // or just call the logic directly.
        if(['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) {
            // This is a bit hacky to reuse the function, but effective for this demo level
            handleKeyDown({ key: e.key, preventDefault: () => e.preventDefault() } as any);
        }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, batches, selectedIndex]);


  if (!isOpen || !productName) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-[700px] flex flex-col rounded-lg shadow-2xl border-2 border-yellow-500 overflow-hidden">
        <div className="bg-yellow-100 p-2 border-b border-yellow-300 text-yellow-900 font-bold text-center">
            SELECT BATCH FOR: <span className="text-black uppercase">{productName}</span>
        </div>

        <div className="grid grid-cols-12 bg-gray-800 text-white text-xs font-bold p-2">
            <div className="col-span-3 text-center">BATCH</div>
            <div className="col-span-2 text-center">EXPIRY</div>
            <div className="col-span-2 text-center">STOCK</div>
            <div className="col-span-2 text-center">MRP</div>
            <div className="col-span-3 text-center">RATE</div>
        </div>

        <div className="max-h-64 overflow-y-auto" ref={listRef}>
            {batches.map((batch, index) => (
                <div 
                    key={batch.id}
                    onClick={() => onSelect(batch)}
                    className={`grid grid-cols-12 p-2 text-sm border-b border-gray-200 cursor-pointer ${
                        index === selectedIndex ? 'bg-yellow-200 text-black font-bold' : 'hover:bg-gray-50'
                    }`}
                >
                    <div className="col-span-3 text-center uppercase">{batch.batch}</div>
                    <div className="col-span-2 text-center text-red-600">{batch.expiry}</div>
                    <div className="col-span-2 text-center text-green-700">{batch.stock}</div>
                    <div className="col-span-2 text-center">{batch.mrp.toFixed(2)}</div>
                    <div className="col-span-3 text-center">{batch.rate.toFixed(2)}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
