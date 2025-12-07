# Product Backlog

---

### **HU-01 – Registro local**  

**Como usuario nuevo**,  
quiero registrarme creando mis datos en el dispositivo,  
para poder acceder a la app sin conexión a internet.  

**Criterios de aceptación:**  
- La app permite ingresar nombre, correo y contraseña.  
- Los datos se guardan solo localmente (LocalStorage u otro).  
- Debe validar campos vacíos y formato de correo.  

**Prioridad:** Alta  
**Story Points:** 5  

---

### **HU-02 – Inicio de sesión local**  


**Como usuario registrado**,  
quiero iniciar sesión en el dispositivo,  
para acceder a mis funciones personalizadas.  

**Criterios de aceptación:**  
- Se valida contra la información almacenada localmente.  
- Si la contraseña es incorrecta, muestra error.  
- Permite cerrar sesión y volver a la pantalla de login.  

**Prioridad:** Alta  
**Story Points:** 3  

---

### **HU-03 – Iniciar contador del Ansiouslómetro**  


**Como usuario que quiere medir mi ansiedad**,  
quiero iniciar un contador de tiempo sin ansiedad (días, horas, minutos, segundos),  
para saber cuánto tiempo llevo estable e incentivarme.  

**Criterios de aceptación:**  
- El contador inicia cuando el usuario pulsa “No tengo ansiedad”.  
- Muestra tiempo en tiempo real (días:hh:mm:ss).  
- Se guarda localmente el timestamp de inicio para mantenerlo entre sesiones (si la app se cierra y vuelve a abrir).  

**Prioridad:** Alta  
**Story Points:** 8  

---

### **HU-04 – Reiniciar contador por episodio de ansiedad**  

**Como usuario**,  
quiero reiniciar mi contador si tengo ansiedad,  
para llevar un registro honesto de mis avances.  

**Criterios de aceptación:**  
- Botón “Tuve ansiedad” reinicia el contador a 0.  
- El sistema solicita confirmación antes de reiniciar.  
- Se guarda localmente un registro del evento (fecha y hora) en memoria.  

**Prioridad:** Alta  
**Story Points:** 5  

---

### **HU-05 – Ejercicios rápidos para reducir ansiedad**  


**Como usuario**,  
quiero ver una lista de ejercicios o técnicas de respiración disponibles offline,  
para calmarme cuando tenga un episodio y seguir recomendaciones confiables.  

**Criterios de aceptación:**  
- Debe incluir al menos 5 ejercicios con pasos claros.  
- El contenido y orden lo define y valida Itzia (PO) para asegurar calidad.  
- Al pulsar “Necesito ayuda” se muestra un ejercicio sugerido (aleatorio o el recomendado por Itzia).  

**Prioridad:** Media  
**Story Points:** 5  

---

### **HU-06 – Calendario emocional**  


**Como usuario**,  
quiero registrar cómo me siento cada día desde un calendario,  
para visualizar mis patrones emocionales.  

**Criterios de aceptación:**  
- Permite seleccionar un día y elegir entre emociones predefinidas (feliz, ansioso, triste, neutro...).  
- El día cambia de color según la emoción seleccionada.  
- Los registros se guardan localmente y son editables mientras la app esté instalada.  

**Prioridad:** Media  
**Story Points:** 5  

---

### **HU-07 – Ver historial emocional en el calendario**  


**Como usuario**,  
quiero ver símbolos o colores en el calendario que indiquen mi estado por día,  
para identificar fácilmente tendencias sin necesidad de persistencia remota.  

**Criterios de aceptación:**  
- Cada emoción tiene un color o ícono definido.  
- Al tocar un día marcado, muestra el detalle (nivel / nota).  
- Carga la información desde almacenamiento local.  

**Prioridad:** Media  
**Story Points:** 8  

---

### **HU-08 – Checking inicial para saber como se encuentra el usuario**  

**Como usuario**,  
quiero realizar un checking y recibir una sugerencia,  
para evaluar mi estado y recibir orientación inmediata.  

**Criterios de aceptación:**  
- El cuestionario tiene mínimo 3 preguntas sencillas.  
- Itzia define las preguntas y las sugerencias asociadas (PO).  
- Al completar, muestra una sugerencia o ejercicio (offline) y guarda resultado localmente.  

**Prioridad:** Media  
**Story Points:** 5  

---

### **HU-09 – Perfil del usuario (local)**  


**Como usuario**,  
quiero ver y editar mis datos básicos guardados en el dispositivo,  
para mantener mi información actualizada sin conexión.  

**Criterios de aceptación:**  
- Muestra nombre, correo y avatar desde almacenamiento local.  
- Permite editar nombre y cambiar avatar (archivo local).  
- Cambios se guardan localmente y se confirman con un mensaje.  

**Prioridad:** Media  
**Story Points:** 3  

---

### **HU-10 – Si sufro ansiedad que la app me ayude en el momento**  


**Como usuario**,  
quiero un acceso rápido a ejercicios o frases calmantes,  
para obtener apoyo inmediato cuando me siento mal.  

**Criterios de aceptación:**  
- Botón visible en pantalla principal que abre recursos inmediatos (ejercicio corto, frase calmante).  
- Itzia define el contenido y orden de los recursos.  
- Funciona completamente sin internet y no guarda datos sensibles.  

**Prioridad:** Baja  
**Story Points:** 2  

---