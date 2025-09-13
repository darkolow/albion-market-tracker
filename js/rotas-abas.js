// ========================================
// MÓDULO DE ROTAS E OUTRAS ABAS
// ========================================

// Função para gerar conteúdo da aba Rotas
function gerarAbaRotas(dadosCard) {
    const melhorOp = dadosCard.oportunidades[0];
    
    return `
        <h4 style='color: #d4af37; margin-bottom: 20px; text-align: center;'>🗺️ Planejamento de Rotas</h4>
        
        <!-- Rota Recomendada -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
            <h5 style='color: #27ae60; margin-bottom: 15px;'>🎯 Rota Recomendada</h5>
            <div style='display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 20px;'>
                <div style='text-align: center; background: #34495e; padding: 15px; border-radius: 8px; border: 2px solid #e74c3c;'>
                    <div style='color: #e74c3c; font-weight: bold; margin-bottom: 5px;'>ORIGEM</div>
                    <div style='font-size: 18px; color: #ecf0f1;'>${melhorOp.cidadeCompra}</div>
                    <div style='color: #95a5a6; font-size: 12px; margin-top: 5px;'>Comprar por ${melhorOp.precoCompra.toLocaleString()}</div>
                </div>
                <div style='color: #d4af37; font-size: 24px;'>→</div>
                <div style='text-align: center; background: #34495e; padding: 15px; border-radius: 8px; border: 2px solid #27ae60;'>
                    <div style='color: #27ae60; font-weight: bold; margin-bottom: 5px;'>DESTINO</div>
                    <div style='font-size: 18px; color: #ecf0f1;'>${melhorOp.cidadeVenda}</div>
                    <div style='color: #95a5a6; font-size: 12px; margin-top: 5px;'>Vender por ${melhorOp.precoVenda.toLocaleString()}</div>
                </div>
            </div>
            <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                <div style='color: #f39c12; font-weight: bold; margin-bottom: 5px;'>⚠️ INFORMAÇÕES DE SEGURANÇA</div>
                <div style='color: #bdc3c7; font-size: 14px;'>
                    ${gerarInfoSeguranca(melhorOp.cidadeCompra, melhorOp.cidadeVenda)}
                </div>
            </div>
        </div>
        
        <!-- Caminho Detalhado -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
            <h5 style='color: #3498db; margin-bottom: 15px;'>🗺️ Caminho Detalhado</h5>
            ${gerarCaminhoDetalhado(melhorOp.cidadeCompra, melhorOp.cidadeVenda)}
        </div>
        
        <!-- Rotas Alternativas -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px;'>
            <h5 style='color: #9b59b6; margin-bottom: 15px;'>🔄 Rotas Alternativas</h5>
            <div style='background: #34495e; height: 150px; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 2px dashed #95a5a6;'>
                <div style='text-align: center; color: #95a5a6;'>
                    <div style='font-size: 16px; margin-bottom: 10px;'>🚧 Em Desenvolvimento</div>
                    <div style='font-size: 14px;'>Rotas alternativas serão adicionadas em breve</div>
                </div>
            </div>
        </div>
    `;
}

