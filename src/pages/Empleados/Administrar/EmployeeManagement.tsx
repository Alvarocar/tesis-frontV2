import React from "react";
import { Header } from "@app/modules/common/header";
import EmployeeList from "@app/modules/employees/EmployeeList";
import { CreateEmployeeForm } from "@app/modules/employees/CreateEmployeeForm";
import { Typography } from "@app/components/ui/typography";

export const EmployeeManagement: React.FC = () => {
  return (
    <>
      <Header />
      <div className="p-6">
        <Typography.H2>Administración de Empleados</Typography.H2>        

        <Typography.H3 className="mt-4">Crear nuevo empleado</Typography.H3>
        <CreateEmployeeForm />

        <hr className="my-6" />
        <Typography.H3 className="mb-4">Lista de empleados</Typography.H3>
        <EmployeeList />
      </div>
    </>
  );
};
