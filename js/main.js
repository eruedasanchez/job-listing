import data from '../data.json' assert{type: 'json'};

const boxFilterContainer = document.getElementById('box-filter-container');
const boxFilter = document.getElementById('box-filter');
const clearBtn = document.getElementById('btn-clear');
const cardsContainer = document.getElementById('cards-container');

let roles = [], levels = [], languages = [], tools = [], tags = [];

/********** Place each filter in its corresponding category **********/

const placeSkillsInCategory = data => {
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
}

/********** Check that the filter is no longer applied and add it to the filter box **********/

const checkAndAdd = (filters, filter) => {
        if(!filters.includes(filter)){
                filters.push(filter);
                boxFilter.innerHTML += ` <div id="${filter}" class="filter">
                                                <span class="filter--name">${filter}</span>
                                                <button class="filter-close" name="${filter}">X</button>
                                        </div>`;
        }
        
        if(filters.length === 1) boxFilterContainer.classList.add("active");
}

/********** Filter cards by each of the selected filters **********/

const filterBy = filters => {
        let filteredCards = [...data];
        for (let filter of filters) {
                if (roles.includes(filter)) {
                        filteredCards = filteredCards.filter((card) => card.role === filter);
                } else if (levels.includes(filter)) {
                        filteredCards = filteredCards.filter((card) => card.level === filter);
                } else if (languages.includes(filter)) {
                        filteredCards = filteredCards.filter((card) => card.languages.includes(filter));
                } else {
                        filteredCards = filteredCards.filter((card) => card.tools.includes(filter));
                }
        }
        return filteredCards;
}

/********** Load selected cards **********/

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

        /***** Filter cards by tags *****/
        
        const filterCardBtns = document.querySelectorAll(".skill-name");
        let cardsSelected = [];
        
        filterCardBtns.forEach(btn => {
                btn.addEventListener("click", event => {
                        const filterName = event.currentTarget.name;
                        checkAndAdd(tags, filterName);
                        cardsSelected = filterBy(tags);
                        load(cardsSelected);
                });
        });

        /***** Remove filters according to indicated tag *****/

        const filterCloseBtns = document.querySelectorAll(".filter-close");

        filterCloseBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                        const filterName = btn.name;
                        const containerFilterSelected = document.getElementById(`${filterName}`);
                        
                        tags = tags.filter(tag => tag !== filterName);
                        cardsSelected = filterBy(tags);
                        
                        boxFilter.removeChild(containerFilterSelected); // Filter container (name and X button) is removed from the filter box

                        if(tags.length === 0) boxFilterContainer.classList.remove("active"); // Hide the filter box (no filters applied)
                        
                        load(cardsSelected);
                })
        });
}

clearBtn.addEventListener("click", () => {
        boxFilterContainer.classList.remove("active");
        boxFilter.innerHTML = '';
        tags = [];
        load(data);
})


/*------------------------------*\
        #PROGRAM EXECUTION
\*------------------------------*/

placeSkillsInCategory(data);
load(data);
