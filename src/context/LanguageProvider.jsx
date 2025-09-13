import { useContext, useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';
import i18n from 'i18next';

export const LanguageProvider = ({ children }) => {
  const initialLang = localStorage.getItem("lang") || "en";

  const [language, setLanguage] = useState(initialLang);

  useEffect(() => {
    i18n.changeLanguage(initialLang);
    localStorage.setItem("lang", initialLang);
  }, [initialLang]);

  const changeLanguage = (lng) => {
    localStorage.setItem("lang", lng);
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);