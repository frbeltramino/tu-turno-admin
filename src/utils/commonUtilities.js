import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import i18n from "i18next"; 

dayjs.locale('es');
dayjs.extend(utc);

export function formatDate(dateString) {
  const lang = i18n.language || 'es';
  dayjs.locale(lang);

  const formats = {
    es: 'D [de] MMMM [de] YYYY',  // 29 de agosto de 2025
    en: 'MMMM D, YYYY'            // August 29, 2025
  };

  return dayjs.utc(dateString).locale(lang).format(formats[lang] || formats.en);
}


export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function splitDate(dateString, separator, part) {
  return dateString.split(separator,2)[part];
}

export const formatAmount = (amount) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(amount);
};

export function getI18nMonth(dateString) {
  const lang = i18n.language;
  return dayjs.utc(dateString).locale(lang).format("MMMM");
}

export function getI18nDay(dateString) {
  const lang = i18n.language;
  return dayjs.utc(dateString).locale(lang).format("dddd");
}

export function getDayByIndexDay(indexDay) {
  const lang = i18n.language || 'es';

  const baseDate = dayjs.utc("1970-01-04").add(indexDay, 'day');

  return baseDate.locale(lang).format("dddd");
}