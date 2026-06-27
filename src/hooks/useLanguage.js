import { useState, useCallback } from 'react';

export const useLanguage = (defaultLang = 'kr') => {
  const [lang, setLang] = useState(defaultLang);

  const t = useCallback((kr, fr) => {
    return lang === 'kr' ? kr : fr;
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang(prev => prev === 'kr' ? 'fr' : 'kr');
  }, []);

  return { lang, t, toggleLanguage, setLang };
};

export default useLanguage;
