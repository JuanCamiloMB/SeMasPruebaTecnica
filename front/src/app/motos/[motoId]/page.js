"use client";
import { useState, useEffect } from "react";

export default function Moto({ params }) {
  const [moto, setMoto] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(false);

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

  const handleChange = (e) => {
    setUpdateMsg(false)
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
    setUpdateMsg(true)
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {fetched && (
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
              />
            </div>
            <div className="flex flex-row gap-10">
              <label htmlFor="modelo">Modelo</label>
              <input
                id="modelo"
                name="modelo"
                defaultValue={moto.modelo}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row gap-10">
              <label htmlFor="celda">Celda</label>
              <input
                id="celda"
                name="celda"
                defaultValue={moto.celda}
                onChange={handleChange}
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
      )}
    </>
  );
}
