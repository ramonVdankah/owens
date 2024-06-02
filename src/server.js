const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
const corsOptions = {
  origin: 'http://213.159.208.225:3000' // Замените на свой домен
};

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'zaxaosite',
  password: '26463',
  port: 5432,
});
app.use(cors(corsOptions));

app.get('/api/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT path, name, price FROM sales');
    res.send(result.rows);
    client.release();
  } catch (error) {
    console.error('Ошибка при получении данных', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.use(express.json());
app.post('/api/registration', async (req, res) => {
  const { login, password } = req.body;
  
  try {
    const client = await pool.connect();
    
    // Проверяем наличие пользователя с заданным логином
    const checkUserQuery = 'SELECT * FROM users WHERE login = $1';
    const checkUserResult = await client.query(checkUserQuery, [login]);
    
    if (checkUserResult.rows.length > 0) {
      // Если пользователь с таким логином уже существует, выдаем ошибку
      res.status(409).send('Пользователь с таким логином уже существует');
    } else {
      // Добавляем новую запись с заданным логином и паролем
      const insertUserQuery = 'INSERT INTO users (login, password) VALUES ($1, $2)';
      await client.query(insertUserQuery, [login, password]);
      
      res.send('Пользователь успешно добавлен');
    }
    
    client.release();
  } catch (error) {
    console.error('Ошибка при обработке запроса', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;
  
  try {
    const client = await pool.connect();
    
    // Проверяем соответствие логина и пароля
    const checkUserQuery = 'SELECT * FROM users WHERE login = $1 AND password = $2';
    const checkUserResult = await client.query(checkUserQuery, [login, password]);
    
    if (checkUserResult.rows.length > 0) {
      // Если логин и пароль совпадают, возвращаем успешный результат
      res.send('Успешная аутентификация');
    } else {
      // Если логин и пароль не совпадают, возвращаем ошибку
      res.status(401).send('Неправильный логин или пароль');
    }
    
    client.release();
  } catch (error) {
    console.error('Ошибка при обработке запроса', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.get('/api/products', async (req, res) => {
  const { gender, category } = req.query;
  
  try {
    const client = await pool.connect();
    
    const getProductsQuery = 'SELECT * FROM products WHERE gender = $1 AND category = $2';
    const queryParams = [gender, category];
    
    const productsResult = await client.query(getProductsQuery, queryParams);
    const products = productsResult.rows;
    
    res.send(products);
    
    client.release();
  } catch (error) {
    console.error('Ошибка при обработке запроса', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.get('/api/adminpanel', async (req, res) => {
  
  try {
    const client = await pool.connect();
    
    const getProductsQuery = 'SELECT * FROM products';
    
    const productsResult = await client.query(getProductsQuery);
    const products = productsResult.rows;
    
    res.send(products);
    
    client.release();
  } catch (error) {
    console.error('Ошибка при обработке запроса', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.get('/api/corzina/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const client = await pool.connect();

    const getProductQuery = 'SELECT * FROM products WHERE id = $1';
    const getProductValues = [productId];

    const productResult = await client.query(getProductQuery, getProductValues);
    const product = productResult.rows[0];

    if (product) {
      res.send(product);
    } else {
      res.status(404).send('Продукт не найден');
    }

    client.release();
  } catch (error) {
    console.error('Ошибка при обработке запроса', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.post('/api/adminpanel', async (req, res) => {
  const { name, price, gender, category , path} = req.body;
  
  try {
    const client = await pool.connect();
    
    const addProductQuery = 'INSERT INTO products (name, price, gender, category, path) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const queryParams = [name, price, gender, category, path];
    
    const addedProduct = await client.query(addProductQuery, queryParams);
    
    res.send(addedProduct.rows[0]);
    
    client.release();
  } catch (error) {
    console.error('Ошибка при обработке запроса', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.delete('/api/adminpanel/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const client = await pool.connect();
    
    const deleteProductQuery = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const queryParams = [id];
    
    const deletedProduct = await client.query(deleteProductQuery, queryParams);
    
    if (deletedProduct.rows.length === 0) {
      res.status(404).send('Продукт не найден');
    } else {
      res.send(deletedProduct.rows[0]);
    }
    
    client.release();
  } catch (error) {
    console.error('Ошибка при обработке запроса', error);
    res.status(500).send('Ошибка сервера');
  }
});
const fs = require('fs');
const pathh = require('path');

app.post('/api/saveimage', (req, res) => {
  const { image, path } = req.body;
  console.log(image);
  // Remove the 'images/' prefix from the path
  const imagePath = path;
  const imagesDirectory = pathh.resolve(__dirname, '../public/images');
  const filePath = pathh.join(imagesDirectory, imagePath);

  // Convert the base64 image to a Buffer
  const buffer = Buffer.from(image, 'base64');
  console.log(buffer.byteLength)

  // Save the image to the server
  fs.writeFile(filePath, buffer, err => {
    if (err) {
      console.error('Ошибка при сохранении изображения', err);
      res.status(500).send('Ошибка сервера');
    } else {
      console.log('Изображение сохранено успешно');
      res.send('Изображение сохранено успешно');
    }
  });
});






app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001');
});
