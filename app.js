const API_KEY = "869eea51f808485284e8d3d7ef06752f" ;
const url = "https://newsapi.org/v2/everything?q=" ;

window.addEventListener('load',() => fetchNews("india")) ; // by defalut when window gets load it should fetch and display the news of India

async function fetchNews(e) {
    const response = await fetch(`${url}${e}&apikey=${API_KEY}`); // here we are completing the full url link and fetching data : url , location_of_news_required , api_key ;
    const data = await response.json() ;
    console.log(data) ;
    bindData(data.articles) ; //1)  The bindData function is responsible for handling the display or processing of news articles fetched from an API. It typically takes an array of article objects as input and performs tasks such as rendering them on a webpage, logging them to the console, or any other form of presentation or manipulation desired by the developer.
}

function bindData(articles) { //1) this will create n number of templates that we are fetching
    const x = document.getElementById("card-container-list") ;
    const news_Card_Template = document.getElementById("template-news-card") ;

    x.innerHTML= "" ; //2) Now First If upar agar already 100 cards daal rakhe hae and then humne new_cards_ aur bna diye den repetion problem occur hoo jae gi
    // 3) Now we will make loop upto n number of cards to create new cards and then in 4) we will display those cards 
    

    articles.forEach( element => {       // 4) Element contains the whole data of the object 
        if(!element.urlToImage)  return ;// this is the code that checks if the article does not contain the image then skip that article
        let card_Clone_Template = news_Card_Template.content.cloneNode(true) // chatgpt : 
        
        //4) Fill data in cards 
        fill_Data_innerHTML_UPDATION(card_Clone_Template, element) ;
        
        //5) Append cloned cards 
        x.appendChild(card_Clone_Template) ;
    });
}


function fill_Data_innerHTML_UPDATION(card_Clone_Template, element) {

    let LI_news_image = card_Clone_Template.querySelector('#news-img') ;
    let LI_news_Title = card_Clone_Template.querySelector('#news-title') ;
    let LI_news_Source = card_Clone_Template.querySelector("#news-source") ;
    let LI_news_Desc = card_Clone_Template.querySelector('#news-desc') ;
    
     // where LI_news_ .... => represents the cloned childs in html , & they are going to show the pair daya by pointing towards the keys of the object
    LI_news_image.src = element.urlToImage ;
    LI_news_Title.innerHTML = element.title ;
    LI_news_Desc.innerHTML = element.description;

    //LI_news_Source.innerHTML = element.source.name ; // THIS LINE WILL ALSO CONTAIN DATE 
    // in this function below we have converted the date to normal format : 
    const date = new Date(element.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta" ,
    }) ;

    LI_news_Source.innerHTML = `${element.source.name} : ${date}` ;
    //  NOW THIS LINE WRITTEN ABOVE WILL PRINT the name of the source 1st and then the date along with the time




    // 6) CREATING ONCLICK FUNCTION ON CARD CLONED 
    // in this case we will fetch the link present inside of the article that we are fetching from NEWS_API 
    card_Clone_Template.firstElementChild.addEventListener("click", () => {
        window.open(element.url, "_blank") ; // now : _blank is ued to open new tab ,  and element.url will give us the original link of the news (card) on which the user clicks ...
    })
}


//7) HANDELING NAVIGATION : 
let current_selected_nav = null ;
function NAV(id) {
    fetchNews(`${id} india`) ;  //THIS WILL GIVE THE NEWS OF INDIA : 
    const nav_item = document.getElementById(id) ;
    current_selected_nav?.classList.remvoe('active') ; // if any other navitem slecetd : remove current active class
    current_selected_nav = nav_item ; // now current points towards new navitem selected
    current_selected_nav.classList.add('actve') ;
}

//8) HANDELING SEARCH BAR 
let searchButton = document.getElementById("search-button") ;
let input = document.getElementById("input") ;
searchButton.addEventListener('click', ()=> {
    let x = input.value ;
    if(!x) {
        return ;
    }
    fetchNews(x) ;
    // updating current selected 
    // current_selected_nav? this is the condition to check that if there is a item present in current selected or not 
    current_selected_nav?.classList.remove('active') ;
    current_selected_nav = null;
})



//9) reload 
function reload() {
    window.location.reload() ;
}









// NAV BUTTON 
document.getElementById("toggle-btn").addEventListener('click', () => {
    let elements = document.getElementsByClassName("show");

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle("dropdown");
        // Toggle "dropdown" on some other element if needed
        // Example:
        // document.getElementById("some-dropdown-element").classList.toggle("dropdown");
    }
});

