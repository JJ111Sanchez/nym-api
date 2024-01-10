'use client'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
 createNymMixnetClient,
 NymMixnetClient,
} from '@nymproject/sdk-full-fat';

const nymApiUrl = "https://validator.nymtech.net/api";

const Visualizer = () => {
  const [nym, setNym] = useState<NymMixnetClient>();

  useEffect(() => {
    const init = async () => {
      const client = await createNymMixnetClient();
      setNym(client);

      // Iniciar el cliente y conectar a un gateway
      await client?.client.start({
        clientId: crypto.randomUUID(),
        nymApiUrl,
        forceTls: true, // forzar WSS
      });
    };

    const fetchData = async () => {
      try {
        const result = await axios.get('https://cyberguenza.pockethost.io/api/collections/formulario/records');
        
        // Enviar los datos a través de la mixnet de Nym
        await nym?.client.send(result.data);

        console.log(result.data);
      } catch (error) {
        console.error('Error al recuperar los datos:', error);
      }
    };

    init().then(fetchData);

    return () => {
      nym?.client.stop();
    };
  }, []);

  return (
    <div>
      <p>Verifica la consola para ver los datos.</p>
    </div>
  );
};

export default Visualizer;