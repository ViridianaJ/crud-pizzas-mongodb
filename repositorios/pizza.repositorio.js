import { MongoClient } from "mongodb";

/**
 * Cadena de conexión utilizada para conectarse
 * al servidor de MongoDB que está ejecutándose
 * en Docker.
 */
const CADENA_CONEXION =
    "mongodb://root:12345678@localhost:27017/";

/**
 * Cliente utilizado para establecer la conexión
 * con MongoDB.
 */
const cliente = new MongoClient(CADENA_CONEXION);

/**
 * Base de datos que se utilizará para guardar
 * la información de las pizzas.
 */
const baseDatos = cliente.db("prueba");

/**
 * Colección donde se almacenan las pizzas.
 */
const pizzas = baseDatos.collection("pizzas");


/**
 * Obtiene todas las pizzas almacenadas en la colección "pizzas".
 *
 * ¿Qué recibe?
 * No recibe parámetros.
 *
 * ¿Qué hace?
 * Consulta todos los documentos de la colección "pizzas"
 * almacenada en MongoDB.
 *
 * ¿Qué devuelve?
 * Devuelve una promesa que se resuelve en un arreglo
 * con todas las pizzas encontradas.
 *
 * @returns {Promise<Array>} Arreglo con todas las pizzas.
 */
export async function obtenerTodasLasPizzasAsync() {

    return await pizzas.find({}).toArray();

}


/**
 * Obtiene una pizza utilizando su identificador.
 *
 * ¿Qué recibe?
 * Recibe el id de la pizza que se desea buscar.
 *
 * ¿Qué hace?
 * Busca en MongoDB un documento cuyo campo "id"
 * coincida con el identificador recibido.
 *
 * ¿Qué devuelve?
 * Devuelve la pizza encontrada.
 * Si no existe una pizza con ese id, devuelve undefined.
 *
 * @param {number|string} id Identificador de la pizza.
 * @returns {Promise<Object|undefined>} Pizza encontrada o undefined.
 */
export async function obtenerPizzaPorIdAsync(id) {

    const pizza = await pizzas.findOne({
        id: Number(id)
    });

    return pizza ?? undefined;

}


/**
 * Agrega una nueva pizza a la colección "pizzas".
 *
 * ¿Qué recibe?
 * Recibe un objeto "datos" que contiene el nombre
 * y los ingredientes de la nueva pizza.
 *
 * ¿Qué hace?
 * Genera un nuevo identificador, crea el documento
 * de la pizza y lo guarda en MongoDB.
 *
 * ¿Qué devuelve?
 * Devuelve el objeto correspondiente a la nueva pizza.
 *
 * @param {Object} datos Datos de la nueva pizza.
 * @param {string} datos.nombre Nombre de la pizza.
 * @param {string} datos.ingredientes Ingredientes de la pizza.
 * @returns {Promise<Object>} Pizza creada.
 */
export async function agregarPizzaAsync(datos) {

    const ultimaPizza = await pizzas
        .find({})
        .sort({ id: -1 })
        .limit(1)
        .toArray();

    const nuevoId =
        ultimaPizza.length > 0
            ? ultimaPizza[0].id + 1
            : 1;

    const nuevaPizza = {
        id: nuevoId,
        nombre: datos.nombre,
        ingredientes: datos.ingredientes
    };

    await pizzas.insertOne(nuevaPizza);

    return nuevaPizza;

}


/**
 * Actualiza una pizza utilizando su identificador.
 *
 * ¿Qué recibe?
 * Recibe el id de la pizza que se desea actualizar
 * y un objeto "datos" con el nuevo nombre
 * y los nuevos ingredientes.
 *
 * ¿Qué hace?
 * Busca la pizza por su id y actualiza los campos
 * nombre e ingredientes en MongoDB.
 *
 * ¿Qué devuelve?
 * Devuelve la pizza actualizada.
 * Si no existe una pizza con ese id, devuelve undefined.
 *
 * @param {number|string} id Identificador de la pizza.
 * @param {Object} datos Nuevos datos de la pizza.
 * @param {string} datos.nombre Nuevo nombre de la pizza.
 * @param {string} datos.ingredientes Nuevos ingredientes.
 * @returns {Promise<Object|undefined>} Pizza actualizada o undefined.
 */
export async function actualizarPizzaAsync(id, datos) {

    const resultado = await pizzas.updateOne(
        {
            id: Number(id)
        },
        {
            $set: {
                nombre: datos.nombre,
                ingredientes: datos.ingredientes
            }
        }
    );

    if (resultado.matchedCount === 0) {

        return undefined;

    }

    const pizzaActualizada = await pizzas.findOne({
        id: Number(id)
    });

    return pizzaActualizada;

}


/**
 * Elimina una pizza utilizando su identificador.
 *
 * ¿Qué recibe?
 * Recibe el id de la pizza que se desea eliminar.
 *
 * ¿Qué hace?
 * Busca y elimina de MongoDB la pizza que tenga
 * el identificador recibido.
 *
 * ¿Qué devuelve?
 * Devuelve true si la pizza fue eliminada.
 * Devuelve false si no se encontró una pizza con ese id.
 *
 * @param {number|string} id Identificador de la pizza.
 * @returns {Promise<boolean>} True si eliminó la pizza,
 * false si no la encontró.
 */
export async function borrarPizzaAsync(id) {

    const resultado = await pizzas.deleteOne({
        id: Number(id)
    });

    return resultado.deletedCount > 0;

}