const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // remove previous search item 
    phoneContainer.textContent = '';

     // display only 10 phone 
     const showAll = document.getElementById('show-all');
     if(dataLimit && phones.length > 10){
      phones = phones.slice(0, 8);
      showAll.classList.remove('d-none');
     }else{
        showAll.classList.add('d-none');
     }

    //  display no phone found 
    const phoneNotFound = document.getElementById('no-phone-message');
    if(phones.length === 0){
       phoneNotFound.classList.remove('d-none');
    }else{
        phoneNotFound.classList.add('d-none');
    }

    // display all phone 
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        
        phoneDiv.innerHTML = `
        <div class="card h-100 p-4">
         <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
           <h5 class="card-title">${phone.phone_name}</h5>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
         </div>
        `;
    
        phoneContainer.appendChild(phoneDiv);
    });
    // stop Spinner or loader 
    toggleSpinner(false);
}

// common process search method 
const processSearch = (dataLimit) => {
    // start Spinner or loader 
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // search to get item 
    loadPhone(searchText, dataLimit);
}

// handle search button click 
document.getElementById('search-btn').addEventListener('click', function(){
    processSearch(10);
})

const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById('loading');
    if(isLoading){
        loadingSection.classList.remove('d-none');
    }else{
        loadingSection.classList.add('d-none');
    }

}

// show all 
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
});

// loadPhone();