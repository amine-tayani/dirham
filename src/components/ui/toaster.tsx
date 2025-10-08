import { useTheme } from "@/components/ui/theme-provider";
import { Toaster as Sonner } from "sonner";

export const Toaster = () => {

  const { theme } = useTheme();
  return (
    <Sonner
      richColors
      expand
      position="top-right"
      theme={theme}
      className="toaster group"
      style={{
      backgroundColor: "var(--chart-6)",
      color: "var(--background)",
      }}
    />
  );
};