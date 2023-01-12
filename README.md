# Next.Js Teslo Shop
```
El proyecto es una aplicacion para organizar tareas en 3 tiempos:
Pendiente
En Progreso
Terminado
Se puede modificar las tareas, y ademas se pueden mover al estado que se desee.
```


Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

* Reconstruir los modulos de node y levantar NEXT
```
npm install o npm i
npm run dev
```

## Llenar la base de datos con informacion de pruebas

Llamar a 
```
http://localhost:3000/api/seed
```

## Para este proyecto use las siguientes tecnologias:
```
Typescript
NextJS
Mongoose
Docker
MaterialUI
```
