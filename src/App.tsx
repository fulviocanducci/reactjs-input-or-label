import React, { useState } from "react";
import InputOrLabel from "./components/InputOrLabel";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="mt-2 mb-2 container">
      <InputOrLabel value={value} onChange={(e) => setValue(e.target.value)} classNameInput="form-control" classNameLabel="form-label" />
    </div>
  );
}

export default App;
