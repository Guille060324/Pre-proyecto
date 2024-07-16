// scripts.js

// Mostrar pantalla de creación de usuario
function showSignup() {
    hideAllContainers();
    document.getElementById('signup-container').style.display = 'block';
}

// Mostrar pantalla de inicio de sesión
function showLogin() {
    hideAllContainers();
    document.getElementById('login-container').style.display = 'block';
}

// Mostrar pantalla inicial
function showInitial() {
    hideAllContainers();
    document.getElementById('initial-container').style.display = 'block';
}

// Ocultar todos los contenedores
function hideAllContainers() {
    document.getElementById('initial-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'none';
}

// Función para crear un nuevo usuario
function createUser() {
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        alert('El nombre de usuario ya existe');
        return;
    }

    users.push({ email: email, username: username, password: password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuario creado con éxito');
    showLogin();
}

// Función de inicio de sesión
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        hideAllContainers();
        document.getElementById('app-container').style.display = 'block';
        loadPasswords();
    } else {
        alert('Usuario equivocado o inexistente, por favor crea un usuario');
    }
}

// Función para cerrar sesión
function logout() {
    hideAllContainers();
    document.getElementById('initial-container').style.display = 'block';
}

// Función para generar una contraseña aleatoria
function generatePassword() {
    const length = 12; // Longitud de la contraseña
    const passwordType = document.getElementById('password-type').value;
    let charset;

    switch (passwordType) {
        case 'letters':
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 'numbers':
            charset = "0123456789";
            break;
        case 'mixed':
        default:
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
            break;
    }

    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    document.getElementById('generated-password').value = password;
}

// Función para guardar la contraseña generada
function savePassword() {
    const password = document.getElementById('generated-password').value;
    const siteName = document.getElementById('site-name').value;

    if (password && siteName) {
        let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push({ site: siteName, password: password });
        localStorage.setItem('passwords', JSON.stringify(passwords));
        loadPasswords();
    } else {
        alert('Primero genere una contraseña y especifique el sitio');
    }
}

// Función para cargar las contraseñas guardadas
function loadPasswords() {
    const passwordList = document.getElementById('password-list');
    passwordList.innerHTML = '';
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.forEach((entry, index) => {
        let li = document.createElement('li');
        li.innerHTML = `Sitio: ${entry.site} - Contraseña: ${entry.password} <button onclick="deletePassword(${index})">Borrar</button>`;
        passwordList.appendChild(li);
    });
}

// Función para borrar una contraseña
function deletePassword(index) {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.splice(index, 1);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    loadPasswords();
}

