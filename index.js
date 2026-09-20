import express from "express";

import {
    obtenerTodasLasPizzasAsync,
    obtenerPizzaPorIdAsync,
    agregarPizzaAsync,
    actualizarPizzaAsync,
    borrarPizzaAsync
} from "./repositorios/pizza.repositorio.js";

const app = express();
const PORT = 3000;

// Configuración para usar el body en los métodos POST y PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Regresa una lista de todas las pizzas
 * @returns []
 */
app.get("/api/v1/pizzas", async (req, res) => {

    const pizzas = await obtenerTodasLasPizzasAsync();

    return res.status(200).json(pizzas);
});

/**
 * Regresa la pizza del id buscado
 * @params (*) id
 */
app.get("/api/v1/pizzas/:id", async (req, res) => {

    const id = req.params.id;

    const pizza = await obtenerPizzaPorIdAsync(id);

    if (!pizza) {
        return res.status(404).json({
            mensaje: "Pizza no encontrada"
        });
    }

    return res.status(200).json(pizza);
});

/**
 * Agrega una nueva pizza
 * @params (*) datos
 */
app.post("/api/v1/pizzas", async (req, res) => {

    const datos = req.body;

    const pizza = await agregarPizzaAsync(datos);

    return res.status(201).json(pizza);
});

/**
 * Actualiza la pizza del id buscado
 * @params (*) id
 * @params (*) datos
 */
app.put("/api/v1/pizzas/:id", async (req, res) => {

    const id = req.params.id;
    const datos = req.body;

    const pizza = await actualizarPizzaAsync(id, datos);

    if (!pizza) {
        return res.status(404).json({
            mensaje: "Pizza no encontrada"
        });
    }


    const mensaje = { mensaje: "Datos actualizados"}
    return res.status(202).json(mensaje);
});

/**
 * Elimina la pizza del id buscado
 * @params (*) id
 */
app.delete("/api/v1/pizzas/:id", async (req, res) => {

    const id = req.params.id;

    const eliminado = await borrarPizzaAsync(id);

    if (!eliminado) {
        return res.status(404).json({
            mensaje: "Pizza no encontrada"
        });
    }

    return res.status(200).json({
        mensaje: "Pizza eliminada correctamente"
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(
        `Servidor Express escuchando en el puerto http://localhost:${PORT}`
    );
});