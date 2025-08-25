// ✅ 1. DATOS DE PARTICIPACIÓN
const datosParticipacion = {
  labels: ["Presidenciales 2017", "Constituyente 2020", "Municipales 2021", "Constituyente 2023"],
  participacion: [46.1, 78.3, 55.7, 59.2]
};

// ✅ 2. RESULTADOS NACIONALES
const resultadosReales = {
  "presidencial-2021": {
    candidatos: ["Gabriel Boric", "José Antonio Kast", "Yasna Provoste", "Franco Parisi"],
    porcentajes: [62.4, 37.6, 0, 0]
  },
  "municipal-2021": {
    candidatos: ["Daniel Jadue", "Cristián Labbé", "Karina Delfino", "Jorge Sabag"],
    porcentajes: [59.8, 20.1, 12.3, 7.8]
  },
  "constituyente-2023": {
    candidatos: ["Apruebo", "Rechazo"],
    porcentajes: [46.9, 53.1]
  }
};

// ✅ 3. RESULTADOS REGIÓN DE ATACAMA
const resultadosAtacama = {
  "presidencial-2021": {
    candidatos: ["Gabriel Boric", "José Antonio Kast", "Yasna Provoste", "Franco Parisi"],
    porcentajes: [54.3, 45.7, 0, 0]
  },
  "municipal-2021": {
    candidatos: ["Esteban Maturana", "Otra lista", "Independientes"],
    porcentajes: [58.1, 25.4, 16.5]
  },
  "constituyente-2023": {
    candidatos: ["Apruebo", "Rechazo"],
    porcentajes: [44.8, 55.2]
  }
};

// ✅ 4. SIMULAR VOTACIÓN
function simularVotacion() {
  const tipo = document.getElementById("eleccion").value;
  const comuna = document.getElementById("comuna").value;

  const comunasAtacama = ["copiapo", "caldera", "vallenar", "diego-almagro"];
  const esAtacama = comunasAtacama.includes(comuna);

  const data = esAtacama ? resultadosAtacama[tipo] : resultadosReales[tipo];
  const candidatos = data.candidatos;
  const porcentajes = data.porcentajes;

  let resultado = `<strong>Elección: ${tipo.replace("-", " ").toUpperCase()} | Comuna: ${formatComuna(comuna)}</strong><br><br>`;
  candidatos.forEach((c, i) => {
    resultado += `${c}: <strong>${porcentajes[i]}%</strong><br>`;
  });

  if (tipo === "constituyente-2023") {
    const ganador = porcentajes[0] > porcentajes[1] ? "Apruebo" : "Rechazo";
    resultado += `<br>🔴 Resultado: <strong>${ganador}</strong>`;
  } else {
    const ganador = candidatos[0];
    resultado += `<br>🎉 Ganador: <strong>${ganador}</strong>`;
  }

  const resultadoDiv = document.getElementById("resultado-votacion");
  resultadoDiv.innerHTML = resultado;
  resultadoDiv.style.display = "block";
}

// ✅ 5. FORMATO DE COMUNA
function formatComuna(value) {
  const nombres = {
    "santiago": "Santiago",
    "valparaiso": "Valparaíso",
    "concepcion": "Concepción",
    "puerto-montt": "Puerto Montt",
    "calama": "Calama",
    "copiapo": "Copiapó",
    "caldera": "Caldera",
    "vallenar": "Vallenar",
    "diego-almagro": "Diego de Almagro"
  };
  return nombres[value] || value;
}

// ✅ 6. GUARDAR RESULTADO
function guardarResultado() {
  const eleccion = document.getElementById("eleccion").value;
  const comuna = document.getElementById("comuna").value;
  const resultado = document.getElementById("resultado-votacion").innerHTML;

  const entrada = {
    fecha: new Date().toLocaleDateString(),
    eleccion: eleccion.replace("-", " ").toUpperCase(),
    comuna: formatComuna(comuna),
    resumen: resultado ? "Simulación realizada" : "Sin resultado"
  };

  let historial = JSON.parse(localStorage.getItem("historialSimulador")) || [];
  historial.push(entrada);
  localStorage.setItem("historialSimulador", JSON.stringify(historial));

  alert("✅ Resultado guardado en tu historial.");
}

