import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const auth = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      <div>
         {/* يمكن إضافة مسار التنقل أو عنوان الصفحة هنا */}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 dark:text-gray-300">مرحباً، {auth?.user?.username}</span>
      </div>
    </header>
  );
};

export default Header;