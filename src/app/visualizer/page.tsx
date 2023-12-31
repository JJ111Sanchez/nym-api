'use client'
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import axios from 'axios';


interface FormularioData {
    name: string;
    email: string;
    // Añade aquí el resto de los campos según sea necesario
  }

  const DataViewComponent = () => {
    const [data, setData] = useState<FormularioData[]>([]); 


 // Función para obtener todos los registros de la colección 'formulario'
 const fetchData = async () => {
    try {
      const result = await axios.get<FormularioData[]>('https://cyberguenza.pockethost.io/api/collections/formulario/records'); // Usa la interfaz para tipar la respuesta de tu API
      setData(result.data);
    } catch (error) {
      console.error('Error al recuperar los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((item, index) => (
        <div key={index} className="m-4 shadow-lg bg-gradient-to-r from-black via-orange-500 to-black rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <h2 className="text-2xl text-white p-4">{item.name}</h2>
          <p className="text-lg text-white p-4">{item.email}</p>
        </div>
      ))}
    </div>
  );
};

export default DataViewComponent;