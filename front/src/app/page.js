import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (<>
  <main className="flex w-full h-screen">
    <div className="flex flex-row w-full h-full items-center justify-center gap-6">
      <Link href={'/agregar'}>Agregar moto</Link>
      <Link href={'/factura'}>Generar factura de moto</Link>
      <Link href={'/eliminar'}>Eliminar moto</Link>
      <Link href={'/editar'}>Editar datos moto</Link>
      <Link href={'/listar'}>Listar motos</Link>
      <Link href={'/buscar'}>Buscar moto</Link>
    </div>
  </main>
  </>);
}