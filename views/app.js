const express = require('express');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const path = require('path');

const app = express();

// Konfigurasi EJS
app.set('view engine', 'ejs');
// Pastikan Express mencari template EJS di folder 'views'
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Konfigurasi Session (Keamanan)
app.use(session({
    secret: 'rahasia-lks-2025',
    resave: false,
    saveUninitialized: true
}));
// Koneksi Database
const sequelize = new Sequelize('db_cianjur', 'admin', 'rahasia123', {
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432
});

// Model Database
const User = sequelize.define('User', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    school_name: Sequelize.STRING,
    phone_number: Sequelize.STRING
});

// Middleware: Penjaga Pintu (Mengecek sudah login atau belum)
const cekLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next(); // Kalau sudah login, boleh masuk
    } else {
        res.redirect('/login'); // Kalau belum, lempar ke halaman login
    }
};

// --- ROUTE LOGIN & LOGOUT ---
app.get('/login', (req, res) => {
    // Tampilkan halaman login, error dikosongkan dulu
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi login (username: admin, password: admin123)
    if (username === 'admin' && password === 'admin123') {
        req.session.isLoggedIn = true;
        res.redirect('/');
    } else {
        // Kalau salah, kembali ke login bawa pesan error
        res.render('login', { error: 'Username atau Password salah!' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(); // Hapus sesi login
    res.redirect('/login');
});

// --- ROUTE UTAMA (Semua dilindungi oleh 'cekLogin') ---
app.get('/', cekLogin, async (req, res) => {
    const users = await User.findAll();
    res.render('index', { users, error: null });
});

app.get('/tampilan', cekLogin, async (req, res) => {
    const users = await User.findAll();
    res.render('tampilan', { users });
});

