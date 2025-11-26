# 📚 Sistema de Biblioteca de Libros

Sistema completo de gestión de biblioteca con autenticación JWT, construido con Node.js, Express y Bootstrap.

## 🚀 Características

- ✅ Registro e inicio de sesión de usuarios con JWT
- ✅ Catálogo de libros con información detallada
- ✅ Sistema de compra con validación de stock
- ✅ Protección de rutas con middleware de autenticación
- ✅ Interfaz moderna con Bootstrap 5
- ✅ Soporte para JSON y PostgreSQL
- ✅ Panel de administrador
- ✅ Validaciones completas
- ✅ Mensajes informativos al usuario

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express
- **Autenticación:** JSON Web Token (JWT)
- **Base de datos:** JSON / PostgreSQL
- **Vistas:** Handlebars (HBS)
- **Frontend:** Bootstrap 5, JavaScript
- **Seguridad:** bcryptjs

## 📁 Estructura del Proyecto

```
biblioteca-libros/
│
├── config/
│   ├── database.js          # Configuración de PostgreSQL
│   └── jwt.js               # Configuración JWT
│
├── controllers/
│   ├── authController.js    # Lógica de autenticación
│   └── librosController.js  # Lógica de libros
│
├── models/
│   ├── Usuario.js           # Modelo de Usuario
│   └── Libro.js             # Modelo de Libro
│
├── routes/
│   ├── authRoutes.js        # Rutas de autenticación
│   └── librosRoutes.js      # Rutas de libros
│
├── middleware/
│   └── authMiddleware.js    # Middleware JWT
│
├── views/
│   ├── layouts/
│   │   └── main.hbs         # Layout principal
│   ├── home.hbs             # Página de inicio
│   ├── register.hbs         # Registro
│   ├── login.hbs            # Inicio de sesión
│   ├── libros.hbs           # Catálogo
│   └── admin.hbs            # Panel admin
│
├── data/
│   ├── libros.json          # Datos de libros
│   └── usuarios.json        # Datos de usuarios
│
├── .env                     # Variables de entorno
├── index.js                 # Archivo principal
├── package.json
└── README.md
```

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd biblioteca-libros
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_clave_secreta_muy_segura
STORAGE_MODE=json

# Solo si usas PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=biblioteca
DB_USER=postgres
DB_PASSWORD=tu_password
```

### 4. (Opcional) Configurar PostgreSQL

Si deseas usar PostgreSQL en lugar de JSON:

```sql
CREATE DATABASE biblioteca;
```

Cambiar en `.env`:
```env
STORAGE_MODE=postgres
```

Las tablas se crearán automáticamente al iniciar el servidor.

### 5. Iniciar el servidor

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 🔐 API Endpoints

### Autenticación

#### Registrar Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "usuario123",
  "password": "contraseña123"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": 1,
    "username": "usuario123",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Iniciar Sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "usuario123",
  "password": "contraseña123"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "usuario123"
    }
  }
}
```

### Libros

#### Listar todos los libros (Público)
```http
GET /api/libros
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Cien Años de Soledad",
      "autor": "Gabriel García Márquez",
      "precio": 15000,
      "cantidad_disponible": 10
    }
  ],
  "count": 5
}
```

#### Obtener libro por ID (Público)
```http
GET /api/libros/:id
```

#### Comprar libro (Requiere autenticación)
```http
POST /api/libros/:id/comprar
Authorization: Bearer <token>
Content-Type: application/json

{
  "cantidad": 2
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Compra realizada exitosamente. 2 unidad(es) de \"Cien Años de Soledad\"",
  "data": {
    "libro": "Cien Años de Soledad",
    "cantidad_comprada": 2,
    "cantidad_restante": 8,
    "total": 30000,
    "comprador": "usuario123"
  }
}
```

**Respuesta con error (stock insuficiente):**
```json
{
  "success": false,
  "message": "Stock insuficiente. Solo hay 3 unidades disponibles"
}
```

#### Importar JSON a PostgreSQL (Admin)
```http
POST /api/libros/admin/import-json
Authorization: Bearer <token>
```

## 🖥️ Vistas Disponibles

### Páginas Web

1. **Inicio** - `http://localhost:3000/`
2. **Registro** - `http://localhost:3000/register-page`
3. **Login** - `http://localhost:3000/login-page`
4. **Catálogo** - `http://localhost:3000/libros-page`
5. **Admin** - `http://localhost:3000/admin-page`

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación mediante JWT
- Validación de datos en el servidor
- Protección de rutas sensibles
- Tokens con expiración de 24 horas

## 📝 Validaciones

### Registro de Usuario
- Username requerido
- Password mínimo 6 caracteres
- Username único (no se permiten duplicados)

### Compra de Libros
- Usuario debe estar autenticado
- Cantidad debe ser mayor a 0
- Cantidad debe ser un número entero
- Stock debe ser suficiente
- Libro debe existir

## 🎨 Características de la Interfaz

- Diseño moderno y responsivo
- Mensajes de éxito/error claros
- Indicadores de stock
- Cálculo automático de totales
- Validación en tiempo real
- Experiencia de usuario intuitiva

## 🔄 Flujo de Uso

1. **Usuario se registra** en `/register-page`
2. **Inicia sesión** en `/login-page` y recibe un token JWT
3. **Explora el catálogo** en `/libros-page`
4. **Selecciona un libro** y hace clic en "Comprar"
5. **Especifica la cantidad** deseada
6. **Confirma la compra** si hay stock disponible
7. **El sistema descuenta** del inventario y muestra confirmación

## 🐛 Manejo de Errores

El sistema maneja todos los errores comunes:

- Usuario ya existe
- Credenciales inválidas
- Token expirado o inválido
- Stock insuficiente
- Libro no encontrado
- Cantidad inválida
- Errores de base de datos

## 📊 Modo de Almacenamiento

### JSON (Por defecto)
- Los datos se guardan en archivos JSON
- Ideal para desarrollo y pruebas
- No requiere configuración adicional
- Datos en `/data/libros.json` y `/data/usuarios.json`

### PostgreSQL
- Base de datos robusta para producción
- Transacciones para compras seguras
- Mejor rendimiento con muchos datos
- Requiere configuración en `.env`

### Cambiar entre modos

En el archivo `.env`:
```env
STORAGE_MODE=json    # Para usar JSON
STORAGE_MODE=postgres # Para usar PostgreSQL
```

## 🧪 Probar la API

### Con cURL

**Registrar usuario:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

**Iniciar sesión:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

**Listar libros:**
```bash
curl http://localhost:3000/api/libros
```

**Comprar libro:**
```bash
curl -X POST http://localhost:3000/api/libros/1/comprar \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{"cantidad":1}'
```

### Con Postman/Insomnia

Importa las siguientes colecciones para probar todos los endpoints.

## 📦 Despliegue

### Preparar para producción

1. Cambiar `NODE_ENV` a `production`
2. Usar una clave JWT segura y única
3. Configurar PostgreSQL en producción
4. Configurar variables de entorno seguras

### Plataformas recomendadas

- **Railway**
- **Render**
- **Heroku**
- **DigitalOcean**
- **AWS**

## 🤝 Contribuir

Este proyecto fue desarrollado como parte de un portafolio académico. ¡Las sugerencias son bienvenidas!

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia ISC.

## 👨‍💻 Autor

Desarrollado para evaluación de portafolio.

## 📞 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la documentación
2. Verifica las variables de entorno
3. Consulta los logs del servidor
4. Abre un issue en el repositorio

---

¡Gracias por usar el Sistema de Biblioteca de Libros! 📚✨