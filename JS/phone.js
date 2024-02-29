const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  //1 get the id of container
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container
  // phoneContainer.innerText = '';
  phoneContainer.textContent = '';

  //   display show all button if more then 12 items
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  } else {
    showAllContainer.classList.add('hidden');
  }

  console.log('isShowAll', isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    console.log(phones);

    //2 create a div
    const phoneCard = document.createElement('div');
    // console.log(phone);
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    //3 set inner html
    phoneCard.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
      alt="Shoes"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
      <button  onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Detail</button>
    </div>
  </div>
    `;
    //4 append child
    phoneContainer.appendChild(phoneCard);
  });
  //   toggleLoadingSpinner(true);
  toggleLoadingSpinner(false);
};

//handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);

  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// const handleSearch2 = () => {
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById('search-field2');
//   const searchText2 = searchField.value;
//   //   console.log(searchText2);
//   loadPhone(searchText2);
// };

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
};

const handleShowAll = () => {
  //   console.log('searchText');
  handleSearch(true);
};

const handleShowDetail = async (id) => {
  console.log('show', id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-detail-container');
  showDetailsContainer.innerHTML = ` 
  <img class="mx-auto"
    src="${phone.image}"
    alt="Shoes"
  />
 
<div class="card-body">
  <h2 class="card-title">Brand:${phone.brand}!</h2>
  <h2 class="card-title">Storage:${phone.mainFeatures?.storage}!</h2>
  <h2 class="card-title">Sensors:${phone?.mainFeatures?.sensors}!</h2>
  <p class="card-title">GPS:${phone?.others?.GPS || 'not available'}!</p>
  <p class="card-title">Release Date:${
    phone?.releaseDate || 'not available'
  }!</p>
   
  </div>`;
  show_detail_modal.showModal();
};
// loadPhone();
