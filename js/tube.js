const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json()
    const categories = data.data;
    // console.log(categories)
    displayCategory(categories)
}

const displayCategory = (categories) => {
    
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
    console.log(cardData.data)
}

loadData()