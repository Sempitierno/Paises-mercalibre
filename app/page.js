"use client";

import { useEffect, useState } from "react";

export default function LandingPage() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch("https://api.mercadolibre.com/sites");
        if (!respuesta.ok) throw new Error("Error al obtener datos de la API");
        const result = await respuesta.json();
        setData(result);
      } catch (err) {
        setStatus({ loading: false, error: err.message });
      } finally {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    };
    obtenerDatos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-6 text-center">
        <h1 className="text-4xl font-bold"> API mercadolibre </h1>
      </header>
      <div>
        <h2 className="text-black"> Hola kelly  </h2> 
      </div>

      <main className="flex-1 w-full max-w-4xl px-4 py-8">
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Información de Países
          </h2>
        </section>

        {status.loading && <p className="text-blue-500 text-center">Cargando...</p>}
        {status.error && <p className="text-red-500 text-center">{status.error}</p>}
        {!status.loading && !status.error && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data.map((item) => (
            <li
              key={item.id}
              className="text-black shadow-md p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100"
            >
              {item.name}
            </li>
          ))}
        </ul>
        
        )}
      </main>

      <footer className="w-full bg-gray-800 text-white py-4 text-center">
        <p>Desarrollado por Sempiterno</p>
      </footer>
    </div>
  );
}
