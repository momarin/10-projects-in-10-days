for study purpose

// Configurações da API
const apiKey = "c69bde5c8450e8dbc8e9ec73791c743e";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather";
const city = "Fortaleza";
const country = "BR";
const units = "metric";
const language = "pt";

// URL completa
const completeURL = `${apiURL}?q=${city},${country}&units=${units}&lang=${language}&appid=${apiKey}`;

fetch(completeURL)
    .then ((response) => response.json())
    .then(data => {
        console.log("Dados completos da API: ", data);
        console.log("Resumo: ");
        console.log(`Cidade: ${data.name}`);
        console.log(`Temperatura: ${data.main.temp} °C`);
        console.log(`Condição: ${data.weather[0].description}`);
    })
    .catch(console.error);
