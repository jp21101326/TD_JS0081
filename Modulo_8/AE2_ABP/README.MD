# Servidor REST con Express

## Descripción
Este proyecto crea un **servidor REST básico** utilizando **Node.js** y **Express**, cumpliendo con los requerimientos del ejercicio individual del módulo.

Incluye rutas, manejo de parámetros, validaciones, respuestas JSON y códigos de estado HTTP personalizados.

---

## Requisitos previos
- Tener instalado **Node.js** (v14 o superior)
- Tener acceso a una terminal o consola

---

## Instalación y ejecución

```bash
# 1. Inicializar proyecto e instalar dependencias
npm init -y
npm install express

# 2. (Opcional) instalar nodemon para desarrollo
npm install --save-dev nodemon

# 4. Ejecutar el servidor
npm run start
# o con nodemon
npm run dev
```

---

## Estructura del proyecto

```
M8_AE2-express/
├─ server.js
├─ package.json
├─ DB/
│  └─ usuarios.json
├─ models/
│  └─ usuario.model.js
├─ controllers/
│  └─ usuarios.controller.js
├─ routes/
│  └─ usuarios.routes.js
```

---

## Funcionalidades principales

### Parte 1: Rutas básicas REST

| Método     | Ruta             | Descripción                           | Código esperado |
|------------|------------------|---------------------------------------|-----------------|
| **GET**    | `/saludo`        | Retorna un saludo en formato JSON     | 200             |
| **POST**   | `/usuario`       | Crea un usuario y confirma creación   | 201             |
| **PUT**    | `/usuario/:id`   | Actualiza un usuario existente        | 200             |
| **DELETE** | `/usuario/:id`   | Elimina un usuario existente          | 200             |

---

### Parte 2: Parámetros y JSON

| Ruta                        | Ejemplo                   | Descripción                                   |
|-----------------------------|---------------------------|-----------------------------------------------|
| `/parametros/:nombre/:edad` | `/parametros/Juan/25`     | Usa `req.params`                              |
| `/busqueda?busqueda=node`   | `/busqueda?busqueda=node` | Usa `req.query`                               |
| `POST /usuario`             | JSON en body              | Usa `req.body` procesado con `express.json()` |

---

### Parte 3: Códigos de respuesta y validaciones

El servidor devuelve distintos **códigos HTTP** según la situación:

| Código  | Situación                                               |
|---------|---------------------------------------------------------|
| **200** | Petición exitosa                                        |
| **201** | Creación exitosa                                        |
| **204** | Eliminación sin contenido                               |
| **400** | Validación fallida (por ejemplo, nombre vacío)          |
| **404** | Recurso no encontrado                                   |
| **500** | Error interno del servidor                              |
| **418** | Ejemplo de código personalizado (`nombre === 'test'`)   |

---

## Ejemplos con `curl`

```bash
# GET /saludo
curl -i http://localhost:3000/saludo

# POST /usuario
curl -i -X POST http://localhost:3000/usuario -H "Content-Type: application/json" -d '{"nombre":"María","email":"maria@example.com"}'

# PUT /usuario/:id
curl -i -X PUT http://localhost:3000/usuario/1 -H "Content-Type: application/json" -d '{"nombre":"María Actualizada"}'

# DELETE /usuario/:id
curl -i -X DELETE http://localhost:3000/usuario/1

# Parámetros
curl -i http://localhost:3000/parametros/Juan/25

# Query string
curl -i "http://localhost:3000/busqueda?busqueda=node"
```

---

## Ejemplo de código personalizado

Dentro de `controllers/usuarios.controller.js` se devuelve un **código HTTP 418** si el usuario intenta registrarse con el nombre `"test"`:

```js
if (nombre.toLowerCase() === 'test') {
  return res.status(418).json({ error: 'No se permite el nombre "test" (código personalizado 418)' });
}
```

---

## Resultado final

Un servidor Express completamente funcional que:
- Escucha en el puerto 3000
- Retorna respuestas JSON
- Usa distintos métodos HTTP
- Maneja parámetros `params`, `query` y `body`
- Devuelve códigos de estado correctos y personalizados

---


