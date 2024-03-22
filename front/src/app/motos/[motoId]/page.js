"use client";
import { useState, useEffect } from "react";

export default function Moto({ params }) {
  const [moto, setMoto] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const getData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchString: params.motoId, type: "id" }),
    });
    const data = await response.json();
    setOriginalData({
      originalPlaca: data.data.placa,
      originalCelda: data.data.celda,
      originalModelo: data.data.modelo,
    });
    setMoto(data.data);
    setFetched(true);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {fetched && moto.horaSalida && <Factura moto={moto} />}
      {fetched && !moto.horaSalida && <EditarMoto moto={moto} setMoto={setMoto} getData={getData} originalData={originalData}/>}
    </>
  );
}

function Factura({ moto }) {
  return (
    <>
      <h2 className="text-xl">Detalles moto</h2>
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

      <p>
        <b>Hora de salida:</b>{" "}
        {new Date(moto.horaSalida.seconds * 1000).toLocaleString()}
      </p>
      <p>
        <b>Precio:</b> {moto.precio}
      </p>
    </>
  );
}

function EditarMoto({ moto, setMoto, getData, originalData }) {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(false);
  const handleChange = (e) => {
    setUpdateMsg(false);
    const { name, value } = e.target;
    setMoto({
      ...moto,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnDisabled(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...moto, ...originalData }),
    });
    if (response.status === 200) setBtnDisabled(false);
    getData();
    setUpdateMsg(true);
  };
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">Editar moto</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-10">
            <label htmlFor="placa">Placa</label>
            <input
              id="placa"
              name="placa"
              defaultValue={moto.placa}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-row gap-10">
            <label htmlFor="modelo">Modelo</label>
            <input
              id="modelo"
              name="modelo"
              defaultValue={moto.modelo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-row gap-10">
            <label htmlFor="celda">Celda</label>
            <input
              id="celda"
              name="celda"
              defaultValue={moto.celda}
              onChange={handleChange}
              required
            />
          </div>
          <button
            id="submit-btn"
            type="submit"
            className="bg-slate-500 p-5 rounded-xl hover:bg-slate-300 transition-colors"
            disabled={btnDisabled}
          >
            Confirmar
          </button>
          <p className={updateMsg ? "flex" : "hidden"}>Update done!</p>
        </form>
      </main>
    </>
  );
}
