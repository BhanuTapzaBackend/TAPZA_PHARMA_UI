import React from 'react';
import { Calendar, User, UserPlus, MapPin, Stethoscope, Hash } from 'lucide-react';
import { PaymentMode } from '../types';

export const BillHeader: React.FC = () => {
  return (
    <div className="bg-white p-3 border-b border-gray-300 shadow-sm mb-2">
       {/* Top Row: Bill No & Date */}
       <div className="flex items-center gap-4 mb-3 pb-2 border-b border-dashed border-gray-200">
          <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded border border-gray-300">
             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Bill No:</span>
             <div className="bg-gray-800 text-white px-2 rounded text-xs font-mono"># A00124</div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded border border-gray-300">
             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date:</span>
             <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
                <Calendar size={12} className="text-marg-teal" /> 26-11-2025
             </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
             <span className="text-[10px] font-bold text-marg-teal uppercase tracking-wider">Mode:</span>
             <select className="border border-gray-300 rounded text-xs px-2 py-1 bg-white focus:ring-2 focus:ring-marg-teal focus:outline-none">
                <option>{PaymentMode.CASH}</option>
                <option>{PaymentMode.UPI}</option>
                <option>{PaymentMode.CARD}</option>
                <option>{PaymentMode.CREDIT}</option>
             </select>
             <span className="text-[10px] text-gray-400 italic ml-2">Press F2 for Patient Search</span>
          </div>
       </div>

       {/* Patient Form Grid */}
       <div className="grid grid-cols-12 gap-3 relative">
          <div className="col-span-1 border-r border-gray-200 flex flex-col justify-center">
             <span className="text-[10px] font-bold text-gray-400 uppercase -rotate-90 whitespace-nowrap">Patient Info</span>
          </div>
          
          <div className="col-span-3">
             <Label icon={User} text="Phone Number" />
             <div className="flex">
                <span className="bg-gray-100 border border-r-0 border-gray-300 text-gray-500 text-xs px-2 flex items-center rounded-l">
                    <Hash size={12} />
                </span>
                <input 
                    type="text" 
                    defaultValue="9876543210" 
                    className="w-full border border-gray-300 rounded-r px-2 py-1 text-sm font-bold text-gray-800 bg-marg-lightTeal/20 focus:bg-white focus:border-marg-teal focus:ring-1 focus:ring-marg-teal outline-none"
                />
             </div>
          </div>

          <div className="col-span-4">
             <Label icon={UserPlus} text="Patient Name" />
             <input 
                type="text" 
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-800 focus:border-marg-teal focus:ring-1 focus:ring-marg-teal outline-none"
             />
          </div>

          <div className="col-span-4">
             <Label icon={MapPin} text="Address" />
             <input 
                type="text" 
                placeholder="Area / City"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-800 focus:border-marg-teal focus:ring-1 focus:ring-marg-teal outline-none"
             />
          </div>

          {/* Second Row for Doctor */}
          <div className="col-span-1"></div>
          <div className="col-span-3">
             <Label icon={Stethoscope} text="Doctor Name" />
             <input 
                type="text" 
                placeholder="Dr. Name"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-800 focus:border-marg-teal focus:ring-1 focus:ring-marg-teal outline-none"
             />
          </div>
       </div>
    </div>
  );
};

const Label: React.FC<{icon: any, text: string}> = ({ icon: Icon, text }) => (
    <label className="flex items-center gap-1 text-xs text-gray-600 mb-1 font-medium">
        {text}
    </label>
);