// Función para alternar la visibilidad del menú
function toggleMenu() {
    const menu = document.getElementById('menu');
    const hamburger = document.querySelector('.hamburger');

    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Función para mostrar/ocultar la barra de búsqueda
function toggleSearchBar() {
    const searchBar = document.getElementById('search-bar');
    
    // Verifica si la barra de búsqueda está oculta o visible
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'flex';  // Muestra la barra de búsqueda
    } else {
        searchBar.style.display = 'none';  // Oculta la barra de búsqueda
    }
}

let highlightedWords = [];  // Array para almacenar las coincidencias resaltadas (span)
let currentIndex = -1;      // Índice actual de la palabra resaltada

// Función para realizar la búsqueda y resaltar las coincidencias
function searchContent() {
    const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
    const elementsToSearch = document.querySelectorAll('.main-content p, .main-content h1, .main-content h2, .main-content h3');
    
    // Limpiar resaltados anteriores
    clearHighlights(elementsToSearch);

    if (!searchQuery) return; // Si no hay consulta, salir

    elementsToSearch.forEach(element => {
        const originalHTML = element.innerHTML; // Mantiene el HTML original
        const regex = new RegExp(`(${searchQuery})`, 'gi'); // Expresión regular para la búsqueda

        // Resalta las coincidencias
        const newHTML = originalHTML.replace(regex, (match) => {
            return `<span class="highlight">${match}</span>`;
        });

        // Actualiza el contenido del elemento
        element.innerHTML = newHTML;
    });

    // Actualiza el array de palabras resaltadas
    highlightedWords = document.querySelectorAll('.highlight');
    currentIndex = -1; // Resetea el índice
}

// Función para limpiar los resaltados anteriores
function clearHighlights(elements) {
    elements.forEach(element => {
        // Restaura el HTML original
        element.innerHTML = element.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
    });
}

// Función para manejar la tecla Enter
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        if (highlightedWords.length === 0) return; // No hay coincidencias, no hace nada

        // Elimina la clase 'focused' de todas las palabras resaltadas antes de cambiar de palabra
        highlightedWords.forEach(span => {
            span.classList.remove('focused');
        });

        // Incrementa el índice y vuelve al principio si es necesario
        currentIndex = (currentIndex + 1) % highlightedWords.length;

        // Encuentra el siguiente span resaltado
        const spanToFocus = highlightedWords[currentIndex];
        spanToFocus.classList.add('focused');  // Agrega la clase 'focused' solo a esa palabra

        // Desplázate hacia la palabra resaltada
        spanToFocus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Asignar el manejador de evento al input de búsqueda
document.getElementById('search-input').addEventListener('input', searchContent);
document.getElementById('search-input').addEventListener('keydown', handleEnterKey);


// Función para alternar la visibilidad de las subopciones
function toggleSubOptions(element) {
    const suboptions = element.querySelector('.faq-suboptions');

    if (suboptions) {
        suboptions.style.display = suboptions.style.display === 'block' ? 'none' : 'block';
    }
}

// Función para mostrar la información asociada a cada subopción
function showInfo(option) {
    const infoText = document.getElementById("info-text");
    const infoMessages = {
        'diodo-rectificador': "El diodo rectificador se utiliza para permitir el paso de corriente en una sola dirección, bloqueando el paso en la dirección contraria.",
        'diodo-zener': "El diodo Zener permite el paso de corriente en una sola dirección, pero también puede conducir corriente en la dirección inversa cuando se alcanza una cierta tensión.",
        'diodo-led': "El diodo LED emite luz cuando la corriente pasa a través de él.",
        'diodo-schottky': "El diodo Schottky es conocido por su bajo voltaje de caída y alta velocidad de conmutación.",
        'bjt': "El transistor BJT (Bipolar Junction Transistor) es un transistor de unión bipolar utilizado en amplificación y conmutación.",
        'mosfet': "El MOSFET es un transistor de efecto de campo utilizado en aplicaciones digitales y analógicas.",
        'scr': "El SCR es un tiristor que se utiliza para controlar grandes cantidades de potencia eléctrica.",
        'triac': "El Triac permite controlar la corriente alterna (AC) en ambas direcciones.",
        'diac': "El DIAC es un dispositivo semiconductor que se utiliza principalmente en circuitos de conmutación.",
        'amplificadores-operacionales': "Los amplificadores operacionales son circuitos integrados utilizados para amplificar señales.",
        'microcontroladores': "Los microcontroladores son circuitos integrados que contienen un procesador, memoria y entradas/salidas.",
        'reguladores-voltaje': "Los reguladores de voltaje son circuitos integrados utilizados para mantener un voltaje constante.",
    };

    infoText.textContent = infoMessages[option] || "Selecciona una opción para ver más información.";
}

// Función para mostrar/ocultar la respuesta de una pregunta
function toggleAnswer(questionElement) {
    const answerElement = questionElement.nextElementSibling; // Selecciona el siguiente hermano (la respuesta)
    
    if (answerElement.classList.contains('show')) {
        answerElement.classList.remove('show');
    } else {
        answerElement.classList.add('show');
    }
}

// Asignar eventos de búsqueda y respuesta
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', function(event) {
    const query = event.target.value;

    fetch(`search-results-api?query=${query}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.search-results').innerHTML = data.results;
        })
        .catch(error => console.error('Error fetching search results:', error));
});
