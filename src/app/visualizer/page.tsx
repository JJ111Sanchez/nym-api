import React, { useEffect } from 'react';
import axios from 'axios';

const DataViewComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://cyberguenza.pockethost.io/api/collections/formulario/records');
        console.log(result.data);
      } catch (error) {
        console.error('Error al recuperar los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Verifica la consola para ver los datos.</p>
    </div>
  );
};

export default DataViewComponent;
