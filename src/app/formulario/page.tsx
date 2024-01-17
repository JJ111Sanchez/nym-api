'use client'
// Importa React y dos hooks (useState y useEffect) de la biblioteca de React.
import React, { useState, useEffect } from "react";
// Importa la clase PocketBase para interactuar con la base de datos PocketBase.
import PocketBase from 'pocketbase';
// Importa el componente Image de Next para la optimización de imágenes.
import Image from 'next/image';
// Importa funciones y tipos del SDK de Nym para trabajar con la mixnet.
import {
 createNymMixnetClient,
 NymMixnetClient,
} from "@nymproject/sdk-full-fat";

// URL de la API de Nym para interactuar con la red mixnet.
const nymApiUrl = "https://validator.nymtech.net/api";

// Instancia de PocketBase configurada para conectarse a la base de datos remota.
const pb = new PocketBase('https://cyberguenza.pockethost.io');


// Componente principal de la aplicación.
const App = () => {
 // Estado para almacenar la instancia del cliente Nym.
 const [nym, setNym] = useState<NymMixnetClient>();
 // Estados para almacenar los valores de los campos del formulario.
 const [email, setEmail] = useState("");
 const [name, setName] = useState("");
 const [lastName, setLastName] = useState("");
 const [message, setMessage] = useState("");
 // Estado para almacenar el mensaje de estado del envío.
 const [statusMessage, setStatusMessage] = useState("");

 // Función para inicializar el cliente Nym.
 const init = async () => {
    // Crea una nueva instancia del cliente Nym.
    const client = await createNymMixnetClient();
    // Almacena la instancia del cliente en el estado.
    setNym(client);

    // Inicia el cliente y se conecta a un gateway.
    await client?.client.start({
      clientId: crypto.randomUUID(), // Genera un ID de cliente único.
      nymApiUrl, // URL de la API de Nym.
      forceTls: true, // Fuerza el uso de WSS (WebSocket Secure).
    });
 };

 // Efecto para inicializar el cliente Nym al montar el componente.
 useEffect(() => {
    init();
    // Función de limpieza para detener el cliente Nym al desmontar el componente.
 },[] );

 // Función para manejar el envío de datos a través del formulario.
 const sendData = async (event: React.FormEvent<HTMLFormElement>) => {
   // Previene el comportamiento por defecto del formulario (recarga de página).
   event.preventDefault();

   // Verifica si el cliente Nym está inicializado.
   if (!nym) {
     console.warn("El cliente Nym no está inicializado. Por favor, espera la conexión.");
     return;
   }

   // Datos a enviar recopilados del formulario.
   const data = {
     email: email,
     name: name,
     lastName: lastName,
     message: message
   };


   // Intenta crear un nuevo registro en la base de datos con los datos del formulario.
   try {
     const record = await pb.collection('formulario').create(data);
     console.log('Registro creado con éxito:', record);
     // Establece el mensaje de estado después de un envío exitoso.
     setStatusMessage("Mensaje enviado por la mixnet");
     // Limpia los campos del formulario después de enviar.
     setEmail("");
     setName("");
     setLastName("");
     setMessage("");
   } catch (error) {
     // Captura y registra errores al intentar crear el registro.
     console.error('Error al crear el registro:', error);
     // Establece el mensaje de estado en caso de error.
     setStatusMessage("Error al enviar el mensaje");
   }
 };

 // Renderiza el componente con el formulario y los mensajes de estado.
 return (

 
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
       <div>
       <Image src="/nym.png"
        width={100}
        height={100}
alt="sizas">

</Image>
    
</div>
      
      {statusMessage && <p className="text-white  text-center text-2xl font-bold pt-4 pb-4 ">{statusMessage}</p>} 

      <form onSubmit={sendData} className="p-6 mt-10 bg-gray-200 rounded-md shadow-md w-80 sm:w-96">
        <h2 className="mb-5 text-3xl font-bold text-center text-teal-700">Envia tus datos por la mixnet</h2>
       
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-5 text-black placeholder-gray-500 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
  
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-3 py-2 mb-5 text-black placeholder-gray-500 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
 
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-5 text-black placeholder-gray-500 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        {/* El selector de género está comentado y no se muestra en el formulario.
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-3 py-2 mb-5 text-black placeholder-gray-500 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          {[
            { value: "Masculino", label: "Masculino" },
            { value: "Femenino", label: "Femenino" },
            { value: "Otro", label: "Otro" },
          ].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> */}
        
        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 mb-5 text-black placeholder-gray-500 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
     
        <button type="submit" className="w-full px-3 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-800">Enviar</button>
      </form>
    </div>
     
 );

}
// Exporta el componente App para su uso en otros archivos.
 export default App;

