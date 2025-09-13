// ========================================
// MÓDULO DE API E BUSCA DE PREÇOS
// ========================================

// Função para verificar se um item é um recurso (base ou refinado)
function isRecurso(itemId) {
    const tiposRecursos = ['WOOD', 'FIBER', 'HIDE', 'ORE', 'ROCK'];
    const tiposRecursosRefinados = ['CLOTH', 'LEATHER', 'METALBAR', 'STONEBLOCK', 'PLANKS'];
    // Bolsas NÃO são recursos - elas têm qualidades normais (1-5)
    return tiposRecursos.some(tipo => itemId.includes(tipo)) || tiposRecursosRefinados.some(tipo => itemId.includes(tipo));
}

// Função para buscar preços na API
async function buscarPrecos(itemId) {
    const location = document.getElementById('location').value;
    const resultDiv = document.getElementById('result');
    
    try {
        resultDiv.innerHTML = '<p>Buscando preços...</p>';
        
        const url = `https://www.albion-online-data.com/api/v2/stats/prices/${itemId}?locations=${location}`;
        console.log('URL da API:', url);
        
        const response = await fetch(url);
        const dados = await response.json();
        
        console.log('Dados recebidos:', dados);
        
        if (dados.length === 0) {
            resultDiv.innerHTML = '<p>Nenhum dado encontrado para este item nesta localização.</p>';
            return;
        }
        
        exibirResultados(dados, itemId);
        
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        resultDiv.innerHTML = '<p>Erro ao conectar com a API do Albion Online. Tente novamente.</p>';
    }
}

// Função para buscar preços para flip
async function buscarOportunidadesFlip(itemId, cidades, margemMinima) {
    try {
        // Construir URL da API com todas as cidades
        const cidadesUrl = cidades.join(',');
        const url = `https://www.albion-online-data.com/api/v2/stats/prices/${itemId}?locations=${cidadesUrl}`;
        
        console.log('Buscando preços para flip:', url);
        
        const response = await fetch(url);
        const dados = await response.json();
        
        // Filtrar dados para recursos (apenas qualidade NORMAL)
        let dadosFiltrados = dados;
        if (isRecurso(itemId)) {
            dadosFiltrados = dados.filter(item => Number(item.quality) === 1);
        }
        
        // Analisar oportunidades de flip
        const oportunidades = analisarOportunidadesFlip(dadosFiltrados, margemMinima);
        
        // Exibir resultados
        exibirResultadosFlip(itemId, oportunidades, margemMinima);
        
    } catch (error) {
        console.error('Erro ao buscar dados para flip:', error);
        document.getElementById('flip-loading').innerHTML = `
            <p>Não foi possível conectar com a API do Albion Online.</p>
        `;
    }
}

// Função para analisar um item específico (flip automático)
async function analisarItemAutomatico(itemId, margemMinima) {
    try {
        const cidades = ['Caerleon', 'Bridgewatch', 'Martlock', 'Fort Sterling', 'Lymhurst', 'Thetford'];
        const url = `https://www.albion-online-data.com/api/v2/stats/prices/${itemId}?locations=${cidades.join(',')}`;
        
        const response = await fetch(url);
        const dados = await response.json();
        
        // Filtrar dados para recursos (apenas qualidade NORMAL)
        let dadosFiltrados = dados;
        if (isRecurso(itemId)) {
            dadosFiltrados = dados.filter(item => Number(item.quality) === 1);
        }
        
        // Analisar oportunidades
        return analisarOportunidadesFlip(dadosFiltrados, margemMinima);
        
    } catch (error) {
        console.error(`Erro ao buscar dados para ${itemId}:`, error);
        return [];
    }
}
