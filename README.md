# CRUD de Pizzas con Node.js, Express y MongoDB

## Descripción

La tarea implementa un CRUD (Create, Read, Update, Delete) de pizzas utilizando Node.js, Express y MongoDB. Utilizando una lista en memoria para almacenar las pizzas. Posteriormente, se modificó el repositorio para utilizar MongoDB como sistema de almacenamiento.

Las operaciones disponibles son:

- Obtener todas las pizzas.
- Obtener una pizza por su ID.
- Agregar una nueva pizza.
- Actualizar una pizza.
- Eliminar una pizza.

## Tecnologías utilizadas y requisitos

- Node.js
- Express
- MongoDB
- MongoDB Compass
- Docker
- Postman
- Nodemon


## Instalación

Primero se deben instalar las dependencias del proyecto.

Desde la carpeta principal del proyecto ejecutar:

```bash
npm install

 

Si el paquete no está instalado, ejecutar:
npm install mongodb

Configuración de MongoDB
MongoDB se ejecuta mediante Docker y utiliza el puerto:
27017

La conexión utilizada por el proyecto es:
mongodb://root:12345678@localhost:27017/

La base de datos utilizada es:
prueba

Y la colección utilizada es:
pizzas

Para iniciar el servidor en modo desarrollo ejecutar:
npm run dev

El servidor se ejecuta en:
http://localhost:3000

 
