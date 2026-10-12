import React from "react";
import { Header } from "@app/modules/common/header";
import EmployeeList from "@app/modules/employees/EmployeeList";
import { CreateEmployeeForm } from "@app/modules/employees/CreateEmployeeForm";
import { Typography } from "@app/components/ui/typography";

export const EmployeeManagement: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl px-4 py-8 focus:outline-none sm:px-6"
      >
        <Typography.H2 className="m-0 border-0 pb-0">Administración de Empleados</Typography.H2>

        <section className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-sm">
          <Typography.H3 as="h2" className="m-0">Crear nuevo empleado</Typography.H3>
          <div className="mt-4">
            <CreateEmployeeForm />
          </div>
        </section>

        <hr className="my-8 border-border" />

        <section>
          <Typography.H3 as="h2" className="mb-4">Lista de empleados</Typography.H3>
          <EmployeeList />
        </section>
      </main>
    </div>
  );
};
