

const loadNewsCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data.data.news_category;
}

const showNewsCategory = async () => {
    const categories = await loadNewsCategory();
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.classList.add('flex', 'flex-wrap', 'md:flex-nowrap',);

    categories.forEach(category => {

        const li = document.createElement('li');
        li.classList.add('mx-4', 'my-4', 'md:my-2',);
        li.innerHTML = `
        <a href="#" onclick="getCategoryId('${category.category_id}','${category.category_name}')">${category.category_name}</a>
        `
        categoryContainer.appendChild(li);
    })
}



const getCategoryId = async (categoryId, cagegoryName) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    const categoryNews = data.data;
    const newsContainer = document.getElementById('news');
    const itemsFound = document.getElementById('items-found');

    if (Number(categoryNews.length) === 0) {
        itemsFound.innerText = `No Items Found Sorry`;
    } else {
        const newsCategory = await loadNewsCategory();
        newsCategory.forEach(category => {
            const categoryName = category.category_name;
            if (categoryId) {

            }
        })
    }

    newsContainer.innerHTML = ``;
    categoryNews.forEach(news => {
        const divElement = document.createElement('div');
        divElement.innerHTML = `

        <div id="news-area"
        class="mt-10 md:container md:mx-auto flex flex-col md:flex-row bg-white p-10 w-full rounded-lg shadow-sm md:items-center">
        <div class="img w-full md:w-1/4 flex items-center justify-center md:justify-start mb-6 md:mb-0">
            <img class="rounded-lg shadow-sm object-scale-down h-80 " src="${news.thumbnail_url}" alt="">
        </div>
        <div class="content-area md:w-3/4 ml-6 lg:ml-0">
            <div class="content">
                <h3 class="text-2xl text-gray-900 mb-2">${news.title}
                </h3>
                <p>${news.details.slice(0, 350)}</p>
                <br>
            </div>
            <div
                class="content-below w-3/4 md:w-full flex flex-wrap md:flex-nowrap space-y-5 md:space-y-0 justify-between items-center mt-4">
                <div class="author-details flex justify-center items-center space-x-3">
                    <div class="author-img">
                        <img class="object-scale-down h-12 w-12 rounded-full border border-themeColor"
                            src="${news.author.img}" alt="">
                    </div>
                    <div class="author-details">
                        <h4 class="text-gray-900">${news.author.name}</h4>
                        <p class=" text-sm mt-1">${news.author.published_date}</p>
                    </div>
                </div>
                <div class="view-count text-gray-900 flex items-center justify-center">
                    <span class="mr-4 text-lg">
                        <i class="fa-regular fa-eye"></i>
                    </span>
                    <span>1.5M</span>
                </div>
                <div class="star space-x-2 text-gray-900">
                    <span>${news.rating.number}</span>
                    <span>${news.rating.badge}</span>

                </div>
                <div class="arrow">

                    <span class=" cursor-pointer text-2xl">
                        <ion-icon class=" text-themeColor rounded shadow px-6 py-2" id="delete-btn"
                            name="arrow-forward-outline">
                        </ion-icon>
                    </span>

                </div>
            </div>


        </div>
    </div>
        `;
        newsContainer.appendChild(divElement);
    })
}




showNewsCategory();