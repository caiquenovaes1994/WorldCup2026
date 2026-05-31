# Adicionar convocados das 48 seleções, mascotes e bola oficial

## Descrição

Esta issue tem como objetivo mapear e organizar a inclusão de novos dados essenciais para o projeto da Copa do Mundo de 2026.

## Tarefas (Checklist)

- [x] Levantar e estruturar a lista de jogadores convocados de todas as 48 seleções participantes. (28/48)
- [x] Adicionar dados e informações detalhadas (história, imagens, curiosidades) sobre o(s) mascote(s) da competição.
- [x] Adicionar informações (nome, detalhes do design, tecnologias) sobre a bola oficial do torneio.

## Critérios de Aceitação

- [x] Os dados dos convocados, mascotes e bola oficial devem estar corretamente estruturados no projeto (seja em Banco de Dados ou arquivos JSON/locais).
- [x] A interface deve possuir áreas ou páginas dedicadas para exibir o mascote e a bola oficial de forma atrativa.
- [x] A página/seção dedicada a cada seleção deve renderizar a lista de seus respectivos convocados de forma clara (com nome, posição, etc).

## Contexto Adicional

Esses dados são cruciais para manter a plataforma atualizada com as informações oficiais do torneio.

## Atualizações

**[30/05/2026] - Adição de Mascotes e Bola Oficial**

- Geração de imagens para os mascotes (Maple, Zayu e Clutch) e para a bola oficial (Adidas Trionda).
- Criação do arquivo de dados `src/data/tournamentInfo.ts`.
- Criação da página `TournamentInfoView.vue` para exibir as informações em formato de cards.
- Adição da rota `/sobre-torneio` e atualização do botão na página inicial (`HomeView.vue`).
- A parte de **jogadores convocados** foi tratada na iteração seguinte.

**[30/05/2026] - Integração dos Elencos Convocados**

- Processamento automatizado do arquivo `convocados.txt` gerando a base de dados `src/data/squads.json`.
- Identificação de clubes e criação de hiperlinks inteligentes de busca direta para o Transfermarkt para todos os jogadores.
- Jogadores com clubes desconhecidos foram mapeados e documentados no arquivo `missing_clubs.md`.
- Atualização da view `SquadsView.vue` para exibir os elencos separados por posição.
- Implementação de um banner informativo destacando que a lista oficial da FIFA sairá dia 2 de junho.
- Seleções ainda sem convocação foram sinalizadas com um asterisco (`*`).

**[31/05/2026] - Refinamento de Elencos e Otimização do Sistema**

- Mapeamento e correção massiva de centenas de jogadores sem clube associado (Premier League, Escócia, Itália, EUA, Tunísia, França, Alemanha e outros).
- Remoção visual dos logos dos clubes em SVG da tela de elencos para aliviar o peso e garantir o desempenho do sistema.
- Limpeza e exclusão de SVGs pesados da pasta `src/assets/clubs/`.
- Limpeza estrutural e exclusão de 11 scripts obsoletos e temporários na pasta `scripts/`, isolando a infraestrutura de extração em módulos focados (`parse_squads.js`, `create_md.js` e `known_clubs.json`).
