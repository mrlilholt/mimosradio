// pages/_app.js
import "../styles/globals.css";
import { PlayerProvider } from "../context/PlayerContext";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <Component {...pageProps} />
    </PlayerProvider>
  );
}

export default MyApp;
