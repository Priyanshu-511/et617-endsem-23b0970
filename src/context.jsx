import { createContext, useContext } from "react";
export const Ctx = createContext();
export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside <Ctx.Provider>");
  return ctx;
};