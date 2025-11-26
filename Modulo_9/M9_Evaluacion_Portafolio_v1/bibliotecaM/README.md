# Biblioteca (API + Vistas)

Proyecto de ejemplo para la evaluación: sistema de Biblioteca usando JSON + opción futura PostgreSQL.

## Características
- Registro de usuarios (almacenados en JSON)
- Login con JWT
- Listar libros (vistas HBS)
- Comprar libros (requiere JWT) - ruta: POST /libros/:id/comprar
- Validación de stock (no se permite venta si no hay stock suficiente)
- Vistas con Bootstrap

## Ejecutar
1. `npm install`
2. `npm run dev` (o `npm start`)
3. Abrir `http://localhost:3000/`

## Estructura
```
/src
  app.js
  routes/
  controllers/
  models/
  middlewares/
  views/
public/
package.json
```

## Nota
Los usuarios y libros se almacenan en `src/models/usuarios.json` y `src/models/libros.json` respectivamente.
El JWT se firma con la clave `SECRET_KEY` en el ejemplo; en producción usar variable de entorno.
