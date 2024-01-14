'use client';
import React, { useState, useEffect } from 'react'; // Importar React y los hooks useState y useEffect
import axios from 'axios'; // Importar axios para hacer peticiones HTTP
import {
 createNymMixnetClient, // Importar la función para crear un cliente Nym Mixnet
 NymMixnetClient, // Importar el tipo NymMixnetClient para TypeScript
} from '@nymproject/sdk-full-fat'; // Importar desde el SDK de Nym

const nymApiUrl = 'https://validator.nymtech.net/api'; // URL de la API de Nym para interactuar con la red mixnet

interface DataItem { // Definir una interfaz para los elementos de datos
  id: string; // Identificador único del elemento
  collectionId: string; // Identificador de la colección a la que pertenece el elemento
  name: string; // Nombre asociado al elemento
  lastName: string; // Apellido asociado al elemento
  email: string; // Correo electrónico asociado al elemento
}


const Visualizer = () => { // Definir el componente Visualizer
  const [nym, setNym] = useState<NymMixnetClient>(); // Estado para almacenar el cliente Nym
  const [data, setData] = useState<DataItem[]>([]); // Estado para almacenar los datos recuperados
  useEffect(() => { // Hook de efecto para realizar acciones al montar y desmontar el componente
    const init = async () => { // Función asíncrona para inicializar el cliente Nym
      const client = await createNymMixnetClient(); // Crear el cliente Nym
      setNym(client); // Almacenar el cliente en el estado

      // Iniciar el cliente y conectar a un gateway
      await client?.client.start({ // Iniciar el cliente si existe (operador opcional)
        clientId: crypto.randomUUID(), // Generar un ID de cliente único
        nymApiUrl, // URL de la API de Nym
        forceTls: true, // Forzar el uso de TLS (WSS)
      });
    };

    const fetchData = async () => { // Función asíncrona para recuperar los datos
      try {
        const result = await axios.get('https://cyberguenza.pockethost.io/api/collections/formulario/records'); // Realizar petición GET para obtener los datos
        
        // Enviar los datos a través de la mixnet de Nym
        await nym?.client.send(result.data); // Enviar los datos si el cliente Nym existe

        console.log(result.data); // Imprimir los datos en la consola

        // Guardar los datos en el estado
        setData(result.data.items); // Almacenar los elementos de los datos en el estado
      } catch (error) { // Capturar errores en la petición
        console.error('Error al recuperar los datos:', error); // Imprimir el error en la consola
      }
    };

    init().then(fetchData); // Inicializar el cliente y luego recuperar los datos

    return () => { // Función de limpieza al desmontar el componente
      nym?.client.stop(); // Detener el cliente Nym si existe
    };
  }, []); // Lista vacía de dependencias, el efecto se ejecutará solo una vez al montar el componente

  return (
   
    <div className="flex flex-col pt-8 pb-8">

      <h1 className=" text-center pb-4 pt-4 text-3xl text-teal-500"> Datos ingresados vía mixnet </h1> 
  <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5  shadow-lg shadow-teal-700"> 
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8"> 
      <div className="overflow-hidden"> 
        <table className="min-w-full"> 
          <thead className="bg-teal-900 border-b"> 
            <tr> 
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-center"> 
                ID
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-center"> 
              Nombre</th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-center"> 
              Apellido</th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-center"> 
              Email</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterar sobre el estado de los datos y crear filas de tabla con los datos name y lastName */}
            {data.map(item => ( // Mapear cada elemento de datos a una fila de la tabla
              <tr className="bg-teal-400 border-b" key={item.id}> 
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{item.collectionId}</td> 
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{item.name}</td> 
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{item.lastName}</td> 
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{item.email}</td> 
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

export default Visualizer; // Exportar el componente Visualizer por defecto
