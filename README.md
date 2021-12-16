# Datapoa App / Bus Finder
Este aplicativo foi desenvolvido no período de 14/12/21 à 17/12/21. São utilizadas informações da API do [DataPoa](http://datapoa.com.br/group/about/mobilidade).   
A partir dessas informações, são listadas as linhas de ônibus e de lotações de Porto Alegre/RS.   
A partir da listagem, é possível:
- realizar buscas de linhas de ônibus ou lotação (ou os dois) por nome ou código; 
- consultar o itinerário de cada linha; 
- visualizar o itinerário no mapa do MapBox; 
- ver número de localidades; 
- consultar as localidades no Google Maps via link.

## Preview


  
![resized_1](https://user-images.githubusercontent.com/38799478/146426781-bc7b5502-1c63-40c4-8e2e-9ac97ff933fa.png)
![resized_2](https://user-images.githubusercontent.com/38799478/146426785-631502d3-3a79-4465-a48c-92645421ad8b.png)
![resized_3](https://user-images.githubusercontent.com/38799478/146426786-80845f35-f853-45af-b549-0f8ba7da66fb.png)

![resized_4](https://user-images.githubusercontent.com/38799478/146426787-946529a1-6da1-4d3e-9139-e2e1b057cf52.png)
![resized_5](https://user-images.githubusercontent.com/38799478/146426788-e7ad72a0-dab6-4550-80c4-6099739668a4.png)
![resized_6](https://user-images.githubusercontent.com/38799478/146426791-57f3bc4b-f30a-4401-b84f-3b477aacef0e.png)



## Instalação

- #### Instalar dependências
        npm install 



  #### Para fazer o build do projeto, você precisa ter configurado o [ambiente de desenvolvimento React Native](https://reactnative.dev/docs/environment-setup).

- #### Inicializar o servidor Metro
         
        npx react-native start
         

- #### Instalar o aplicativo no emulador Android ou em um dispositivo Android cabeado.

        
        npx react-native run-android
        
  ##### **IMPORTANTE**
  Se ocorrer o erro `Error: spawn ./gradlew EACCES`, é necessário executar o comando `chmod 755 android/gradlew`, e então fazer o build do projeto novamente.
