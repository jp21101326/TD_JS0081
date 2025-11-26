
# Biblioteca Mejorada

Estructura y funcionalidades:
- Login que guarda token en sesión (req.session.token)
- Carrito basado en sesión (agregar, ver, checkout)
- Endpoints API para usar con Postman (/api/libros, /api/login...)
- Panel admin con resumen y CRUD de libros

Instrucciones rápidas:
1. Copia .env variables JWT_SECRET and SESSION_SECRET or export env vars.
2. Instala dependencias: `npm install`
3. Ejecuta: `npm run dev` (requiere nodemon) o `npm start`
4. Abre: http://localhost:3000/libros

Nota: la contraseña del admin del seed está encriptada como placeholder. Registra un usuario admin o actualiza usuarios.json.
