export interface Product {
  id: string;
  name: string;
  pack: string;
  batch: string;
  expiry: string;
  stock: number;
  mrp: number;
  rate: number;
  gst: number;
  manufacturer: string;
  salt: string;
}

export interface BillItem extends Product {
  strips: number;
  tabs: number;
  discountPercent: number;
  amount: number;
}

export interface HistoryBill {
  billNo: string;
  date: string;
  patientName: string;
  amount: number;
  items: BillItem[];
  status: 'Paid' | 'Pending';
}

export enum PaymentMode {
  CASH = 'CASH',
  CREDIT = 'CREDIT',
  UPI = 'UPI',
  CARD = 'CARD'
}
