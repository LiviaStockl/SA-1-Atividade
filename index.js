const express = require("express");
const app = express();

app.use(express.json());


const atividades = [
    {
        id: 1,
        titulo: "Enviar formulário",
        descricao: "precisamos enviar um formulário para o cliente",
        status: "Pendente 🔴"
    }
];
const contador = { valor: 1 };

id = (atividades.length + 1)


app.post("/atividades", (req, res) => {
    const { titulo, descricao, status } = req.body;

    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ mensagem: "O título é obrigatório!" });
    }

    const novaAtividade = {
        id: id,
        titulo: titulo,
        descricao: descricao,
        status: status
    };

    id++

    atividades.push(novaAtividade);

    res.status(201).json(novaAtividade);
});


app.get("/atividades", (req, res) => {
    res.status(200).json(atividades);
});


app.get("/atividades/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const atividade = atividades.find(a => a.id === id);

    if (!atividade) {
        return res.status(404).json({ mensagem: "Atividade não encontrada!" });
    }

    res.status(200).json(atividade);
});


app.put("/atividades/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, descricao, status } = req.body;

    const atividade = atividades.find(a => a.id === id);

    if (!atividade) {
        return res.status(404).json({ mensagem: "Atividade não encontrada!" });
    }

    if (atividade.status === "Concluída") {
        return res.status(400).json({ mensagem: "Não pode alterar atividade concluída!" });
    }

    if (titulo && titulo.trim() === "") {
        return res.status(400).json({ mensagem: "Título não pode ser vazio!" });
    }

    if (titulo) atividade.titulo = titulo;
    if (descricao) atividade.descricao = descricao;

    if (status) {
        if (!["Pendente", "Em Andamento", "Concluída"].includes(status)) {
            return res.status(400).json({ mensagem: "Status inválido!" });
        }

        atividade.status = status;
    }

    res.status(200).json(atividade);
});


app.delete("/atividades/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = atividades.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Atividade não encontrada!" });
    }

    atividades.splice(index, 1);
    res.status(200).json({ mensagem: "Atividade removida com sucesso!" });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});