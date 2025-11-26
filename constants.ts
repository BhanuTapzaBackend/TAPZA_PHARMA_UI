import { Product, HistoryBill } from './types';

// Helper to generate IDs
const uid = () => Math.random().toString(36).substr(2, 9);

export const MOCK_PRODUCTS: Product[] = [
  // DOLO Batches
  {
    id: 'dolo-1',
    name: 'DOLO-650 MG TABS',
    pack: "15'S",
    batch: 'DOLO001',
    expiry: '05/26',
    stock: 145,
    mrp: 32.00,
    rate: 26.50,
    gst: 12,
    manufacturer: 'MICRO LABS',
    salt: 'PARACETAMOL 650MG'
  },
  {
    id: 'dolo-2',
    name: 'DOLO-650 MG TABS',
    pack: "15'S",
    batch: 'DL992',
    expiry: '02/25',
    stock: 45,
    mrp: 32.00,
    rate: 26.50,
    gst: 12,
    manufacturer: 'MICRO LABS',
    salt: 'PARACETAMOL 650MG'
  },
  
  // AL SYP Batches
  {
    id: 'al-1',
    name: 'AL SYP',
    pack: "100ML",
    batch: 'QWERT',
    expiry: '09/25',
    stock: 50,
    mrp: 39.00,
    rate: 27.32,
    gst: 12,
    manufacturer: 'FDC LIMITED',
    salt: 'AMBROXOL + LEVOCETIRIZINE'
  },
  {
    id: 'al-2',
    name: 'AL SYP',
    pack: "100ML",
    batch: 'ZXCVB',
    expiry: '12/26',
    stock: 120,
    mrp: 42.00,
    rate: 29.50,
    gst: 12,
    manufacturer: 'FDC LIMITED',
    salt: 'AMBROXOL + LEVOCETIRIZINE'
  },

  // Other Products
  {
    id: 'fab-1',
    name: 'FABI FLU 200MG',
    pack: "34'S",
    batch: 'FBF22',
    expiry: '08/26',
    stock: 20,
    mrp: 1292.00,
    rate: 1100.00,
    gst: 18,
    manufacturer: 'GLENMARK',
    salt: 'FAVIPIRAVIR 200MG'
  },
  {
    id: 'pan-1',
    name: 'PAN-D CAPS',
    pack: "15'S",
    batch: 'PND05',
    expiry: '02/27',
    stock: 300,
    mrp: 199.00,
    rate: 160.00,
    gst: 12,
    manufacturer: 'ALKEM',
    salt: 'PANTOPRAZOLE + DOMPERIDONE'
  },
  {
    id: 'zinc-1',
    name: 'ZINCovit TABS',
    pack: "15'S",
    batch: 'ZN212',
    expiry: '09/25',
    stock: 85,
    mrp: 105.00,
    rate: 85.00,
    gst: 18,
    manufacturer: 'APEX',
    salt: 'MULTIVITAMINS + ZINC'
  },
  {
    id: 'shel-1',
    name: 'SHELCAL-500',
    pack: "15'S",
    batch: 'SHL44',
    expiry: '11/26',
    stock: 120,
    mrp: 144.00,
    rate: 118.00,
    gst: 12,
    manufacturer: 'TORRENT',
    salt: 'CALCIUM + VITAMIN D3'
  },
  {
    id: 'amox-1',
    name: 'AMOXICLAV 625',
    pack: "10'S",
    batch: 'AMX09',
    expiry: '03/25',
    stock: 45,
    mrp: 225.50,
    rate: 180.00,
    gst: 12,
    manufacturer: 'ABBOTT',
    salt: 'AMOXICILLIN + CLAVULANIC ACID'
  }
];

export const MOCK_HISTORY: HistoryBill[] = [
  {
    billNo: 'A00101',
    date: '2025-10-12',
    patientName: 'Rahul Kumar',
    amount: 450.00,
    status: 'Paid',
    items: [
      { ...MOCK_PRODUCTS[0], strips: 1, tabs: 0, discountPercent: 0, amount: 32.00 },
      { ...MOCK_PRODUCTS[2], strips: 5, tabs: 0, discountPercent: 0, amount: 195.00 }
    ]
  },
  {
    billNo: 'A00098',
    date: '2025-09-28',
    patientName: 'Sarah Smith',
    amount: 1205.50,
    status: 'Paid',
    items: [
        { ...MOCK_PRODUCTS[4], strips: 2, tabs: 0, discountPercent: 10, amount: 358.00 }
    ]
  },
  {
    billNo: 'A00045',
    date: '2025-08-15',
    patientName: 'John Doe',
    amount: 85.00,
    status: 'Paid',
    items: [
        { ...MOCK_PRODUCTS[0], strips: 2, tabs: 8, discountPercent: 0, amount: 85.00 }
    ]
  },
  {
    billNo: 'A00022',
    date: '2025-07-02',
    patientName: 'Priya M',
    amount: 3450.00,
    status: 'Pending',
    items: []
  },
  {
    billNo: 'A00010',
    date: '2025-06-20',
    patientName: 'Amit Shah',
    amount: 210.00,
    status: 'Paid',
    items: []
  }
];
