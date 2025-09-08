import { ServicesAndProfessionalsContext } from "./ServicesAndProfessionalsContext";
import React, { useState } from "react";

export const ServicesAndProfessionalsProvider = ({ children }) => {
  const [professionals, setProfessionals] = useState([]);
  const [services, setServices] = useState([]);

  return (
    <ServicesAndProfessionalsContext.Provider
      value={{
        professionals,
        setProfessionals,
        services,
        setServices
      }}
    >
      {children}
    </ServicesAndProfessionalsContext.Provider>
  );
};