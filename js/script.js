let peliculas = [];
let btnBuscar = document.getElementById("btnBuscar");
let lista = document.getElementById("lista");



const url = "https://japceibal.github.io/japflix_api/movies-data.json";


function mostrarPeliculas(arrayPeliculas) {
    if (arrayPeliculas.length === 0) {
        lista.innerHTML = '<div class="alert alert-warning">No hay peliculas disponibles.</div>';
        return;
    }

    let html = '';

    arrayPeliculas.forEach(pelicula => {

        let puntos = "";
        for (let i=0; i<5; i++) {
            if ((i) < (pelicula.vote_average)/2) {
                puntos+="<img src='./img/llena.png' width=15>";
            }else{
                puntos+="<img src='./img/vacia.png' width=15>";
            }
        }

        let generos = "";
        for (let genero of pelicula.genres){
            generos += genero.name + " - ";
        }

        html += `
            <div class="d-grid gap-2" id="coso">
                <div type="button" class="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#oc${pelicula.id}" aria-controls="offcanvasTop">
                    <div class="pelicula-info">
                        <div class="pelicula-info2">
                            <h2>${pelicula.title}</h2>
                            <p>${pelicula.tagline}</p>
                        </div>
                        <div class="puntaje">
                            <p>Puntuación:&nbsp ${puntos}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="offcanvas offcanvas-top text-dark" tabindex="-1" id="oc${pelicula.id}" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                    <h3 class="offcanvas-title" id="offcanvasTopLabel">${pelicula.title}</h3> <!-- Título en el panel lateral -->
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> <!-- Botón para cerrar el panel -->
                </div>
                <div class="offcanvas-body" id="cartel">
                    <p>${pelicula.overview}</p> <!-- Descripción de la película -->
                    <hr>
                    <span class="text-muted">
                        ${generos} <!-- Muestra los géneros de la película -->
                        <!-- Botón con más información como año, duración, presupuesto, etc. -->
                        <button class="float-end btn btn-secondary dropdown-toggle" type="button" id="dd${pelicula.id}" data-bs-toggle="dropdown" aria-expanded="false">More</button>
                        <ul class="dropdown-menu" aria-labelledby="dd${pelicula.id}">
                            <li><span class="dropdown-item">Year: <span class="float-end ps-1"> ${pelicula.release_date.slice(0,4)}</span></span></li> <!-- Año de lanzamiento -->                            
                            <li><span class="dropdown-item">Runtime: <span class="float-end ps-1"> ${pelicula.runtime} mins</span></span></li> <!-- Duración -->
                            <li><span class="dropdown-item">Budget: <span class="float-end ps-1"> $${pelicula.budget}</span></span></li> <!-- Presupuesto -->
                            <li><span class="dropdown-item">Revenue: <span class="float-end ps-1"> $${pelicula.revenue}</span></span></li> <!-- Ingresos -->
                        </ul>
                    </span>
                </div>
            </div>
        `;


    });

    lista.innerHTML = html;
};


function buscarPeliculas(array, busqueda) {
    if (!busqueda)
        return array;
    return array.filter(pelicula =>
        pelicula.title.toLowerCase().includes(busqueda.toLowerCase()) ||
        pelicula.genres.some(genero => genero.name.toLowerCase().includes(busqueda.toLowerCase())) ||
        pelicula.tagline.toLowerCase().includes(busqueda.toLowerCase()) ||
        pelicula.overview.toLowerCase().includes(busqueda.toLowerCase())
    );
}

function mostrarBusqueda() {
    let resultado = peliculas;

    let busqueda = document.getElementById("inputBuscar").value;
    resultado = buscarPeliculas(resultado, busqueda);

    mostrarPeliculas(resultado);
}





fetch(url)
    .then(response => {
        if (!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        peliculas = data;

        btnBuscar.addEventListener('click', mostrarBusqueda);

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        lista.innerHTML = '<div class="alert alert-danger">Error al cargar las peliculas.</div>';
    })