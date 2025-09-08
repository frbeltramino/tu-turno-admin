import React, { useContext, useState } from 'react'
import { ServicesAndProfessionalsContext } from '../context/ServicesAndProfessionalsContext';
import Swal from "sweetalert2";
import tuTurnoApi from "../api/tuTurnoApi";
import { useTranslation } from 'react-i18next';

export const useServicesAndProfessionals = () => {

  const { professionals, setProfessionals, services, setServices } = useContext(ServicesAndProfessionalsContext);
  const [ successCreateProfessional, setSuccessCreateProfessional ] = useState(false);
  const [ createProfessionalLoading, setCreateProfessionalLoading ] = useState(false);
  const { t } = useTranslation();
  const [ errorCreateProfessional, setErrorCreateProfessional ] = useState("");
  const [ createResult, setCreateResult ] = useState("ok");
  const [ getProfessionalsLoading, setGetProfessionalsLoading ] = useState(false);


  const getProfessionals = async () => {
    setGetProfessionalsLoading(true);
    try {
      const response = await tuTurnoApi.get("/servicesAndProfessionals/getProfessionals");
      const data = response.data;
      setGetProfessionalsLoading(false);
      setProfessionals(data.professionals);
      setCreateResult("ok");
    }
    catch (error) {
      setGetProfessionalsLoading(false);
      Swal.fire('Error al obtener profesionales', error.response.data?.message, 'error');
    }
  }

  const createProfessional = async (formData) => {
    const payload = {
        name: `${formData.nombre} ${formData.apellido}`,
        description: formData.descripcion,
        phone: formData.telefono,
        email: formData.email,
        working_days: formData.horarios.map(h => ({
          day: h.dia.value,
          index_day: h.dia.dayIndex,
          working_hours: {
            am: {
              start: h.manana.inicio,
              end: h.manana.fin
            },
            pm: {
              start: h.tarde.inicio,
              end: h.tarde.fin
            }
          }
        })),
        holidays: []
      };
    try {
      setCreateProfessionalLoading(true);
      const response = await tuTurnoApi.post("/servicesAndProfessionals/professional", payload);
      const data = response.data;
      setCreateProfessionalLoading(false);
      setSuccessCreateProfessional(true);
      setCreateResult("ok");
      setErrorCreateProfessional("");
      getProfessionals();
    }
    catch (error) {
      setCreateProfessionalLoading(false);
      setCreateResult("error");
      setErrorCreateProfessional(t('i18n.common.error_message'));
    }
  }

  const deleteProfessional = async (professional) => {
    try {
      const response = await tuTurnoApi.delete(`/servicesAndProfessionals/professional/${professional._id}`);
      const data = response.data;
      getProfessionals();
      Swal.fire(t("i18n.professionals.060"), data.message , 'success');
    }
    catch (error) {
      Swal.fire(t('i18n.professionals.036'), error.response.data?.message || t('i18n.common.006'), 'error');
    }
  }


  return {
    professionals,
    getProfessionals,
    successCreateProfessional,
    createProfessional,
    createProfessionalLoading,
    errorCreateProfessional,
    createResult,
    getProfessionalsLoading,
    deleteProfessional
  }
}
  

