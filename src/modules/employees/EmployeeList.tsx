import React from "react";
import useSWR from "swr";
import RecruiterRepository from "@app/repositories/recruiter.repository";
import EmployeeCard from "./EmployeeCard";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import { useEmployeeFilter } from "@app/hooks/useEmployeeFilter";
import JobPagination from "../job/JobPagination/JobPagination.component";

const EmployeeList: React.FC = () => {
  const { filters } = useEmployeeFilter();

  const { data, error } = useSWR({ ...filters, flag: "employees" }, () => RecruiterRepository.getAll({ page: filters.page }));

  if (error) {
    return <p>Error al cargar los empleados.</p>;
  }

  if (!data) {
    return <DotsLoader />;
  }

  if (data.result.length === 0) {
    return <p>No se encontraron empleados.</p>;
  }

  return (
    <>
      <div className="grid min-h-screen gap-y-6 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        {data.result.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
      <JobPagination currentPage={data.currentPage} totalPages={data.totalPages} />
    </>
  );
};

export default EmployeeList;