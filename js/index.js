const countriesElem = document.querySelector(".countries");
const dropElement = document.querySelector(".drop");
const dropDown = document.querySelector(".dropDown");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".search");
const toggle = document.querySelector(".toggle");
const moon = document.querySelector(".moon");
const regionName = document.getElementsByClassName("regionName");
const countryDis = document.querySelector(".countryDis");
const  first = document.querySelector(".first");




async function getCountry() {
  const url = await fetch("https://restcountries.com/v2/all");
  const res = await url.json();
  console.log(res);
  countriesElem.innerHTML=''
  res.forEach((ele) => {
    showCountry(ele);
    // console.log(ele)
  });
}

getCountry();
function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = ` 
        <div class="country-img">
            <img src="${data.flag}" alt="">
        </div>
            <div class="country-info">
                <h2 class="CountryName" >${data.name}</h2>
                <p><strong>Population: </strong>${Intl.NumberFormat(data.alpha3Code, {style: 'decimal'}).format(data.population) }</p>
                <p class="regionName" ><strong >Region: </strong>${data.region}</p>
                <p><strong>Capital: </strong>${data.capital}</p>
            </div>`;

  countriesElem.appendChild(country);
  country.addEventListener("click",()=>{
    showCountryDetail(data);
  })
}

dropDown.addEventListener("click", () => {
  dropElement.classList.toggle("showDropDown");
});


region.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element);
    Array.from(regionName).forEach((elem) => {
      console.log(elem.innerText);
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        elem.parentElement.parentElement.style.display = "grid";
      } else {
        elem.parentElement.parentElement.style.display = "none";
      }
    });
  });
});


const CountryName = document.getElementsByClassName("CountryName");
search.addEventListener("input", () => {
    Array.from(CountryName).forEach((elem) => {
        if (
          elem.innerText.toLowerCase().includes(search.value.toLowerCase())
        ) {
          elem.parentElement.parentElement.style.display = "grid";
        } else {
          elem.parentElement.parentElement.style.display = "none";
        }
      });
});



toggle.addEventListener("click", ()=>{
    document.body.classList.toggle("dark")
    moon.classList.toggle("fas")
})



function showCountryDetail(data){
  document.body.classList.toggle("BackContentHideAndShow")
  first.classList.toggle("firstContainer");
    countryDis.classList.toggle("show")
    if (data.name == "Antarctica"){
    return (countryDis.innerHTML = `
    <div class="model">
        <h1 style="color:red;margin-inline:auto"> <br>Not found please refresh your page...</h1>
    </div>`)};


    countryDis.innerHTML= 
    `
     <button class="back"><i class="fa-solid fa-arrow-left-long"></i>Back</button>
     <div class="model">
         <div class="leftmodel">
             <img src="${data.flag}" alt="flag" srcset="">
         </div>
         <div class="rightmodel">
             <h3>${data.name}</h3>
             <div class="modelInfo">
                 <div class="innerleft inner">
                     <p><strong>Native Name: </strong>${data.nativeName}</p>
                     <p class="regionName"><strong>Population: </strong>${Intl.NumberFormat(data.alpha3Code, {style: 'decimal'}).format(data.population) }</p>
                     <p class="regionName"><strong>Region: </strong>${data.region}</p>
                     <p class="regionName"><strong>Sub Region: </strong>${data.subregion}</p>
                     <p class="regionName"><strong>Capital: </strong>${data.capital}</p>
                 </div>
                 <div class="innerRight inner">
                     <p><strong>Top level Domin: </strong>${data.topLevelDomain.map(elem=>elem)}</p>
                     <p class="regionName"><strong>Currency: </strong>${data.currencies.map(ele=>ele.name)}</p>
                     <p class="regionName"><strong>Languages: </strong>${data.languages.map(ele=>ele.name)}</p>
                 </div>
             </div>
             <div class="borders">
             <p><strong>Border Countries :</strong> </p>
             <div class="border">
             ${data.borders? data.borders.map((ele) => `<p class="brcountries"> ${ele}</p>`).join(""):"No borders"}
             </div>
         </div>
         </div>
     </div>
    `

    const back =  countryDis.querySelector(".back"); 
    back.addEventListener("click",()=>{
        document.body.classList.toggle("BackContentHideAndShow");
        first.classList.toggle("firstContainer");
        countryDis.classList.toggle("show")
        console.log("hi");
    })
}

