Tareas Endpoints:

-GET: Conseguir todas las tareas. Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/tasks/
recibe: nada
respuesta=[{
titulo:tarea1,
descripcion:hacer la tarea,
fecha
}]
respuesta: devuelve un array de objetos (de todas las tareas) con el id, titulo(string), descripcion(string), fecha de expiracion(date), completado(booleano), personaACargo(string) y el timestamp.

-GET: Conseguir tareas por su id
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/tasks/:taskId
recibe: por el req.params el id de la tarea.
respuesta: devuelve un objeto (una tarea) con el id mismo, titulo(string), descripcion(string), fecha de expiracion(date), completado(booleano) y el timestamp.

-POST: Crear tareas.
Esta ruta pasa por dos middlewares, uno el cual verifica si recibió el token del usuario y valida su autorización y otro el cual hace las validaciones del cuerpo del formulario con la dependencia "zod".
endpoint: https://poloweb-api.vercel.app/api/tasks/:sectionId/:boardId
recibe: del req.params el id del tablero para que modifique la fecha de modificacion del tablero y el id de la seccion, la ubicacion en donde se encuentra.
del req.body recibe y valida el titulo, descripcion, fecha de expiracion y el id de la seccion
respuesta: crea la tarea en la base de datos y devuelve un objeto con el id, titulo(string), descripcion(string), fecha de expiracion(date), completado(booleano por defecto falso) y el timestamp.

-PATCH: Actualizar las tareas.
Esta ruta pasa por dos middlewares, uno el cual verifica si recibió el token del usuario y valida su autorización y otro el cual hace las validaciones del cuerpo del formulario con la dependencia "zod".
https://poloweb-api.vercel.app/api/tasks/:taskId/:boardId
recibe: del req.params la id de la tarea a actualizar y el id del tablero para que modifique la fecha de modificacion del tablero.
del req.body recibe el titulo, descripcion, fecha de expiracion y completado.
devuelve: modifica el cambio en la base de datos y devuelve el objeto modificado.

-DELETE: Borrar una tarea.
Esta ruta pasa por un middleware el cual verifica si recibió el token del usuario y valida su autorización.
endpoint: https://poloweb-api.vercel.app/api/tasks/:taskId/:boardId
recibe: del req.params el id del tablero para que modifique la fecha de modificacion del tablero y el id de la tarea a eliminar.
respuesta: devuelve un mensaje de que la tarea ha sido eliminada.
