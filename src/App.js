import './App.css';
import Site_header from './header';
import "./test.js";
import { addProduct, alreadyRegistered, corzinaClick, dontHaveAccount, loginform, mencloth, menfoot, menjewelery, openMenList, openWomenList, profileClick, registrationform, womencloth, womenfoot, womenjewelery } from './test.js';


function App() {;
  return (
      <div className="App" id='site'>
        
        <Site_header/>
        <div id='mainpage'>
        <div className='men_women'>
        <div class="container">
        <h1 onClick={openMenList} class="title">Мужское</h1>
        <ul id='MenList' class="options invisibility">
        <li onClick={menfoot}>Обувь</li>
        <li onClick={menjewelery}>Украшения</li>
        <li onClick={mencloth}>Одежда</li>
        </ul>
        </div>
        <div class="container">
        <h1 onClick={openWomenList} class="title">Женское</h1>
        <ul id='womenlist' class="options invisibility">
        <li onClick={womenfoot}>Обувь</li>
        <li onClick={womenjewelery}>Украшения</li>
        <li onClick={womencloth}>Одежда</li>
        </ul>
        </div>
        </div>
        <img className='whiterick' src='images/whiterick.jpg' alt='coolwhiterick'></img>
        <img className='coolrick' src='images/coolrick.jpg' alt='coolrick'></img>
        <div className='absaleblock'>
          <div className='saleblock' id='productContainer'></div>
          <div className='saleblock' id='productContainer1'></div>
        </div>
          <img onClick={profileClick} src='images/imageprofile.png' className='profile' alt='profile' />
          <img onClick={corzinaClick} src='images/imagecorzina.png' className='imagecorzina'></img>
      </div>
      <div id='profilepage' className='loginpage'>
        <div className='forms' id='forms'>
        <div id='registration' className='form'>
          <h1>Registration</h1>
          <p>Login</p>
          <input id='login-input'></input>
          <p>Password</p>
          <input id='password-input'></input>
          <p>Confirm password</p>
          <input id='confirm-password-input'></input>
          <button onClick={registrationform} className='smallmargin'>Confirm Registration</button>
          <p onClick={alreadyRegistered}>already registered?</p>
        </div>
        <div id='login' className='form'>
          <h1>Login</h1>
          <p >Login</p>
          <input id='login-login'></input>
          <p >Password</p>
          <input id='login-password'></input>
          <button onClick={loginform} className='smallmargin'>Login</button>
          <p onClick={dontHaveAccount}>don't have accound?</p>
        </div>
        </div>
      </div>
      <div className='aboutus' id='aboutus'>
        <p className='text_middle'>КОНТАКТЫ<br/>
Адрес:<br/>
3524 Silverside Road Suite 35B, Wilmington,<br/> Delaware 19810 USA<br/>
Телефон:<br/>
+995 599 433 545<br/>
Рабочее время консультантов интернет-<br/>магазина:
12:00 — 22:00<br/>
Без выходных<br/>
Юридическая информация:<br/>
Наименование организации: ALTERAW INC.<br/>
Юридический адрес: 3524 Silverside Road<br/> Suite 35B, Wilmington, Delaware 19810 USA</p>
      </div>
      <div className='products' id='products'>
      <div className='men_women'>
        <div class="container">
        <h1 onClick={openMenList} class="title">Мужское</h1>
        <ul id='MenList' class="options invisibility">
        <li onClick={menfoot}>Обувь</li>
        <li onClick={menjewelery}>Украшения</li>
        <li onClick={mencloth}>Одежда</li>
        </ul>
        </div>
        <div class="container">
        <h1 onClick={openWomenList} class="title">Женское</h1>
        <ul id='womenlist' class="options invisibility">
        <li onClick={womenfoot}>Обувь</li>
        <li onClick={womenjewelery}>Украшения</li>
        <li onClick={womencloth}>Одежда</li>
        </ul>
        </div>
        </div>
        <img className='cload' src='./images/cload.png'></img>
        <img className='cload2' src='./images/cload2.png'></img>
        <img className='cload3' src='./images/cload3.png'></img>
        <img className='cload4' src='./images/cload4.png'></img>
        <img className='coolrick' src='./images/coolrick.jpg'></img>
      <div className='sortedcloth' id='SortedCloth'>
      </div>
      </div>
      <div className='adminpanel' id='adminpanel'>
        <div id='productTable' className='producttable'></div>
        <div id='addproduct' className='addproduct'>
        <input id='itemname'></input>
        <input type="file" id="photoInput" accept="image/*"></input>
  
        <label for="genderSelect">Gender:</label>
        <select id="genderSelect">
        <option value="men">Men</option>
        <option value="women">Women</option>
        </select>
  
        <label for="categorySelect">Category:</label>
        <select id="categorySelect">
        <option value="foot">Footwear</option>
        <option value="cloth">Clothing</option>
        <option value="jewelery">Accessories</option>
        </select>
  
        <label for="priceInput">Price:</label>
        <input type="number" id="priceInput"></input>
  
        <button onClick={addProduct}>Add Product</button>
      </div>

      </div>
      <div className='corzinapage' id='corzinapage'>
        <div className='corzina-items' id='corzina-items'>

        </div>

      </div>
      </div>
  );
  }

export default App;
