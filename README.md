# Prueba tecnica Se+

Esta es la prueba tecnica para el grupo de emprendimiento Se+ de la Universidad De Medellin.

# Información del proyecto
## Tecnologias usadas
- Para el Front-end se utilizó NextJS con App Router.
- Para el Back-end se utilizó ExpressJS en NodeJS environment.
- Para la base de datos se utilizó la base de datos noSQL firestore de Firebase.
- Están las dos aplicaciones desplegadas en una maquina virtual en Google Cloud Computer Engine

## Requisitos
- NodeJS version >= 20.10.0
- Conexion a internet


## Como usar el proyecto...
La aplicacion se encuentra live en http://35.184.51.23:3001/

⚠️Primero se ejecuta el back y luego el front. Si vas tienes problemas ajusta los puertos en las variables de entorno.⚠️

1. Clonar el repo https://github.com/JuanCamiloMB/SeMasPruebaTecnica.git
2. Configurar el Back:
- Ingresar a la carpeta back
- Ejecutar `npm install` ó `pnpm install`
- Crear un archivo .env.local con las variables
```
APIKEY="AIzaSyAqWCShXLKz-xnqK33_DABrE388F0pHsYY"
AUTHDOMAIN="semaspruebatecnica.firebaseapp.com"
PROJECTID="semaspruebatecnica"
STORAGEBUCKET="semaspruebatecnica.appspot.com"
MESSAGINGSENDERID="649726170518"
APPID="1:649726170518:web:1ba383419ad364ca75f9b7"
PORT=3000 ⚠️
```
- Iniciar la aplicación back con `node app.js`

3. Configurar el Front:
- Ingresar a la carpeta front
- Ejecutar `npm install` ó `pnpm install`
- Crear un archivo .env.local con la variable `NEXT_PUBLIC_BACKEND=http://localhost:3000/`⚠️
- Construir la aplicación front con `npm run build` ó `pnpm run build`
- Iniciar la aplicación front con `npm run start` ó `pnpm run start`

4. Accede a la aplicación desde `http://localhost:port/`
