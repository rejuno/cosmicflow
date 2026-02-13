# 🌌 CosmicDay | Sua janela interativa para o cosmos, alimentada por dados em tempo real da NASA.

### O CosmicDay é um dashboard interativo que conecta entusiastas da astronomia aos dados em tempo real da NASA, personalizando a experiência de acordo com a sua localização no planeta.



[Reportar Bug](https://www.linkedin.com/in/renatajnovais/)

# 🚀 Funcionalidades Principais
- **Spotlight Astronômico (APOD)**: Explore a icônica "Imagem Astronômica do Dia" da NASA. O dashboard apresenta capturas em alta resolução acompanhadas de legendas técnicas detalhadas.

- **Espaço Localizado**: Uma janela exclusiva para o seu céu. Utilizando a API de geolocalização do navegador, o app renderiza um mapa estelar preciso baseado nas coordenadas reais do usuário.

- **Perfil do Astronauta Diário**: Conecte-se com a história da exploração humana. O sistema seleciona aleatoriamente perfis de astronautas da agência espacial, apresentando suas trajetórias e missões.

- **Monitor de Ciclo Lunar**: Acompanhe as fases da Lua em tempo real com dados astronômicos precisos, permitindo visualizar o estado atual do nosso satélite natural.

- **Calendário Cósmico Histórico**: Uma máquina do tempo astronômica. Navegue por décadas de arquivos da NASA através de um calendário interativo para descobrir o que o universo revelou em datas especiais.

- **Ecossistema Multilingue (i18n)** - Experiência global sem barreiras. O projeto conta com suporte nativo e tradução dinâmica para Português, Inglês, Espanhol e Japonês, detectando automaticamente a preferência do sistema.


# 🛠️ Stack Técnica

### **Frontend & Interface**
* **React 18:** Biblioteca core para construção de interfaces reativas e baseadas em componentes.
* **TypeScript:** Tipagem estática para garantir segurança, escalabilidade e melhor manutenção do código.
* **Tailwind CSS:** Framework utilitário para estilização responsiva, implementando **Dark Mode** e efeitos de *Glassmorphism*.
* **Vite:** Tooling de última geração para builds otimizados e desenvolvimento ultra-rápido.

### **Backend & Integrações**
* **Node.js & Express:** Ambiente de execução e framework para criação de rotas e gerenciamento de requisições.
* **Axios & Node-Fetch:** Consumo eficiente de APIs assíncronas com tratamento de erros especializado.
* **CORS & Dotenv:** Camadas de segurança para proteção de chaves de API e controle de acesso.

### **APIs Utilizadas**
* [**NASA APIs:**](https://api.nasa.gov/) Fonte primária de dados científicos (APOD e arquivos astronômicos).
* [**Weather API (AstronomyAPI):**](https://www.weatherapi.com/) Engine para geração de mapas estelares personalizados e informar fase da lua atual.
* [**The Space Devs API:**](https://thespacedevs.com/llapi) Banco de dados sobre astronautas e eventos espaciais.
* [**Google Translate API:**](https://cloud.google.com/translate) Tradução dinâmica de conteúdos técnicos em tempo real.

### **Performance & Infraestrutura**
* **Estratégia de Caching:** Persistência via **LocalStorage**, reduzindo a latência e o consumo de cotas das APIs.
* **Deploy Híbrido:** Backend hospedado no **Render** e Frontend distribuído via **Vercel**.


## 🎨 Design System (UI)

O design do **CosmicDay** foi planejado para ser imersivo e futurista, utilizando técnicas de *Glassmorphism* (efeito de vidro) para sobrepor dados científicos às imagens espaciais.

### 🌓 Temas
- **Dark Mode (Padrão):** Fundo em tons profundos de roxo e preto para reduzir o cansaço visual e destacar as cores das nebulosas.
- **Light Mode:** Interface limpa e minimalista, mantendo a legibilidade em ambientes iluminados.

### 🎨 Paleta de Cores
| Cor  | Hex |
| :--- | :--- |
| **Primary** | `#332062` |
| **Secondary** | `#F4F4F4` |
| **Accent Light Mode** | `#A8DCEC` |
| **Accent Dark Mode** | `#C6D5F2` |

### 🔡 Tipografia
* **Cinzel:** Utilizada para títulos e elementos de navegação. Sua estética clássica e geométrica evoca a grandiosidade e a história das constelações.
* **Cormorant:** Utilizada para corpos de texto e dados técnicos. Uma fonte sans-serif moderna que garante legibilidade e um toque tecnológico.

### 💠 Componentes Visuais
- **Blur & Transparency:** Uso de `backdrop-blur` para criar camadas de profundidade.
- **Micro-interações:** Animações de órbita e pulsação em estados de carregamento para manter o usuário engajado.

## ⚙️ Como Executar o Projeto

Este projeto é dividido em **Client** (Frontend) e **Server** (Backend).

### 📋 Pré-requisitos
* [Node.js](https://nodejs.org/) (v18 ou superior)
* Chave das APIs informadas na seção **APIs Utilizadas**

### 1️⃣ Configuração do Backend (Server)
1. Navegue até a pasta do servidor: `cd backend`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` e adicione a chave das APIs
4. Inicie: `npm start` (Rodará em `http://localhost:3000`)

### 2️⃣ Configuração do Frontend (Client)
1. Navegue até a pasta do frontend: `cd client`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env`
4. Inicie: `npm run dev` (Rodará em `http://localhost:5173`)


## ⚙️ Como Executar o Projeto

### 📋 Pré-requisitos
- Node.js instalado (v18+)
- Chave das APIs informadas na seção **APIs Utilizadas**

### 🚀 Passo a Passo

1. **Clone e Instalação**
   ```bash
   git clone [https://github.com/seu-usuario/cosmic-day.git](https://github.com/seu-usuario/cosmicflow.git)
   cd cosmicflow

2. **Configuração do Servidor (Backend)**
    ```bash
    cd backend
    npm install
    # Crie um arquivo .env e adicione as APIs:
    # exemplo: ASTRONOMY_API_KEY=sua_chave_aqui
    node index.js

3. **Configuração da Interface (Frontend)**
    ```bash
    cd client
    npm install
    npm run dev

# 🌠 Futuras Implementações

[ ] Notificações Push para chuvas de meteoros.

[ ] Filtrar apenas mulheres para mostrar a astronauta do dia.

# 📝 Licença
Este projeto está sob a licença MIT.

