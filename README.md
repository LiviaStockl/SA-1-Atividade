#Atividade SA-1

##Descrição
API simples para cadastrar atividades

##Rotas

##POST /atividades
Criar atividade

##GET /atividades
Listar todas

##GET /atividades/:id
Buscar por id

##PUT /atividades/:id
Atualizar atividades

##DELETE /atividade/:id
Remover atividade


##Regras de Negócio
- Não permitir criar tarefas com título vazio
- Não permitir alterar tarefa que já esteja concluída
- Não permitir concluir tarefas que já esteja conuída
- O id tem que ser único
- O sistema deve retornar códigos HTTP corretos

##Tecnologias
- Node.js
- Express