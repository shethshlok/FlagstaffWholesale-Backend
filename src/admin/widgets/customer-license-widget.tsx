import React, { useState } from "react";
import { WidgetConfig, CustomerDetailsWidgetProps } from "@medusajs/admin";
import { useAdminUpdateCustomer } from "medusa-react";
import { Label, Switch } from "@medusajs/ui"

const CustomerLicenseWidget = ({ customer }: CustomerDetailsWidgetProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState(customer.licenseNumber);
  const [newLicenseNumber, setNewLicenseNumber] = useState(licenseNumber);
  const [activated, setActivated] = useState<boolean>(customer.activated);

  const updateCustomer = useAdminUpdateCustomer(customer.id);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Call API to update license number
      await updateCustomer.mutateAsync({
        licenseNumber: newLicenseNumber,
        activated: activated,
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

  const handleActivateToggle = async () => {
    try {
      // Update activated state locally first
      const newActivatedValue = !activated;
      console.log("New Activated Value:", newActivatedValue); // Log the new value
      setActivated(newActivatedValue);
  
      // Call API to toggle activation
      await updateCustomer.mutateAsync({
        activated: newActivatedValue,
        licenseNumber: licenseNumber,
      });
    } catch (error) {
      // If there's an error, revert activated state
      console.error("Error toggling activation:", error);
      setActivated(activated);
    }

  }

  return (
    <div className="mt-6 flex flex-row space-x-6">
     <div className="w-full bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-evenly">
        <Label htmlFor="manage-inventory-checked">Activate Account</Label>
        <Switch id="manage-inventory-checked" checked={customer.activated} onClick={handleActivateToggle} />
      </div>

      <div className="w-full flex flex-row bg-white rounded-lg p-4 border border-gray-200">
        <div className="text-sm text-gray-500 mb-1">License Number:</div>
        {!isEditing ? (
          <div className="text-lg text-gray-900 pl-5">{licenseNumber || "N/A"}</div>
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
