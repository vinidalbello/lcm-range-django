import { useState } from "react";
import { useI18n } from "../i18n/context";

const TRUNCATE_THRESHOLD = 50;

export default function LcmResult({ data }) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  if (!data) return null;

  const result = data.result;
  const isLong = result.length > TRUNCATE_THRESHOLD;

  const displayValue =
    isLong && !expanded
      ? result.slice(0, TRUNCATE_THRESHOLD) + "..."
      : result;

  return (
    <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 text-center transition-colors">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t.resultLabel(data.x, data.y)}
      </p>

      {isLong && (
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {t.digitCount(result.length.toLocaleString())}
        </p>
      )}

      <p
        className={`mt-2 font-bold text-gray-900 dark:text-white break-all ${
          isLong ? "text-sm" : "text-3xl"
        }`}
      >
        {displayValue}
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          {expanded ? t.showLess : t.showMore}
        </button>
      )}
    </div>
  );
}
