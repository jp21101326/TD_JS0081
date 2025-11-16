# M8 – Evaluación de Portafolio

## API de Gestión de Perfiles de Usuario
Servicio web desarrollado en **Node.js + Express**, que permite administrar usuarios, autenticación con JWT y carga de imágenes de perfil.

Incluye:
- Registro e inicio de sesión
- Tokens JWT y Refresh Tokens
- CRUD de usuarios
- Subida de imagen de perfil
- Control de permisos por rol (user/admin)
- Almacenamiento de datos en JSON local
- Validaciones completas de entrada
- Manejo de errores y límites de carga (5 MB)

---

## Estructura del Proyecto
```
M8_EVALUACION_PORTAFOLIO/
│
├── server.js
├── .env
├── package.json
│
├── controllers/
│   ├── auth.controller.js
│   └── usuarios.controller.js
│
├── routes/
│   ├── auth.routes.js
│   └── usuarios.routes.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   └── users.model.js
│
├── db/
│   └── users.json
│
└── uploads/   (se genera automáticamente)
```

---

## Instalación
1. Dependencias principales:
```bash
npm install express express-fileupload bcryptjs jsonwebtoken
```

2. Dependencias de desarrollo
```bash
npm install --save-dev nodemon
```

3. Crear archivo **.env** (variables de entorno):
```bash
SECRET_KEY=miclaveultrasecreta123
TOKEN_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
PORT=3000
```

4. Ejecutar el servidor:
```bash
node server.js
```

Servidor disponible en:
```bash
http://localhost:3000
```

---

# Autenticación (Rutas /api/auth)

## 1. Registro de usuario
### **POST /api/auth/register**
#### Body ejemplo:
```json
{
  "username": "juan",
  "password": "123456"
}
```
#### Respuesta:
```json
{
  "message": "Usuario registrado",
  "user": {
    "id": 1,
    "username": "juan",
    "role": "user",
    "profile": {
      "nombre": "",
      "bio": "",
      "avatar": null
    },
    "refreshToken": null
  }
}
```

---

## 2. Login
### **POST /api/auth/login**
```json
{
  "username": "juan",
  "password": "123456"
}
```
Respuesta:
```json
{
  "message": "Login exitoso",
  "token": "<JWT>",
  "refreshToken": "<REFRESH>"
}
```

---

## 3. Refresh Token
### **POST /api/auth/refresh**
```json
{
  "refreshToken": "<REFRESH>"
}
```
Respuesta:
```json
{
  "token": "<NEW_JWT>"
}
```

---

## 4. Logout
### **POST /api/auth/logout**
```json
{
  "refreshToken": "<REFRESH>"
}
```
Respuesta:
```json
{
  "message": "Logout correcto"
}
```

---

# Gestión de Usuarios (Rutas /api/usuarios)

## Requiere Token JWT en Header
```
Authorization: Bearer <token>
```

---

## 1. Crear Usuario (no requiere token)
### **POST /api/usuarios**
```json
{
  "username": "pedro",
  "password": "987654"
}
```
Respuesta:
```json
{
    "message": "Usuario creado",
    "user": {
        "id": 3,
        "username": "pedro",
        "role": "user",
        "profile": {
            "nombre": "",
            "bio": "",
            "avatar": null
        },
        "refreshToken": null
    }
}
```

---

## 2. Obtener Usuario por ID
### **GET /api/usuarios/:id**
Requiere token y permisos:
- el usuario dueño del perfil
- o un administrador

Ejemplo:
```
GET /api/usuarios/1
Authorization: Bearer <token>
```
Respuesta:
```json
{
  "id": 1,
  "username": "juan",
  "role": "user",
  "profile": {
    "nombre": "",
    "bio": "",
    "avatar": null
  }
}
```

---

## 3. Actualizar Usuario
### **PUT /api/usuarios/:id**
Ejemplo:
```json
{
  "username": "juanito",
  "profile": {
    "nombre": "Juan Pérez",
    "bio": "Desarrollador web"
  }
}
```
Respuesta:
```json
{
    "message": "Usuario actualizado",
    "user": {
        "id": 1,
        "username": "juanito",
        "role": "user",
        "profile": {
            "nombre": "Juan Pérez",
            "bio": "Desarrollador web"
        },
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYzMjYwNDUyLCJleHAiOjE3NjM4NjUyNTJ9.QOQsFD3weebSklssd26AtwQ6YoFDUxK0HyZQ1upG_yQ"
    }
}
```

---

## 4. Eliminar Usuario
### **DELETE /api/usuarios/:id**
Respuesta:
```
204 No Content
```
Si tenía avatar, también se borra del servidor.

---

# Subir Imagen de Perfil
### **POST /api/usuarios/:id/imagen**
Formato **multipart/form-data**:
```
imagen: <archivo>
```
Ejemplo con cURL:
```bash
curl -X POST http://localhost:3000/api/usuarios/1/imagen \
  -H "Authorization: Bearer <token>" \
  -F "imagen=@foto.png"
```
Respuesta:
```json
{
  "message": "Imagen subida",
  "avatar": "/uploads/1700000000000-foto.png",
   "user": {
        "id": 1,
        "username": "juanito",
        "role": "user",
        "profile": {
            "nombre": "Juan Pérez",
            "bio": "Desarrollador web",
            "avatar": "/uploads/1763260834294-sql_error.JPG"
        },
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYzMjYwNDUyLCJleHAiOjE3NjM4NjUyNTJ9.QOQsFD3weebSklssd26AtwQ6YoFDUxK0HyZQ1upG_yQ"
    }
}
```
La imagen queda accesible públicamente:
```
http://localhost:3000/uploads/archivo.png
```

---

# Seguridad Implementada
- JWT + Refresh Token
- Verificación de permisos por ID y rol
- Hash de contraseñas con bcrypt
- Validación de tamaños y extensiones permitidas
- Manejo de errores centralizado

---

#  Pruebas recomendadas
1. Registrar usuario
2. Loguear y obtener token
3. Crear otro usuario
4. Intentar acceder a datos de otro usuario (debe fallar)
5. Subir imagen de perfil
6. Actualizar usuario propio
7. Probar refresh token
8. Eliminar usuario
