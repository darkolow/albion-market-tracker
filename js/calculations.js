// ========================================
// MÓDULO DE CÁLCULOS E TAXAS
// ========================================

// Função para calcular taxas do mercado
function calcularTaxas(precoCompra, precoVenda, premium = false) {
    // Taxas do Albion Online
    const SETUP_FEE = 0.025; // 2.5% para criar ordem
    const TRANSACTION_TAX_NORMAL = 0.08; // 8% para usuários sem premium
    const TRANSACTION_TAX_PREMIUM = 0.04; // 4% para usuários com premium
    
    const transactionTax = premium ? TRANSACTION_TAX_PREMIUM : TRANSACTION_TAX_NORMAL;
    
    // Calcular taxas
    const setupFeeCompra = precoCompra * SETUP_FEE;
    const setupFeeVenda = precoVenda * SETUP_FEE;
    const taxaVenda = precoVenda * transactionTax;
    
    const totalTaxas = setupFeeCompra + setupFeeVenda + taxaVenda;
    const lucroLiquido = precoVenda - precoCompra - totalTaxas;
    const margemLiquida = precoCompra > 0 ? (lucroLiquido / precoCompra) * 100 : 0;
    
    return {
        setupFeeCompra,
        setupFeeVenda,
        taxaVenda,
        totalTaxas,
        lucroLiquido,
        margemLiquida
    };
}

// Função para analisar oportunidades de flip
function analisarOportunidadesFlip(dados, margemMinima) {
    const oportunidades = [];
    
    // Agrupar dados por qualidade (para itens que têm qualidades)
    const dadosPorQualidade = {};
    dados.forEach(item => {
        const qualidade = item.quality || 1;
        if (!dadosPorQualidade[qualidade]) {
            dadosPorQualidade[qualidade] = [];
        }
        dadosPorQualidade[qualidade].push(item);
    });
    
    // Analisar cada qualidade separadamente
    Object.keys(dadosPorQualidade).forEach(qualidade => {
        const dadosQualidade = dadosPorQualidade[qualidade];
        
        // Para cada cidade, verificar oportunidades de compra
        dadosQualidade.forEach(cidadeCompra => {
            if (!cidadeCompra.sell_price_min || cidadeCompra.sell_price_min <= 0) return;
            
            // Verificar oportunidades de venda em outras cidades
            dadosQualidade.forEach(cidadeVenda => {
                if (!cidadeVenda.buy_price_max || cidadeVenda.buy_price_max <= 0) return;
                if (cidadeCompra.city === cidadeVenda.city) return;
                
                const precoCompra = cidadeCompra.sell_price_min;
                const precoVenda = cidadeVenda.buy_price_max;
                
                if (precoVenda <= precoCompra) return;
                
                const taxas = calcularTaxas(precoCompra, precoVenda, false);
                
                if (taxas.margemLiquida >= margemMinima) {
                    oportunidades.push({
                        itemId: cidadeCompra.item_id,
                        qualidade: qualidade,
                        cidadeCompra: cidadeCompra.city,
                        cidadeVenda: cidadeVenda.city,
                        precoCompra: precoCompra,
                        precoVenda: precoVenda,
                        margem: ((precoVenda - precoCompra) / precoCompra) * 100,
                        margemLiquida: taxas.margemLiquida,
                        lucro: precoVenda - precoCompra,
                        lucroLiquido: taxas.lucroLiquido,
                        dataCompra: cidadeCompra.sell_price_min_date,
                        dataVenda: cidadeVenda.buy_price_max_date
                    });
                }
            });
        });
    });
    
    // Ordenar por margem líquida (maior primeiro)
    return oportunidades.sort((a, b) => b.margemLiquida - a.margemLiquida);
}

// Função para calcular tempo decorrido
function calcularTempoDecorrido(dataString) {
    if (!dataString || dataString === "0001-01-01T00:00:00") return "N/A";
    
    const agora = new Date();
    const dataInfo = new Date(dataString);
    const diffMs = agora - dataInfo;
    const diffMin = Math.floor(diffMs / 60000);
    
    if (diffMin < 1) return "Agora";
    if (diffMin < 60) return `${diffMin}min`;
    if (diffMin < 1440) return `${Math.floor(diffMin/60)}h`;
    return `${Math.floor(diffMin/1440)}d`;
}

// Função para obter cor do tempo
function obterCorTempo(dataString) {
    if (!dataString || dataString === "0001-01-01T00:00:00") return "#95a5a6";
    
    const agora = new Date();
    const dataInfo = new Date(dataString);
    const diffMs = agora - dataInfo;
    const diffMin = Math.floor(diffMs / 60000);
    
    if (diffMin < 30) return "#27ae60"; // Verde - menos de 30min
    if (diffMin < 120) return "#f39c12"; // Amarelo - 30min a 2h
    return "#e74c3c"; // Vermelho - mais de 2h
}
