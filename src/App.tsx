import { ThemeProvider } from "./contexts/ThemeContext";
import { Layout } from "./components/Layout";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Notes Manager
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Your personal note-taking application
          </p>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
