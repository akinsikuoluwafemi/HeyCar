import "../styles/globals.css";
import { Globalstyle } from "../utils/Global";

function MyApp({ Component, pageProps }) {
  return (
    // <>
    <Component {...pageProps} />
    // </>
  );
}

export default MyApp;
