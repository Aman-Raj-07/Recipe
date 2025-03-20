const searchbox = document.querySelector("#searchbox");
const searchbtn = document.querySelector("#searchbtn");
const recipebox = document.querySelector("#recipebox");
const recipeDetailsContent = document.querySelector("#recipedetailscontent");
const closebtn = document.querySelector("#recipeclose")

const fetchrecipe = async(query) =>{
    recipebox.innerHTML = "<h2>Fetching Recipe</h2>";
       const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
       const recipedata = await data.json();
    
    recipebox.innerHTML = "";
    recipedata.meals.forEach(meal => { 
        const recipediv = document.createElement("div");
        recipediv.classList.add("recipe");
        recipediv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> category</p>
        `
        recipediv.addEventListener("click",()=>{
            openrecipepopup(meal);
        })
        recipebox.appendChild(recipediv);
    });
}

searchbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchmeal = searchbox.value.trim();
    fetchrecipe(searchmeal);
});

const fetchingredents = (meal)=>{
    let ing = "";
    for(let i = 1; i <= 20; i++){
        const inger = meal[`strIngredient${i}`];
        if(inger){
            const measure = meal[`strMeasure${i}`];
            ing += `<li>${measure} ${inger}</li>`
        }else{
            break;
        }
    }
    return ing;
} 
const openrecipepopup = (meal) =>{
    recipeDetailsContent.innerHTML=`
         <h2 id="recipename">${meal.strMeal}</h2>
         <h3 class="h3">Ingredents:</h3>
         <ul id="ingredentslist">${fetchingredents(meal)}</ul>
        <div id="instruction">
            <h3 class="h3">Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
   

    recipeDetailsContent.parentElement.style.display = "block";
};

closebtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});