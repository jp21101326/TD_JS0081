# Conversor de Temperaturas - Node.js CLI

## Descripción

Esta es una aplicación de línea de comandos desarrollada en **Node.js** que permite convertir temperaturas entre **Celsius** y **Fahrenheit**.
Incluye validaciones de los parámetros ingresados, mensajes de error y advertencia coloreados en consola mediante **Chalk**, y el manejo de argumentos con **Yargs**.

El objetivo de este ejercicio es practicar:

* La lectura de argumentos desde la consola.
* La validación de parámetros.
* El manejo de errores controlados.
* La mejora de la experiencia de desarrollo con mensajes claros y coloridos.

---

## Requisitos

* Node.js (v14 o superior recomendado)
* npm

Paquetes utilizados:

* **yargs** → Para manejo de argumentos CLI.
* **chalk** → Para colorear mensajes en la consola.
* **nodemon** (opcional) → Para reinicio automático durante desarrollo.

---

## Instalación

1. Clonar o descargar el proyecto.
2. Abrir la terminal en la carpeta del proyecto.
3. Instalar dependencias:

```bash
npm install
```

---

## Scripts disponibles

| Comando       | Descripción                                             |
| ------------- | ------------------------------------------------------- |
| `npm start`   | Ejecuta la aplicación con Node.js                       |
| `npm run dev` | Ejecuta la aplicación con Nodemon (reinicio automático) |

---

## Uso

### Argumentos esperados

| Argumento  | Alias | Descripción                                                     | Tipo   | Requerido |
| ---------- | ----- | --------------------------------------------------------------- | ------ | --------- |
| `--temp`   | `-t`  | Valor numérico de la temperatura a convertir                    | number | Sí        |
| `--unidad` | `-u`  | Unidad de la temperatura: `c` para Celsius, `f` para Fahrenheit | string | Sí        |

### Ejemplos de ejecución

1. Convertir de Celsius a Fahrenheit:

```bash
node server.js --temp=100 --unidad=c
```

**Salida en consola (verde):**

```
----------------------------------------------------
Resultado: 100°C equivalen a 212.00°F
----------------------------------------------------
```

2. Convertir de Fahrenheit a Celsius:

```bash
node server.js --temp=212 --unidad=f
```

**Salida en consola (verde):
