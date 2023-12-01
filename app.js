const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const checkLogin = require('./middleware/checkLogin');
const bcrypt = require('bcryptjs');

const connection = require('./database/database');

// setup do ambiente
// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Form parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
// Ativar os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Sessions
app.use(session({
   secret: 'filmes',
   cookie: {
      maxAge: 1200000,
   },
   resave: false,
   saveUninitialized: false
}));

// Banco de Dados
connection
   .authenticate() 
   .then(() => {
    console.log('Conexão feita com sucesso!');
   })
   .catch(erro => {
    console.log('Problemas na conexão!');
   })

// Models
const Usuario = require('./models/usuario');
const Genero = require('./models/genero');
const Produtor = require('./models/produtor');
const Diretor = require('./models/diretor');
const Filme = require('./models/filme');

// Rotas 
const CartazRoutes = require('./routes/CartazRoutes');
const DiretoresRoutes = require('./routes/DiretoresRoutes');
const ProdutoresRoutes = require('./routes/ProdutoresRoutes');
const GenerosRoutes = require('./routes/GenerosRoutes');
const FilmesRoutes = require('./routes/FilmesRoutes');
const UsuariosRoutes = require('./routes/UsuariosRoutes');

app.get('/', checkLogin , (req, res) => {
   res.render('index');
});

app.get('/login', (req, res) => {
   res.render('login', {msg: ''});
});

app.post('/login', (req, res) => {
   const email = req.body.email;
   const senha = req.body.senha;

   Usuario.findOne({
      where: {
         email: email
      }
   }).then(usuario => {
      if(usuario != undefined)
      {
         //let deuCerto = bcrypt.compareSync(senha, usuario.senha);
         deuCerto = (senha, usuario.senha);

         if(deuCerto)
         {
            req.session.login = {
               nome: usuario.nome
            }

            res.redirect('/');
         }
         else
         {
            res.render('login', {msg: 'Usuário ou senha inválidos!'});
         }
      }
      else
      {
         res.render('login', {msg: 'Usuário ou senha inválidos!'});
      }
   })
});

// Rotas externas
app.use('/', CartazRoutes);
app.use('/', DiretoresRoutes);
app.use('/', ProdutoresRoutes);
app.use('/', GenerosRoutes);
app.use('/', FilmesRoutes);
app.use('/', UsuariosRoutes);

module.exports = app;
