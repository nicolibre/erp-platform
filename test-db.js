import { Client } from "pg";

const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "erpuser",
  password: "erp123",
  database: "erpdb",
});

try {
  await client.connect();
  console.log("✅ Conectado");
} catch (e) {
  console.error("Mensaje:", e.message);
  console.error("Código:", e.code);
  console.error(e);
}