"use client";
import { useEffect, useState } from "react";

export default function ListarMotos() {
  const [motos, setMotos] = useState(null);
  const [fetched, setFetched] = useState(null);
  const getData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}`);
    const data = await response.json();
    setMotos(data.data);
    setFetched(true);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <main className="flex flex-col ml-10 mr-10">
      <h1 className="text-3xl">Motos listing</h1>
      {fetched && (
        <section className="flex w-full h-full">
          <ul className="flex flex-col gap-5">
            {Object.keys(motos).map((motoId, index) => (
              <li key={motoId}>
                <MotoDetails moto={motos[motoId]} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

function MotoDetails({ moto }) {
  return (
    <div>
      <h2 className="text-xl">Moto Details</h2>
      <p>
        <b>Estado:</b> {moto.estado}
      </p>
      <p>
        <b>Modelo:</b> {moto.modelo}
      </p>
      <p>
        <b>Celda:</b> {moto.celda}
      </p>
      <p>
        <b>Hora de Ingreso:</b>
        {new Date(moto.horaIngreso.seconds * 1000).toLocaleString()}
      </p>
      <p>
        <b>Placa:</b> {moto.placa}
      </p>
    </div>
  );
}
