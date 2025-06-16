 const imagenes = [
      { text: "Promos | Yamila Yjilioff", 
        img: "https://www.galicia.ar/content/dam/galicia/banco-galicia/personas/canales/onb/ONBGallery/ilustraciones/2024/Promociones-2-YamilaYjilioff.jpg", 
        url: "https://www.galicia.ar/personas/buscador-de-promociones" },

      { text: "Promos | Luz Preumayr", 
        img: "https://www.galicia.ar/content/dam/galicia/banco-galicia/personas/canales/onb/ONBGallery/ilustraciones/2024/Promociones-4-LuzPreumayr.jpg", 
        url: "https://www.galicia.ar/personas/buscador-de-promociones" },
        
      { text: "App | Luz Preumayr", 
        img: "https://www.galicia.ar/content/dam/galicia/banco-galicia/personas/canales/onb/ONBGallery/ilustraciones/2024/App-6-LuzPreumayr.jpg", 
        url: "https://www.galicia.ar/personas/app-galicia" },

      { text: "App | Eugenia Hernández", 
        img: "https://www.galicia.ar/content/dam/galicia/banco-galicia/personas/canales/onb/ONBGallery/ilustraciones/2024/App-4-EugeniaHernandez.jpg", 
        url: "https://www.galicia.ar/personas/app-galicia" },

      { text: "App | Eugenia Hernández", 
        img: "https://www.galicia.ar/content/dam/galicia/banco-galicia/personas/canales/onb/ONBGallery/ilustraciones/2024/App-3-EugeniaHernandez.jpg", 
        url: "https://www.galicia.ar/personas/app-galicia" },

      { text: "Haberes | Javi Pane", 
        img: "https://www.galicia.ar/content/dam/galicia/banco-galicia/personas/canales/onb/ONBGallery/ilustraciones/2024/Haberes-1-JaviPane.jpg", 
        url: "https://www.galicia.ar/personas/cobrar-sueldo-galicia" },

      { text: "24/7- Nani Naveira Ramos", 
        img: "https://www.galicia.ar/content/dam/galicia/banco-galicia/personas/canales/onb/ONBGallery/ilustraciones/2023/24-7-nani.jpg", 
        url: "https://ayuda.bancogalicia.com.ar/" },

      { text: "Seguridad- Nani Naveira Ramos", 
        img: "https://www.galicia.ar/content/dam/galicia/banco-galicia/personas/canales/onb/ONBGallery/ilustraciones/2023/seguridad-nani.jpg", 
        url: "https://www.galicia.ar/personas/prevencion-estafas" },
  ];

  try {
    const i = Math.floor(Math.random() * imagenes.length);
    const enlace = document.getElementById("img-container-artes-href");
    const contenedor = document.getElementById("img-container-artes");

    enlace.href = imagenes[i].url;
    contenedor.style.backgroundImage = `url(${imagenes[i].img})`;

    // Remover clases art-adobe-x anteriores
    contenedor.className = contenedor.className.replace(/art-adobe-\d+/g, '').trim();
    // Añadir la clase nueva
    contenedor.classList.add("art-adobe-" + i);
  } catch (error) {
    console.error('Problemas de carga:', error);
  }
