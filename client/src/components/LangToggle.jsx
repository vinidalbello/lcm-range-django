import { useI18n } from "../i18n/context";

export default function LangToggle() {
  const { lang, toggleLang } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="px-2 py-1 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {lang === "en" ? "PT" : "EN"}
    </button>
  );
}
