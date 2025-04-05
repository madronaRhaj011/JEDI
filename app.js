const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path')
const flash = require('express-flash');



app.use(session({
    secret: 'pizzaSauce', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use `true` in production with HTTPS
  }));
  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

app.locals.formatDate = function(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
};

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


app.use(flash());



const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const inventoryRouter = require('./routes/inventoryRouter');
const userRouter = require('./routes/userRouter');
const logRouter = require('./routes/logsRouter');
const alertRouter = require('./routes/alertRouter');
const salesRouter = require('./routes/salesRouter');
const supplierRouter = require('./routes/supplierRouter');
const orderRouter = require('./routes/orderRouter');
const router = require('./routes/router');

// // Example backend route (Node.js/Express)
// app.get('/pricing_agreements/:supplierId', async (req, res) => {
//     try {
//       const supplierId = req.params.supplierId;
//       const products = await db.query(
//         `SELECT s.supplier_name, sa.product_id, sa.pricing_agreement, p.product_name 
//          FROM supplier_agreements sa 
//          INNER JOIN products p on sa.product_id = p.product_id 
//          INNER JOIN suppliers s on sa.supplier_id = s.id 
//          WHERE supplier_id = ?`, 
//         [supplierId]
//       );
//       res.json(products);
//     } catch (error) {
//       console.error('Error fetching pricing agreements:', error);
//       res.status(500).json({ error: 'Failed to fetch pricing agreements' });
//     }
//   });

app.use('/', authRouter);
app.use('/product', productRouter);
app.use('/inventory', inventoryRouter);
app.use('/user', userRouter);
app.use('/logs', logRouter);
app.use('/alert', alertRouter);
app.use('/sale', salesRouter);
app.use('/supplier', supplierRouter);
app.use('/orders', orderRouter);
app.use('/', router);

app.listen(3000, (req, res) => {
    console.log('server initialized on http://localhost:3000');
    
});




