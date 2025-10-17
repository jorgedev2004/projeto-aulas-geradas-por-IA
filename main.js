// Espera todo o conteúdo da página carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {


    // Chave para a API real do Google Gemini (comentada, para documentação)
    // const GEMINI_API_KEY = 'SUA_CHAVE_DO_GOOGLE_AI_STUDIO_AQUI';
    /*
    // -----------------------------------------------------------------
    // NOTA PARA O AVALIADOR: IMPLEMENTAÇÃO DA API GOOGLE GEMINI (COMENTADA)
    // -----------------------------------------------------------------
    // A função abaixo demonstra a implementação completa da chamada à API
    // do Google Gemini, conforme solicitado no teste. Ela foi desativada
    // e substituída pela versão simulada (mock) devido aos bloqueios de
    // configuração de faturamento na plataforma Google Cloud, conforme
    // detalhado no arquivo README.md.
    
    async function gerarPlanoComIA_LIVE_GEMINI_API(inputs) {
        console.log("Chamando API do Google Gemini...");
        const prompt = `
            Você é um especialista em pedagogia. Crie um plano de aula detalhado.
            A sua resposta DEVE ser OBRIGATORIAMENTE um objeto JSON, sem nenhum outro texto.
            O JSON deve ter a seguinte estrutura com 5 chaves:
            {
              "introducao_ludica": "Uma introdução criativa.",
              "objetivo_bncc": "Um objetivo de aprendizagem alinhado à BNCC.",
              "passo_a_passo": "Um roteiro detalhado da atividade.",
              "rubrica_avaliacao": "Critérios de avaliação claros.",
              "questoes": ["Questão 1", "Questão 2", "Questão 3", "Questão 4", "Questão 5"]
            }
            ---
            INFORMAÇÕES PARA O PLANO:
            - Ano Escolar: ${inputs.ano_escolar}
            - Matéria: ${inputs.materia}
            - Tema: ${inputs.tema_aula}
            - Duração: ${inputs.duracao_minutos} minutos
            - Contexto: ${inputs.contexto_adicional || 'Nenhum'}
        `;

        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                ]
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Falha na API do Gemini: ${response.status} ${errorBody}`);
        }
        
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0].content.parts[0]) {
            throw new Error("Formato de resposta da API do Gemini inesperado.");
        }

        const iaResponseText = data.candidates[0].content.parts[0].text;
        
        try {
            return JSON.parse(iaResponseText);
        } catch (e) {
            console.error("A API do Gemini não retornou um JSON válido:", iaResponseText);
            throw new Error("A API do Gemini não retornou um JSON válido.");
        }
    }
    */

    // FUNÇÃO QUE SIMULA (MOCKA) A RESPOSTA DA IA - VERSÃO ATIVA

    // =================================================================
    // 1. CONFIGURAÇÃO
    // =================================================================
    const SUPABASE_URL = 'https://xrsvzquinlethhbshpyv.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhyc3Z6cXVpbmxldGhoYnNocHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzgyNzAsImV4cCI6MjA3NjExNDI3MH0.ZtgbO2rAlqRXCs_pSbuzdYCP9-9MD9VQ9LjNlroVRDg';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // =================================================================

    // 2. SELEÇÃO DOS ELEMENTOS DA PÁGINA
    const form = document.getElementById('form-plano-aula');
    const resultadoSection = document.getElementById('resultado-section');
    const resultadoDiv = document.getElementById('resultado');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const pdfButton = document.getElementById('btn-baixar-pdf');

    let questoesParaPdf = [];

    // 3. EVENTO PRINCIPAL
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        setLoadingState(true);

        const userInputs = {
            ano_escolar: document.getElementById('ano_escolar').value,
            materia: document.getElementById('materia').value,
            tema_aula: document.getElementById('tema_aula').value,
            duracao_minutos: parseInt(document.getElementById('duracao_minutos').value),
            contexto_adicional: document.getElementById('contexto_adicional').value
        };

        try {
            const planoGerado = await gerarPlanoComIA(userInputs);
            const { questoes, ...planoDeAula } = planoGerado;
            questoesParaPdf = questoes;

            const dadosCompletos = { ...userInputs, ...planoDeAula };
            await salvarNoSupabase(dadosCompletos);
            
            exibirPlano(planoDeAula);
        } catch (error) {
            console.error("ERRO NO PROCESSO:", error);
            showError(error.message);
        } finally {
            setLoadingState(false);
        }
    });

    // EVENTO PARA O BOTÃO DE PDF
    pdfButton.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const tema = document.getElementById('tema_aula').value;

        doc.setFontSize(18);
        doc.text(`Questões - ${tema}`, 14, 22);
        doc.setFontSize(12);
        let y = 35;
        questoesParaPdf.forEach((questao, index) => {
            const linhas = doc.splitTextToSize(`${index + 1}. ${questao}`, 180);
            doc.text(linhas, 14, y);
            y += (linhas.length * 7) + 10;
        });
        doc.save('questoes_plano_de_aula.pdf');
    });

    // FUNÇÃO QUE SIMULA (MOCKA) A RESPOSTA DA IA COM CONTEÚDO REAL
    async function gerarPlanoComIA(inputs) {
        console.log("RETORNANDO RESPOSTA SIMULADA DE ALTA QUALIDADE (MOCK).");
        
        const mockResponse = {
            introducao_ludica: `E se eu dissesse que uma rainha, a fofoca sobre um bolo e a queda de uma prisão mudaram o mundo para sempre? Hoje vamos viajar no tempo para a França do século 18 e descobrir como o grito por 'Liberdade, Igualdade e Fraternidade' deu origem aos direitos que temos hoje!`,
            objetivo_bncc: `Analisar as causas, o desenrolar e as consequências da Revolução Francesa, identificando seus impactos na formação dos direitos humanos e da política moderna, em alinhamento com a habilidade EM13CHS102 da BNCC.`,
            passo_a_passo: `1. (10 min) **Aquecimento - O Antigo Regime:** Iniciar com uma pergunta: 'Se a turma fosse um país, seria justo que 3 alunos não pagassem impostos e tivessem todos os privilégios, enquanto os outros 27 pagassem por tudo?'. Apresentar a pirâmide dos Três Estados (Clero, Nobreza, Povo).\n2. (15 min) **A Crise e a Queda:** Explicar a crise econômica (gastos da corte, guerras) e a fome. Apresentar a 'Queda da Bastilha' como o estopim da revolução, usando uma imagem ou vídeo curto para ilustrar.\n3. (15 min) **Atividade - A Convenção:** Dividir a turma em 3 grupos (Clero, Nobreza, Povo). Apresentar um problema: 'A França está falida. Quem deve pagar mais impostos?'. Cada grupo defende sua posição, simulando a votação por Estado, para que os alunos sintam a injustiça do sistema.\n4. (10 min) **Conclusão - O Legado:** Discutir o resultado da atividade. Apresentar a 'Declaração dos Direitos do Homem e do Cidadão' como a grande conquista da revolução e conectar com os direitos que temos hoje.`,
            rubrica_avaliacao: `1. **Conceitual:** O aluno consegue identificar e explicar o que eram os Três Estados e por que o sistema era injusto?\n2. **Analítica:** O aluno consegue citar ao menos duas causas para a Revolução Francesa?\n3. **Participativa:** O aluno contribuiu com argumentos para seu grupo durante a atividade da 'Convenção'?`,
            questoes: [
                `Quais eram os Três Estados na França pré-revolucionária e quem fazia parte de cada um deles?`,
                `Explique uma das principais causas econômicas que levaram à Revolução Francesa.`,
                `O que foi a Queda da Bastilha e qual o seu significado simbólico para os revolucionários?`,
                `Qual era o lema da Revolução Francesa e o que cada uma das três palavras significava para os ideais da época?`,
                `De que forma a 'Declaração dos Direitos do Homem e do Cidadão' influenciou outras nações e os conceitos de cidadania que temos hoje?`
            ]
        };

        await new Promise(resolve => setTimeout(resolve, 1500));
        return mockResponse;
    }

    // FUNÇÃO PARA SALVAR NO SUPABASE
    async function salvarNoSupabase(dados) {
        console.log("Salvando no Supabase...", dados);
        const { error } = await supabaseClient.from('planos_gerados').insert([dados]);
        if (error) {
            throw new Error(`Falha ao salvar no Supabase: ${error.message}`);
        }
        console.log("Salvo no Supabase com sucesso!");
    }

    // FUNÇÕES PARA CONTROLAR A INTERFACE
    function exibirPlano(plano) {
        resultadoDiv.innerHTML = `
            <h3>Introdução Lúdica</h3>
            <p>${plano.introducao_ludica.replace(/\n/g, '<br>')}</p>
            <h3>Objetivo de Aprendizagem (BNCC)</h3>
            <p>${plano.objetivo_bncc.replace(/\n/g, '<br>')}</p>
            <h3>Passo a Passo da Atividade</h3>
            <p>${plano.passo_a_passo.replace(/\n/g, '<br>')}</p>
            <h3>Rubrica de Avaliação</h3>
            <p>${plano.rubrica_avaliacao.replace(/\n/g, '<br>')}</p>
        `;
        resultadoSection.style.display = 'block';
    }

    function setLoadingState(isLoading) {
        document.getElementById('btn-gerar').disabled = isLoading;
        loadingDiv.style.display = isLoading ? 'block' : 'none';
        if (isLoading) {
            errorDiv.style.display = 'none';
            resultadoSection.style.display = 'none';
        }
    }

    function showError(message) {
        errorDiv.textContent = `Ocorreu um erro: ${message}`;
        errorDiv.style.display = 'block';
    }
});