// import data from "../data.json" assert{type: 'json'};

// const dataContainer = document.getElementById("data-container");

// const load = data => {
//     dataContainer.innerHTML = ""; // Se vacia el contenedor para que no se vayan acumulando las categorias filtradas 

//     data.forEach(card => {
//         // Mapeo de cada una de las cards
//         const div = document.createElement("div");
//         div.classList.add("container-card");
        
//         div.innerHTML = `
//             <img class="card__logo" src="${card.logo}" alt="${card.company}">
//             <div class="card__container-info">
//                 <div class="card__container-info--name">
//                     <p class="card__container-info--name--text">${card.company}</p>
//                     <div class="card__container-info--characteristics">
//                         <p class="card__container-info--characteristics--new">New!</p> 
//                         <p class="card__container-info--characteristics--featured">Featured</p>
//                     </div>
//                 </div>
//                 <div class="card__container-info--job">
//                     <p>${card.position}</p>
//                 </div>
//                 <div class="card__container-info--requirement">
//                     <p>${card.postedAt}</p>
//                     <div class="separator"></div>
//                     <p>${card.contract}</p>
//                     <div class="separator"></div>
//                     <p>${card.location}</p>
//                 </div>
//             </div>
//             <div class="container-categories__categories--card">
//                 <button class="category--card">
//                     <p class="category__text--card">${card.role}</p>
//                 </button>
//                 <button class="category--card">
//                     <p class="category__text--card">${card.level}</p>
//                 </button>
//             </div>
//         `;
        
//         dataContainer.appendChild(div);

//         // let categoriesContainer = document.querySelectorAll(".container-categories__categories--card");
//         // console.log(categoriesContainer);

//         // for(const language of card.languages){
//         //     const button = document.createElement("button");
//         //     button.classList.add("category--card");
//         //     button.innerHTML = `<p class="category__text--card">${language}</p>`;
//         //     categoriesContainer.appendChild(button);
//         // }

        
        
        
//         // let nuevo = document.querySelector(".card__container-info--characteristics--new");
//         // if(card.new) nuevo.classList.add("active");
//         // console.log(nuevo);
//     });

    
//     // let featured = document.querySelectorAll(".card__container-info--characteristics--featured");
//     // let languagesTools = document.querySelectorAll(".container-categories__categories--card");

//     // console.log(nuevo);
//     // console.log(featured);
//     // console.log(languagesTools);

//     // if(card.new) nuevo[card.id-1].classList.add("active");

//     // if(card.featured) featured[card.id-1].classList.add("active");

//     // let skills = card.languages.concat(card.tools);
        
//     // for(const skill of skills){
//     //     const button = document.createElement("button");
//     //     button.classList.add("category--card");

//     //     button.innerHTML = `<p class="category__text--card">${skill}</p>`;

//     //     languagesTools[card.id-1].append(button);
//     // }
// }

// load(data);

// /****** CARDS FILTER ******/

// const categoryBtns = document.querySelectorAll(".category--card");
// let filters = [];

// categoryBtns.forEach(btn => {
//     btn.addEventListener("click", event => {
//         let newFilter = event.target.firstChild.data;
//         filters.push(newFilter);
//     //     let cardsSelected;
//     console.log(filters);

        
        
        
//     //     let categorySelected = event.target.firstChild.data; // Obtencion del nombre de la categoria
//     //     console.log(categorySelected);

//     //     if(roles.includes(categorySelected)){
//     //         cardsSelected = data.filter(card => card.role === categorySelected);
//     //     } else {
//     //         cardsSelected = data.filter(card => card.level === categorySelected);
//     //     }

//     //     load(cardsSelected);

//     //     console.log(roles.includes(categorySelected));
//     //     console.log(cardsSelected);
//     })
// });







// if(!roles.includes(card.role)) roles.push(card.role);

        // if(!levels.includes(card.level)) levels.push(card.level);

        // for(const language of card.languages){
        //     if(!languajes.includes(language)) languajes.push(language);
        // }

        // for(const tool of card.tools){
        //     if(!tolss.includes(tool)) tolss.push(tool);
        // }
