import { HelmetProvider } from "react-helmet-async"
import { useEffect } from "react"
import AppNavigation from "./navigation/Navigation"
import { useLanguageEffect } from "./hooks/useLanguageEffect"

function App() {
  // Apply language effects (HTML lang attribute, CSS classes)
  useLanguageEffect();

  // Initialize theme on app start
  useEffect(() => {
    const theme = "theme-navy-amber";
    const root = document.documentElement;

    // Preserve any existing non-theme classes (e.g. language classes)
    Array.from(root.classList).forEach((className) => {
      if (className.startsWith("theme-")) {
        root.classList.remove(className);
      }
    });

    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, []);

  return (
    <>
      <HelmetProvider>
        <AppNavigation />
      </HelmetProvider>
    </>
  )
}

export default App