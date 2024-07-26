# Midas - Save data

Este projeto faz parte do trabalho da disciplina de Arquitetura de Backend do curso de pós-graduação em Desenvolvimento Web FullStack da PUC Minas. Trata de um tópico, fila e função lambda a serem executados na AWS para salvar os dados de supermercado, produto e preço recuperados de uma NFC-e do estado de Minas Gerais à partir do processo de [scrapping](https://github.com/RicardoGPP/dwfs-abeol2-midas-scrapper-lambda) realizado anteriormente.

## Principais arquivos e diretórios do projeto

 - [template.yaml](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/template.yaml): Descreve os recursos a serem provisionados na AWS;
 - [app.mjs](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/hello-world/app.mjs): Faz a tratativa de eventos de save-data;
 - [knexfile.js](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/hello-world/knexfile.js): Contém a configuração necessária para a configuração no banco de dados;
 - [migrations](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/hello-world/db/migrations/): Contém as migrações para criação das tabelas do banco de dados;
 - [supermarket-repository.js](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/hello-world/repository/supermarket-repository.js): Repositório de supermercados;
 - [product-repository.js](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/hello-world/repository/product-repository.js): Repositório de produtos;
 - [price-repository.js](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/hello-world/repository/price-repository.js): Repositório de preços;

## Funcionamento

O processo de salvamento tem a função de receber os dados da NFC-e obtidos através de seu scrapping e então persistí-los no banco de dados. Esta é a segunda etapa do sistema **Midas**, que tem por objetivo ser um indexador de preços de forma a ajudar o usuário a decidir onde fazer suas compras com base em um histórico de compras já realizadas por outros usuários.
