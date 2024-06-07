¡API de películas usando Vite, React y JavaScript! Esta aplicación incluirá un campo de búsqueda para obtener una lista de películas y permitirá ver detalles específicos de cada película. Utilizaremos useState, useEffect, localStorage, Bootstrap para componentes de diseño, SweetAlert para alertas bonitas, y Modal para mostrar detalles. No utilizaremos los iconos de Bootstrap, sino otros.
Utilicé el componente Modal de react-bootstrap en el archivo MovieList.jsx para mostrar los detalles de la película seleccionada.

![intro](https://github.com/Hernandez-pedro/Proyecto_Final/assets/144267225/7f8248ed-4165-449b-adf1-cfbdd0954cb7)
![intro2](https://github.com/Hernandez-pedro/Proyecto_Final/assets/144267225/45df2983-1361-465b-9202-0562270070bc)
## Instalar
## Instalar dependecias de desarrollo
```
npm install 
```
## Iniciar en Desarrollo
```
npm run dev
```
- **Estado selectedMovie**:
- **Funciones handleShow y handleClose**:
- **handleShow(movie)**: Esta función se llama cuando se hace clic en una tarjeta de película, y establece la película seleccionada en el estado.
- **handleClose()**: Esta función se llama para cerrar el modal y limpiar el estado de la película seleccionada.
- **Renderizado de la Lista de Películas**:
Se mapea sobre el array de movies y se crea una tarjeta (card) para cada película. Al hacer clic en una tarjeta, se llama a handleShow(movie) para mostrar los detalles de la película en el modal.
- **Modal de react-bootstrap**:
Modal se muestra si selectedMovie no es null. El modal contiene los detalles de la película, utilizando el componente MovieDetails.
- **MovieDetails.jsx**
El componente MovieDetails se encarga de mostrar los detalles de la película seleccionada. Aquí tienes el código completo para este componente:
- **Clases de Bootstrap para la Responsividad del Video**:
Se utilizan las clases de Bootstrap embed-responsive y embed-responsive-16by9 para hacer que el video sea responsive
- **Almacenamiento en localStorage**:
Las películas recomendadas también se almacenan en localStorage para usarlas posteriormente si el usuario vuelve a cargar la página.
- **useState**: Para manejar el estado de las películas, la película seleccionada y la imagen de fondo.
- **useEffect**: Para realizar las llamadas a la API al montar el componente.
- **LocalStorage**: Para almacenar y recuperar películas entre sesiones.
- **Búsqueda con input**: Para manejar la entrada del usuario y ejecutar búsquedas al presionar "Enter".
- **Dos llamadas a la API**: Para buscar películas y obtener películas recomendadas.
- **Diseño (Colores)**: Para establecer un fondo negro y estilizar el contenido.
- **Bootstrap (Componentes nuevos)**: Para la barra de búsqueda y el modal.
- **SweetAlert**: Para mostrar alertas de error.
- **Modal**: Para mostrar los detalles de la película seleccionada.
- **Iconos**: No se han implementado en este ejemplo, pero se pueden añadir fácilmente con librerías como FontAwesome.
## Usage
- Busque películas usando la barra de búsqueda.
- Haga clic en una película para ver sus detalles, calificarla y agregarla a la lista de vistas.
- Accede a un resumen de películas vistas y sus estadísticas.
