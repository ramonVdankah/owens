export function handleButtonClick() {
    fetch('http://213.159.208.225:3001/api/data')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('productContainer');
            const productContainer1 = document.getElementById('productContainer1');
            data.forEach((item,index) => {
                const productDiv = document.createElement('div');
                const image = document.createElement('img');
                image.src = item.path
                image.alt = 'Product';
                image.className = "saleimage"
                const name = document.createElement('p');
                name.innerText = item.name;
                const price = document.createElement('p');
                price.innerText = item.price;
                productDiv.appendChild(image);
                productDiv.appendChild(name);
                productDiv.appendChild(price);
                if (index < 2) {
                    productContainer.appendChild(productDiv);
                  } else {
                    productContainer1.appendChild(productDiv);
                  }
            });
        })
        .catch(error => console.error('Ошибка при получении данных', error));

}
let site;
let mainPage;
let profilePage;
let registration;
let loginn;
let forms;
let aboutus;
let products;
let SortedCloth;
let adminpanel;
let Corzina;
document.addEventListener('DOMContentLoaded', function() {
    handleButtonClick();
    setTimeout(savePages, 10);
  });
export function profileClick(){
  mainPage.remove();
  products.remove();
  site.appendChild(profilePage)
  adminpanel.remove();
  aboutus.remove();
}
export function logoClick(){
  profilePage.remove();
  products.remove();
  site.appendChild(mainPage)
  adminpanel.remove();
  aboutus.remove();
}
export function aboutClick(){
  profilePage.remove();
  products.remove();
  mainPage.remove();
  adminpanel.remove();
  site.appendChild(aboutus);
}
export function alreadyRegistered(){
  registration.remove();
  forms.appendChild(loginn)
}
export function dontHaveAccount(){
  loginn.remove();
  forms.appendChild(registration)
}
export function savePages(){
  site = document.getElementById('site');
  mainPage = document.getElementById('mainpage');
  profilePage = document.getElementById('profilepage');
  aboutus = document.getElementById('aboutus');
  aboutus.remove();
  adminpanel = document.getElementById('adminpanel');
  adminpanel.remove();
  
  products = document.getElementById('products')
  SortedCloth = document.getElementById('SortedCloth');
  products.remove();
  loginn = document.getElementById('login');
  registration = document.getElementById('registration')
  forms = document.getElementById('forms')
  displayCartItems();
  Corzina = document.getElementById('corzinapage');
  Corzina.remove();
  loginn.remove()
  if(getCookie('name')!==''){
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'middle';

    const welcomeText = document.createElement('h1');
    welcomeText.textContent = `Добро пожаловать, ${getCookie('name')}!`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Выйти из аккаунта';
    deleteButton.addEventListener('click', function() {
    deleteCookie();
    welcomeDiv.remove();
    forms.appendChild(registration);
    });

    welcomeDiv.appendChild(welcomeText);
    welcomeDiv.appendChild(deleteButton);
    if(getCookie('name')==="admin"){
      document.cookie = "admin=true; expires=Thu, 31 Dec 2023 23:59:59 GMT; path=/";
    
    const adminbutton = document.createElement('button');
    adminbutton.textContent='Войти в админ панель';
    adminbutton.addEventListener('click' ,function(){
      mainPage.remove();
      profilePage.remove();
      products.remove();
      aboutus.remove();
      site.appendChild(adminpanel)
      afetchProducts();
    })
    welcomeDiv.appendChild(adminbutton);
  }
    forms.appendChild(welcomeDiv);
    registration.remove();
  }
  profilePage.remove()
  
}
export function registerUser(login, password) {
  fetch('http://213.159.208.225:3001/api/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Регистрация прошла успешно');
        // Дополнительные действия после успешной регистрации
      } else {
        console.error('Ошибка при регистрации');
        // Обработка ошибки при регистрации
      }
    })
    .catch(error => {
      console.error('Ошибка при выполнении запроса', error);
      // Обработка других ошибок при выполнении запроса
    });
}
export function registrationform(){
  const logininput = document.getElementById('login-input');
  const password = document.getElementById('password-input')
  const confirmpassword = document.getElementById('confirm-password-input')
  if(password.value!==confirmpassword.value){
    alert("Пароли не совпадают")
  }
  else{
    if(logininput.value.length<5){
      alert("LMAO4REAL")
    }
    else{
      registerUser(logininput.value, password.value)
    }
  }
  
}
export function loginUser(login, password) {
  fetch('http://213.159.208.225:3001/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  })
    .then(response => {
      if (response.ok) {
        alert('Успешная аутентификация');
        document.cookie = `name=${login}; expires=Thu, 31 Dec 2023 23:59:59 GMT; path=/`;
        loginn.remove();
        const welcomeDiv = document.createElement('div');
      welcomeDiv.className = 'middle';

      const welcomeText = document.createElement('h1');
      welcomeText.textContent = `Добро пожаловать, ${getCookie('name')}!`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Выйти из аккаунта';
      deleteButton.addEventListener('click', function() {
      deleteCookie();
      welcomeDiv.remove();
      forms.appendChild(registration);
      });
      

      welcomeDiv.appendChild(welcomeText);
      welcomeDiv.appendChild(deleteButton);
      if(login==="admin"){
        document.cookie = "admin=true; expires=Thu, 31 Dec 2023 23:59:59 GMT; path=/";
      
      const adminbutton = document.createElement('button');
      adminbutton.textContent='Войти в админ панель';
      adminbutton.addEventListener('click' ,function(){
        mainPage.remove();
        profilePage.remove();
        products.remove();
        aboutus.remove();
        site.appendChild(adminpanel)
      })
      welcomeDiv.appendChild(adminbutton);
    }
      
      forms.appendChild(welcomeDiv);
      } else {
        console.error('Ошибка при аутентификации');
        // Обработка ошибки при аутентификации
      }
    })
    .catch(error => {
      console.error('Ошибка при выполнении запроса', error);
      // Обработка других ошибок при выполнении запроса
    });
}
export function loginform(){
  const loginlogin = document.getElementById('login-login');
  const loginpassword = document.getElementById('login-password');
  console.log(loginlogin.value)
  console.log(loginpassword.value)
  loginUser(loginlogin.value,loginpassword.value);

}
export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName.trim() === name) {
      return cookieValue;
    }
  }
  return '';
}
function deleteCookie() {
  document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
}
export function openMenList(){
  const menlist = document.getElementById('MenList') 
  menlist.classList.toggle('invisibility')
  
}
export function openWomenList(){
  const womenlist = document.getElementById('womenlist') 
  womenlist.classList.toggle('invisibility')
  
}
export function menfoot(){
mainPage.remove();
aboutus.remove();
profilePage.remove();
site.appendChild(products)
while(SortedCloth.firstChild){
  SortedCloth.removeChild(SortedCloth.firstChild);
}
fetchProducts('men','foot')
}
export function menjewelery(){
  mainPage.remove();
  aboutus.remove();
  profilePage.remove();
  site.appendChild(products)
  console.log(SortedCloth)
  while(SortedCloth.firstChild){
    SortedCloth.removeChild(SortedCloth.firstChild);
  }
  fetchProducts('men','jewelery')
}
export function mencloth(){
  mainPage.remove();
  aboutus.remove();
  profilePage.remove();
  site.appendChild(products)
  while(SortedCloth.firstChild){
    SortedCloth.removeChild(SortedCloth.firstChild);
  }
  fetchProducts('men','cloth')
}
export function womenfoot(){
  mainPage.remove();
  aboutus.remove();
  profilePage.remove();
  site.appendChild(products)
  while(SortedCloth.firstChild){
    SortedCloth.removeChild(SortedCloth.firstChild);
  }
  fetchProducts('women','foot')
}
export function womenjewelery(){
  mainPage.remove();
  aboutus.remove();
  profilePage.remove();
  site.appendChild(products)
  console.log(SortedCloth)
  while(SortedCloth.firstChild){
    SortedCloth.removeChild(SortedCloth.firstChild);
  }
  fetchProducts('men','jewelery')
}
export function womencloth(){
  mainPage.remove();
  aboutus.remove();
  profilePage.remove();
  site.appendChild(products)
  while(SortedCloth.firstChild){
    SortedCloth.removeChild(SortedCloth.firstChild);
  }
  fetchProducts('women','cloth')
}
async function updateCartItems(updatedCartItems) {
  const corzinaItemsDiv = document.getElementById('corzina-items');
  corzinaItemsDiv.innerHTML = '';

  for (const productId of updatedCartItems) {
    try {
      const response = await fetch(`http://213.159.208.225:3001/api/corzina/${productId}`);
      if (response.ok) {
        const product = await response.json();

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('corzina-item');

        const imgElement = document.createElement('img');
        imgElement.src = product.path;
        imgElement.className = 'corzina-item-image';
        itemDiv.appendChild(imgElement);

        const nameElement = document.createElement('p');
        nameElement.textContent = product.name;
        itemDiv.appendChild(nameElement);

        const priceElement = document.createElement('p');
        priceElement.textContent = product.price;
        itemDiv.appendChild(priceElement);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => removeFromCart(product.id));
        itemDiv.appendChild(removeButton);

        corzinaItemsDiv.appendChild(itemDiv);
      } else {
        console.error('Ошибка при выполнении запроса');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса', error);
    }
  }
}


