export type TTheme =  "dark"| "light";

export type TThemeContextType = {
  theme: TTheme;
  toggleTheme: () => void;
};
