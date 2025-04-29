import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggler() {
  function toggleTheme() {
    if (
      document.documentElement.classList.contains("dark") ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  }

  return (
    <Button variant="outline" size="icon" type="button" onClick={toggleTheme}>
      <Moon className="absolute size-4" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
