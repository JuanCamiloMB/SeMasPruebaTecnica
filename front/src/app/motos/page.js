"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-modal";

export default function Motos() {
  const [motos, setMotos] = useState(null);
  const [fetched, setFetched] = useState(null);

  const getData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}`);
    const data = await response.json();
    setMotos(data.data);
    setFetched(true);
  };

  const checkOut = async (placa, closeModal = null) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}leaving`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ placa: placa }),
    });
    const data = await response.json();
    getData();
    if (closeModal) {
      closeModal("checkOut");
    }
  };
  const deleteMoto = async (placa, closeModal = null) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}delete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ placa: placa }),
    });
    const data = await response.json();
    getData();
    if (closeModal) {
      closeModal("delete");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <main className="flex flex-col ml-10 mr-10">
      <h1 className="text-3xl">Lista de motos</h1>
      {fetched && (
        <section className="flex w-full h-full mt-10">
          <ul className="grid grid-cols-4 gap-16">
            {Object.keys(motos).map((motoId) => (
              <li key={motoId}>
                <MotoDetails
                  motoId={motoId}
                  moto={motos[motoId]}
                  checkOut={checkOut}
                  deleteMoto={deleteMoto}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

function MotoDetails({ motoId, moto, checkOut, deleteMoto }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);

  function openModal(type) {
    if (type === "checkOut") {
      setCheckOutModal(true);
    }
    if (type === "delete") {
      setDeleteModal(true);
    }
  }

  function closeModal(type) {
    if (type === "checkOut") {
      setCheckOutModal(false);
    }
    if (type === "delete") {
      setDeleteModal(false);
    }
  }
  Modal.setAppElement("main");
  return (
    <>
      <Modal isOpen={deleteModal} onRequestClose={closeModal}>
        <h2 className="text-2xl">
          Seguro quiere eliminar moto con placa {moto.placa} ?
        </h2>
        <div className="flex flex-row gap-5">
          <button
            className="bg-slate-500 p-5 rounded-xl hover:bg-slate-300 transition-colors"
            onClick={() => deleteMoto(moto.placa, closeModal)}
          >
            Eliminar
          </button>
          <button
            className="bg-slate-500 p-5 rounded-xl hover:bg-slate-300 transition-colors"
            onClick={() => closeModal("delete")}
          >
            close
          </button>
        </div>
      </Modal>
      <Modal isOpen={checkOutModal} onRequestClose={closeModal}>
        <h2 className="text-2xl">CheckOut de moto con placa {moto.placa} ?</h2>
        <div className="flex flex-row gap-5">
          <button
            className="bg-slate-500 p-5 rounded-xl hover:bg-slate-300 transition-colors"
            onClick={() => checkOut(moto.placa, closeModal)}
          >
            CheckOut
          </button>
          <button
            className="bg-slate-500 p-5 rounded-xl hover:bg-slate-300 transition-colors"
            onClick={() => closeModal("checkOut")}
          >
            close
          </button>
        </div>
      </Modal>
      <div className="bg-slate-400 p-5 rounded-lg">
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
        <div className="flex flex-row gap-5">
          <button
            className="bg-slate-500 p-5 rounded-xl hover:bg-slate-300 transition-colors"
            onClick={() => openModal("checkOut")}
          >
            Check Out
          </button>
          <button
            className="bg-slate-500 p-5 rounded-xl hover:bg-slate-300 transition-colors"
            onClick={() => openModal("delete")}
          >
            Borrar
          </button>
          <Link href={`/motos/${motoId}`}>Editar</Link>
        </div>
      </div>
    </>
  );
}
