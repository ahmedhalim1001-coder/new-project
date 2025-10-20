import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center transition-transform transform hover:scale-105">
      <div>
        <p className="text-lg font-semibold text-gray-600">{title}</p>
        <p className="text-4xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="bg-primary-100 p-4 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;