# Módulo 9: Evaluación de Módulo - Portafolio Web Personal 

## 📌 Descripción General
Este proyecto corresponde a la entrega final del **Desarrollo de Portafolio de un Producto Digital**, donde se construyó un portafolio web profesional para presentar mi perfil, habilidades técnicas, proyectos desarrollados, servicios y medios de contacto.

El sitio fue diseñado inicialmente como un prototipo y posteriormente refinado mediante **iteraciones, feedback y procesos de optimización**, logrando un producto final moderno, funcional y claro.

## 🎯 Objetivos del Portafolio
- Mostrar mi experiencia, habilidades técnicas y proyectos desarrollados.  
- Contar con una identidad visual coherente y profesional.  
- Implementar buenas prácticas de estructura, responsividad y accesibilidad.  
- Centralizar mis trabajos y permitir acceso a sus repositorios y demos en línea.

## 🛠️ Tecnologías Utilizadas
- **HTML5**
- **CSS3**
- **Bootstrap 5**
- **JavaScript**
- **FontAwesome Icons**
- **Diseño responsivo con Bootstrap Grid**

## 🚀 Proceso de Creación del Portafolio

### 1️⃣ Boceto y Diseño Inicial
Se crearon los wireframes y estructura base contemplando las secciones:  
Home, Sobre mí, Habilidades, Proyectos, Servicios y Contacto.

### 2️⃣ Desarrollo de la Primera Versión
Se implementó la estructura HTML completa y se integró Bootstrap para garantizar responsividad desde el inicio.

### 3️⃣ Proceso de Feedback y Mejora
Se solicitó retroalimentación externa, recibiendo sugerencias en:

- Jerarquía visual de texto  
- Mejora de imágenes y proporciones  
- Consistencia en colores y estilos  
- Mayor información personal  
- Mejor presentación de proyectos

### 4️⃣ Cambios Aplicados tras Feedback
✔ Rediseño completo de la paleta de colores hacia un estilo light/azul  
✔ Eliminación de elementos visuales saturados  
✔ Reorganización completa del CSS  
✔ Expansión del contenido personal  
✔ Nuevas cards de proyectos con más información  
✔ Uso de iconografía más moderna  
✔ Optimización de imágenes  
✔ Mejor estructura semántica del HTML  
✔ Mejorada la responsividad general

## 🔧 Optimización y Refactorización Técnica

### 🔹 Limpieza del Código
- Reordenamiento de carpetas (`css`, `img`, `js`)  
- Eliminación de estilos antiguos  
- Comentarios claros y estructura definida  

### 🔹 Modal Único Dinámico
Los 3 proyectos comparten un único modal centralizado, cargado dinámicamente a través de JavaScript, reduciendo duplicación de código y mejorando la escalabilidad.

### 🔹 Comportamientos Corregidos
- Evitar que la página subiera al inicio al abrir modales  
- Corrección del doble backdrop de Bootstrap  
- Prevención de eventos duplicados  

## 🚧 Retos Encontrados y Soluciones

### 🟦 Reto 1: Duplicación de modales
**Solución:** creación de modal único con carga dinámica.

### 🟦 Reto 2: Comportamiento de scroll al abrir modal
**Solución:** reemplazo de `href="#"` por `javascript:void(0)` y manejo limpio de eventos.

### 🟦 Reto 3: Backdrop pegado al cerrar modal
**Solución:** evitar llamadas duplicadas a `modal.show()`.

### 🟦 Reto 4: Responsividad en tarjetas de proyectos
**Solución:** ajustes CSS, reorganización de grid y optimización de imágenes.

## 📂 Estructura del Proyecto

```
Portafolio/
│── index.html
│── cv.html
│── /assets
│     ├── /css/style.css
│     ├── /img/
│     └── /js/script.js
│            modalData.js
│            modalLoader.js
```

## 🌐 Enlace al Portafolio en Línea
🔗 **https://jcpizarrodev.github.io/Portafolio**

## 📁 Proyectos Destacados

### 🔐 CiberSeguridad
Sitio educativo orientado a amenazas digitales, buenas prácticas y material visual de apoyo.

### 🛒 Tienda Online
Gestión de productos con consumo de API externa utilizando JavaScript.

### 📚 Sistema de Venta de Libros
Aplicación web y API REST usando Node.js, Express, Handlebars y PostgreSQL.

## 📝 Reflexión Personal
Este proyecto me permitió fortalecer mis habilidades en:

- Diseño visual profesional  
- Limpieza y refactorización de código  
- Modularización con JavaScript  
- Buenas prácticas en layout y responsividad  
- Importancia del feedback y revisión externa  

Estoy satisfecho con el resultado final y continuaré mejorando el portafolio con los nuevos conocimientos del siguiente módulo.

## ✔ Estado Final
**Portafolio final completado, optimizado y publicado en GitHub Pages.**
**https://jcpizarrodev.github.io/Portafolio/**  

- cabe indicar que el proyecto de libros, se encuentra en proceso de desarrollo link que será actualizado una vez implementado  y entregado
Módulo 9: Evaluación de Portafolio.