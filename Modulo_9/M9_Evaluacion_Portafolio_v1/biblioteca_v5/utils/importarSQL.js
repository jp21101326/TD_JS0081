import sql from "mssql";
import { getUsuarios } from "../models/user.model.js";
import { getLibros } from "../models/book.model.js";

const config = {
  user: "sa",
  password: "TuPassword123",
  database: "Libreria",
  server: "localhost",
  options: { trustServerCertificate: true }
};

export async function importarDatos() {
  try {
    const pool = await sql.connect(config);

    const usuarios = getUsuarios();
    const libros = getLibros();

    for (let u of usuarios) {
      await pool.request()
        .input("id", sql.Int, u.id)
        .input("username", sql.VarChar, u.username)
        .query("INSERT INTO Usuarios (id, username) VALUES (@id, @username)");
    }

    for (let l of libros) {
      await pool.request()
        .input("id", sql.Int, l.id)
        .input("nombre", sql.VarChar, l.nombre)
        .input("cantidad", sql.Int, l.cantidad_disponible)
        .query("INSERT INTO Libros (id, nombre, cantidad) VALUES (@id, @nombre, @cantidad)");
    }

    console.log("Datos importados correctamente");
  } catch (err) {
    console.error("Error importando:", err);
  }
}
