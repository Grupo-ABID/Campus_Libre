![Banner campus-libre](https://github.com/user-attachments/assets/a61bfc40-1f75-4bbb-988f-803686085cdb)


<div align="center">
  <img src="https://img.shields.io/badge/npm-10.9.2-green" alt="npm version">
  <img src="https://img.shields.io/badge/node-23.11.0-dark--green" alt="node version">
  <img src="https://img.shields.io/badge/angular-19.2.11-red" alt="angular version">
  <img src="https://img.shields.io/badge/bun-1.2.10-blue" alt="bun version">
  <img src="https://img.shields.io/badge/Status-Desarrollo-purple" alt="project status">
</div>

---
### Descripción de su proyecto

Este proyecto tiene como objetivo el desarrollo de un sistema de evaluación docente para la Universidad CampusLibre, el cual permitirá a los estudiantes calificar sus asignaturas y docentes al final de cada semestre académico.

---
### ¿Cómo está construida?

Se utilizó **Angular** para una interfaz moderna, intuitiva y responsiva, además de, trabajar con **Docker** para facilitar el despliegue y portabilidad del sistema en distintos entornos.

---
### funcionalidades

- 📝 Evaluación docente por parte de los estudiantes.

- 📊 Visualización de resultados mediante gráficos interactivos.

- 🔍 Filtros por carrera, semestre o asignatura.

- 🧾 Reportes para uso académico.

---
### ⚙️ Instalación

Seguir estos pasos para clonar, instalar y ejecutar el proyecto en tu entorno local utilizando Docker.

#### 1. Clonar el repositorio

```
# Clonar el repositorio
git clone https://github.com/Grupo-ABID/Campus_Libre.git 

# entrar en la raiz del proyecto
cd Campus_Libre
```

#### 🐳 2. Dockerfile

Dentro del proyecto se encuentra un archivo llamado `Dockerfile`, el cual define los pasos necesarios para construir la imagen Docker que contendrá la aplicación Angular ya lista para ejecutarse.

Uno de los fragmentos clave es el siguiente:

```
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
```

- **`COPY package*.json ./`**
    
    - Copia los archivos `package.json` y `package-lock.json` desde el proyecto local hacia el contenedor.
    - Esto permite que Docker instale las dependencias **antes de copiar el resto del código**, lo que mejora el rendimiento de la construcción.
        
- **`RUN npm install -g @angular/cli`**
    
    - Instala globalmente Angular CLI dentro del contenedor.
    - Esto asegura que la aplicación podrá ser compilada y ejecutada con Angular aunque en la maquina que se intenta ejecutar **no tenga Angular instalado**.
        
- **`RUN npm install`**
    
    - Instala todas las dependencias del proyecto especificadas en `package.json` dentro del contenedor, utilizando `npm`.


#### 📄 3. Construir y levantar el contenedor Docker

Asegúrate de tener [Docker](https://www.docker.com/) instalado en tu sistema.

```
# Construcción de la imagen Docker
docker build -t campus-libre . 

# Ejecutar el contenedor
docker run -p 8080:80 campus-libre
```

podrás acceder a tu aplicación abriendo `http://localhost:8080` en tu navegador.


#### 4. Construir y levantar el contenedor Docker

En caso de no querer ocupar Docker, se puede hacer todo de manera local con el comando.

```
# Iniciar el server de desarrollo local
ng serve
```

Una vez iniciado el servidor, abre el browser y en el buscador coloca http://localhost:4200/ o copias la URL que te entrega la terminal, haciendo CTRL + click izquierdo. 

Este comando `ng serve` debe ser ocupado estando en la raíz del proyecto. 

---
### 💻 Tecnologías Utilizadas

- **Angular** – Desarrollo de interfaz web.

- **Docker** – Contenerización de la aplicación.

- **Django Restframework** - Desarrollo de Backend. 

- **Git** – Control de versiones.

---
### ✍ Autores del proyecto

- Alexander Bracho - @Dein-devai
- Italo Duerto - @CCIA0

---
### 📚 Recursos Adicionales

A continuación, se presentan recursos oficiales y confiables para comprender mejor las herramientas utilizadas en este proyecto:

#### 🔧 Angular CLI

- 📘 Angular CLI Overview and Command Reference  
    Guía oficial de comandos de Angular CLI: generación de componentes, servicios, builds de producción, pruebas, y más.
    
---

#### 🐳 Docker

- 📘 Documentación oficial de Docker  
    Aprende a crear, construir, ejecutar y gestionar contenedores. Incluye guías de instalación y uso de Dockerfiles.
    
- 🧱 Dockerfile reference  
    Referencia completa de las instrucciones válidas dentro de un `Dockerfile`.
    
---

#### 📦 npm (Node Package Manager)

- 📘 [Documentación oficial de npm](https://docs.npmjs.com/)  
    Aprende a gestionar dependencias, publicar paquetes, usar scripts, y entender el flujo de trabajo de `npm install`.
    
- 🔍 [npm CLI Commands](https://docs.npmjs.com/cli/v10/commands)  
    Referencia detallada de todos los comandos disponibles, como `npm install`, `npm run`, `npm update`, entre otros.
    
---

#### 🟢 Node.js

- 📘 Sitio oficial de Node.js  
    Página principal para descargar Node.js y acceder a documentación general.
    
- 📚 Documentación de Node.js  
    Información técnica sobre APIs, módulos del sistema, eventos, red, procesos y más.