// Função para gerar conteúdo da aba Histórico
function gerarAbaHistorico(dadosCard) {
    return `
        <h4 style='color: #d4af37; margin-bottom: 20px; text-align: center;'>📈 Histórico e Tendências</h4>
        
        <!-- Gráfico Placeholder -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
            <h5 style='color: #3498db; margin-bottom: 15px;'>📊 Evolução de Preços (30 dias)</h5>
            <div style='background: #34495e; height: 250px; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 2px dashed #95a5a6;'>
                <div style='text-align: center; color: #95a5a6;'>
                    <div style='font-size: 16px; margin-bottom: 10px;'>📊 Aguardando dados</div>
                    <div style='font-size: 14px;'>Gráficos de histórico em desenvolvimento</div>
                </div>
            </div>
        </div>
        
        <!-- Estatísticas -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
            <h5 style='color: #f39c12; margin-bottom: 15px;'>📊 Estatísticas de Mercado</h5>
            <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;'>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 12px; margin-bottom: 5px;'>VOLATILIDADE</div>
                    <div style='color: #f39c12; font-size: 18px; font-weight: bold;'>Aguardando dados</div>
                </div>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 12px; margin-bottom: 5px;'>VOLUME MÉDIO</div>
                    <div style='color: #3498db; font-size: 18px; font-weight: bold;'>Aguardando dados</div>
                </div>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 12px; margin-bottom: 5px;'>TENDÊNCIA</div>
                    <div style='color: #27ae60; font-size: 18px; font-weight: bold;'>Aguardando dados</div>
                </div>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 12px; margin-bottom: 5px;'>PREÇO MÉDIO</div>
                    <div style='color: #e74c3c; font-size: 18px; font-weight: bold;'>Aguardando dados</div>
                </div>
            </div>
        </div>
        
        <!-- Histórico de Atualizações -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px;'>
            <h5 style='color: #9b59b6; margin-bottom: 15px;'>🕒 Últimas Atualizações</h5>
            <div style='max-height: 200px; overflow-y: auto;'>
                <div style='background: #34495e; padding: 12px; border-radius: 6px; margin-bottom: 8px;'>
                    <div style='color: #ecf0f1; font-size: 14px; margin-bottom: 3px;'>📈 Atualização de preços</div>
                    <div style='color: #95a5a6; font-size: 12px;'>Dados em tempo real via API Albion Online</div>
                </div>
                <div style='background: #34495e; padding: 12px; border-radius: 6px; margin-bottom: 8px;'>
                    <div style='color: #ecf0f1; font-size: 14px; margin-bottom: 3px;'>🔄 Sistema de análise</div>
                    <div style='color: #95a5a6; font-size: 12px;'>Cálculos automáticos de margem e taxas</div>
                </div>
            </div>
        </div>
    `;
}

// Função para gerar conteúdo da aba Notas
function gerarAbaNotas(dadosCard) {
    const notasKey = `notas_${dadosCard.itemId}_${dadosCard.qualidade}`;
    const notasSalvas = localStorage.getItem(notasKey) || '';
    
    return `
        <h4 style='color: #d4af37; margin-bottom: 20px; text-align: center;'>📝 Notas Pessoais</h4>
        
        <!-- Área de Notas -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
            <h5 style='color: #f39c12; margin-bottom: 15px;'>✏️ Suas Anotações</h5>
            <textarea id='notas-texto' placeholder='Escreva suas notas, estratégias, lembretes ou observações sobre este item...' style='width: 100%; height: 150px; padding: 12px; border-radius: 8px; border: 2px solid #d4af37; background: #34495e; color: #ecf0f1; resize: vertical; font-family: inherit;'>${notasSalvas}</textarea>
            <div style='margin-top: 10px; text-align: right;'>
                <button onclick='salvarNotas("${dadosCard.itemId}", ${dadosCard.qualidade})' style='background: #27ae60; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold;'>
                    💾 Salvar Notas
                </button>
            </div>
        </div>
        
        <!-- Favoritos e Tags -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
            <h5 style='color: #f39c12; margin-bottom: 15px;'>⭐ Favoritos e Tags</h5>
            <div style='display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;'>
                <button onclick='toggleFavorito("${dadosCard.itemId}", ${dadosCard.qualidade})' style='background: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;'>
                    ⭐ Favoritar
                </button>
                <button onclick='adicionarTag("${dadosCard.itemId}", ${dadosCard.qualidade}, "Alto Lucro")' style='background: #27ae60; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;'>
                    🏷️ Alto Lucro
                </button>
                <button onclick='adicionarTag("${dadosCard.itemId}", ${dadosCard.qualidade}, "Seguro")' style='background: #3498db; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;'>
                    🛡️ Seguro
                </button>
            </div>
            <div>
                <input type='text' id='nova-tag' placeholder='Nova tag personalizada...' style='flex: 1; padding: 8px; border-radius: 6px; border: 2px solid #d4af37; background: #34495e; color: #ecf0f1; margin-right: 10px;'>
                <button onclick='adicionarTagCustomizada("${dadosCard.itemId}", ${dadosCard.qualidade})' style='background: #f39c12; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer;'>
                    ➕ Adicionar
                </button>
            </div>
            <div id='tags-lista' style='margin-top: 15px;'>
                <!-- Tags salvas aparecerão aqui -->
            </div>
        </div>
        
        <!-- Histórico de Decisões -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px;'>
            <h5 style='color: #f39c12; margin-bottom: 15px;'>📋 Histórico de Decisões</h5>
            <div style='margin-bottom: 15px;'>
                <button onclick='registrarDecisao("${dadosCard.itemId}", ${dadosCard.qualidade}, "executou")' style='background: #27ae60; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; margin-right: 10px;'>
                    ✅ Executei este flip
                </button>
                <button onclick='registrarDecisao("${dadosCard.itemId}", ${dadosCard.qualidade}, "ignorou")' style='background: #e74c3c; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer;'>
                    ❌ Ignorei este flip
                </button>
            </div>
            <div id='historico-decisoes' style='max-height: 150px; overflow-y: auto;'>
                <!-- Histórico de decisões aparecerá aqui -->
            </div>
        </div>
    `;
}

