
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext";
import ApplicationNavigator from "./navigators/ApplicationNaivgator";

const tenMins = 1000 * 10 * 10;
const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        // staleTime: tenMins
      }
    }
  }
);

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