"use client";
import React, { useState } from "react";
import FirstPage from "./components/Members";
import SecondPage from "./components/Ages";
import ThirdPage from "./components/City";
import FourthPage from "./components/MedicalHistoryPage";
import ConfirmationPage from "./components/Confirmation";

// Define the structure of the form data
export interface FormData {
  selectedGender: string | null;
  selectedMembers: string[];
  yourAge: string;
  wifeAge: string;
  sonAge: string;
  daughterAge: string;
  fatherAge: string;
  husbandAge: string;
  motherAge: string;
  selectedCity: string;
  selectedConditions: string[];
  whatsappUpdates: boolean;
}

// Custom hook for managing form state
const useForm = () => {
  const [formData, setFormData] = useState<FormData>({
    selectedGender: null,
    selectedMembers: [],
    yourAge: "",
    wifeAge: "",
    sonAge: "",
    daughterAge: "",
    fatherAge: "",
    husbandAge: "",
    motherAge: "",
    selectedCity: "Bangalore",
    selectedConditions: [],
    whatsappUpdates: false,
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return { formData, updateFormData };
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, updateFormData } = useForm();

  // Functions to navigate between steps
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1)); // Prevent going below step 1

  // Mapping of steps to components
  const stepComponents = {
    1: <FirstPage nextStep={nextStep} formData={formData} updateFormData={updateFormData} />,
    2: <SecondPage nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />,
    3: <ThirdPage nextStep={nextStep} prevStep={prevStep} formData={formData} updateFormData={updateFormData} />,
    4: <FourthPage formData={formData} prevStep={prevStep} updateFormData={updateFormData} nextStep={nextStep} />,
    5: <ConfirmationPage formData={formData} prevStep={prevStep} setFormData={updateFormData} />,
  };

  return <div>{stepComponents[currentStep as keyof typeof stepComponents] || null}</div>;
}
