# LifePath - Lifetime Financial Advice MVP

![LifePath](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-blue)

Plataforma de planejamento financeiro ao longo da vida, inspirada no livro **"Lifetime Financial Advice: A Personalized Optimal Multilevel Approach"**.

## 📋 Sobre o Projeto

LifePath é uma aplicação web que ajuda pessoas a tomar decisões ótimas ao longo da vida sobre:

- 💰 **Quanto gastar e poupar hoje**
- 📈 **Quanto acumular para o futuro**
- ⚖️ **Quanta risco assumir nos investimentos**
- 🎁 **Quanto planejar de herança**
- 🛡️ **Necessidade de seguro de vida e renda vitalícia**

### Abordagem

O produto segue a lógica do modelo hierárquico de planejamento financeiro:

1. **Modelo Life-Cycle (Pai)** - Calcula plano de consumo/poupança considerando capital humano e passivos
2. **Asset Allocation (Filho)** - Traduz em alocação de risco para o patrimônio financeiro
3. **Modelo Tático (Grandchild)** - Seleção de produtos específicos (roadmap futuro)

## 🚀 Funcionalidades

### MVP Implementado

✅ **Onboarding Completo (10 telas)**
- Dados pessoais e demográficos
- Objetivos de vida e aposentadoria
- Carreira e renda
- Ativos e passivos financeiros
- Gastos obrigatórios
- 5 preferências pecuniárias (impaciência, suavização, risco, herança)
- Preferências ESG
- Resumo e confirmação

✅ **Cálculos Financeiros**
- Estimativa de capital humano (VP da renda futura)
- Passivo de consumo obrigatório (VP de gastos essenciais)
- Balanço econômico completo
- Projeção de vida até aposentadoria
- Taxa de poupança recomendada
- Alocação de risco alvo (equity vs bonds)

✅ **Visualizações**
- Gráfico de evolução de capital humano vs financeiro
- Projeção de patrimônio total ao longo da vida
- Alocação de ativos recomendada (pie chart)
- Comparação taxa de poupança atual vs recomendada
- Dashboard interativo com métricas principais

✅ **Indicadores Qualitativos**
- Necessidade de seguro de vida (baixa/média/alta)
- Valor sugerido de cobertura
- Recomendação sobre renda vitalícia

✅ **Persistência Local**
- Dados salvos automaticamente no localStorage
- Possibilidade de revisar e atualizar o plano

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Framework UI
- **TypeScript 5** - Type safety
- **Vite** - Build tool moderna e rápida
- **React Router v6** - Navegação SPA

### UI/UX
- **Tailwind CSS** - Estilização utility-first
- **Lucide React** - Ícones modernos
- **Recharts** - Gráficos interativos

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas (preparado para uso)

### Estado e Dados
- **Context API + useReducer** - Estado global
- **localStorage** - Persistência client-side

### Utilitários
- **date-fns** - Manipulação de datas

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes básicos (Button, Input, Card, etc)
│   └── charts/         # Componentes de gráficos (preparado para uso)
├── pages/              # Páginas da aplicação
│   ├── onboarding/     # 10 telas de onboarding
│   │   ├── WelcomeScreen.tsx
│   │   ├── PersonalDataScreen.tsx
│   │   ├── LifeGoalsScreen.tsx
│   │   ├── CareerScreen.tsx
│   │   ├── AssetsScreen.tsx
│   │   ├── LiabilitiesScreen.tsx
│   │   ├── PreferencesScreen.tsx
│   │   ├── ESGScreen.tsx
│   │   ├── SummaryScreen.tsx
│   │   └── PlanScreen.tsx
│   └── dashboard/      # Dashboard principal
│       └── Dashboard.tsx
├── context/            # Context API
│   └── AppContext.tsx
├── services/           # Lógica de negócio
│   ├── calculations/   # Motor de cálculos financeiros
│   │   └── financialEngine.ts
│   └── storage/        # Persistência localStorage
│       └── localStorage.ts
├── types/              # TypeScript types
│   └── index.ts
├── utils/              # Funções utilitárias
├── constants/          # Constantes da aplicação
│   └── index.ts
└── App.tsx             # Componente raiz
```

## 🚦 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd lifetime-financial-advice-mvp
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 📊 Modelo de Cálculos

### Capital Humano

Calcula o valor presente da renda futura até a aposentadoria:

```
HC = Σ [Renda_Futura(t) / (1 + r)^t]
```

Onde:
- `t` = anos até aposentadoria
- `r` = taxa de desconto ajustada por risco e mortalidade
- Renda cresce conforme expectativa informada

### Passivo de Consumo

Valor presente dos gastos essenciais futuros:

```
CL = Σ [Gastos_Futuros(t) / (1 + r)^t]
```

Ajustado por inflação e probabilidade de sobrevivência.

### Balanço Econômico

```
Net Worth Econômico = (HC + Ativos Financeiros + Imóveis) - (CL + Dívidas)
```

### Alocação de Risco

Baseada em:
- **40%** Fator idade (regra "110 - idade")
- **40%** Tolerância a risco declarada
- **20%** Proporção capital humano / patrimônio total

## 🎨 Componentes Principais

### OnboardingLayout
Layout padrão para telas de onboarding com:
- Barra de progresso
- Navegação entre etapas
- Botões voltar/avançar

### ProgressBar
Indicador visual de progresso no onboarding

### RadioGroup
Grupo de radio buttons estilizado

### Card
Container reutilizável para conteúdo

### Gráficos (Recharts)
- LineChart - Evolução temporal
- PieChart - Alocação de ativos

## 🔄 Fluxo da Aplicação

1. **Welcome** → Introdução ao LifePath
2. **Personal Data** → Dados pessoais básicos
3. **Life Goals** → Objetivos e aposentadoria
4. **Career** → Carreira e renda (capital humano)
5. **Assets** → Ativos financeiros e imóveis
6. **Liabilities** → Passivos e gastos
7. **Preferences** → 5 preferências pecuniárias + questionário de risco
8. **ESG** → Preferências não-pecuniárias
9. **Summary** → Revisão dos dados
10. **Plan** → Visualização do plano gerado
11. **Dashboard** → Acompanhamento contínuo

## 📈 Roadmap

### Versão 1.1 (Próxima)
- [ ] Otimização multi-contas com impostos
- [ ] Simulações estocásticas (Monte Carlo)
- [ ] Análise de risco de ruína
- [ ] Exportação de relatórios (PDF)

### Versão 2.0
- [ ] Backend com autenticação
- [ ] Banco de dados real
- [ ] Seleção de produtos específicos (fundos, ETFs)
- [ ] Integrações com corretoras
- [ ] App mobile (React Native)

## 🧪 Testing (Futuro)

Para adicionar testes:

```bash
# Instalar dependências de teste
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Executar testes
npm run test
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é um MVP educacional e não deve ser usado como única fonte de aconselhamento financeiro. Sempre consulte um profissional certificado.

## 👨‍💻 Autor

Desenvolvido com base no PRD de planejamento financeiro ao longo da vida.

## 🙏 Agradecimentos

- Livro: "Lifetime Financial Advice: A Personalized Optimal Multilevel Approach"
- Comunidade React e TypeScript
- Recharts pela excelente biblioteca de gráficos

---

**Nota**: Este é um MVP (Minimum Viable Product). Questões de LGPD, segurança da informação e escalabilidade não foram implementadas nesta versão e devem ser consideradas antes de uso em produção.
