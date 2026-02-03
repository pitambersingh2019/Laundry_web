import React, { useState } from "react";
import MyDetails from "./myDetails/MyDetails";

export const Setting = () => {
  return (
    <div className="p-6 ml-24">
      <div className="border-b border-gray-300 pb-3">
        <h2 className="text-2xl font-semibold text-[#1C3F6E]">Settings</h2>
        <p className="text-sm text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>
       <MyDetails />
      </div>
  );
};
