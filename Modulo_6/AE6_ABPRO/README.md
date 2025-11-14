# Cine CLI

Aplicación de línea de comandos para simular compra de boletos de cine.

## Requisitos
- Node.js 18+
- npm

## Instalación
```bash
npm install
```

## Uso
```bash
node app.js --pelicula="Interestelar" --horario="19:00" --boletos=2
node app.js -p "Dune" -h "21:30" -b 3
```

## Desarrollo con nodemon
```bash
npm run dev -- --pelicula="El viaje de Chihiro" --horario="20:15" --boletos=1
```

## Colores
- Verde: éxito
- Rojo: errores
- Amarillo: advertencias

## Validaciones
- Todos los parámetros son obligatorios.
- La película y el horario deben existir en `data/funciones.json`.
- `--boletos` debe ser entero positivo.