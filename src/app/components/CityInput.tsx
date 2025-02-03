import React from 'react';
import { IoMdClose } from "react-icons/io";

interface CityInputProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  updateFormData: (data: any) => void; // Replace with appropriate type for formData
  formData: any; // Replace with appropriate type for formData
  clearCity: () => void;
}

const CityInput: React.FC<CityInputProps> = ({ selectedCity, setSelectedCity, updateFormData, formData, clearCity }) => {
  return (
    <div className="relative">
      <input
        id="city"
        type="text"
        className="w-full px-6 py-3 mt-1 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing to select a city..."
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value)
          updateFormData({ ...formData, selectedCity: e.target.value }) // Update formData in parent
        }}
      />
      {/* Clear Button */}
      {selectedCity && (
        <button 
          onClick={clearCity} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
          aria-label="Clear city selection"
        >
          <IoMdClose size={22} />
        </button>
      )}
    </div>
  );
}

export default CityInput; 