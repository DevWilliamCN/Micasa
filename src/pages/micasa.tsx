import React, { useState } from 'react';

// Definición del tipo para las preguntas
type Pregunta = {
  enunciado: string;
  respuestaCorrecta: string;
  respuestaUsuario: string;
  esCorrecta?: boolean;
};

// Estado inicial con las preguntas, respuestas correctas y las respuestas del usuario vacías
const preguntasIniciales: Pregunta[] = [
  { enunciado: 'Lugar de la casa donde se preparan los alimentos', respuestaCorrecta: 'cocina', respuestaUsuario: '' },
  // Aquí puedes agregar más preguntas siguiendo la misma estructura
];

const MiCasita = () => {
  // Estado que maneja el conjunto de preguntas y respuestas
  const [preguntas, setPreguntas] = useState<Pregunta[]>(preguntasIniciales);
  // Estado que controla si se deben mostrar las respuestas correctas
  const [mostrarRespuestas, setMostrarRespuestas] = useState(false);

  // Función para manejar el cambio en las respuestas del usuario
  const manejarRespuestaUsuario = (indice: number, respuesta: string) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indice].respuestaUsuario = respuesta;
    setPreguntas(nuevasPreguntas);
  };

  // Función para verificar las respuestas del usuario
  const comprobarRespuestas = () => {
    const preguntasActualizadas = preguntas.map(pregunta => ({
      ...pregunta,
      esCorrecta: pregunta.respuestaUsuario.trim().toLowerCase() === pregunta.respuestaCorrecta.toLowerCase(),
    }));
    setPreguntas(preguntasActualizadas);
    setMostrarRespuestas(true);
  };

  // Función para reiniciar el formulario a su estado inicial
  const reiniciarCampos = () => {
    setPreguntas(preguntasIniciales.map(pregunta => ({ ...pregunta, respuestaUsuario: '', esCorrecta: undefined })));
    setMostrarRespuestas(false);
  };

  return (
    <div className="container">
      <h1>Tema: Mi Casa</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Enunciado</th>
            <th>Tu Respuesta</th>
            <th>Resultado</th>
            {mostrarRespuestas && <th>Respuesta Correcta</th>}
          </tr>
        </thead>
        <tbody>
          {preguntas.map((pregunta, indice) => (
            <tr key={indice}>
              <td>{pregunta.enunciado}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={pregunta.respuestaUsuario}
                  onChange={(e) => manejarRespuestaUsuario(indice, e.target.value)}
                />
              </td>
              <td>
                {pregunta.esCorrecta !== undefined && (
                  <span className={pregunta.esCorrecta ? 'text-success' : 'text-danger'}>
                    {pregunta.esCorrecta ? 'Correcto' : 'Incorrecto'}
                  </span>
                )}
              </td>
              {mostrarRespuestas && (
                <td>
                  {pregunta.respuestaCorrecta}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={comprobarRespuestas}>
        Comprobar Respuestas
      </button>
      {' '}
      <button className="btn btn-secondary" onClick={reiniciarCampos}>
        Reiniciar
      </button>
    </div>
  );
};

export default MiCasita;
