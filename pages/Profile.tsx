import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
    const auth = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (newPassword !== confirmPassword) {
            setError('كلمتا المرور الجديدتان غير متطابقتين.');
            return;
        }

        if (!newPassword || newPassword.length < 6) {
            setError('يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل.');
            return;
        }

        if (auth) {
            const result = await auth.changePassword(currentPassword, newPassword);
            if (result.success) {
                setSuccessMessage(result.message);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError(result.message);
            }
        }
    };

    return (
        <div className="container mx-auto space-y-6 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">الملف الشخصي</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">معلومات المستخدم</h2>
                <div className="space-y-4">
                    <div>
                        <span className="font-medium text-gray-500">اسم المستخدم:</span>
                        <span className="text-gray-900 mr-2">{auth?.user?.username}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">تغيير كلمة المرور</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="current-password"
                               className="block text-sm font-medium text-gray-700 text-right mb-1">
                            كلمة المرور الحالية
                        </label>
                        <input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="new-password"
                               className="block text-sm font-medium text-gray-700 text-right mb-1">
                            كلمة المرور الجديدة
                        </label>
                        <input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="confirm-password"
                               className="block text-sm font-medium text-gray-700 text-right mb-1">
                            تأكيد كلمة المرور الجديدة
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    {error && <p className="text-sm text-red-600 text-center bg-red-100 p-3 rounded-md">{error}</p>}
                    {successMessage && <p className="text-sm text-green-600 text-center bg-green-100 p-3 rounded-md">{successMessage}</p>}

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                           حفظ التغييرات
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