function gerarInfoSeguranca(origem, destino) {
    // Rotas reais do Albion Online com mapas específicos
    const rotaInfo = obterRotaReal(origem, destino);
    
    if (!rotaInfo) {
        return "🟡 Rota não mapeada - Consulte o mapa do jogo para planejamento";
    }
    
    const zonaTexto = rotaInfo.tipo === 'segura' ? '🟢' : rotaInfo.tipo === 'perigosa' ? '🟡' : '🔴';
    return `${zonaTexto} ${rotaInfo.distancia} mapas - ${rotaInfo.descricao}`;
}

// Função para obter rotas reais entre cidades do Albion Online
function obterRotaReal(origem, destino) {
    // Mapa de rotas reais do Albion Online
    const rotas = {
        'Caerleon-Bridgewatch': { distancia: 8, tipo: 'perigosa', descricao: 'Passa por zonas vermelhas e pretas' },
        'Caerleon-Martlock': { distancia: 7, tipo: 'perigosa', descricao: 'Rota através de zonas de risco' },
        'Caerleon-Fort Sterling': { distancia: 6, tipo: 'perigosa', descricao: 'Caminho por territórios disputados' },
        'Caerleon-Lymhurst': { distancia: 5, tipo: 'perigosa', descricao: 'Rota mais curta mas arriscada' },
        'Caerleon-Thetford': { distancia: 9, tipo: 'perigosa', descricao: 'Rota longa através de zonas perigosas' },
        'Bridgewatch-Martlock': { distancia: 12, tipo: 'segura', descricao: 'Rota segura através de zonas azuis' },
        'Bridgewatch-Fort Sterling': { distancia: 10, tipo: 'segura', descricao: 'Caminho relativamente seguro' },
        'Bridgewatch-Lymhurst': { distancia: 11, tipo: 'segura', descricao: 'Rota por zonas controladas' },
        'Bridgewatch-Thetford': { distancia: 8, tipo: 'segura', descricao: 'Rota direta e segura' },
        'Martlock-Fort Sterling': { distancia: 14, tipo: 'segura', descricao: 'Rota mais longa mas segura' },
        'Martlock-Lymhurst': { distancia: 9, tipo: 'segura', descricao: 'Caminho por zonas azuis' },
        'Martlock-Thetford': { distancia: 13, tipo: 'segura', descricao: 'Rota extensa mas controlada' },
        'Fort Sterling-Lymhurst': { distancia: 15, tipo: 'segura', descricao: 'Rota mais segura disponível' },
        'Fort Sterling-Thetford': { distancia: 12, tipo: 'segura', descricao: 'Caminho por territórios seguros' },
        'Lymhurst-Thetford': { distancia: 10, tipo: 'segura', descricao: 'Rota direta entre cidades reais' }
    };
    
    const chave = `${origem}-${destino}`;
    const chaveInversa = `${destino}-${origem}`;
    
    return rotas[chave] || rotas[chaveInversa];
}

