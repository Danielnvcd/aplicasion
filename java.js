function actualizarValores() {
    document.getElementById("valorTurbo").textContent = document.getElementById("turbo").value + " PSI";
    document.getElementById("valorCombustible").textContent = document.getElementById("combustible").value + "%";
    document.getElementById("valorRPM").textContent = document.getElementById("rpm").value + " RPM";
    document.getElementById("valorAvance").textContent = document.getElementById("avance").value + "°";
    document.getElementById("valorMezcla").textContent = document.getElementById("mezcla").value + " AFR";
}

document.querySelectorAll("input[type=range]").forEach(input => {
    input.addEventListener("input", actualizarValores);
});

document.getElementById("btnTuning").addEventListener("click", aplicarTuning);

function aplicarTuning() {
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let stage = document.getElementById("stage").value;
    let turbo = document.getElementById("turbo").value;
    let combustible = document.getElementById("combustible").value;
    let rpm = document.getElementById("rpm").value;
    let avance = document.getElementById("avance").value;
    let mezcla = document.getElementById("mezcla").value;
    let output = document.getElementById("output");
    
    if (marca && modelo) {
        output.textContent = `Has aplicado Stage ${stage} a tu ${marca} ${modelo} con ${turbo} PSI de turbo, ${combustible}% extra de combustible, ${rpm} RPM, ${avance}° de avance y ${mezcla} AFR.`;
        actualizarGrafica(stage, turbo, combustible, rpm, avance, mezcla);
    } else {
        output.textContent = "Por favor, completa todos los campos.";
    }
}

function actualizarGrafica(stage, turbo, combustible, rpm, avance, mezcla) {
    const ctx = document.getElementById("graficaPotencia").getContext("2d");
    const potenciaBase = 200;
    const aumento = [0, 30, 60, 100, 150, 200];
    const turboFactor = turbo * 2;
    const combustibleFactor = combustible * 1.5;
    const rpmFactor = rpm * 0.05;
    const avanceFactor = avance * 1.2;
    const mezclaFactor = (14.7 - mezcla) * 5;
    const nuevaPotencia = potenciaBase + aumento[stage] + turboFactor + combustibleFactor + rpmFactor + avanceFactor + mezclaFactor;
    
    if (window.miGrafica) {
        window.miGrafica.destroy();
    }
    
    window.miGrafica = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Potencia Stock", "Potencia Tuned"],
            datasets: [{
                label: "HP",
                data: [potenciaBase, nuevaPotencia],
                backgroundColor: ["#ff6600", "#00ff00"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}
