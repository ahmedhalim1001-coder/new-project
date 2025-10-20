import React, { useState, useMemo } from 'react';
import { mockShipments, mockCompanies } from '../data/mockData';
import { Shipment } from '../types';
import SearchIcon from '../components/icons/SearchIcon';
import DatePicker from '../components/DatePicker';

const AllShipments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompany, setFilterCompany] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const formatArabicDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };

  const getCompanyName = (companyId: number) => {
    return mockCompanies.find(c => c.id === companyId)?.company_name || 'غير معروف';
  };

  const filteredShipments = useMemo(() => {
    return mockShipments.filter(shipment => {
      const shipmentDate = new Date(shipment.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // Ensure the whole day is included in the range
      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);

      if (start && shipmentDate < start) return false;
      if (end && shipmentDate > end) return false;
      if (filterCompany && shipment.company_id !== parseInt(filterCompany)) return false;
      if (searchQuery && !shipment.barcode.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    });
  }, [searchQuery, filterCompany, startDate, endDate]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterCompany('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">كل الشحنات</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 items-start">
          <div>
            <label htmlFor="search-barcode" className="block text-sm font-medium text-gray-700 text-right mb-1">بحث بالباركود</label>
            <div className="relative">
              <input
                id="search-barcode"
                type="text"
                placeholder="ابحث..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 pr-10"
              />
               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="filter-company-all" className="block text-sm font-medium text-gray-700 text-right mb-1">الشركة</label>
            <select
              id="filter-company-all"
              value={filterCompany}
              onChange={e => setFilterCompany(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
            >
              <option value="">كل الشركات</option>
              {mockCompanies.map(company => (
                <option key={company.id} value={company.id}>{company.company_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 text-right mb-1">من تاريخ</label>
            <DatePicker 
              id="start-date"
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 text-right mb-1">إلى تاريخ</label>
            <DatePicker 
              id="end-date"
              value={endDate}
              onChange={setEndDate}
            />
          </div>
          <div className="self-end w-full">
            <button 
              onClick={handleResetFilters}
              className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              إعادة تعيين
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">الشركة</th>
                <th scope="col" className="px-6 py-3">الباركود</th>
                <th scope="col" className="px-6 py-3">التاريخ</th>
                <th scope="col" className="px-6 py-3">عدد المرات</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment: Shipment) => (
                <tr key={shipment.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{getCompanyName(shipment.company_id)}</td>
                  <td className="px-6 py-4">{shipment.barcode}</td>
                  <td className="px-6 py-4">{formatArabicDate(shipment.date)}</td>
                  <td className="px-6 py-4">{shipment.count}</td>
                </tr>
              ))}
              {filteredShipments.length === 0 && (
                <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">لم يتم العثور على شحنات للمعايير المحددة.</td>
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