import { useState } from "react";
import { useI18n } from "../i18n/context";

export default function LcmForm({ onSubmit, isLoading }) {
  const { t } = useI18n();
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [errors, setErrors] = useState({});

  function validateField(value, fieldName) {
    if (value === "") return null;
    if (!/^\d+$/.test(value)) return t.positiveInteger;
    if (Number(value) <= 0) return t.cannotBeZero(fieldName);
    return null;
  }

  function validateRange(xVal, yVal) {
    if (xVal === "" || yVal === "") return null;
    if (!/^\d+$/.test(xVal) || !/^\d+$/.test(yVal)) return null;
    if (Number(xVal) <= 0 || Number(yVal) <= 0) return null;
    if (Number(xVal) >= Number(yVal)) return t.yGreaterThanX;
    return null;
  }

  function updateErrors(newX, newY) {
    const xError = validateField(newX, t.fieldNameX);
    const yError = validateField(newY, t.fieldNameY) || validateRange(newX, newY);
    setErrors({
      ...(xError && { x: xError }),
      ...(yError && { y: yError }),
    });
  }

  function handleXChange(e) {
    const value = e.target.value;
    setX(value);
    updateErrors(value, y);
  }

  function handleYChange(e) {
    const value = e.target.value;
    setY(value);
    updateErrors(x, value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const submitErrors = {};
    if (x === "") submitErrors.x = t.required;
    if (y === "") submitErrors.y = t.required;

    if (Object.keys(submitErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...submitErrors }));
      return;
    }

    if (Object.keys(errors).length > 0) return;

    onSubmit(Number(x), Number(y));
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="x" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.labelX}
          </label>
          <input
            id="x"
            type="text"
            inputMode="numeric"
            value={x}
            onChange={handleXChange}
            placeholder={t.placeholderX}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors"
          />
          {errors.x && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.x}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="y" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.labelY}
          </label>
          <input
            id="y"
            type="text"
            inputMode="numeric"
            value={y}
            onChange={handleYChange}
            placeholder={t.placeholderY}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors"
          />
          {errors.y && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.y}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || hasErrors}
        className="w-full rounded-md bg-blue-600 dark:bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? t.loading : t.submit}
      </button>
    </form>
  );
}
