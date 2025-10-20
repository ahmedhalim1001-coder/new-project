
export interface Company {
  id: number;
  company_name: string;
  status: 'active' | 'inactive';
}

export interface Shipment {
  id: number;
  company_id: number;
  barcode: string;
  date: string; // ISO 8601 format: YYYY-MM-DD
  count: number;
}

export interface User {
  id: number;
  username: string;
}
