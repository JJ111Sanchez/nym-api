'use client'
import React, { useState, useEffect } from "react";
import {
 createNymMixnetClient,
 NymMixnetClient,
 Payload,
} from "@nymproject/sdk-full-fat";

const nymApiUrl = "https://validator.nymtech.net/api";

interface SendConfig {
 payload: Payload;
 recipient: string;
 customData?: any; // Define el tipo más específico posible
}

const App = () => {
 const [nym, setNym] = useState<NymMixnetClient>();
 const [email, setEmail] = useState("");
 const [name, setName] = useState("");
 const [lastName, setLastName] = useState("");
 const [gender, setGender] = useState("");
 const [message, setMessage] = useState("");

 const init = async () => {
    const client = await createNymMixnetClient();
    setNym(client);

    // Start the client and connect to a gateway
    await client?.client.start({
      clientId: crypto.randomUUID(),
      nymApiUrl,
      forceTls: true, // force WSS
    });
 };

 useEffect(() => {
    init();
    return () => {
      nym?.client.stop();
    };
 }, []);

 const sendData = async () => {
    if (!nym) {
      console.warn("Nym client is not initialized. Please wait for connection.");
      return;
    }

    const data = {
      email: email,
      name: name,
      lastName: lastName,
      gender: gender,
      message: message
    };

    // Convertir los datos del formulario a un objeto Payload
    const payload = {
      mimeType: "text/plain",
      data: Buffer.from(JSON.stringify(data)),
    };

   
 };

 return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
      <form onSubmit={sendData} className="p-6 mt-10 bg-gray-200 rounded-md shadow-md w-80 sm:w-96">
        <h2 className="mb-5 text-3xl font-bold text-center text-purple-600">Formulario Cyberpunk</h2>
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
        </select>
        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 mb-5 text-black placeholder-gray-500 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button type="submit" className="w-full px-3 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">Enviar</button>
      </form>
    </div>
 );
};

export default App;
