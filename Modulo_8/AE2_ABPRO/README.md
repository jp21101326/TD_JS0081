# M8_AE2_ABPRO-Ejercicio grupal( SALA 2) - Servidor REST de Producto
## Descripción general

Este proyecto implementa un **servidor REST funcional** usando **Node.js** y **Express**, cumpliendo con todas las partes del ejercicio grupal solicitadas:

1. Creación y configuración del servidor.
2. Rutas REST para CRUD de productos.
3. Manejo de parámetros (`req.params`, `req.query`, `req.body`).
4. Códigos de estado HTTP apropiados.
5. Simulación de errores controlados.
6. Documentación de buenas prácticas y respuestas.

Todo el código se encuentra en **un solo archivo (`server.js`)**, sin separación en módulos, para mantener la simplicidad según las instrucciones.

---

## Instalación y ejecución

1. **Inicializa el proyecto**
   ```bash
   npm init -y
   ```

2. **Instala Express**
   ```bash
   npm install express
   ```

3. **Ejecuta el servidor**
   ```bash
   node server.js
   ```

4. El servidor estará disponible en:
   ```
   http://localhost:3000
   ```

---

## Estructura del proyecto

    ├── controllers/
    │   └── productos.controllers.js
    ├── models/
    │   └── productos.models.js
    ├── routes/
    │   └── productosRoutes.js
    ├── db/
    │   └── productos.json
    ├── server.js
    └── README.md

------------------------------------------------------------------------

## Endpoints principales

### 1. GET --- Obtener recursos

**a) Obtener todos los productos**

``` bash
GET /api/v1/productos
```
**Respuesta:**
``` json
{
  "mensaje": "Lista de productos obtenida correctamente",
  "productos": [
    { "id": 1, "nombre": "Mouse", "precio": 15, "stock": 10 },
    { "id": 2, "nombre": "Teclado", "precio": 25, "stock": 5 }
  ]
}
```

**b) Obtener producto por ID**
``` bash
GET /api/v1/productos/1
```

**Respuesta:**
``` json
{
  "mensaje": "Producto con ID 1 encontrado",
  "producto": { "id": 1, "nombre": "Mouse", "precio": 15, "stock": 10 }
}
```

### 2. POST --- Crear un nuevo producto

``` bash
POST /api/v1/productos
Content-Type: application/json

{
  "nombre": "Monitor",
  "precio": 120,
  "stock": 7
}
```

**Respuesta (201 Created):**

``` json
{
  "mensaje": "Producto creado exitosamente",
  "producto": {
    "id": 3,
    "nombre": "Monitor",
    "precio": 120,
    "stock": 7
  }
}
```

### 3. PUT --- Actualizar un producto existente

``` bash
PUT /api/v1/productos/1
Content-Type: application/json

{
  "precio": 20,
  "stock": 12
}
```

**Respuesta (200 OK):**

``` json
{
  "mensaje": "Producto con ID 1 actualizado correctamente",
  "producto": {
    "id": 1,
    "nombre": "Mouse",
    "precio": 20,
    "stock": 12
  }
}
```

### 4. DELETE --- Eliminar un producto

``` bash
DELETE /api/v1/productos/2
```

**Respuesta (200 OK):**

``` json
{
  "mensaje": "Producto con ID 2 eliminado correctamente"
}
```

Si el producto no existe:
``` json
{
  "error": "Producto no encontrado para eliminar"
}
```


## Parámetros y procesamiento

### Parámetros por URL

``` bash
GET /api/v1/productos/parametros/electronica/logitech
```

**Respuesta:**

``` json
{
  "mensaje": "Parámetros recibidos por URL",
  "categoria": "electronica",
  "marca": "logitech"
}
```

### Parámetros por query string

``` bash
GET /api/v1/productos/busqueda?nombre=monitor&maxPrecio=200
```

**Respuesta:**

``` json
{
  "mensaje": "Parámetros recibidos por query string",
  "nombre": "monitor",
  "maxPrecio": "200"
}
```

### Parámetros por cuerpo (body)

``` bash
POST /api/v1/productos/ver-body
Content-Type: application/json

{
  "codigo": 123,
  "descripcion": "Ejemplo de producto enviado por body"
}
```

**Respuesta:**

``` json
{
  "mensaje": "Datos recibidos por el cuerpo de la petición",
  "datos": {
    "codigo": 123,
    "descripcion": "Ejemplo de producto enviado por body"
  }
}
```

---

## Códigos de estado utilizados

| Código  | Significado           | Uso en el proyecto                             |
|---------|-----------------------|------------------------------------------------|
| **200** | OK                    | Respuestas exitosas en `GET`, `PUT`, `DELETE`. |
| **201** | Created               | Cuando se crea un nuevo producto.              |
| **400** | Bad Request           | Datos inválidos (por ejemplo, nombre vacío).   |
| **404** | Not Found             | Producto o ruta inexistente.                   |
| **500** | Internal Server Error | Error simulado o fallo interno.                |

---

## Rangos de códigos HTTP

| Rango   | Tipo                 | Descripción                                                         |
|---------|----------------------|---------------------------------------------------------------------|
| **1xx** | Informativos         | Comunicación entre cliente y servidor (raro de usar).               |
| **2xx** | Éxito                | La solicitud fue procesada correctamente.                           |
| **3xx** | Redirecciones        | El cliente debe realizar una acción adicional.                      |
| **4xx** | Errores del cliente  | Problemas en la solicitud (datos inválidos, recurso no encontrado). |
| **5xx** | Errores del servidor | Fallos internos o imprevistos en el servidor.                       |

---

##  Preguntas del ejercicio

### 1️⃣ ¿En qué casos se utiliza cada tipo de petición HTTP?
- **GET:** Para obtener información o recursos del servidor.  
- **POST:** Para crear un nuevo recurso en el servidor.  
- **PUT:** Para modificar un recurso existente.  
- **DELETE:** Para eliminar un recurso existente.

---

### 2️⃣ ¿Cómo debe estructurarse un endpoint según la operación?
Debe seguir el principio RESTful: usar **sustantivos en plural** y no verbos.  
Ejemplos:
- `GET /productos` → obtener todos.  
- `POST /productos` → crear uno nuevo.  
- `PUT /productos/:id` → actualizar por ID.  
- `DELETE /productos/:id` → eliminar por ID.

---

### 3️⃣ ¿Cuál fue el mayor reto en la creación de este servidor?
El mayor desafío fue **asegurar un manejo correcto de los parámetros y los códigos HTTP**, garantizando respuestas coherentes en formato JSON y simulando errores de forma controlada.  
También fue importante estructurar las validaciones para evitar datos incompletos o inconsistentes.

