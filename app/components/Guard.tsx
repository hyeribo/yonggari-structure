import { useState } from "react";
import { Button, Input } from "antd";

import { authenticate } from "@/app/lib/actions";

type GuardProps = {
  onPass: () => void;
};

const Guard: React.FC<GuardProps> = ({ onPass }) => {
  const [passKey, setPassKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheck = () => {
    try {
      const isValid = authenticate(passKey);
      if (isValid) {
        onPass();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("error");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-row justify-center items-center p-24">
      <div>
        <Input
          placeholder="Pass key"
          value={passKey}
          onChange={(e) => setPassKey(e.target.value)}
          onPressEnter={handleCheck}
        />
        {errorMessage && (
          <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
        )}
        <div className="flex flex-row justify-center mt-3">
          <Button type="primary" onClick={handleCheck}>
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Guard;
