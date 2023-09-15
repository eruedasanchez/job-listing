import data from '../data.json' assert{type: 'json'};

/*-----------------------------------------------------------------*\
        #SE COLOCA A CADA FILTRO EN SU CATEGORIA CORRESPONDIENTE
\*-----------------------------------------------------------------*/

let roles = [], levels = [], languages = [], tools = [];
                        
for(const employee of data){
        if(!roles.includes(employee.role)) roles.push(employee.role); 
        
        if(!levels.includes(employee.level)) levels.push(employee.level);
        
        for(const language of employee.languages){
                if(!languages.includes(language)) languages.push(language);
        }
        
        for(const tool of employee.tools){
                if(!tools.includes(tool)) tools.push(tool);
        }
}

const boxFilterContainer = document.getElementById('box-filter-container');
const boxFilter = document.getElementById('box-filter');
const clearBtn = document.getElementById('btn-clear');
const cardsContainer = document.getElementById('cards-container');

let tags = [];

const load = cardsChoosen => {
        cardsContainer.innerHTML = '';
        
        cardsChoosen.forEach(card => {
                const div = document.createElement("div");
                div.classList.add("card__container");
                
                div.innerHTML = `
                                <div class="card__container-logo">
                                        <img src="${card.logo}" alt="logo-${card.company}">
                                </div>
                                <div class="card__container-info">
                                        <div class="card__container-info--title">
                                                <p>${card.company}</p>
                                                <div class="card__container-info--boolean">
                                                        ${card.new ? `<p class="new">new!</p>` : `<p></p>`}
                                                        ${card.featured ? `<p class="featured">featured</p>` : `<p></p>`}
                                                </div>
                                        </div>
                                        <div class="card__container-info--position">
                                                <p>${card.position}</p>
                                        </div>
                                        <div class="card__container-info--conditions">
                                                <p>${card.postedAt}</p>
                                                <div class="separator"></div>
                                                <p>${card.contract}</p>
                                                <div class="separator"></div>
                                                <p>${card.location}</p>
                                        </div>
                                </div>
                                <div class="card__container-skills">
                                        <div class="skill">
                                                <button name="${card.role}" class="skill-name">${card.role}</button>
                                        </div>
                                        <div class="skill">
                                                <button name="${card.level}" class="skill-name">${card.level}</button>
                                        </div>
                                        ${card.languages.map(language => `
                                                <div class="skill">
                                                        <button name="${language}" class="skill-name">${language}</button>
                                                </div>
                                        `).join('')}
                                        ${card.tools.map(tool => `
                                                <div class="skill">
                                                        <button name="${tool}" class="skill-name">${tool}</button>
                                                </div>
                                        `).join('')}
                                </div>
                        `;
                
                cardsContainer.append(div);
        });

        const filterCardBtns = document.querySelectorAll(".skill-name");
        let cardsSelected = [...data];
        
        filterCardBtns.forEach(btn => {
                btn.addEventListener("click", event => {
                        if(!tags.includes(event.currentTarget.name)){
                                tags.push(event.currentTarget.name);
                                boxFilter.innerHTML += ` <div class="filter">
                                                                <span class="filter--name">${event.currentTarget.name}</span>
                                                                <button class="filter-close">X</button>
                                                        </div>`;
                        }
                
                        if(tags.length === 1) boxFilterContainer.classList.add("active"); 
                
                        for (let tag of tags) {
                                if (roles.includes(tag)) {
                                        cardsSelected = cardsSelected.filter((card) => card.role === tag);
                                } else if (levels.includes(tag)) {
                                        cardsSelected = cardsSelected.filter((card) => card.level === tag);
                                } else if (languages.includes(tag)) {
                                        cardsSelected = cardsSelected.filter((card) => card.languages.includes(tag));
                                } else {
                                        cardsSelected = cardsSelected.filter((card) => card.tools.includes(tag));
                                }
                        }
                        
                        load(cardsSelected);
                });
        });
}

load(data);

clearBtn.addEventListener("click", () => {
        boxFilterContainer.classList.remove("active");
        boxFilter.innerHTML = '';
        tags = [];
        load(data);
})