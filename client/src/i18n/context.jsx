import { createContext, useContext, useState } from "react";
import { locales } from "./locales";

const I18nContext = createContext();

function getInitialLang() {
  const stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "pt") return stored;
  return navigator.language.startsWith("pt") ? "pt" : "en";
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  function toggleLang() {
    setLang((prev) => {
      const next = prev === "en" ? "pt" : "en";
      localStorage.setItem("lang", next);
      return next;
    });
  }

  return (
    <I18nContext.Provider value={{ t: locales[lang], lang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
