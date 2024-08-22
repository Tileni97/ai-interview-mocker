// components/ui/spinner.js

import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
