import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import axios from 'axios';
import Stepper1 from './Stepper1';
import Stepper2 from './Stepper2';
import Stepper3 from './Stepper3';
import Stepper4 from './Stepper4';

function AddStudentModal({ isOpen, onClose, onSubmit, formData, formErrors, onInputChange, onResetForm }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [isStep3Valid, setIsStep3Valid] = useState(false);
  const [isStep4Valid, setIsStep4Valid] = useState(false);
  const totalSteps = 4;
  const stepLabels = ['User Info', 'ID Details', 'College Info', 'Verification'];

  const handleNext = async () => {
    if (currentStep === 1 && selectedUserId) {
      onInputChange({ target: { name: 'user_id', value: selectedUserId } });
    }

    if (currentStep === 2 && isStep2Valid) {
      try {
        const addressData = {
          user_id: formData.user_id,
          entity_type: 'student',
          address_type: formData.address_type,
          address_line_1: formData.address_line_1,
          address_line_2: formData.address_line_2,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
        };

        const response = await axios.post('/api/v1/address/create-address', addressData);
        const addressId = response.data.address._id;

        onInputChange({ target: { name: 'address_id', value: addressId } });
      } catch (error) {
        console.error('Error creating address:', error);
        onInputChange({ target: { name: 'submit', value: 'Error saving address. Please try again.' } });
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSelectedUserId(null);
      setIsStep2Valid(false);
      setIsStep3Valid(false);
      setIsStep4Valid(false);
    }
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    if (typeof onResetForm === 'function') {
      onResetForm();
    } else {
      console.warn('onResetForm is not a function');
    }
    setCurrentStep(1);
    setSelectedUserId(null);
    setIsStep2Valid(false);
    setIsStep3Valid(false);
    setIsStep4Valid(false);
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.warn('onClose is not a function');
    }
  };

  const handleUserSelected = (userId) => {
    setSelectedUserId(userId);
  };

  const handleValidationChange = (step) => (isValid) => {
    if (step === 2) {
      setIsStep2Valid(isValid);
    } else if (step === 3) {
      setIsStep3Valid(isValid);
    } else if (step === 4) {
      setIsStep4Valid(isValid);
    }
  };

  const handleSubmit = async () => {
    try {
      const studentData = {
        user_id: formData.user_id,
        college_email: formData.college_email,
        id_card: formData.id_card,
        address_id: formData.address_id,
        college_name: formData.college_name,
        university_name: formData.university_name,
        expiry_date: formData.expiry_date || new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString().split('T')[0], // Default to 4 years from now
      };

      // Log the data being sent for debugging
      console.log('Submitting student data:', studentData);

      const response = await axios.post('/api/v1/students/create-students', studentData);
      console.log('Student created successfully:', response.data);

      // Reset form and close modal on success
      onResetForm();
      setCurrentStep(1);
      setSelectedUserId(null);
      setIsStep2Valid(false);
      setIsStep3Valid(false);
      setIsStep4Valid(false);
      onClose();
    } catch (error) {
      console.error('Error creating student:', error);
      onInputChange({ target: { name: 'submit', value: 'Error creating student. Please try again.' } });
    }
  };

  const renderStepper = () => {
    switch (currentStep) {
      case 1:
        return <Stepper1 onUserSelected={handleUserSelected} formData={formData} onInputChange={onInputChange} />;
      case 2:
        return (
          <Stepper2
            formData={formData}
            formErrors={formErrors}
            onInputChange={onInputChange}
            onValidationChange={handleValidationChange(2)}
          />
        );
      case 3:
        return (
          <Stepper3
            formData={formData}
            formErrors={formErrors}
            onInputChange={onInputChange}
            onValidationChange={handleValidationChange(3)}
          />
        );
      case 4:
        return (
          <Stepper4
            formData={formData}
            formErrors={formErrors}
            onInputChange={onInputChange}
            onValidationChange={handleValidationChange(4)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Student - Step {currentStep} of {totalSteps}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isActive = stepNumber === currentStep;
              const isInactive = stepNumber > currentStep;

              let circleStyle = '';
              let textStyle = '';
              let content = stepNumber;

              if (isCompleted) {
                circleStyle = 'bg-blue-500 text-white border-blue-500';
                textStyle = 'text-blue-500';
                content = '✔';
              } else if (isActive) {
                circleStyle = 'bg-blue-500 text-white border-blue-500';
                textStyle = 'text-blue-500';
              } else {
                circleStyle = 'bg-transparent text-gray-500 border-gray-300';
                textStyle = 'text-gray-500';
              }

              return (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${circleStyle} shadow-sm`}
                  >
                    {content}
                  </div>
                  <span className={`text-xs mt-2 ${textStyle}`}>
                    {stepLabels[index]}
                  </span>
                </div>
              );
            })}
          </div>

          {renderStepper()}

          {formErrors.submit && <p className="text-red-600 text-sm">{formErrors.submit}</p>}
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                disabled={!isStep4Valid}
              >
                Add Student
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !selectedUserId) ||
                  (currentStep === 2 && !isStep2Valid) ||
                  (currentStep === 3 && !isStep3Valid)
                }
              >
                Next
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentModal;