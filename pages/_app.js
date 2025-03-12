import { useEffect } from 'react';
import '../styles/globals.css'; // Importa il file CSS globale
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap

function MyApp({ Component, pageProps }) {
  // Forza il caricamento di Bootstrap lato client
  useEffect(() => {
    require('bootstrap/dist/css/bootstrap.min.css');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