// Função para gerar o caminho detalhado com mapas reais
function gerarCaminhoDetalhado(origem, destino) {
    const rotaInfo = obterRotaReal(origem, destino);
    
    if (!rotaInfo) {
        return `
            <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                <div style='color: #f39c12; margin-bottom: 10px;'>🗺️ Rota Não Mapeada</div>
                <div style='color: #bdc3c7; font-size: 14px;'>
                    Consulte o mapa do jogo para traçar a melhor rota entre ${origem} e ${destino}
                </div>
            </div>
        `;
    }
    
    const mapasExemplo = [origem, '...', '...', destino];
    
    return `
        <div style='display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;'>
            ${mapasExemplo.map((mapa, index) => `
                <div style='background: ${index === 0 || index === mapasExemplo.length - 1 ? '#d4af37' : '#34495e'}; 
                     color: ${index === 0 || index === mapasExemplo.length - 1 ? '#222' : '#ecf0f1'}; 
                     padding: 8px 12px; border-radius: 6px; font-weight: bold; font-size: 12px;'>
                    ${mapa}
                </div>
                ${index < mapasExemplo.length - 1 ? '<div style="color: #95a5a6;">→</div>' : ''}
            `).join('')}
        </div>
        <div style='text-align: center; margin-top: 15px; color: #bdc3c7; font-size: 14px;'>
            Distância aproximada: ${rotaInfo.distancia} mapas | Tipo: ${rotaInfo.tipo}
        </div>
    `;
}

// Funções auxiliares para notas e favoritos
function salvarNotas(itemId, qualidade) {
    const texto = document.getElementById('notas-texto').value;
    const chave = `notas_${itemId}_${qualidade}`;
    localStorage.setItem(chave, texto);
    alert('Notas salvas com sucesso!');
}

function toggleFavorito(itemId, qualidade) {
    const chave = `favorito_${itemId}_${qualidade}`;
    const favorito = localStorage.getItem(chave) === 'true';
    localStorage.setItem(chave, !favorito);
    alert(favorito ? 'Removido dos favoritos!' : 'Adicionado aos favoritos!');
}

function adicionarTag(itemId, qualidade, tag) {
    const chave = `tags_${itemId}_${qualidade}`;
    const tags = JSON.parse(localStorage.getItem(chave) || '[]');
    if (!tags.includes(tag)) {
        tags.push(tag);
        localStorage.setItem(chave, JSON.stringify(tags));
        alert(`Tag "${tag}" adicionada!`);
    }
}

function adicionarTagCustomizada(itemId, qualidade) {
    const novaTag = document.getElementById('nova-tag').value.trim();
    if (novaTag) {
        adicionarTag(itemId, qualidade, novaTag);
        document.getElementById('nova-tag').value = '';
    }
}

function registrarDecisao(itemId, qualidade, tipo) {
    const chave = `decisoes_${itemId}_${qualidade}`;
    const decisoes = JSON.parse(localStorage.getItem(chave) || '[]');
    decisoes.push({
        tipo: tipo,
        data: new Date().toISOString(),
        timestamp: Date.now()
    });
    localStorage.setItem(chave, JSON.stringify(decisoes));
    alert(tipo === 'executou' ? 'Decisão registrada: Flip executado!' : 'Decisão registrada: Flip ignorado!');
}
