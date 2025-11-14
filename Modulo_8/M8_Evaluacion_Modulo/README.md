# M8 Evaluación del módulo

## Descripción general
Proyecto de evaluación del módulo que implementa una **API REST con Node.js y Express**. Permite:
- Registro y login de usuarios con autenticación JWT.
- Subida, listado y eliminación de archivos (imágenes).
- Protección de rutas mediante middleware de autenticación JWT.

---

## Dependencias principales
| Paquete                  | Descripción                               |
|--------------------------|-------------------------------------------|
| **express**              | Framework para crear el servidor API REST |
| **express-fileupload**   | Middleware para manejo de archivos        |
| **jsonwebtoken**         | Generar y validar tokens JWT              |
| **bcryptjs**             | Hash y comparación de contraseñas         |
| **dotenv**               | Manejo de variables de entorno            |
| **fs / path**            | Utilidades para archivos del sistema      |
| **nodemon** *(opcional)* | Recarga automática en desarrollo          |

---

## Estructura del proyecto
```
/M8_User_Files
│
├── server.js                 # Archivo principal del servidor
├── .env                      # Variables de entorno
├── package.json
│
├── /controllers              # Lógica de negocio
│     ├── users.controller.js
│     └── files.controller.js
│
├── /routes                   # Definición de rutas
│     ├── users.routes.js
│     └── files.routes.js
│
├── /middleware               # Middlewares personalizados
│     └── auth.js             # Validación JWT
│
├── /models                   # “Base de datos” y modelos
│     └── users.model.js
│
├── /db                       # Archivos JSON con datos persistidos
│     └── users.json
│
├── /uploads                  # Carpeta donde se guardan los archivos subidos
│
└── README.md                 # Documento del proyecto
```

---

## Instalación y configuración
1. Clonar o copiar este proyecto.
2. Ejecutar en la raíz:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` con las siguientes variables:
   ```
   PORT=3000
   SECRET_KEY=una_clave_muy_segura
   ```
4. Iniciar el servidor:
   ```bash
   npm start
   ```
   El servidor estará disponible en `http://localhost:3000`.

---

## Endpoints principales

### Autenticación
| Método | Ruta                | Descripción                                                 |
|--------|---------------------|-------------------------------------------------------------|
| POST   | /api/users/register | Registra un nuevo usuario y devuelve un token JWT           |
| POST   | /api/users/login    | Inicia sesión y devuelve un token JWT                       |
| GET    | /api/users/me       | Devuelve el perfil del usuario autenticado (requiere token) |

### Archivos
| Método | Ruta                 | Descripción                                 |
|--------|----------------------|---------------------------------------------|
| POST   | /api/files/upload    | Sube un archivo (requiere token)            |
| GET    | /api/files/          | Lista los archivos subidos (requiere token) |
| DELETE | /api/files/:filename | Elimina un archivo (requiere token)         |

---

## Ejemplos en Postman

### 1. Registro
**POST** `http://localhost:3000/api/users/register`
```json
{
  "username": "juan",
  "password": "1234",
  "role": "admin"
}
```

**Respuesta:**
```json
{
  "message": "Usuario registrado",
  "user": { "id": 1, "username": "juan", "role": "admin" },
  "token": "<JWT_TOKEN>"
}
```

### 2. Login
**POST** `http://localhost:3000/api/users/login`
```json
{
  "username": "juan",
  "password": "1234"
}
```
**Respuesta:**
```json
{ "message": "Login exitoso", "token": "<JWT_TOKEN>" }
```

### 3. Subida de archivo
**POST** `http://localhost:3000/api/files/upload`
Header:
```
Authorization: Bearer <JWT_TOKEN>
```
Body tipo *form-data*:
```
key: file | value: <seleccionar archivo>
```
**Respuesta:**
```json
{
  "message": "Archivos subidos",
  "files": [
    { "originalName": "foto.jpg", "url": "/uploads/172858-foto.jpg" }
  ]
}
```

### 4. Listar archivos
**GET** `http://localhost:3000/api/files/`  
Header:
```
Authorization: Bearer <JWT_TOKEN>
```
**Respuesta:**
```json
[ { "name": "172858-foto.jpg", "url": "/uploads/172858-foto.jpg", "size": 20244 } ]
```

### 5. Eliminar archivo
**DELETE** `http://localhost:3000/api/files/172858-foto.jpg`  
Header:
```
Authorization: Bearer <JWT_TOKEN>
```

**Respuesta:** `204 No Content`

---

## Capturas sugeridas para el informe o entrega
1. Registro y login en Postman mostrando el token JWT.
2. Subida de imagen y respuesta con URL.
3. Listado de archivos con GET.
4. Intento de acceso a ruta protegida sin token (error 401).
5. Eliminación exitosa (204).

---

## Buenas prácticas aplicadas
- Uso de códigos HTTP adecuados (200, 201, 400, 401, 404, 500).
- Separación modular (rutas, controladores, middleware, modelos).
- Hash de contraseñas con bcryptjs.
- Protección de rutas con middleware JWT.
- Validación de extensiones y tamaños en uploads.
- Ejemplo claro y ejecutable para estudiantes.


## M8_Evaluación del módulo [Actividad Evaluada]