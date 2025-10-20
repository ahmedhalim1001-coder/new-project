
import React, { useState, useMemo } from 'react';
import { mockShipments, mockCompanies } from '../data/mockData';
import { Shipment } from '../types';
import StatCard from '../components/StatCard';
import ChartBarIcon from '../components/icons/ChartBarIcon';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';

const Statistics: React.FC = () => {
  const [filterCompany, setFilterCompany] = useState<string>('');
  const today = new Date().toISOString().split('T')[0];
  const [filterDate, setFilterDate] = useState<string>(today);

  const getCompanyName = (companyId: number) => {
    return mockCompanies.find(c => c.id === companyId)?.company_name || 'غير معروف';
  };

  const todaysShipments = useMemo(() => {
    return mockShipments.filter(s => s.date === filterDate);
  }, [filterDate]);

  const filteredShipments = useMemo(() => {
    return todaysShipments.filter(shipment =>
      filterCompany === '' || shipment.company_id === parseInt(filterCompany)
    );
  }, [todaysShipments, filterCompany]);

  const totalShipmentsToday = todaysShipments.length;
  const duplicateCountToday = useMemo(() => {
    const barcodeCounts = todaysShipments.reduce((acc, shipment) => {
      acc[shipment.barcode] = (acc[shipment.barcode] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.values(barcodeCounts).filter(count => count > 1).length;
  }, [todaysShipments]);

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">الإحصائيات اليومية لتاريخ {filterDate}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard title="إجمالي شحنات اليوم" value={totalShipmentsToday} icon={<ClipboardListIcon className="w-8 h-8 text-primary-600" />} />
        <StatCard title="الباركود المكرر" value={duplicateCountToday} icon={<ChartBarIcon className="w-8 h-8 text-primary-600" />} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold text-gray-700">شحنات اليوم</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <input 
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="w-full sm:w-auto bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
            />
            <select
              value={filterCompany}
              onChange={e => setFilterCompany(e.target.value)}
              className="w-full sm:w-auto bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
            >
              <option value="">كل الشركات</option>
              {mockCompanies.map(company => (
                <option key={company.id} value={company.id}>{company.company_name}</option>
              ))}
            </select>
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
                  <td className="px-6 py-4">{shipment.date}</td>
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

export default Statistics;
