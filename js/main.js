import data from "../data.json" assert{type: 'json'};

const dataContainer = document.getElementById("data-container");

let roles = [];
let levels = [];
let languajes = [];
let tolss = [];

const load = data => {
    dataContainer.innerHTML = ""; // Se vacia el contenedor para que no se vayan acumulando las categorias filtradas 

    data.forEach(card => {
        if(!roles.includes(card.role)) roles.push(card.role);

        if(!levels.includes(card.level)) levels.push(card.level);

        for(const language of card.languages){
            if(!languajes.includes(language)) languajes.push(language);
        }

        for(const tool of card.tools){
            if(!tolss.includes(tool)) tolss.push(tool);
        }
        
        // Mapeo de cada una de las cards
        const div = document.createElement("div");
        let filters = [];
        filters.push(card.role);
        filters.push(card.level);
        // filters.concat(card.tools.concat(card.languages));
        // console.log(filters);

        div.classList.add("container-card");
        for(const filter of filters){
            div.classList.add(filter);
        }

        div.innerHTML = `
            <img class="card__logo" src="${card.logo}" alt="${card.company}">
            <div class="card__container-info">
                <div class="card__container-info--name">
                    <p class="card__container-info--name--text">${card.company}</p>
                    <div class="card__container-info--characteristics">
                        <p class="card__container-info--characteristics--new">New!</p> 
                        <p class="card__container-info--characteristics--featured">Featured</p>
                    </div>
                </div>
                <div class="card__container-info--job">
                    <p>${card.position}</p>
                </div>
                <div class="card__container-info--requirement">
                    <p>${card.role}</p>
                    <div class="separator"></div>
                    <p>${card.contract}</p>
                    <div class="separator"></div>
                    <p>${card.location}</p>
                </div>
            </div>
            <div class="container-categories__categories--card">
                <button class="category--card">
                    <p class="category__text--card">${card.role}</p>
                </button>
                <button class="category--card">
                    <p class="category__text--card">${card.level}</p>
                </button>
            </div>
        `;
        
        dataContainer.append(div);

        let nuevo = document.querySelectorAll(".card__container-info--characteristics--new");
        let featured = document.querySelectorAll(".card__container-info--characteristics--featured");
        let languagesTools = document.querySelectorAll(".container-categories__categories--card");

        if(card.new) nuevo[card.id-1].classList.add("active");

        if(card.featured) featured[card.id-1].classList.add("active");

        let skills = card.languages.concat(card.tools);
        
        for(const skill of skills){
            const button = document.createElement("button");
            button.classList.add("category--card");

            button.innerHTML = `<p class="category__text--card">${skill}</p>`;

            languagesTools[card.id-1].append(button);
        }
    });
}

load(data);

/****** CARDS FILTER ******/

const categoryBtns = document.querySelectorAll(".category--card");

categoryBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        const categorySelected = event.target.firstChild.data; // Obtencion del nombre de la categoria
        console.log(categorySelected);
        let cardsSelected;

        if(roles.includes(categorySelected)){
            cardsSelected = data.filter(card => card.role === categorySelected);
        } else if(levels.includes(categorySelected)){
            cardsSelected = data.filter(card => card.level === categorySelected);
        } else if(languajes.includes(categorySelected)){
            cardsSelected = data.filter(card => card.languages.includes(categorySelected));
        } else {
            cardsSelected = data.filter(card => card.tools.includes(categorySelected));
        }
        
        load(cardsSelected);
    })
});