// ✅ 7. CARGAR HISTORIAL
function cargarHistorial() {
  const lista = document.getElementById("lista-historial");
  lista.innerHTML = "";

  const historial = JSON.parse(localStorage.getItem("historialSimulador")) || [];

  if (historial.length === 0) {
    lista.innerHTML = "<li>No hay actividades registradas.</li>";
    return;
  }

  historial.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.fecha}</strong>: ${item.eleccion} en ${item.comuna}`;
    lista.appendChild(li);
  });
}

// ✅ 8. GRÁFICO CON CHART.JS (CORREGIDO)
let grafico = null;
function mostrarGrafico() {
  const ctx = document.getElementById("grafico-participacion");
  if (!ctx) return;
  const chartCtx = ctx.getContext("2d");

  if (grafico) grafico.destroy();

  grafico = new Chart(chartCtx, {
    type: "line",
    data: {  // ✅ Aquí estaba el error: faltaba "data:"
      labels: datosParticipacion.labels,
      datasets: [{
        label: "Participación (%)",
        data: datosParticipacion.participacion,  // ✅ Aquí también faltaba "data:"
        backgroundColor: "rgba(26, 60, 110, 0.2)",
        borderColor: "#1a3c6e",
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: "Porcentaje de participación"
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Participación Electoral en Chile (2017–2023) - Fuente: Servel"
        }
      }
    }
  });
}

// ✅ 9. EVALUAR POLÍTICAS
function evaluarPolitica(politica) {
  const impactos = {
    "voto-obligatorio": `
      ✅ <strong>Fortalezas:</strong> Aumenta participación.<br>
      ❌ <strong>Debates:</strong> ¿Obligar a votar limita libertad?<br>
      📊 En 2021, participación fue 55.7%.
    `,
    "tarifa-social": `
      ✅ <strong>Fortalezas:</strong> Ayuda a adultos mayores.<br>
      ❌ <strong>Debates:</strong> Costos para el fisco.<br>
      📊 Más de 3 millones la usan (2023).
    `,
    "gratuidad": `
      ✅ <strong>Fortalezas:</strong> Reduce brecha educativa.<br>
      ❌ <strong>Debates:</strong> ¿Sostenible a largo plazo?<br>
      📊 Más de 700 mil estudiantes beneficiados.
    `,
    "agua-atacama": `
      ✅ <strong>Fortalezas:</strong> Proyectos de desalación.<br>
      ❌ <strong>Desafíos:</strong> Alto costo y conflicto.<br>
      📊 85% del agua en Atacama va a minería (INE, 2023).
    `,
    "energia-solar": `
      ✅ <strong>Fortalezas:</strong> Atacama tiene 30% de energía solar.<br>
      ❌ <strong>Conflictos:</strong> Algunos no consultan a pueblos originarios.<br>
      📊 28 parques solares operan en la región (MEM, 2024).
    `,
    "educacion-tecnica": `
      ✅ <strong>Fortalezas:</strong> Forma técnicos para minería.<br>
      ❌ <strong>Debates:</strong> ¿Oportunidades para mujeres?<br>
      📊 65% de jóvenes en Copiapó prefieren esta vía (MINEDUC, 2023).
    `
  };

  const elemento = document.getElementById(`impacto-${politica}`);
  if (elemento) {
    elemento.innerHTML = impactos[politica];
  }
}

// ✅ 10. DEBATE CIUDADANO
function votarDebate(opcion) {
  let votos = JSON.parse(localStorage.getItem("votosDebate")) || { si: 0, no: 0 };
  votos[opcion] = (votos[opcion] || 0) + 1;
  localStorage.setItem("votosDebate", JSON.stringify(votos));
  alert("🗳️ Tu voto ha sido registrado.");
}

function mostrarResultadosDebate() {
  const votos = JSON.parse(localStorage.getItem("votosDebate")) || { si: 0, no: 0 };
  const total = votos.si + votos.no;
  const porSi = total ? ((votos.si / total) * 100).toFixed(1) : 0;
  const porNo = total ? ((votos.no / total) * 100).toFixed(1) : 0;

  const div = document.getElementById("resultados-debate");
  if (!div) return;

  div.innerHTML = `
    <strong>Resultados del debate:</strong><br>
    ✅ Sí: ${votos.si} votos (${porSi}%)<br>
    ❌ No: ${votos.no} votos (${porNo}%)<br>
    <em>Total: ${total} participantes</em>
  `;
  div.style.display = "block";
}