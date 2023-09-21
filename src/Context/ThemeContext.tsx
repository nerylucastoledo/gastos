import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface IThemeContext {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  switchTheme: ()=> void
}

const DataContext = createContext<IThemeContext | null>(null)

export const useTheme = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error("useTheme deve estar em ThemeContextProvider")
  return context
}

export const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useLocalStorage('color', 'light')

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return <DataContext.Provider value={{ 
    theme,
    setTheme,
    switchTheme
  }}
  >
    {children}
  </DataContext.Provider>
}