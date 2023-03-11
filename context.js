import React, { useContext } from "react";

export default DBContext = React.createContext();

export const useDB = () => {
  return useContext(DBContext);
};
