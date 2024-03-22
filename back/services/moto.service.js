const db = require("../firebase.js");
const {
  collection,
  addDoc,
  query,
  where,
  updateDoc,
  getDoc,
  getDocs,
  doc,
  limit,
  deleteDoc,
} = require("firebase/firestore");

async function getMotos() {
  try {
    const documents = {};
    const querySnapshot = await getDocs(collection(db, "motos"));
    querySnapshot.forEach((doc) => {
      documents[doc.id] = doc.data();
    });
    return documents;
  } catch (e) {
    console.error("Error fetching motos", e);
  }
}

async function getMoto(searchString, type = "id") {
  try {
    if (type === "id") {
      const docSnap = await getDoc(doc(db, "motos", searchString));
      if (docSnap.exists()) {
        return docSnap.data();
      }
    }
    if (type === "placa") {
      const collectionRef = collection(db, "motos");
      const q = query(
        collectionRef,
        where("placa", "==", searchString),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0].data();
    }
    return false;
  } catch (e) {
    console.error("Error fetching motos", e);
  }
}

async function createMoto({ placa, modelo, celda }) {
  try {
    const now = new Date();
    const docRef = await addDoc(collection(db, "motos"), {
      placa: placa,
      modelo: modelo,
      horaIngreso: now,
      celda: celda,
      estado: "INSIDE",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function updateMoto({
  placa,
  modelo,
  celda,
  originalPlaca,
  originalModelo,
  originalCelda,
}) {
  try {
    const collectionRef = collection(db, "motos");
    const q = query(
      collectionRef,
      where("placa", "==", originalPlaca),
      where("modelo", "==", originalModelo),
      where("celda", "==", originalCelda),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    const docId = querySnapshot.docs[0].id;
    const docRef = doc(db, "motos", docId);
    return await updateDoc(docRef, {
      placa: placa,
      modelo: modelo,
      celda: celda,
    });
  } catch (e) {
    console.error("Error Updating Moto", e);
  }
}

async function leavingMoto(placa) {
  let difference;
  let endDate;
  try {
    const collectionRef = collection(db, "motos");
    const q = query(
      collectionRef,
      where("placa", "==", placa),
      where("estado", "==", "INSIDE"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    const docId = querySnapshot.docs[0].id;
    const docRef = doc(db, "motos", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const startDate = new Date(docSnap.data().horaIngreso.seconds * 1000);
      endDate = new Date();
      difference = new Date(endDate - startDate).getUTCHours();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return "No moto with placa";
    }

    await updateDoc(docRef, {
      estado: "LEAVE",
      horaSalida: endDate,
      precio: difference * 1000, //1000 pesos por hora
    });
    const updatedDoc = await getDoc(docRef);
    return updatedDoc.data();
  } catch (e) {
    console.error("Error Updating Moto", e);
  }
}

async function deleteMoto(placa) {
  try {
    const collectionRef = collection(db, "motos");
    const q = query(collectionRef, where("placa", "==", placa), limit(1));
    const querySnapshot = await getDocs(q);
    const docId = querySnapshot.docs[0].id;
    const docRef = doc(db, "motos", docId);
    return await deleteDoc(docRef);
  } catch (e) {
    console.error("Error Updating Moto", e);
  }
}

module.exports = {
  getMotos,
  getMoto,
  createMoto,
  updateMoto,
  leavingMoto,
  deleteMoto,
};
