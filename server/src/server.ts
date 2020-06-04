import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);

// Rota: Endereço completo da requisisão
// Recurso: Qual entidade estamos acessando do sistema

// GET: Buscar uma ou mais informações do back-end
// POST: Cirar uma nova informação do back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remover uma informação do back-end

// POST http://localhost:3333/users = Criar um usuário
// GET http://localhost:3333/users = Listar usuários
// GET http://localhost:3333/users/5 = Buscar dados do usuário com ID 5

// Request Params: Parâmetros que vem na própria rota que indentificam um recurso
// Query Param: Parâmetros que vem na própria rota geralmente opcionais para filtros, paginação, etc...
// Request Body: Parâmetros para criação e atualização de informações