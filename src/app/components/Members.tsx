"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaChild, FaCaretDown, FaArrowRight } from "react-icons/fa";

// Define the props interface
interface MembersProps {
  nextStep: () => void; // Function type for nextStep
  formData: {
    selectedGender: string | null;
    selectedMembers: string[];
  };
  updateFormData: (data: { selectedGender: string | null; selectedMembers: string[] }) => void;
}

export default function Members({ nextStep, formData, updateFormData }: MembersProps) {
  const [selectedGender, setSelectedGender] = useState(formData.selectedGender);
  const [selectedMembers, setSelectedMembers] = useState(formData.selectedMembers);

  useEffect(() => {
    updateFormData({ selectedGender, selectedMembers });
  }, [selectedGender, selectedMembers]);

  const toggleGender = (gender: string) => {
    setSelectedGender((prev) => (prev === gender ? null : gender));
  };

  const toggleMember = (member: string) => {
    setSelectedMembers((prev) =>
      prev.includes(member) ? prev.filter((m) => m !== member) : [...prev, member]
    );
  };

  const members = selectedGender === "Male"
    ? ["Self", "Wife", "Mother", "Father", "Son", "Daughter"]
    : selectedGender === "Female"
    ? ["Self", "Husband", "Mother", "Father", "Son", "Daughter"]
    : ["Self", "Husband", "Mother", "Father", "Son", "Daughter"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 md:px-0">
        <h2 className="text-4xl font-bold text-gray-900 pb-8">Find the best plan for your family</h2>
      <div className="text-center w-full max-w-3xl bg-white rounded-lg px-6 py-4">
        <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
          {["Male", "Female"].map((gender) => (
            <button
              key={gender}
              onClick={() => toggleGender(gender)}
              className={`w-full sm:w-40 px-5 py-3 text-lg font-semibold rounded-md shadow-md transition ${
                selectedGender === gender ? "bg-black text-white border-2 border-black" : "bg-white text-black hover:bg-gray-200"
              }`}
              aria-pressed={selectedGender === gender}
            >
              {gender}
            </button>
          ))}
        </div>

        <p className="mt-8 text-lg font-medium text-gray-700">Select members you want to insure</p>
        <ul className="grid grid-cols-2 gap-6 mt-6 px-8 sm:grid-cols-3 md:grid-cols-3">
          {members.map((member) => (
            <li key={member} className="w-full">
              <input
                type="checkbox"
                id={`${member.toLowerCase()}-option`}
                className="hidden peer"
                checked={selectedMembers.includes(member)}
                onChange={() => toggleMember(member)}
                aria-labelledby={`${member.toLowerCase()}-label`}
              />
              <label
                id={`${member.toLowerCase()}-label`}
                htmlFor={`${member.toLowerCase()}-option`}
                className={`flex items-center gap-3 w-full p-5 text-gray-700 border-2 rounded-lg cursor-pointer peer-checked:border-black text-lg font-semibold ${
                  selectedMembers.includes(member) ? "bg-blue-100" : "bg-white"
                }`}
              >
                {member === "Son" || member === "Daughter" ? (
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    selectedMembers.includes(member) ? "bg-blue-200" : "bg-gray-200"
                  }`}>
                    <FaChild className="text-black" />
                  </div>
                ) : (
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    selectedMembers.includes(member) ? "bg-blue-200" : "bg-gray-200"
                  }`}>
                    <FaUser className="text-black" />
                  </div>
                )}
                {member}
              </label>
            </li>
          ))}
          <li className="col-span-full text-center">
            <div className="flex items-center gap-3 justify-center w-full text-gray-700 cursor-pointer hover:bg-gray-100 text-lg font-semibold">
              <span>More Members</span>
              <FaCaretDown className="text-gray-500" />
            </div>
          </li>
        </ul>

        <button
          onClick={nextStep}
          className={`mt-8 w-full py-3 px-5 text-lg font-semibold rounded-md shadow-md transition ${
            selectedGender && selectedMembers.length > 0 ? "bg-black text-white hover:bg-gray-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedGender || selectedMembers.length === 0}
          aria-disabled={!selectedGender || selectedMembers.length === 0}
        >
          Continue <FaArrowRight className="inline-block ml-2" />
        </button>

        <p className="mt-4 text-sm text-gray-600">
          By clicking Continue, you agree to our <span className="text-black font-bold">Privacy Policy, Terms of Use</span> & <span className="text-black font-bold">Disclaimer</span>
        </p>
      </div>
    </div>
  );
}
