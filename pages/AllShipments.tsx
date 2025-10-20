import React, { useState, useMemo } from 'react';
import { mockShipments, mockCompanies } from '../data/mockData';
import { Shipment } from '../types';
import SearchIcon from '../components/icons/SearchIcon';

const AllShipments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompany, setFilterCompany] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const getCompanyName = (companyId: number) => {
    return mockCompanies.find(c => c.id === companyId)?.company_name || 'غير معروف';
  };

  const filteredShipments = useMemo(() => {
    return mockShipments.filter(shipment => {
      const shipmentDate = new Date(shipment.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && shipmentDate < start) return false;
      if (end && shipmentDate > end) return false;
      if (filterCompany && shipment.company_id !== parseInt(filterCompany)) return false;
      if (searchQuery && !shipment.barcode.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    });
  }, [searchQuery, filterCompany, startDate, endDate]);

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">كل الشحنات</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث بالباركود..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          <select
            value={filterCompany}
            onChange={e => setFilterCompany(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="">كل الشركات</option>
            {mockCompanies.map(company => (
              <option key={company.id} value={company.id}>{company.company_name}</option>
            ))}
          </select>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">الشركة</th>
                <th scope="col" className="px-6 py-3">الباركود</th>
                <th scope="col" className="px-6 py-3">التاريخ</th>
                <th scope="col" className="px-6 py-3">عدد المرات</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment: Shipment) => (
                <tr key={shipment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{getCompanyName(shipment.company_id)}</td>
                  <td className="px-6 py-4">{shipment.barcode}</td>
                  <td className="px-6 py-4">{shipment.date}</td>
                  <td className="px-6 py-4">{shipment.count}</td>
                </tr>
              ))}
              {filteredShipments.length === 0 && (
                <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">لم يتم العثور على شحنات للمعايير المحددة.</td>
                </tr>
               )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllShipments;
