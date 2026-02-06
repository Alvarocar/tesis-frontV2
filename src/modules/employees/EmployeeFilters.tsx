import React, { useState } from "react";

type Filters = {
  search?: string;
  department?: string;
};

interface EmployeeFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value, department });
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDepartment(value);
    onFilterChange({ search, department: value });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre o correo"
        value={search}
        onChange={handleSearchChange}
        className="border rounded p-2 w-full sm:w-auto"
      />

      <select
        value={department}
        onChange={handleDepartmentChange}
        className="border rounded p-2 w-full sm:w-auto"
      >
        <option value="">Todos los departamentos</option>
        <option value="ventas">Ventas</option>
        <option value="tecnologia">Tecnología</option>
        <option value="recursos humanos">Recursos Humanos</option>
      </select>
    </div>
  );
};

export default EmployeeFilters;