import { useState, useEffect } from "react";
import { I18nProvider, useI18n } from "./i18n/context";
import LcmForm from "./components/LcmForm";
import LcmResult from "./components/LcmResult";
import ThemeToggle from "./components/ThemeToggle";
import LangToggle from "./components/LangToggle";
import { fetchLcm } from "./api/lcm";

function getInitialTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function AppContent() {
  const { t } = useI18n();
  const [theme, setTheme] = useState(getInitialTheme);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  async function handleSubmit(x, y) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchLcm(x, y);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-black/30 p-8 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t.title}
          </h1>
          <div className="flex items-center gap-1">
            <LangToggle />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {t.subtitle}
        </p>

        <LcmForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3 text-sm text-red-700 dark:text-red-400 transition-colors">
            {error}
          </div>
        )}

        <LcmResult data={result} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
