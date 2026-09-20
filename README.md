# CRUD de Pizzas con Node.js, Express y MongoDB

## Descripción

La tarea implementa un CRUD (Create, Read, Update, Delete) de pizzas utilizando Node.js, Express y MongoDB.

El proyecto originalmente utilizaba una lista en memoria para almacenar las pizzas. Posteriormente, se modificó el repositorio para utilizar MongoDB como sistema de almacenamiento permanente.

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
```

Si el paquete de MongoDB no está instalado, ejecutar:

```bash
npm install mongodb
```

## Configuración de MongoDB

MongoDB se ejecuta mediante Docker y utiliza el puerto:

```text
27017
```

La conexión utilizada por el proyecto es:

```text
mongodb://root:12345678@localhost:27017/
```

La base de datos utilizada es:

```text
prueba
```

La colección utilizada es:

```text
pizzas
```

## Ejecución del proyecto

Para iniciar el servidor en modo desarrollo ejecutar:

```bash
npm run dev
```

El servidor se ejecuta en:

```text
http://localhost:3000
```

## Pruebas con Postman

El CRUD fue probado utilizando Postman.

Las operaciones realizadas fueron:

- `POST` para agregar una pizza.
- `GET` para consultar una pizza.
- `PUT` para actualizar una pizza.
- `DELETE` para eliminar una pizza.
- `GET` nuevamente para comprobar que la pizza fue eliminada.

También se verificaron los cambios directamente en MongoDB Compass.

## MongoDB Compass

En MongoDB Compass se utiliza:

- Base de datos: `prueba`
- Colección: `pizzas`

Los documentos creados, actualizados y eliminados mediante Postman se reflejan en esta colección.

## Endpoints

### Obtener todas las pizzas

```text
GET http://localhost:3000/api/v1/pizzas
```

### Obtener una pizza por ID

```text
GET http://localhost:3000/api/v1/pizzas/:id
```

Ejemplo:

```text
GET http://localhost:3000/api/v1/pizzas/1
```

### Agregar una pizza

```text
POST http://localhost:3000/api/v1/pizzas
```

Ejemplo de JSON:

```json
{
  "nombre": "Pizza Pepperoni",
  "ingredientes": "Queso Mozarella, salsa de tomate y pepperoni"
}
```

### Actualizar una pizza

```text
PUT http://localhost:3000/api/v1/pizzas/:id
```

Ejemplo:

```text
PUT http://localhost:3000/api/v1/pizzas/1
```

Body:

```json
{
  "nombre": "Pizza Pepperoni Especial",
  "ingredientes": "Queso Mozarella, salsa de tomate, pepperoni y extra queso"
}
```

### Eliminar una pizza

```text
DELETE http://localhost:3000/api/v1/pizzas/:id
```

Ejemplo:

```text
DELETE http://localhost:3000/api/v1/pizzas/1
```