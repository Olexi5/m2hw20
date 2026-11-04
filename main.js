const list = document.querySelector(".gallery");
const form = document.querySelector(".search-form");
const btn = document.querySelector(".load")
const API_KEY = "58179698-c57230acc5665af1e79bc00f7";
const BASE_URL = "https://pixabay.com/api/";
let page = 1;
let query = ""

function getImg() {
  const params = new URLSearchParams({
    page: page,
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12,
    key: API_KEY,
    q: query,
  });
  fetch(`${BASE_URL}?${params}`).then(d=>d.json()).then(data=>{
    const hasArticles = data.totalHits > page * 12;
    btn.hidden = !hasArticles;
    list.innerHTML += renderImg(data.hits)
})
}
function renderImg(data){
    return data.map(
      (img) => `
    <div class="photo-card">
      <img src="${img.webformatURL}" alt="" />
      <div class="stats">
        <p class="stats-item">
          <i class="material-icons">thumb_up</i>

          ${img.likes}
        </p>

        <p class="stats-item">
          <i class="material-icons">visibility</i>

          ${img.views}
        </p>

        <p class="stats-item">
          <i class="material-icons">comment</i>

          ${img.comments}
        </p>

        <p class="stats-item">
          <i class="material-icons">cloud_download</i>

          ${img.downloads}
        </p>
      </div>
    </div>    
    `,
    ).join(" ")
}
form.addEventListener("input", (e) => {
    list.innerHTML=""
  e.preventDefault();
  query = form.elements['query'].value
  getImg()
});
btn.addEventListener("click", ()=>{
    page++
    getImg()
})