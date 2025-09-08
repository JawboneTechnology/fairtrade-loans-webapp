import { useState, useEffect } from "react";

const useEnvironment = () => {
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    const env = process.env.NODE_ENV;
    setIsProduction(env === "production");
  }, []);

  return isProduction;
};

export default useEnvironment;
