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
