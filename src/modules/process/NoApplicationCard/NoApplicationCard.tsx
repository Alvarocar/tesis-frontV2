import React from "react";

export const NoApplicationCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Aun no hay postulaciones para esta vacante</h2>
        <p className="text-gray-500">Apareceran aqui una vez que alguien postule a tu oferta.</p>
      </div>
    </div>
  );
};