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
 const [gender, setGender] = useState("");

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
      gender: gender,
    };

    // Convertir los datos del formulario a un objeto Payload
    const payload = {
      mimeType: "text/plain",
      data: Buffer.from(JSON.stringify(data)),
    };

   
 };

 return (
    <div className="flex flex-col items-center justify-center p-4 text-black">
      <h1 className="text-orange-400 pb-4">Formulario de registro</h1>

      <form onSubmit={sendData}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="pl-4"
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
<div >
        <button type="submit" className="text-orange-500 text-xl pt-4" >Enviar</button>
        </div>
      </form>
    </div>
 );
};

export default App;