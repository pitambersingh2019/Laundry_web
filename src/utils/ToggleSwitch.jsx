import React from "react";

export default function ToggleSwitch({ checked, onChange, disabled }) {
  return (
    <label className="relative inline-block w-11 h-6 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="peer sr-only"
      />

      <span
        className="absolute inset-0 rounded-full transition-colors duration-200 ease-in-out
        bg-gray-300 peer-checked:bg-[#1C3F6E]
        peer-disabled:opacity-50 peer-disabled:pointer-events-none"
      />

      <span
        className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5
        bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out
        peer-checked:translate-x-full"
      />
    </label>
  );
}