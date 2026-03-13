***Herramientas usadas***
Gemini
chatGPT

***Promts***

1. Tengo problemas para crear proyecto angular v6.0, tengo instalado 20.0.0 , instalado nvm, al intentar instalar la versión 10.24.1 de node me retorna error de nvm no encuentra el archivo de instalación. 
2. ayúdame a desactivar el Escudo de Windows Defender para lograr la instalación de nvm-node 10.24.1
3. Ayúdame con la configuración de CORS para consumir API desde angular v6.0
4. descríbeme la estructura de un proyecto angular 6.0 teniendo en cuenta servicios, modelos , interfaces y si aplica app-routing-modules.ts o modules.ts

***Desiciones ***
1. no desactive windows defender, el error ocurre porque la versión que quería instalar es obsoleta, tuve que realizar la instalación de manera manual para poder correr el proyecto angular 6.
2. a pesar de que podía usar solo modules.ts , decidi crear el archivo routing-modules.ts aparte para solo manejar las rutas desde allí y en modules, como su nombre lo indica manejar los módulos que se utilizaron en el proyecto. 
