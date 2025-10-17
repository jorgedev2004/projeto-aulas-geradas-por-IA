🤖 Gerador de Planos de Aula com IA (Teste Técnico)
📖 Sobre o Projeto
Esta é uma aplicação web desenvolvida como parte de um teste técnico, com o objetivo de criar um gerador de planos de aula utilizando IA. A ferramenta possui um design moderno e profissional, permite que o usuário insira informações sobre uma aula e, ao final, gera um plano de aula detalhado que é salvo em um banco de dados no Supabase.

O coração deste projeto era a integração com a API do Google Gemini. Durante a configuração, descobrimos que o acesso aos 300 dólares em créditos gratuitos, oferecidos pelo Google Cloud, estava condicionado a uma verificação de faturamento. Este processo exigia um cartão de crédito ou uma pré-autorização de valor significativo (R$ 200), uma barreira que, infelizmente, se mostrou intransponível dentro do contexto deste teste.

Gostaria de ressaltar que nós realmente tentei superar este obstáculo. A jornada para fazer a API funcionar foi extensa: investiguei e implementei o código para conectar com a API do Gemini através de múltiplas plataformas alternativas (como OpenRouter e Hugging Face), mas encontreiinstabilidades temporárias de infraestrutura que também impediram a conexão ao vivo.

Essa experiência, apesar dos desafios, apenas aumentou meu grande interesse e minha vontade de aprender a dominar a API do Gemini em um ambiente de produção. Encaro esses obstáculos como parte do processo real de desenvolvimento e uma valiosa lição sobre resiliência.

Portanto, a decisão estratégica foi simular (mockar) a resposta da IA com um conteúdo de alta qualidade, garantindo a entrega de uma aplicação 100% funcional, robusta e com a excelente experiência de usuário que foi planejada.

➡️ Acessar Banco de Dados no Supabase >>> https://supabase.com/dashboard/project/xrsvzquinlethhbshpyv

✨ Funcionalidades
Interface Profissional: Design limpo e moderno, focado na experiência do usuário.

Geração Simulada de IA: Cria um plano de aula rico e detalhado com base nos inputs do formulário.

Integração com Supabase: Salva cada plano de aula gerado em um banco de dados real, cumprindo o requisito de backend.

Exportação para PDF: Funcionalidade extra que permite ao usuário baixar 5 questões relacionadas ao tema da aula em um arquivo PDF.

Segurança no Backend: A tabela no Supabase foi configurada com Políticas de Segurança de Nível de Linha (RLS), demonstrando conhecimento em boas práticas de segurança.

🛠️ Stack Utilizada
Frontend: HTML5, CSS3, JavaScript (Puro)

Backend (BaaS): Supabase (Banco de Dados PostgreSQL com RLS)

IA (Simulada): Google Gemini API (A implementação da chamada real está documentada no código)

Bibliotecas: jsPDF

🚀 Como Executar o Projeto

Existem duas formas:

Primeira e mais rápida (web),basta acessar o link >>> https://jorgedev2004.github.io/projeto-aulas-geradas-por-IA/
que ele vai te levar ao site 100% funcional e que ao clicar em "gerar plano de aula" ela gera o plano e popula o banco
de dados no SupaBase link do banco de dados >>> https://supabase.com/dashboard/project/xrsvzquinlethhbshpyv


Agora, a segunda forma (Localmente)
Para executar este projeto localmente e conectá-lo ao seu próprio backend Supabase, siga os passos abaixo.

Pré-requisitos
Uma conta no Supabase.

Um navegador web moderno (Chrome, Firefox, Edge).

Git instalado na sua máquina.

Passo 1: Configuração do Backend (Supabase)
Crie um Novo Projeto: Acesse seu dashboard do Supabase e crie um novo projeto.

Execute o Script SQL:

No menu à esquerda do seu projeto, vá para SQL Editor.

Clique em "+ New query".

Copie todo o conteúdo do arquivo schema.sql deste repositório, cole no editor e clique em "RUN". Isso criará a tabela planos_gerados com a estrutura e as políticas de segurança corretas.

Obtenha as Credenciais:

No menu à esquerda, vá para Project Settings (ícone de engrenagem).

Clique em API.

Nesta página, você encontrará sua Project URL e sua Chave Pública anon. Mantenha esta página aberta

Passo 2: Configuração do Frontend (Código-fonte)

Clone o Repositório: Abra um terminal e clone este projeto para a sua máquina.
Configure as Chaves:

Abra o projeto no seu editor de código (ex: VS Code).

Abra o arquivo main.js.

Localize as duas primeiras constantes no topo do arquivo e substitua os valores pelas credenciais que você copiou do seu projeto Supabase:

// =================================================================
// 1. CONFIGURAÇÃO
// =================================================================
const SUPABASE_URL = 'SUA_URL_DO_SUPABASE_AQUI';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANON_AQUI';
// ...

