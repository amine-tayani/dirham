
import { UserTheme, useTheme } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";
import { LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";


const themeConfig: Record<UserTheme, { icon: LucideIcon, label: string }> = {
  light: { icon: Sun, label: "Light" },
  dark: { icon: Moon, label: "Dark" },
  system: { icon: Monitor, label: "System" }
}


export const ThemeSwitcher = () => {
  const { userTheme, setTheme } = useTheme();


 
  const handleThemeClick = (themeKey: UserTheme) => {
    setTheme(themeKey);
  };


  return (
    <div
      className={cn(
        "relative isolate flex h-8 rounded-full bg-background p-1 border ",
      )}
    >
      {Object.keys(themeConfig).map((key) => {
        const { icon: Icon, label } = themeConfig[key as UserTheme];

        const isActive = userTheme === key;

        return (
          <button
            aria-label={label}
            className={cn("relative size-6 rounded-full p-1",
            )}
            key={key}
            onClick={() => handleThemeClick(key as UserTheme)}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
           <Icon className={cn(
                "relative z-10 m-auto",
                isActive ? "text-foreground" : "text-muted-foreground/40",
                "size-3.5"
                )} />
          </button>
        );
      })}
    </div>
  );
};
