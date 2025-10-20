import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
}

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

// As per user GIF: Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday
const ARABIC_WEEKDAYS_SHORT = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'];

const toArabicNumber = (n: number | string) => {
  if (n === null || n === undefined) return '';
  return new Intl.NumberFormat('ar-EG', { useGrouping: false }).format(Number(n));
};

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getInitialDate = () => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? new Date() : date;
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate());
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    // Sync with external value changes
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
        setCurrentDate(date);
    } else {
        // Reset to today if value is cleared
        setCurrentDate(new Date());
    }
  }, [value]);


  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handleMonthChange = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const handleYearChange = (offset: number) => {
    setCurrentDate(new Date(year + offset, month, 1));
  };
  
  const handleDayClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    onChange(formattedDate);
    setIsOpen(false);
  };

  const renderCalendar = () => {
    // JS getDay(): Sun=0, Mon=1, ..., Sat=6
    // We want week to start on Saturday. Sat=0, Sun=1, ...
    // So we shift: (date.getDay() + 1) % 7
    const firstDayOfMonth = (new Date(year, month, 1).getDay() + 1) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
      <div key={`blank-${i}`} className="p-2 text-center"></div>
    ));

    const selectedDate = value ? new Date(value) : null;
    const today = new Date();
    
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day);

      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === today.toDateString();
      
      let dayClasses = "text-center p-2 rounded-full cursor-pointer transition-colors duration-200 hover:bg-primary-100 text-gray-900";
      if (isSelected) {
        dayClasses += " bg-primary-500 text-white font-bold hover:bg-primary-600";
      } else if (isToday) {
        dayClasses += " bg-primary-200 text-primary-700 font-semibold";
      }

      return (
        <div key={day} className={dayClasses} onClick={() => handleDayClick(day)}>
          {toArabicNumber(day)}
        </div>
      );
    });

    return [...blanks, ...days];
  };

  const formatDisplayDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('ar-SA', options);
  };


  return (
    <div className="relative" ref={datePickerRef}>
      <input
        id={id}
        type="text"
        readOnly
        value={formatDisplayDate(value)}
        onClick={() => setIsOpen(!isOpen)}
        placeholder="اختر تاريخ"
        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      />
      {isOpen && (
        <div className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4" role="dialog" aria-modal="true" aria-labelledby="date-picker-heading">
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={() => handleYearChange(-1)} className="p-1 rounded-full hover:bg-gray-100" aria-label="السنة السابقة">&laquo;</button>
            <button type="button" onClick={() => handleMonthChange(-1)} className="p-1 rounded-full hover:bg-gray-100" aria-label="الشهر السابق">&lsaquo;</button>
            <div id="date-picker-heading" className="font-semibold text-center" aria-live="polite">
              {ARABIC_MONTHS[month]} {toArabicNumber(year)}
            </div>
            <button type="button" onClick={() => handleMonthChange(1)} className="p-1 rounded-full hover:bg-gray-100" aria-label="الشهر التالي">&rsaquo;</button>
            <button type="button" onClick={() => handleYearChange(1)} className="p-1 rounded-full hover:bg-gray-100" aria-label="السنة التالية">&raquo;</button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-800 font-semibold mb-2" role="rowheader">
            {ARABIC_WEEKDAYS_SHORT.map(day => <div key={day} role="columnheader">{day}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm" role="grid">
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;