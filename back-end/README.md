Tareas Endpoints:

-GET: Conseguir todas las tareas.
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/tasks/
recibe: nada
respuesta=Array de objetos con todas las tareas
[
{
"id_task": 1,
"title": "tar1",
"description": "desc1",
"image": null,
"due_date": null,
"completed": false,
"personaAsignada": "sebasGalarza",
"personaCreador": "sebasGalarza",
"createdAt": "2024-09-08T20:59:16.051Z",
"updatedAt": "2024-09-08T21:37:17.972Z",
"id_section": 2
},
...
]

---

-GET: Conseguir tareas por su id
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/tasks/:taskId
recibe:
req.params: taskId:usamos el identificador para que nos devuelva la tarea con tal dato.

respuesta:
{
"id_task": 1,
"title": "tar1",
"description": "desc1",
"image": null,
"due_date": null,
"completed": false,
"personaAsignada": "sebasGalarza",
"personaCreador": "sebasGalarza",
"createdAt": "2024-09-08T20:59:16.051Z",
"updatedAt": "2024-09-08T21:37:17.972Z",
"id_section": 2
},

---

-POST: Crear tareas.
Esta ruta pasa por dos middlewares, uno el cual verifica si recibió el token del usuario y valida su autorización y otro el cual hace las validaciones del cuerpo del formulario con la dependencia "zod".
endpoint: https://poloweb-api.vercel.app/api/tasks/:sectionId/:boardId
recibe:
req.params:
boardId: para que modifique la fecha de modificacion del tablero.
sectionId: la ubicacion en donde se encuentra.
req.body:
{
"title":"titulo string",
"description":"descripcion string",
"due_date":Wed Sep 18 2024 00:00:00 GMT-0300 date,
}
las demas cosas tienen valor por defecto null o false, el campo personaCreador se pone el de la persona que creó la tarea la cual debe estar loegueada y los timestamp son por defecto la hora actual

respuesta:
{
"completed": false,
"id_task": 1,
"title": "tar3",
"description": "desc4",
"due_date": null,
"id_section": 3,
"personaCreador": "sebas",
"updatedAt": "2024-09-08T21:03:31.905Z",
"createdAt": "2024-09-08T21:03:31.905Z",
"image": null,
"personaAsignada": null
}

---

-PATCH: Actualizar Persona Asignada
Esta ruta pasa por dos middlewares, uno el cual verifica si recibió el token del usuario y valida su autorización.
Gracias a ese middleware, tenemos en el req los datos del usuario, entonces se modifica la tarea y se pone al usuario que inició el fetch
https://poloweb-api.vercel.app/api/tasks/asignacion/:username/:boardId/:taskId
recibe:
req.params:
username: el usuario a asignar, si se quiere dejar la asignacion, se setea en null
taskId: tarea a actualizar
boardId: para que modifique la fecha de modificacion del tablero.
devuelve:
{
"completed": false,
"id_task": 1,
"title": "tar3",
"description": "desc4",
"due_date": null,
"id_section": 3,
"personaCreador": "sebas",
"updatedAt": "2024-09-08T21:03:31.905Z",
"createdAt": "2024-09-08T21:03:31.905Z",
"image": null,
"personaAsignada": username !== null ? username : null
}

---

-PATCH: Actualizar las tareas.
Esta ruta pasa por dos middlewares, uno el cual verifica si recibió el token del usuario y valida su autorización y otro el cual hace las validaciones del cuerpo del formulario con la dependencia "zod".
https://poloweb-api.vercel.app/api/tasks/:boardId/:taskId
recibe:
req.params:
taskId: tarea a actualizar
boardId: para que modifique la fecha de modificacion del tablero.
req.body:
{
"title":"titulo string",
"description":"descripcion string",
"due_date":Wed Sep 18 2024 00:00:00 GMT-0300 date,
"completed":boolean
}

devuelve: {
"completed": datos actualizados,
"id_task": 1,
"title": "datos actualizados",
"description": "datos actualizados",
"due_date": datos actualizados,
"id_section": 3,
"personaCreador": "sebas",
"updatedAt": "2024-09-08T21:03:31.905Z",
"createdAt": "2024-09-08T21:03:31.905Z",
"image": null,
"personaAsignada": null
}

---

