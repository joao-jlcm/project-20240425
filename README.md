# Seja bem vindo :wink:

## Requerimentos mínimos

Você precisará ter instalado em sua máquina:

- **Node.js:** versão 20 ou superior
- **Firebase CLI:** [link para o site oficial](https://firebase.google.com/docs/cli?hl=pt-br)
- **Nest.js CLI:** ```npm install -g @nestjs/cli```

## Baixando e rodando o projeto

Execute os seguintes comandos:

```bash
git clone https://github.com/joao-jlcm/project-20240425
cd project-20240425/
firebase emulators:start
```

Você precisará realizar o login na sua conta do Google e criar um projeto no Firebase. O meu projeto se chama **project-326f7**, você poderá criar um projeto com o mesmo nome ou modificar os scripts a seguir.

## Exemplos

### Incluindo um registro

```bash
curl -H 'Content-Type: application/json' --data '{"name": "use sua criatividade"}' http://localhost:5001/project-326f7/us-central1/api
```

### Retornando todos os registros

```bash
curl http://localhost:5001/project-326f7/us-central1/api
```