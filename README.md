# Midas - Save data

Este projeto faz parte do trabalho da disciplina de Arquitetura de Backend do curso de pós-graduação em Desenvolvimento Web FullStack da PUC Minas. Trata de um tópico, fila e função lambda a serem executados na AWS para salvar os dados de supermercado, produto e preço recuperados de uma NFC-e do estado de Minas Gerais à partir do processo de [scrapping](https://github.com/RicardoGPP/dwfs-abeol2-midas-scrapper-lambda) realizado anteriormente.

## Principais arquivos e diretórios do projeto

 - [template.yaml](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/template.yaml): Descreve os recursos a serem provisionados na AWS;
 - [app.mjs](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/app/app.mjs): Faz a tratativa de eventos de save-data;
 - [knexfile.mjs](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/app/knexfile.js): Contém a configuração necessária para a conexão com o banco de dados;
 - [migrations](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/app/src/migration/): Contém as migrações para criação das tabelas do banco de dados;
 - [data-mapper.mjs](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/app/src/mapper/data-mapper.mjs): Contém funções para conversão de modelo;
 - [supermarket-repository.mjs](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/app/src/repository/supermarket-repository.mjs): Repositório de supermercados;
 - [product-repository.mjs](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/app/src/repository/product-repository.mjs): Repositório de produtos;
 - [price-repository.mjs](https://github.com/RicardoGPP/dwfs-abeol2-midas-save-data-lambda/blob/main/app/src/repository/price-repository.mjs): Repositório de preços.

## Funcionamento

O processo de salvamento tem a função de receber os dados da NFC-e obtidos através de seu scrapping e então persistí-los no banco de dados. Esta é a segunda etapa do sistema **Midas**, que tem por objetivo ser um indexador de preços de forma a ajudar o usuário a decidir onde fazer suas compras com base em um histórico de compras já realizadas por outros usuários.
