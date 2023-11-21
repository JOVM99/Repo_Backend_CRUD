const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
  user: "root",
  password: "Bhg5-A6C5-cHDg4DfB3FHFcFcG5HDD44",
  host: "viaduct.proxy.rlwy.net",
  database: "railway",
  port: "46577",
});

// Rutas para gestionar clientes

// Obtener todos los clientes
app.get("/clientes", async (req, res) => {
  const dataResponse = { message: "", data: null };
  try {
    const [customers] = await db.query("SELECT * FROM clientes");
    dataResponse.message = "Clientes Obtenidos";
    dataResponse.data = customers;
    return res.status(200).send(dataResponse);
  } catch (error) {
    dataResponse.message = "Error en la consulta";
    dataResponse.data = error;
    return res.status(500).send(dataResponse);
  }
});

// Insertar un nuevo cliente
app.post("/clientes", async (req, res) => {
  const dataResponse = { message: "", data: null };
  const cliente = req.body;
  const c = {
    nombre: cliente.name,
    direccion: cliente.address,
    telefono: cliente.phone,
    correo: cliente.email,
  };
  //cliente.fecha_creacion = new Date().toISOString().slice(0, 10);
  //cliente.fecha_actualizacion = cliente.fecha_creacion;
  try {
    await db.query("INSERT INTO clientes SET ?", c);
    dataResponse.message = "Cliente Registrado";
    return res.status(200).send(dataResponse);
  } catch (error) {
    dataResponse.message = "No se pudo registrar el cliente";
    dataResponse.data = error;
    return res.status(500).send(dataResponse);
  }
});

// Actualizar un cliente
app.put("/clientes/:id", async (req, res) => {
  const dataResponse = { message: "", data: null };
  const id = req.params.id;
  const cliente = req.body;
  const c = {
    nombre: cliente.name,
    direccion: cliente.address,
    telefono: cliente.phone,
    correo: cliente.email,
  };

  try {
    await db.query("UPDATE clientes SET ? WHERE id = ?", [c, id]);
    dataResponse.message = "Cliente Actualizado";
    return res.status(200).send(dataResponse);
  } catch (error) {
    dataResponse.message = "No se pudo actualizar el cliente";
    dataResponse.data = error;
    return res.status(500).send(dataResponse);
  }
});

// Eliminar un cliente
app.delete("/clientes/:id", async (req, res) => {
  const dataResponse = { message: "", data: null };
  const id = req.params.id;
  try {
    await db.query("DELETE FROM clientes WHERE id = ?", id);
    dataResponse.message = "Cliente Eliminado";
    return res.status(200).send(dataResponse);
  } catch (error) {
    dataResponse.message = "No se pudo eliminar el cliente";
    dataResponse.data = error;
    return res.status(500).send(dataResponse);
  }
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
