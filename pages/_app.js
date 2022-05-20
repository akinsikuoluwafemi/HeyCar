import { ProjectProvider } from "../context/projectContext";
import "../styles/globals.css";
import { Globalstyle } from "../utils/Global";

function MyApp({ Component, pageProps }) {
  return (
    <ProjectProvider>
      <Component {...pageProps} />
    </ProjectProvider>
  );
}

export default MyApp;