function addToCart(itemId) {
  const cartItems = getCartItems();
  cartItems.push(itemId);
  setCartItems(cartItems);
  console.log('Товар добавлен в корзину');
}
function getCartItems() {
  const cartItemsCookie = document.cookie.replace(/(?:(?:^|.*;\s*)corzina\s*=\s*([^;]*).*$)|^.*$/, "$1");
  return cartItemsCookie ? JSON.parse(cartItemsCookie) : [];
}
async function displayCartItems() {
  const cartItems = getCartItems();
  const corzinaItemsDiv = document.getElementById('corzina-items');
  console.log(corzinaItemsDiv)
  while(corzinaItemsDiv.firstChild){
    corzinaItemsDiv.removeChild(corzinaItemsDiv.firstChild);
  }

  for (const productId of cartItems) {
    try {
      const response = await fetch(`http://213.159.208.225:3001/api/corzina/${productId}`);
      if (response.ok) {
        const product = await response.json();

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('corzina-item');

        const imgElement = document.createElement('img');
        imgElement.src = product.path;
        imgElement.className = 'corzina-item-image';
        itemDiv.appendChild(imgElement);

        const nameElement = document.createElement('p');
        nameElement.textContent = product.name;
        itemDiv.appendChild(nameElement);

        const priceElement = document.createElement('p');
        priceElement.textContent = product.price;
        itemDiv.appendChild(priceElement);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => removeFromCart(product.id));
        itemDiv.appendChild(removeButton);

        corzinaItemsDiv.appendChild(itemDiv);
      } else {
        console.error('Ошибка при выполнении запроса');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса', error);
    }
  }
}
function removeFromCart(productId) {
  const cartItems = getCartItems();
  const updatedCartItems = cartItems.filter(item => item !== productId);
  updateCartItems(updatedCartItems);
  displayCartItems();
}
function setCartItems(cartItems) {
  document.cookie = `corzina=${JSON.stringify(cartItems)}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
}
function fetchProducts(gender, category) {
  const sortedCloth = document.getElementById('SortedCloth');

  fetch('http://213.159.208.225:3001/api/products?gender=' + gender + '&category=' + category)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при выполнении запроса');
      }
    })
    .then(data => {
      // Обработка полученных данных
      data.forEach(item => {
        // Создаем div для каждого товара
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('product-item');

        // Создаем элемент для картинки
        const imgElement = document.createElement('img');
        imgElement.src = item.path;
        imgElement.className = 'catalogicon';
        if (gender === "women" && category === "cloth") {
          imgElement.className = 'womencatalogicon';
        }
        itemDiv.appendChild(imgElement);

        // Создаем элемент для названия
        const nameElement = document.createElement('p');
        nameElement.textContent = item.name;
        itemDiv.appendChild(nameElement);

        // Создаем элемент для цены
        const priceElement = document.createElement('p');
        priceElement.textContent = item.price;
        itemDiv.appendChild(priceElement);

        // Создаем кнопку "В корзину"
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'В корзину';
        addToCartButton.addEventListener('click', () => {
          addToCart(item.id);
        });
        itemDiv.appendChild(addToCartButton);

        // Добавляем товар в элемент sorted-cloth
        sortedCloth.appendChild(itemDiv);
      });
    })
    .catch(error => {
      console.error('Ошибка при выполнении запроса', error);
      // Handle errors
    });

  // Функция для добавления идентификатора товара в куки
  
  

  // Функция для получения элементов корзины из куки
  
 
  

  // Функция для установки элементов корзины в куки
  
}

export function corzinaClick(){
  mainPage.remove();
  profilePage.remove();
  aboutus.remove();
  adminpanel.remove();
  products.remove();
  site.appendChild(Corzina)
}




function createTableRow(product) {
  const row = document.createElement('tr');
  
  const idCell = document.createElement('td');
  idCell.textContent = product.id;
  
  const nameCell = document.createElement('td');
  nameCell.textContent = product.name;
  
  const priceCell = document.createElement('td');
  priceCell.textContent = product.price;
  
  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  
  // Add event listener to the delete button
  deleteButton.addEventListener('click', () => {
    deleteProduct(product.id);
  });
  
  deleteCell.appendChild(deleteButton);
  
  row.appendChild(idCell);
  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(deleteCell);
  
  return row;
}

// Function to delete a product
async function deleteProduct(id) {
  try {
    const response = await fetch(`http://213.159.208.225:3001/api/adminpanel/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      console.log('Product deleted successfully');
      // Reload the table or perform any other necessary actions
    } else {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Function to fetch and display products
async function afetchProducts() {
  try {
    const response = await fetch('http://213.159.208.225:3001/api/adminpanel');
    
    if (response.ok) {
      const products = await response.json();
      
      // Get the table element
      const table = document.getElementById('productTable');
      
      // Clear existing table rows
      while(table.firstChild){
        table.removeChild(table.firstChild);
      }
      
      // Create table rows for each product
      products.forEach(product => {
        const row = createTableRow(product);
        table.appendChild(row);
      });
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
export function addProduct() {
  const photoInput = document.getElementById('photoInput');
  const genderSelect = document.getElementById('genderSelect');
  const categorySelect = document.getElementById('categorySelect');
  const priceInput = document.getElementById('priceInput');
  const itemmname = document.getElementById('itemname');
  const name = itemmname.value; // You can customize this as per your requirements
  const price = priceInput.value;
  const gender = genderSelect.value;
  const category = categorySelect.value;

  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const arrayBuffer = reader.result; // Binary data of the file

    const path = `images/${generateRandomFilename()}.png`; // Generated filename for the image

    // Send the data to the API
    fetch('http://213.159.208.225:3001/api/adminpanel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, gender, category, path }),
    })
      .then(response => {
        if (response.ok) {
          const base64Image = arrayBuffer.toString('base64');
          

          // Create the request body
          const requestBody = {
            image: base64Image,
            path: path.substring(7), // Remove the 'images/' prefix
          };
        
          return fetch("http://213.159.208.225:3001/api/saveimage", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
        } else {
          throw new Error('Ошибка при выполнении запроса');
        }
      })
      .then(() => {
        console.log('Product added successfully!');
        // Perform any additional actions or display success message
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса', error);
        // Handle errors
      });
  };

  if (file) {
    reader.readAsArrayBuffer(file);
  } else {
    console.error('No file selected');
  }
}

function generateRandomFilename() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return timestamp + randomString;
}




