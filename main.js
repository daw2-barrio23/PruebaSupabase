import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bysymefmjzjanlxwckzx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5c3ltZWZtanpqYW5seHdja3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NzU3NTcsImV4cCI6MjAyNjQ1MTc1N30.4wgvCeh6Bw2NGJ2s918m4O5BoBlW25axIQ__jov8W6s';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para leer pilotos y actualizar la tabla HTML
const leerPilotos = async () => {
  try {
    let { data: pilotos, error } = await supabase
      .from('pilotos')
      .select('nombre, apellido, escuderia, puntos')
      .order('puntos', { ascending: false });

    if (error) {
      console.error("Error fetching pilotos:", error);
    } else {
      console.log("Pilotos data:", pilotos);
      actualizarTabla(pilotos);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

// Función para actualizar la tabla HTML con los datos de los pilotos
// Función para actualizar la tabla HTML con los datos de los pilotos
const actualizarTabla = (pilotos) => {
  const tablaBody = document.getElementById('tabla-clasificacion-body');

  // Limpiar la tabla antes de agregar nuevas filas
  tablaBody.innerHTML = '';

  // Iterar sobre los datos de los pilotos y agregar filas a la tabla
  pilotos.forEach((piloto, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${piloto.nombre} ${piloto.apellido}</td>
      <td>${piloto.escuderia}</td>
      <td>${piloto.puntos}</td>
      <td><i class="bi bi-pen"></i></td> <!-- Icono de bolígrafo para editar -->
    `;
    // Agregar clases para los tres primeros pilotos
    if (index < 3) {
      switch (index) {
        case 0:
          fila.classList.add('oro'); // Fondo dorado para el primero
          break;
        case 1:
          fila.classList.add('plata'); // Fondo plateado para el segundo
          break;
        case 2:
          fila.classList.add('bronce'); // Fondo bronce para el tercero
          break;
        default:
          break;
      }
    }
    tablaBody.appendChild(fila);
  });
};

// Ejecutar la función para leer pilotos y actualizar la tabla al cargar la página
leerPilotos();

