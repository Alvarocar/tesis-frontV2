import React, { useState } from "react";
import { RecruiterOverview } from "@app/@types/recruiter";
import { Button } from "@app/components/ui/button";
import OptionsMenu from "./components/OptionsMenu";
import DeleteModal from "./components/DeleteModal";
import SendEmail from "./components/SendEmail";

interface EmployeeCardProps {
  employee: RecruiterOverview;
  onDeleted?: () => void;
  onEmailSent?: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onDeleted, onEmailSent }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleSendEmail = () => {
    setIsEmailModalOpen(true);
  };

  const handleDeleteEmployee = () => {
    setIsDeleteOpen(true);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md max-h-fit relative">
      <h2 className="text-lg font-semibold">{`${employee.firstName ?? ''} ${employee.lastName ?? ''}`}</h2>
      <p>{employee.email}</p>
      {!employee.hasAccount && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-yellow-500">El usuario no tiene cuenta.</span>
        </div>
      )}
      <div className="mt-4 absolute top-4 right-4">
        <OptionsMenu onSendEmail={handleSendEmail} onDelete={handleDeleteEmployee} />
      </div>

        <SendEmail
          open={isEmailModalOpen}
          onChangeOpen={setIsEmailModalOpen}
          email={employee.email}
          hasAccount={employee.hasAccount}
          onSent={onEmailSent}
        />

      {/* Delete Modal */}
      <DeleteModal
        employeeId={employee.id}
        employeeName={`${employee.firstName} ${employee.lastName}`}
        isOpen={isDeleteOpen}
        onDeleted={onDeleted}
        onClose={() => setIsDeleteOpen(false)}
      />
    </div>
  );
};

export default EmployeeCard;