-DELETE: Borrar una tarea.
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/tasks/:taskId/:boardId
recibe:
req.params:
boardId: para que modifique la fecha de modificacion del tablero  
 taskId: la tarea a eliminar.

respuesta: devuelve un mensaje de que la tarea ha sido eliminada.

---
Rutas de Usuario

Registro de usuario
•	Método: POST
•	Descripción: Registra un nuevo usuario, validando los datos (nombre de usuario, correo y contraseña).
•	Endpoint: /api/users/register
•	Entrada: Un objeto JSON con los campos:
o	username: nombre de usuario (string, obligatorio).
o	email: correo electrónico (string, obligatorio).
o	password: contraseña (string, obligatorio).
o	confirmPassword: contraseña (string, obligatorio).

•	Respuesta:
{
  "username": "string",
  "email": "string",
  "role": "user",
  "createdAt": "2024-09-12T10:00:00.000Z",
  "updatedAt": "2024-09-12T10:00:00.000Z"
}


________________________________________
Inicio de sesión
•	Método: POST
•	Descripción: Permite a un usuario registrado iniciar sesión, verificando su contraseña y generando un token JWT.
•	Endpoint: /api/users/login
•	Entrada: Un objeto JSON con:
o	username: nombre de usuario (string, obligatorio).
o	password: contraseña (string, obligatorio).




•	Respuesta:

{
  "user": {
    "username": "string",
    "email": "string",
    "role": "user",
    "createdAt": "2024-09-12T10:00:00.000Z",
    "updatedAt": "2024-09-12T10:00:00.000Z"
  },
  "token": "jwt_token"
}

________________________________________
Cierre de sesión
•	Método: POST
•	Descripción: Cierra sesión eliminando la cookie con el token JWT.
•	Endpoint: /api/users/logout
•	Entrada: Ninguna.
•	Respuesta:
{
  "message": "Logged out successfully"
}
________________________________________
Verificación de token
•	Método: GET
•	Descripción: Verifica si un token JWT es válido y si el usuario está autorizado.
•	Endpoint: /api/users/verify
•	Entrada: Un token JWT en el encabezado Authorization (formato: Bearer <token>).
•	Respuesta:
{
  "username": "string",
  "email": "string",
  "role": "user",
  "createdAt": "2024-09-12T10:00:00.000Z",
  "updatedAt": "2024-09-12T10:00:00.000Z" 
 }
________________________________________
 GET: Prueba de Conexión
•	Método: GET
•	Descripción: Ruta de prueba que devuelve un mensaje simple.
•	Endpoint: GET /api/users/
•	Entrada: Nada.
•	Respuesta:
{
  "message": "Hi"
}

________________________________________
Perfil de usuario
•	Método: GET
•	Descripción: Obtiene los detalles del perfil del usuario autenticado. El token JWT se verifica mediante una cookie.
•	Endpoint: /api/users/profile
•	Entrada: Ninguna, el token JWT se obtiene de la cookie.
•	Respuesta:
{
  "username": "string",
  "email": "string",
  "role": "user",
  "createdAt": "2024-09-12T10:00:00.000Z",
  "updatedAt": "2024-09-12T10:00:00.000Z"
}



________________________________________

Actualizar perfil de usuario
•	Método: PATCH
•	Descripción: Actualiza los detalles del perfil del usuario autenticado. El token JWT se verifica mediante una cookie.
•	Endpoint: /api/users/profile/
•	Entrada:
o	username (en la URL): Nombre del usuario cuyo perfil se desea actualizar.
o	Un objeto JSON con los campos :
	email: nuevo correo electrónico (string).
	password: nueva contraseña (string).
	confirmPassword: confirmación de la nueva contraseña (string).
	oldPassword: contraseña actual (string).
•	Respuesta:
{
  "username": "string",
  "email": "string",
  "role": "user",
  "createdAt": "2024-09-12T10:00:00.000Z",
  "updatedAt": "2024-09-12T10:00:00.000Z"
}

---








Rutas de User_Boards

Obtener todos los boards de un usuario
•	Método: GET
•	Descripción: Devuelve los boards asociados al usuario autenticado, con los detalles de cada uno.
•	Endpoint: /api/userboards/
•	Entrada: La autenticación se gestiona mediante cookies (verificadas por un middleware).
•	Respuesta:
[
  {
    "username": "string",
    "role": "string",
    "boardId": "string",
    "Board": {
      "id_board": "string",
      "name": "string",
      "updatedAt": "2024-09-12T10:00:00.000Z"
    },
    "User": {
      "username": "string",
      "email": "string",
      "role": "user"
    }
  }
]



