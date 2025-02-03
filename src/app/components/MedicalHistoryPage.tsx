"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaRegLightbulb, FaArrowRight } from "react-icons/fa";
import { FormData } from "../page";
import ConditionCheckbox from "./ConditionCheckbox";

interface MedicalHistoryPageProps {
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  updateFormData: (data: FormData) => void;
}

const MedicalHistoryPage: React.FC<MedicalHistoryPageProps> = ({ nextStep, formData, prevStep, updateFormData }) => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>(formData.selectedConditions || []);
  const [whatsappUpdates, setWhatsappUpdates] = useState<boolean>(formData.whatsappUpdates || false);

  const conditions = [
    "Diabetes",
    "Blood Pressure",
    "Heart Disease",
    "Any Surgery",
    "Thyroid",
    "Asthma",
    "Other Disease",
    "None of These",
  ];

  // Function to toggle condition selection
  const toggleCondition = (condition: string) => {
    if (condition === "None of These") {
      setSelectedConditions(["None of These"]);
    } else {
      setSelectedConditions((prev) => {
        if (prev.includes(condition)) {
          return prev.filter((c) => c !== condition);
        } else {
          return prev.filter((c) => c !== "None of These").concat(condition);
        }
      });
    }
  };

  // Update formData when the state changes
  useEffect(() => {
    formData.selectedConditions = selectedConditions;
    formData.whatsappUpdates = whatsappUpdates;
  }, [selectedConditions, whatsappUpdates, formData]);

  return (
    <div className="relative min-h-screen bg-white px-4 md:px-0">
      <div onClick={prevStep} className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
        <button aria-label="Go back" className="text-gray-700 text-xl sm:text-2xl p-2 hover:bg-gray-200 rounded-full">
          <FaArrowLeft />
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Medical History Overview</h2>

          <p className="text-lg font-medium text-gray-700 text-center mb-8">
            Please select any existing illnesses for which you or any member(s) take regular medication.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {conditions.map((condition) => (
              <ConditionCheckbox
                key={condition}
                condition={condition}
                isChecked={selectedConditions.includes(condition)}
                toggleCondition={toggleCondition}
              />
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-100 border border-yellow-200 rounded-md flex items-center text-yellow-900">
            <FaRegLightbulb className="text-xl mr-2 text-yellow-400" />
            <p className="text-sm font-medium text-gray-900">We will find plans that will cover your condition.</p>
          </div>


          <div className="flex items-center justify-between mt-6">
            <span className="text-gray-700 text-sm">Get updates on WhatsApp</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappUpdates}
                onChange={() => setWhatsappUpdates(!whatsappUpdates)}
                className="sr-only"
                aria-label="Get updates on WhatsApp"
              />
              <div className={`w-10 h-6  rounded-full shadow-inner transition-transform duration-200 ease-in-out ${whatsappUpdates ? 'bg-black' : 'bg-gray-200'}`}></div>
              <div className={`absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${whatsappUpdates ? 'transform translate-x-5 ' : 'translate-x-0'}`}></div>
            </label>
          </div>

          <button 
            className="mt-6 w-full py-3 px-5 bg-black text-white text-lg font-semibold rounded-md shadow-md hover:bg-gray-700 flex justify-center items-center gap-2" 
            onClick={nextStep}
            aria-label="Continue to the next step"
          >
            Continue
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryPage;
