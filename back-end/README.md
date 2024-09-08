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

-----------------------
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
 
 -----------------------
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

 -----------------------
-PATCH: Actualizar Persona Asignada
Esta ruta pasa por dos middlewares, uno el cual verifica si recibió el token del usuario y valida su autorización.
Gracias a ese middleware, tenemos en el req los datos del usuario, entonces se modifica la tarea y se pone al usuario que inició el fetch
https://poloweb-api.vercel.app/api/tasks/asignacion/:boardId/:taskId
recibe: 
req.params: 
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
	"personaAsignada": "persona que hizo el fetch"
}

 -----------------------
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

-----------------------
-DELETE: Borrar una tarea.
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/tasks/:taskId/:boardId
recibe: 
req.params: 
    boardId: para que modifique la fecha de modificacion del tablero  
    taskId: la tarea a eliminar.
    
respuesta: devuelve un mensaje de que la tarea ha sido eliminada.
