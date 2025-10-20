
import { Company, Shipment } from '../types';

export const mockCompanies: Company[] = [
  { id: 1, company_name: 'أرامكس', status: 'active' },
  { id: 2, company_name: 'دي إتش إل', status: 'active' },
  { id: 3, company_name: 'سمسا إكسبرس', status: 'inactive' },
  { id: 4, company_name: 'فيديكس', status: 'active' },
  { id: 5, company_name: 'يو بي إس', status: 'active' },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const mockShipments: Shipment[] = [
  { id: 101, company_id: 1, barcode: 'TRK1001ARMX', date: formatDate(today), count: 1 },
  { id: 102, company_id: 2, barcode: 'TRK1002DHL', date: formatDate(today), count: 1 },
  { id: 103, company_id: 4, barcode: 'TRK1003FDX', date: formatDate(today), count: 1 },
  { id: 104, company_id: 1, barcode: 'TRK1001ARMX', date: formatDate(today), count: 2 }, // Duplicate
  { id: 105, company_id: 5, barcode: 'TRK1004UPS', date: formatDate(today), count: 1 },
  { id: 106, company_id: 2, barcode: 'TRK1005DHL', date: formatDate(yesterday), count: 1 },
  { id: 107, company_id: 3, barcode: 'TRK1006SMSA', date: formatDate(yesterday), count: 1 },
  { id: 108, company_id: 4, barcode: 'TRK1007FDX', date: formatDate(yesterday), count: 1 },
  { id: 109, company_id: 1, barcode: 'TRK1008ARMX', date: formatDate(twoDaysAgo), count: 1 },
  { id: 110, company_id: 5, barcode: 'TRK1009UPS', date: formatDate(twoDaysAgo), count: 1 },
  { id: 111, company_id: 2, barcode: 'TRK1002DHL', date: formatDate(yesterday), count: 2 }, // Duplicate
  { id: 112, company_id: 4, barcode: 'TRK1010FDX', date: formatDate(twoDaysAgo), count: 1 },
  { id: 113, company_id: 1, barcode: 'TRK1011ARMX', date: formatDate(today), count: 1 },
  { id: 114, company_id: 2, barcode: 'TRK1012DHL', date: formatDate(today), count: 1 },
];