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

const Suscribete = () => {
    const [nym, setNym] = useState<NymMixnetClient>();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const init = async () => {
        const client = await createNymMixnetClient();
        setNym(client);

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

    const sendData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!nym) {
            console.warn("Nym client is not initialized. Please wait for connection.");
            return;
        }

        const data = {
            email: email,
            name: name,
        };

        const payload = {
            mimeType: "text/plain",
            data: Buffer.from(JSON.stringify(data)),
        };

        // Aquí iría la lógica para enviar el payload usando el SDK de Nym
        // Por ahora, solo mostraremos un mensaje en consola
        console.log("Datos a enviar:", payload);
        // TODO: Implementar la lógica de envío cuando el SDK esté listo
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h1 className="text-xl text-center text-gray-700 mb-4">Suscríbete a nuestro boletín</h1>

            <form onSubmit={sendData} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Suscribirse</button>
                </div>
            </form>
        </div>
    );
};

export default Suscribete;