# Proyecto M8_AE4 – Autenticación con JSON Web Token (JWT)

Este proyecto implementa un sistema de **autenticación con JWT** utilizando **Node.js, Express y body-parser**, siguiendo el estilo del **profesor** y cumpliendo con todos los requerimientos del ejercicio **M8_AE4_ABP – Ejercicio Individual**.

## Objetivo
Aprender a generar, firmar y verificar tokens JWT para autenticar usuarios y proteger rutas en una API REST.

## Dependencias
Instalar con:
```bash
npm install express jsonwebtoken body-parser bcryptjs
```

## Estructura del proyecto
```
M8_AE4_ABP/
├─ package.json
└─ server.js
```

## Ejecución
Ejecutar el servidor:
```bash
node server.js
```
El servidor se ejecutará en:  
 [http://localhost:3000](http://localhost:3000)

## Endpoints principales

### Registro de usuario
**POST** `/register`
```json
{
  "email": "usuario@example.com",
  "password": "1234",
  "role": "user"
}
```

### Inicio de sesión
**POST** `/login`
```json
{
  "email": "usuario@example.com",
  "password": "1234"
}
```

### Ruta protegida
**GET** `/profile`
Header requerido:
```
Authorization: Bearer <TOKEN>
```

### Ruta solo administradores
**GET** `/admin`
Header requerido:
```
Authorization: Bearer <TOKEN_ADMIN>
```

## Manejo de errores
| Código | Causa                            | Mensaje                           |
|--------|----------------------------------|-----------------------------------|
| 400    | Campos faltantes                 | Email y password son obligatorios |
| 401    | Token o credenciales incorrectos | Token inválido o expirado         |
| 403    | Falta de privilegios             | Solo administradores              |
| 500    | Error interno                    | Error interno del servidor        |

## Pruebas con Postman
1. **POST /register** → Registrar usuario.  
2. **POST /login** → Iniciar sesión y obtener token.  
3. **GET /profile** → Acceso protegido con token.  
4. **GET /admin** → Acceso solo con rol “admin”.


