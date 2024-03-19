const express = require("express");
const db = require("./firebase.js");
const {
  collection,
  addDoc,
  query,
  where,
  getDoc,
  updateDoc,
  getDocs,
  doc,
  limit,
} = require("firebase/firestore");

//Initialize express app
const app = express();
const port = 3000;

app.use(express.json());

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

async function updateMoto({ placa, modelo, celda }) {
  try {
    const collectionRef = collection(db, "motos");
    const q = query(
      collectionRef,
      where("placa", "==", placa),
      where("estado", "==", "INSIDE"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    const docId = querySnapshot.docs[0].id
    const docRef = doc(db, "motos", docId)
    return await updateDoc(docRef, {
      placa: placa,
      modelo: modelo,
      celda: celda,
    });
  } catch (e) {
    console.error("Error Updating Moto", e);
  }
}

function calculateTimeDifference(startDate, endDate) {
  // Ensure valid Date objects
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new Error("Invalid date objects provided");
  }

  // Get the difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Return an object with the time components
  return { hours, minutes, seconds };
}

app.get("/", async (req, res) => {
  const data = await getMotos();
  res.json({ data: data });
});

app.post("/create", async (req, res) => {
  const newData = req.body;
  await createMoto(newData);
  res.json({ message: "Data created successfully!", data: newData });
});

app.post("/update", async (req, res) => {
  const placa = req.body.placa;
  const data = await updateMoto(req.body);
  res.json({ message: "Data updated successfully!", data: data });
});

app.post("/delete", (req, res) => {
  const placa = req.body.placa;
  data.forEach((elem, index) => {
    if (elem.placa === placa) {
      data.splice(index, 1);
    }
  }); // Replace with database insert operation if using a database
  res.json({ message: "Data deleted successfully!", data: data });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
