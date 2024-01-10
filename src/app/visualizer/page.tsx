'use client';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
 createNymMixnetClient,
 NymMixnetClient,
} from '@nymproject/sdk-full-fat';

const nymApiUrl = "https://validator.nymtech.net/api";

interface DataItem {
  id: string;
  collectionId: string;
  name: string;
  lastName: string;
  email: string;
}


const Visualizer = () => {
  const [nym, setNym] = useState<NymMixnetClient>();
  const [data, setData] = useState<DataItem[]>([]); 
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

        // Guardar los datos en el estado
        setData(result.data.items);
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
   
    <div className="flex flex-col">

      <h1 className="text-white"> hola</h1>
  <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              collectionId

              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                lastName
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                email
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Iterar sobre el estado de los datos y crear filas de tabla con los datos name y lastName */}
            {data.map(item => (
              <tr className="bg-gray-100 border-b" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.collectionId}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.lastName}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
    </div>
  );
};

export default Visualizer;
