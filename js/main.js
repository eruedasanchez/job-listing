import data from '../data.json' assert{type: 'json'};

const cardsContainer = document.getElementById('cards-container');
const boxFilter = document.getElementById('box-filter');
const clearBtn = document.getElementById('btn-clear');

const load = cardsChoosen => {
        cardsContainer.innerHTML = '';

        cardsChoosen.forEach(card => {
                cardsContainer.innerHTML += `
                        <div class="card__container">
                                <div class="card__container-logo">
                                        <img src="${card.logo}" alt="logo-${card.company}">
                                </div>
                                <div class="card__container-info">
                                        <div class="card__container-info--title">
                                                <p>${card.company}</p>
                                                <div class="card__container-info--boolean">
                                                        <p class="new">new!</p>
                                                        <p class="featured">featured</p>
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
                        </div>
                `;
                
        });
}

load(data);

const filterCardBtns = document.querySelectorAll(".skill-name");

filterCardBtns.forEach(btn => {
        btn.addEventListener("click", event => {
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

                let cardsSelected = [];

                if(roles.includes(event.currentTarget.name)){
                        cardsSelected = data.filter(card => card.role === event.currentTarget.name);
                } else if(levels.includes(event.currentTarget.name)){
                        cardsSelected = data.filter(card => card.level === event.currentTarget.name);
                } else if(languages.includes(event.currentTarget.name)){
                        cardsSelected = data.filter(card => card.languages.includes(event.currentTarget.name));
                } else {
                        cardsSelected = data.filter(card => card.tools.includes(event.currentTarget.name));
                }

                console.log(cardsSelected);

                boxFilter.innerHTML += `
                                        <div class="filter">
                                                <span class="filter--name">${event.currentTarget.name}</span>
                                                <button class="filter-close">X</button>
                                        </div>
                                        `;
                
                
                // load(cardsSelected);
                // console.log(cardsSelected);
        })
});

clearBtn.addEventListener("click", () => {
        boxFilter.innerHTML = '';
})