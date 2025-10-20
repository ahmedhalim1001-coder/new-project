import React, { useState } from 'react';
import { mockCompanies } from '../data/mockData';
import { Company } from '../types';

const ManageCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const toggleStatus = (id: number) => {
    setCompanies(companies.map(company =>
      company.id === id
        ? { ...company, status: company.status === 'active' ? 'inactive' : 'active' }
        : company
    ));
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCompanyName.trim()) {
      const newCompany: Company = {
        id: companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1,
        company_name: newCompanyName,
        status: 'active',
      };
      setCompanies([...companies, newCompany]);
      setNewCompanyName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">إدارة شركات الشحن</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">قائمة الشركات</h2>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {isAdding ? 'إلغاء' : 'إضافة شركة جديدة'}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddCompany} className="mb-6 p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              placeholder="أدخل اسم الشركة الجديدة"
              className="w-full sm:flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
              required
            />
            <button type="submit" className="w-full sm:w-auto shrink-0 px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">حفظ الشركة</button>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">اسم الشركة</th>
                <th scope="col" className="px-6 py-3">الحالة</th>
                <th scope="col" className="px-6 py-3">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{company.company_name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      company.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {company.status === 'active' ? 'فعالة' : 'غير فعالة'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(company.id)}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      {company.status === 'active' ? 'إلغاء التفعيل' : 'تفعيل'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCompanies;
