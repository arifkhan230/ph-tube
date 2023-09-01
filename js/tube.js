const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json()
    const categories = data.data;
    // console.log(categories)
    displayCategory(categories)
}

const displayCategory = (categories) => {
    // console.log(categories)
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((category) => {
        // console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick ="loadCategoryData('${category.category_id}')" class="bg-gray-200 text-2xl text-[#252525B3] px-5 py-2 rounded">${category.category}</button>
        
        `;
        categoryContainer.appendChild(div);

        
    })

}
const loadCategoryData = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const cardData = await response.json()
    console.log(cardData)

    const noDataContainer = document.getElementById('no-data-container')
    noDataContainer.innerHTML = ''
    if(cardData.status === false){  
        const div = document.createElement('div')
        div.innerHTML = `
        <div>
            <div class="flex justify-center mb-8">
                <img src="images/Icon.png" alt="">
            </div>
                <h2 class="text-3xl text-center font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        
        `;
        noDataContainer.appendChild(div)
    }

    
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''
    
    cardData.data.forEach((card) => {
        console.log(card)

        let publishedDate = document.createElement('div')
        publishedDate.classList.add('absolute', 'bottom-5', 'right-10','bg-black')

        const seconds = card.others.posted_date
        if(seconds){
            const hours = parseInt ((seconds / 60) /60);
            const minute = parseInt((seconds % (60 * 60)) / 60 )
            console.log(hours)
            console.log(minute)
            if(minute > 0){
                const h5 = document.createElement('h5')
                h5.classList.add('text-white','font-medium')  
                h5.innerHTML = ` ${hours}hr ${minute} min ago`;
                publishedDate.appendChild(h5)
            }
        }
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card bg-base-100">
            <figure id='published-date-container' class= "relative">
                <img class= "h-[200px] w-[312px] rounded-lg"  src= ${card.thumbnail} />
                
            </figure>
            <div class="card-body">
                <div class = "flex gap-3">
                    <div>
                        <img class="rounded-full w-[40px] h-[40px]" src=${card.authors[0].profile_picture
                        } alt="">
                       
                    </div>
                    <div>
                        <h2 class="card-title text-2xl text-[#171717] font-bold mb-3">${card.title}</h2>
                        <div class= "flex gap-2">
                            <h3 class= "text-[14px] font-medium text-[#171717B3] mb-3"> ${card.authors[0].profile_name}</h3>
                            <p>
                                ${card.authors[0].verified? `<img class= "h-[20px] w-[20px]" src="images/tick.png" alt=""></img>` : ''} 
                            </p>
                        </div>
                        <h3 class= "text-[14px] font-medium text-[#171717B3] mb-3">${card.others.views} views</h3>
                    </div>
                </div>
            </div>
        </div>

        `;
        const publishedContainer = div.querySelector('#published-date-container');
        publishedContainer.appendChild(publishedDate)
        cardContainer.appendChild(div);
    })
    
}


const handleBlog = () =>{
    console.log('hello')
    window.location.href = "blog.html"
}

loadData()