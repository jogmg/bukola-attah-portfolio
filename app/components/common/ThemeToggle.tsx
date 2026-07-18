import { Moon, Sun } from "lucide-react";

interface IThemeToggle {
  toggleTheme: () => void;
  theme: "light" | "dark";
}

export default function ThemeToggle({ toggleTheme, theme }: IThemeToggle) {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-foreground/5 transition-colors cursor-pointer"
      aria-label="Toggle theme"
      id="theme-toggle"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
