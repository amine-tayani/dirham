import { Toaster as Sonner } from "sonner";

export const Toaster = () => {

  return (
    <Sonner
      richColors
      expand
      position="bottom-right"
      theme="dark"
      className="toaster group"
    />
  );
};