________________________________________
Obtener nombres de boards
•	Método: GET
•	Descripción: Devuelve los nombres y detalles de los boards de un usuario autenticado.
•	Endpoint: /api/userboards/boards
•	Entrada: La autenticación se gestiona con cookies (verificadas por un middleware).

•	Respuesta:
[
  {
    "name": "string",
    "id_board": "string",
    "updatedAt": "2024-09-12T10:00:00.000Z"
  }
]

________________________________________
Obtener usuarios de un board
•	Método: GET
•	Descripción: Devuelve los usuarios asociados a un board específico, identificado por el ID del board.
•	Endpoint: /api/userboards/board/:boardId
•	Entrada:
o	boardId (en la URL): El ID del board cuyos usuarios se desean obtener.
•	Respuesta:
[
  {
    "username": "string",
    "role": "string"
  }
]

________________________________________
Eliminar relación usuario-board
•	Método: DELETE
•	Descripción: Elimina la relación entre un usuario y un board específico.
•	Endpoint: /api/userboards/:username/:boardId
•	Entrada:
o	username (en la URL): El nombre del usuario cuya relación se desea eliminar.
o	boardId (en la URL): El ID del board asociado al usuario.
•	Respuesta:
"User-Board deleted successfully"

-----------------------------
Rutas de Board


Obtener todos los Board
• Metodo: GET
• Descripcion: Obtiene todos los tableros de un usuario en especifico.
• Endpoint: /api/boards/
• Entrada: Ningun dato de entrada
•	Respuesta:
[
  {
    "id_board": "string",
    "name": "string",
    "date": "2024-09-18T03:29:21.660Z",
    "createdAt": "2024-09-18T03:00:27.549Z",
    "updatedAt": "2024-09-18T03:29:21.661Z"
  }
]

• Bad request: Problemas con la solicitud (por ejemplo, si no se encuentran los tableros)

________________________________________

Obtener board por su ID


• Metodo: GET
• Descripcion: obtiene un tablero especifico segun el id
• Endpoint: /api/boards/:boardId
• Entrada:
o	boardId (en la URL): El ID del board cuyos usuarios se desean obtener.
•	Respuesta:
[
  {
    "id_board": "string",
    "name": "string",
    "date": "2024-09-18T03:29:21.660Z",
    "createdAt": "2024-09-18T03:00:27.549Z",
    "updatedAt": "2024-09-18T03:29:21.661Z"
  }
]


• Bad request: Problema con la solicitud (por ejemplo, si el tablero no fue encontrado)


________________________________________


Crear board


• Metodo: POST
• Descripcion: Ruta para que el usuario cree un Board
• Endpoint: /api/boards/
• Entrada:
o name (en el Body): nombre del tablero.
o username (en la sesion): nombre del usuario.
o boardId (se genera por RandomUID): id del tablero.
•	Respuesta:
[
  {
  "newBoard": {
    "date": "2024-09-18T15:29:03.881Z",
    "id_board": "string",
    "name": "string",
    "updatedAt": "2024-09-18T15:38:20.195Z",
    "createdAt": "2024-09-18T15:38:20.195Z"
  }
}
]

• Bad request: Problema con la solicitud (Por ejemplo, si hubo un error al crear el tablero) 


________________________________________


Actualizar Board


• Metodo: PATCH
• Descripcion: Permite al usuario actualizar algunas partes del board, como por ejemplo el nombre o la descripcion, esto solo lo puede hacer el usuario con "rol" de "OWNER"
• Endpoint: /api/board/
• Entrada:
o name (en el Body): Se introduce el nombre del tablero.
o boardId (en el URL): Solicita el id del tablero.
•	Respuesta:
[
  {
  "boardId": "string",
  "name": "dato actualizado"
}
]


• Bad request: Problema con la solicitud (Por ejemplo, si hubo un error al crear el tablero)


________________________________________


Eliminar un board


• Metodo: DELETE
• Descripcion: Permite al usuario eliminar un board especifico
• Endpoint: /api/board/:boardId
• Entrada:
o boardId (en el URL): Solicita el id del tablero.
•	Respuesta:


"Board deleted successfully"


