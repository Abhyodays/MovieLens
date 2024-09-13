
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext";
import ApplicationNavigator from "./navigators/ApplicationNaivgator";


const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ApplicationNavigator />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App;