
import { ThemeProvider } from "./contexts/ThemeContext";
import ApplicationNavigator from "./navigators/ApplicationNaivgator";

const App = () => {
  return (
    <ThemeProvider>
      <ApplicationNavigator />
    </ThemeProvider>
  )
}

export default App;