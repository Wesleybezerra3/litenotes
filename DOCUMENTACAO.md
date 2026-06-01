# 📝 Documentação - Lite Notes

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Componentes](#componentes)
5. [Páginas](#páginas)
6. [Contexto e Estado](#contexto-e-estado)
7. [Serviços e API](#serviços-e-api)
8. [Funcionalidades](#funcionalidades)

---

## 🎯 Visão Geral

**Lite Notes** é uma aplicação web para gerenciamento de notas com interface intuitiva. O projeto utiliza React com Vite como build tool e oferece funcionalidades como:

- ✍️ Criação e edição de notas
- 📋 Sistema de conteúdo com múltiplos itens por nota
- 🔀 Drag and drop para reordenação de itens
- ⭐ Marcação de notas como favoritos
- 🗑️ Lixeira para notas deletadas
- 🔐 Autenticação com JWT
- 📱 Interface responsiva

---

## 🛠️ Tecnologias Utilizadas

### Dependências Principais
```json
{
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "react-router-dom": "^7.15.1",
  "axios": "^1.16.1",
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@fortawesome/react-fontawesome": "^3.3.1"
}
```

### Build e Development
- **Vite**: Build tool rápido e moderno
- **ESLint**: Linting de código
- **React 19**: Framework UI

---

## 📂 Estrutura do Projeto

```
src/
├── App.jsx                    # Componente raiz com roteamento
├── main.jsx                   # Ponto de entrada
├── index.css                  # Estilos globais
│
├── components/                # Componentes reutilizáveis
│   ├── ModalNote/
│   │   └── index.jsx         # Modal para criar/editar notas
│   ├── ItemsNote/
│   │   └── index.jsx         # Item individual dentro da nota
│   ├── SortableCard.jsx       # Wrapper para card sortável
│   ├── PrivateRoute/
│   │   └── index.jsx         # Proteção de rotas
│   └── cards/
│       └── CardNotes/
│           └── index.jsx     # Card de exibição da nota
│
├── pages/                     # Páginas principais
│   ├── Home/
│   │   └── index.jsx         # Dashboard principal
│   ├── Login/
│   │   └── index.jsx         # Página de login
│   ├── Register/
│   │   └── index.jsx         # Página de registro
│   ├── RecentNotes/
│   │   └── index.jsx         # Listagem de notas recentes
│   ├── Favorites/
│   │   └── index.jsx         # Notas marcadas como favorito
│   ├── TrashPage/
│   │   └── index.jsx         # Notas na lixeira
│   └── NotFound/
│       └── index.jsx         # Página 404
│
├── context/
│   └── Context.jsx            # Context API para estado global do usuário
│
└── services/
    └── api.js                 # Configuração de requisições HTTP
```

---

## 🧩 Componentes

### 1. **ModalNote** (`src/components/ModalNote/index.jsx`)
Modal para criação e edição de notas.

**Props:**
- `visible` (boolean): Controla visibilidade do modal
- `onClose` (function): Callback ao fechar o modal

**Estado:**
```javascript
const [items, setItems] = useState([{ id: "1", valor: "" }]);
const [titulo, setTitulo] = useState("");
```

**Principais Funções:**
- `handleSubmit()`: Salva a nota com título e múltiplos conteúdos
- `handleAddItem()`: Adiciona novo item de conteúdo
- `handleRemoveItem(id)`: Remove item específico
- `handleUpdateItemValue(id, valor)`: Atualiza valor de item
- `handleDragEnd(event)`: Gerencia reordenação via drag and drop

**Dados Enviados para API:**
```javascript
{
  titulo: string,
  conteudos: [{ texto: string }, ...],
  ordem: [1, 2, 3, ...]
}
```

---

### 2. **ItemsNote** (`src/components/ItemsNote/index.jsx`)
Componente que representa um item individual de conteúdo dentro da nota.

**Props:**
- `id` (string): Identificador único do item
- `valor` (string): Valor atual do input
- `onRemove` (function): Callback para remover item
- `onUpdateValue` (function): Callback para atualizar valor

**Funcionalidades:**
- ✏️ Input para digitação do conteúdo
- 🗑️ Botão para remover item
- 🔀 Ícone de drag (identificador visual)
- ⚠️ Previne que drag interfira com digitação

---

### 3. **SortableCard** (`src/components/SortableCard.jsx`)
Wrapper que torna o CardNotes arrastável usando `@dnd-kit`.

**Props:**
- `note` (object): Dados da nota
- `onDelete` (function): Callback para deletar nota

**Estructura da Nota:**
```javascript
{
  id: string,
  titulo: string,
  conteudos: [{ texto: string }, ...],
  criadaEm: timestamp,
  ...
}
```

---

### 4. **CardNotes** (`src/components/cards/CardNotes/index.jsx`)
Card que exibe a nota em formato de visualização.

**Props:**
- `id` (string): ID da nota
- `title` (string): Título da nota
- `content` (array): Array de objetos com conteúdo
- `date` (string): Data de criação
- `onDelete` (function): Callback para deletar

**Funcionalidades:**
- 📅 Exibe tempo relativo (ex: "há 2 dias")
- 📝 Mostra até 3 primeiros itens
- ➕ Indicador de itens adicionais
- 🗑️ Botão para deletar nota

---

### 5. **PrivateRoute** (`src/components/PrivateRoute/index.jsx`)
Componente para proteger rotas que requerem autenticação.

**Lógica:**
- Verifica se token existe no localStorage
- Se não houver token, redireciona para login
- Se houver token, renderiza a rota protegida

---

## 📄 Páginas

### **Login** (`src/pages/Login/index.jsx`)
- Autenticação do usuário
- Armazenamento de JWT no localStorage
- Redirecionamento para Home após login bem-sucedido

### **Register** (`src/pages/Register/index.jsx`)
- Criação de novo usuário
- Validação de campos
- Redirecionamento para login

### **Home** (`src/pages/Home/index.jsx`)
- Dashboard principal
- Menu lateral com navegação
- Renderiza sub-páginas como Outlet do React Router
- Exibe informações do usuário logado

### **RecentNotes** (`src/pages/RecentNotes/index.jsx`)
- Lista de todas as notas recentes
- Ordenação via drag and drop
- Botão para criar nova nota
- Busca de notas (em desenvolvimento)

**Props Passadas ao SortableCard:**
```javascript
<SortableCard 
  key={note.id} 
  note={note} 
  onDelete={handleDeleteNote} 
/>
```

### **Favorites** (`src/pages/Favorites/index.jsx`)
Página para notas marcadas como favorito (em desenvolvimento).

### **TrashPage** (`src/pages/TrashPage/index.jsx`)
Página para notas deletadas (em desenvolvimento).

### **NotFound** (`src/pages/NotFound/index.jsx`)
Página 404 para rotas não encontradas.

---

## 🌐 Contexto e Estado

### **UserContext** (`src/context/Context.jsx`)

```javascript
export const UserContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    nome: "",
  });
  
  const logUser = (userData) => setUser(userData);
  
  return (
    <UserContext.Provider value={{ user, logUser }}>
      {children}
    </UserContext.Provider>
  );
};
```

**Uso nos Componentes:**
```javascript
const { user, logUser } = useContext(UserContext);
```

**Dados do Usuário:**
- `id`: ID único do usuário
- `nome`: Nome completo

---

## 🔌 Serviços e API

### **API Configuration** (`src/services/api.js`)

```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8180'
});

// Interceptor: Adiciona token JWT automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

### **Endpoints Utilizados**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/notes` | Listar todas as notas |
| POST | `/api/notes` | Criar nova nota |
| DELETE | `/api/notes/:id` | Deletar nota |
| GET | `/api/notes/:id` | Obter nota específica |
| PUT | `/api/notes/:id` | Atualizar nota |

---

## ✨ Funcionalidades

### ✅ Implementadas

1. **Autenticação**
   - Login com JWT
   - Registro de usuário
   - Proteção de rotas

2. **Gerenciamento de Notas**
   - ✍️ Criar notas com múltiplos itens
   - 📝 Editar conteúdo de itens
   - 🗑️ Remover itens individuais
   - 🔀 Reordenar itens via drag and drop
   - 📋 Visualizar notas em cards

3. **Interface**
   - 🎨 Menu lateral navegável
   - 🔍 Busca de notas (estrutura pronta)
   - 📅 Exibição de tempo relativo
   - ⚡ Transições suaves

### 🔄 Em Desenvolvimento / Melhorias Futuras

1. **Favorites** - Sistema de marcar notas como favorito
2. **Trash** - Funcionalidade completa de lixeira
3. **Busca** - Filtragem avançada de notas
4. **Categorias** - Organização de notas em pastas
5. **Compartilhamento** - Compartilhar notas com outros usuários
6. **Sincronização em Tempo Real** - Atualizar notas em tempo real

---

## 🐛 Problemas Resolvidos

### 1. **Inputs não digitáveis em ItemsNote**
**Problema:** Os listeners de drag estavam impedindo digitação.
**Solução:** Adicionado `onPointerDown` com `stopPropagation()` e movidos listeners apenas para o ícone de drag.

### 2. **Todos os inputs recebendo mesmo valor**
**Problema:** Estado único `inputValue` compartilhado entre todos os itens.
**Solução:** Cada item armazena seu próprio `valor` dentro do array `items`.

### 3. **Erro ao salvar nota**
**Problema:** `.map()` sendo chamado em `conteudos.length` (number) ao invés de `conteudos` (array).
**Solução:** Corrigido para `conteudos.map((_, index) => index + 1)`.

---

## 📖 Como Usar

### Desenvolvimento
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

---

## 📝 Convenções de Código

- **Nomes de Componentes:** PascalCase
- **Nomes de Funções:** camelCase
- **Props Callbacks:** `on` + NomeDoEvento
- **Estados:** useState para estado local, Context para global
- **Estilos:** CSS Modules por componente

---

## 🔐 Segurança

- JWT armazenado em localStorage
- Interceptador de requisições adiciona token automaticamente
- Rotas protegidas verificam autenticação
- Validação de campos no frontend

---

## 📞 Suporte

Para dúvidas ou problemas, consulte a estrutura do projeto e a documentação de cada componente.

---

**Última atualização:** 1 de junho de 2026
**Versão:** 0.0.0 (em desenvolvimento)
