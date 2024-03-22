"use client";
import { useState } from "react";

export default function AgregarMoto() {
  const [createMsg, setCreateMsg] = useState(false);
  const [moto, setMoto] = useState({ placa: "", modelo: "", celda: "" });
  const [btnDisabled, setBtnDisabled] = useState(false)

  const handleChange = (e) => {
    setCreateMsg(false);
    const { name, value } = e.target;
    setMoto({
      ...moto,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setBtnDisabled(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}create`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moto),
    });
    if (response.status === 200) setBtnDisabled(false);
    setCreateMsg(true)
  };
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">Agregar moto</h1>
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
          <p className={createMsg ? "flex" : "hidden"}>Moto guardada!</p>
        </form>
      </main>
    </>
  );
}