• Bad request: Problema con la solicitud (Por ejemplo, si el tablero no existe)


________________________________________


Invitar miembros al board


• Metodo: POST
• Descripcion: Permite invitar miembros a un board en especifico, estos miembros serian otros usuarios y se les daria el "rol" de "USER"
• Endpoint: /api/board/:boardId/invitedBoard
• Entrada:
o username (en el Body): Se introduce el nombre del usuario a invitar.
o boardId (en el URL): Solicita el id del tablero.
•	Respuesta:
[
{
  "username": "string",
  "boardId": "string",
  "role": "user",
  "updatedAt": "2024-09-18T15:46:38.038Z",
  "createdAt": "2024-09-18T15:46:38.038Z"
}
]


• Bad request: Problema con la solicitud (Por ejemplo, si el usuario no existe)


________________________________________


Obtener todo el contenido de un board segun su ID


• Metodo: GET
• Descripcion: Permite obtenes la informacion de un board segun el ID
• Endpoint: /api/board/contains/:boardId
• Entrada:
o boardId (en el URL): Solicita el id del tablero.
•	Respuesta:
[
  {
  "id_board": "string",
  "name": "string",
  "date": "2024-09-18T15:29:03.881Z",
  "createdAt": "2024-09-18T15:43:09.967Z",
  "updatedAt": "2024-09-18T15:43:09.967Z"
  }
]


• Bad request: Problema con la solicitud (Por ejemplo, si el board no existe)

________________________________________
Secciones Endpoints:

-GET: Conseguir todas las secciones.
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/sections/
recibe: nada
respuesta=Array de objetos con todas las secciones
[
{
"title": "sec1",
"createdAt": "2024-09-08T20:59:16.051Z",
"updatedAt": "2024-09-08T21:37:17.972Z",
"id_section": 2,
"id_board": 1
},
...
]

________________________________________

-GET: Conseguir una sección por id.
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/sections/:sectionId
recibe:
  req.params:id de la sección
respuesta=Objeto con la seccion
{
"title": "sec1",
"createdAt": "2024-09-08T20:59:16.051Z",
"updatedAt": "2024-09-08T21:37:17.972Z",
"id_section": 2,
"id_board": 1
},

________________________________________

-POST: Crear una sección.
Esta ruta pasa por dos middlewares, uno el cual verifica si recibió el token del usuario y valida su autorización y otro el cual hace las validaciones del cuerpo del formulario con la dependencia "zod".
endpoint: https://poloweb-api.vercel.app/api/sections/:boardId/
recibe: 
  req.params:id del tablero 
  req.body:{
    "title": "sec1"
  }
respuesta=Objeto con la seccion
{
"title": "sec1",
"createdAt": "2024-09-08T20:59:16.051Z",
"updatedAt": "2024-09-08T21:37:17.972Z",
"id_section": 2,
"id_board": 1
},

________________________________________

-PATCH: Actualizar sección.
Esta ruta pasa por dos middlewares, uno el cual verifica si recibió el token del usuario y valida su autorización y otro el cual hace las validaciones del cuerpo del formulario con la dependencia "zod".
endpoint: https://poloweb-api.vercel.app/api/sections/:sectionId/:boardId/
recibe: 
  req.params:id del tablero, id de la sección 
  req.body:{
    "title": "sec1"
  }
respuesta=Objeto con la seccion
{
"title": "sec1",
"createdAt": "2024-09-08T20:59:16.051Z",
"updatedAt": "2024-09-08T21:37:17.972Z",
"id_section": 2,
"id_board": 1
},

________________________________________

-DELETE: Eliminar una sección por id.
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/sections/:sectionId/:boardId
recibe:
  req.params:id de la sección, id del tablero
respuesta=Un mensaje con la confirmación de que se eliminó la sección

________________________________________

-GET: Conseguir las tareas de una sección.
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/tasks/:sectionId
recibe:
  req.params:id de la sección
respuesta=Array de objetos con las tareas de una seccion
[
{
"id_task": 1,
"title": "tar1",
"description": "desc1",
"image": null,
"due_date": null,
"completed": false,
"personaAsignada": "sebasGalarza",
"personaCreador": "sebasGalarza",
"createdAt": "2024-09-08T20:59:16.051Z",
"updatedAt": "2024-09-08T21:37:17.972Z",
"id_section": 2
},
...
]
