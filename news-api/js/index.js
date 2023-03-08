const loadNewsData = async() =>{
  const url = `https://newsapi.org/v2/everything?q=tesla&from=2023-02-08&sortBy=publishedAt&apiKey=a87014373a674a57b7dbd09ce2147fab`
  spinner(true)
 try{
  const res = await fetch(url)
  const data = await res.json();
  showNewsData(data.articles.slice(0, 6));
  document.getElementById('sort_by_date').addEventListener('click', function(){
    const sortDate = data.articles.sort(function(a, b){
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
    showNewsData(sortDate)
  })
 }
 catch(error){
  console.log(error)
 }
};
const showNewsData = newsData =>{
  const cardContainer = document.getElementById("card-container");
  newsData.forEach(newsSingleData =>{
    // console.log(newsSingleData)
    const {title, urlToImage, description, publishedAt} = newsSingleData;
    const div = document.createElement('div');
    div.classList.add("card", "mb-3")
    div.innerHTML = ` 
    <div class="row g-0">
        <div class="col-md-4">
          <img src="${urlToImage}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p>${description}</p>
            <p class="card-text"><small class="text-muted">${publishedAt}</small></p>
          </div>
        </div>
      </div>
    `;
    cardContainer.appendChild(div)
  });
  spinner(false)
};

function spinner (isLoading){
  const spinner =  document.getElementById('spinner')
  if(isLoading){
    spinner.classList.remove('d-none');
  }
  else{
    spinner.classList.add('d-none');
  }
};

document.querySelector('#see_more_btn').addEventListener('click', function(){
  fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-02-08&sortBy=publishedAt&apiKey=a87014373a674a57b7dbd09ce2147fab')
  .then(res => res.json())
  .then(data => {
    showNewsData(data.articles)
  });
document.getElementById('see_more_btn').style.display = 'none';
})

