const pool = require('../db/pool');

class Tienda {
  // Crear un nuevo cliente
  static async crearCliente(client, nombre, email) {
    const query = `INSERT INTO clientes (nombre, email) VALUES ($1, $2) RETURNING *`;
    const values = [nombre, email];
    const result = await client.query(query, values);
    return result.rows[0];
  }

  // Crear pedido
  static async crearPedido(client, cliente_id, producto_id, cantidad) {
    const query = `INSERT INTO pedidos (cliente_id, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *`;
    const values = [cliente_id, producto_id, cantidad];
    const result = await client.query(query, values);
    return result.rows[0];
  }

  // Actualizar stock
  static async reducirStock(client, producto_id, cantidad) {
    const query = `UPDATE productos 
                   SET stock = stock - $1 
                   WHERE id = $2 AND stock >= $1 
                   RETURNING *`;
    const values = [cantidad, producto_id];
    const result = await client.query(query, values);
    return result.rows[0] || null;
  }

  // Obtener producto
  static async obtenerProducto(client, id) {
    const res = await client.query('SELECT * FROM productos WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  // TRANSACCIÓN PRINCIPAL
  static async realizarCompra(nombreCliente, emailCliente, productoId, cantidad) {
    const client = await pool.connect();

    try {
      console.log('\nIniciando transacción...');
      await client.query('BEGIN');

      // 1. Crear cliente
      const cliente = await Tienda.crearCliente(client, nombreCliente, emailCliente);
      console.log('Cliente creado:', cliente);

      // 2. Verificar producto
      const producto = await Tienda.obtenerProducto(client, productoId);
      if (!producto) throw new Error('Producto inexistente (error intencional)');
      console.log('Producto encontrado:', producto);

      // 3. Validar stock
      if (producto.stock < cantidad) {
        throw new Error(`Stock insuficiente: disponible ${producto.stock}, solicitado ${cantidad}`);
      }

      // 4. Crear pedido
      const pedido = await Tienda.crearPedido(client, cliente.id, productoId, cantidad);
      console.log('Pedido registrado:', pedido);

      // 5. Actualizar stock
      const actualizado = await Tienda.reducirStock(client, productoId, cantidad);
      if (!actualizado) throw new Error('No fue posible actualizar el stock.');

      // 6. Confirmar
      await client.query('COMMIT');
      console.log('Transacción completada con éxito (COMMIT).');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Transacción anulada (ROLLBACK):', error.message);
    } finally {
      client.release();
      console.log('Cliente liberado del pool.');
    }
  }
}

module.exports = Tienda;
