'use client'
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase'; // Importa la clase PocketBase para interactuar con la base de datos PocketBase.


const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Asegúrate de reemplazar la URL con la ruta correcta a tu API
    fetch('https://cyberguenza.pockethost.io/api/collections/formulario/records/id')
      .then(response => response.json())
      .then(data => setData(data.records));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white table-auto text-black">
        <thead>
          <tr>
            {/* Asegúrate de ajustar estos encabezados según los campos en tus datos */}
            <th className="px-4 py-2">Campo 1</th>
            <th className="px-4 py-2">Campo 2</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              {/* Asegúrate de ajustar estos campos según los campos en tus datos */}
              <td className="px-4 py-2 border">uno</td>
              <td className="px-4 py-2 border">dos</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
};

export default DataTable;