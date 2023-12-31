'use client'
import React, { useState, useEffect } from "react";
import PocketBase from 'pocketbase'; 
import axios from 'axios';
import { createNymMixnetClient, NymMixnetClient } from '@nymproject/sdk-full-fat';

const nymApiUrl = "https://validator.nymtech.net/api";

const DataViewComponent = () => {
  const [nym, setNym] = useState<NymMixnetClient>();
  const [data, setData] = useState([]);

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
        setData(result.data);

        // Enviar los datos a través de la mixnet de Nym
        // Asegúrate de que nym no es nulo antes de intentar enviar datos
        if (nym?.client) {
          // Define el destinatario y el payload para el envío de datos
          const sendConfig = {
            payload: { message: JSON.stringify(result.data) },
            recipient: 'recipient.address', // Reemplaza con la dirección del destinatario real
            replySurbs: 0 // No esperar respuesta
          };
          await nym.client.send(sendConfig);
        }

        console.log('Datos recibidos:', result.data);
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
    <div className="container mx-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Correo</th>
            <th className="px-4 py-2">Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{}</td>
              <td className="px-4 py-2">{}</td>
              <td className="px-4 py-2">{}</td>
              <td className="px-4 py-2">{}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataViewComponent;