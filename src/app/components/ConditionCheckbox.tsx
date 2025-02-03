import React from 'react';

interface ConditionCheckboxProps {
  condition: string;
  isChecked: boolean;
  toggleCondition: (condition: string) => void;
}

const ConditionCheckbox: React.FC<ConditionCheckboxProps> = ({ condition, isChecked, toggleCondition }) => {
  return (
    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-md cursor-pointer transition hover:bg-gray-100">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleCondition(condition)}
        className="w-5 h-5 text-gray-300 accent-black cursor-pointer"
        aria-label={`Select ${condition}`}
      />
      <span className="text-md text-gray-700 font-medium">{condition}</span>
    </label>
  );
};

export default ConditionCheckbox; 