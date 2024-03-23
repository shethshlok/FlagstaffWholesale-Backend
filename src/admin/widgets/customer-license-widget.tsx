import React, { useState } from "react";
import { WidgetConfig, CustomerDetailsWidgetProps } from "@medusajs/admin";
import { useAdminUpdateCustomer } from "medusa-react";

const CustomerLicenseWidget = ({ customer }: CustomerDetailsWidgetProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState(customer.licenseNumber);
  const [newLicenseNumber, setNewLicenseNumber] = useState(licenseNumber);

  const updateCustomer = useAdminUpdateCustomer(customer.id);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Call API to update license number
      await updateCustomer.mutateAsync({
        licenseNumber: newLicenseNumber,
      });
      setLicenseNumber(newLicenseNumber);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating license number:", error);
    }
  };

  const handleCancelClick = () => {
    // Reset input field to original license number
    setNewLicenseNumber(licenseNumber);
    setIsEditing(false);
  };

  return (
    <div className="mt-6 flex space-x-6">
      <div className="w-full bg-white rounded-lg p-4 border border-gray-200">
        <div className="text-sm text-gray-500 mb-1">License Number:</div>
        {!isEditing ? (
          <div className="text-lg text-gray-900">{licenseNumber || "N/A"}</div>
        ) : (
          <input
            type="text"
            value={newLicenseNumber}
            onChange={(e) => setNewLicenseNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        )}
      </div>
      <div className="flex items-center">
        {!isEditing ? (
          <button
            className="px-4 py-2 bg-gray-200 text-sm text-gray-700 rounded border border-gray-300"
            onClick={handleEditClick}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              className="px-4 py-2 bg-gray-200 text-sm text-gray-700 rounded mr-2 border border-gray-300"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-sm text-gray-700 rounded border border-gray-300"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "customer.details.before",
};

export default CustomerLicenseWidget;
