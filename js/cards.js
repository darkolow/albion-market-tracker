// ========================================
// MÓDULO DE CARDS E MODAL DETALHADO
// ========================================

// Função para agrupar oportunidades por item
function agruparOportunidadesPorItem(oportunidades) {
    const grupos = {};
    
    oportunidades.forEach(op => {
        const chaveItem = `${op.itemId}_${op.qualidade}`;
        if (!grupos[chaveItem]) {
            grupos[chaveItem] = {
                itemId: op.itemId,
                itemNome: op.itemNome,
                itemTier: op.itemTier,
                qualidade: op.qualidade,
                oportunidades: []
            };
        }
        grupos[chaveItem].oportunidades.push(op);
    });
    
    // Ordenar oportunidades dentro de cada grupo por margem
    Object.values(grupos).forEach(grupo => {
        grupo.oportunidades.sort((a, b) => (b.margemLiquida || b.margem) - (a.margemLiquida || a.margem));
    });
    
    return Object.values(grupos);
}

// Função para gerar mini-abas de margem
function gerarMiniAbas(oportunidades, cardId) {
    return oportunidades.map((op, index) => {
        const ativo = index === 0 ? 'ativo' : '';
        return `
            <div class="mini-aba ${ativo}" onclick="mostrarDetalheMargem('${cardId}', ${index})" 
                 style="background: ${index === 0 ? '#d4af37' : '#34495e'}; color: ${index === 0 ? '#000' : '#fff'}; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 10px; font-weight: bold; text-align: center; transition: all 0.3s ease;">
                ${op.margemLiquida ? op.margemLiquida.toFixed(1) + '%' : op.margem.toFixed(1) + '%'}
            </div>
        `;
    }).join('');
}

// Função para mostrar detalhes de uma margem específica
function mostrarDetalheMargem(cardId, indice) {
    const card = document.getElementById(cardId);
    const miniAbas = card.querySelectorAll('.mini-aba');
    const detalhesContainer = card.querySelector('.detalhes-margem');
    
    // Atualizar abas visuais
    miniAbas.forEach((aba, i) => {
        if (i === indice) {
            aba.style.background = '#d4af37';
            aba.style.color = '#000';
        } else {
            aba.style.background = '#34495e';
            aba.style.color = '#fff';
        }
    });
    
    // Obter dados da oportunidade selecionada
    const cardData = window.cardDataCache[cardId];
    const oportunidade = cardData.oportunidades[indice];
    
    const tempoCompra = calcularTempoDecorrido(oportunidade.dataCompra);
    const tempoVenda = calcularTempoDecorrido(oportunidade.dataVenda);
    
    // Atualizar detalhes
    detalhesContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
            <div style="background: #e74c3c; padding: 8px; border-radius: 4px; text-align: center;">
                <div style="font-size: 9px; margin-bottom: 2px; color: white; font-weight: bold;">Há ${tempoCompra}</div>
                <div style="font-size: 10px; margin-bottom: 2px; opacity: 0.9;">💰 COMPRAR</div>
                <div style="font-weight: bold; font-size: 11px;">${oportunidade.cidadeCompra}</div>
                <div style="font-size: 13px; margin-top: 2px;">${oportunidade.precoCompra.toLocaleString()}</div>
            </div>
            <div style="background: #27ae60; padding: 8px; border-radius: 4px; text-align: center;">
                <div style="font-size: 9px; margin-bottom: 2px; color: white; font-weight: bold;">Há ${tempoVenda}</div>
                <div style="font-size: 10px; margin-bottom: 2px; opacity: 0.9;">💎 VENDER</div>
                <div style="font-weight: bold; font-size: 11px;">${oportunidade.cidadeVenda}</div>
                <div style="font-size: 13px; margin-top: 2px;">${oportunidade.precoVenda.toLocaleString()}</div>
            </div>
        </div>
        
        <div style="background: #34495e; padding: 6px; border-radius: 4px; text-align: center; margin-top: 8px;">
            <span style="color: #d4af37; font-weight: bold; font-size: 12px;">📈 ${oportunidade.lucro.toLocaleString()} silver</span>
        </div>
    `;
}

// Função para adicionar oportunidades em tempo real (versão condensada)
function adicionarOportunidadesTempoReal(oportunidades) {
    const container = document.getElementById('resultados-tempo-real');
    
    // Agrupar oportunidades por item
    const gruposItens = agruparOportunidadesPorItem(oportunidades);
    
    // Ordenar grupos pela melhor margem de cada grupo
    gruposItens.sort((a, b) => b.oportunidades[0].margem - a.oportunidades[0].margem);
    
    // Pegar apenas os grupos que cabem na tela
    const gruposParaMostrar = gruposItens.slice(0, 6 - Math.floor(window.resultadosExibidos / 2));
    
    gruposParaMostrar.forEach((grupo, index) => {
        const cardId = `card-${Date.now()}-${index}`;
        const qualidadeTexto = getQualidadeTexto(grupo.qualidade);
        const qualidadeClass = getQualidadeClass(grupo.qualidade);
        
        // Salvar dados no cache
        window.cardDataCache[cardId] = grupo;
        
        const miniAbas = gerarMiniAbas(grupo.oportunidades, cardId);
        const primeiraOportunidade = grupo.oportunidades[0];
        
        const tempoCompra = calcularTempoDecorrido(primeiraOportunidade.dataCompra);
        const tempoVenda = calcularTempoDecorrido(primeiraOportunidade.dataVenda);
        
        const cardHtml = `
            <div id="${cardId}" onclick="abrirModalDetalhado('${cardId}')" style="background: #2c3e50; border: 2px solid #d4af37; border-radius: 8px; padding: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); min-height: 300px; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 4px 8px rgba(212,175,55,0.3)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <img src="https://render.albiononline.com/v1/item/${grupo.itemId}.png" alt="${grupo.itemNome}" style="width: 32px; height: 32px;">
                    <div style="text-align: center; flex: 1; margin: 0 10px;">
                        <div style="color: #ecf0f1; font-weight: bold; font-size: 12px;">${grupo.itemNome}</div>
                        <div class="${qualidadeClass}" style="font-size: 10px; margin-top: 2px;">${qualidadeTexto}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: #d4af37; font-weight: bold; font-size: 14px;">${primeiraOportunidade.margemLiquida ? primeiraOportunidade.margemLiquida.toFixed(1) : primeiraOportunidade.margem.toFixed(1)}%</div>
                        <div style="color: #95a5a6; font-size: 10px;">margem</div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-bottom: 10px;">
                    <div style="color: #27ae60; font-weight: bold; font-size: 16px; margin-bottom: 2px;">
                        ${primeiraOportunidade.lucro.toLocaleString()} 🪙
                    </div>
                    <div style="color: #95a5a6; font-size: 10px;">lucro por unidade</div>
                </div>
                
                <div style="margin-bottom: 8px;">
                    <div style="color: #bdc3c7; font-size: 10px; margin-bottom: 5px; text-align: center;">
                        ${grupo.oportunidades.length} rota${grupo.oportunidades.length > 1 ? 's' : ''} disponível${grupo.oportunidades.length > 1 ? 'is' : ''}
                    </div>
                    <div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;">
                        ${miniAbas}
                    </div>
                </div>
                
                <div class="detalhes-margem">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
                        <div style="background: #e74c3c; padding: 8px; border-radius: 4px; text-align: center;">
                            <div style="font-size: 9px; margin-bottom: 2px; color: white; font-weight: bold;">Há ${tempoCompra}</div>
                            <div style="font-size: 10px; margin-bottom: 2px; opacity: 0.9;">💰 COMPRAR</div>
                            <div style="font-weight: bold; font-size: 11px;">${primeiraOportunidade.cidadeCompra}</div>
                            <div style="font-size: 13px; margin-top: 2px;">${primeiraOportunidade.precoCompra.toLocaleString()}</div>
                        </div>
                        <div style="background: #27ae60; padding: 8px; border-radius: 4px; text-align: center;">
                            <div style="font-size: 9px; margin-bottom: 2px; color: white; font-weight: bold;">Há ${tempoVenda}</div>
                            <div style="font-size: 10px; margin-bottom: 2px; opacity: 0.9;">💎 VENDER</div>
                            <div style="font-weight: bold; font-size: 11px;">${primeiraOportunidade.cidadeVenda}</div>
                            <div style="font-size: 13px; margin-top: 2px;">${primeiraOportunidade.precoVenda.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    <div style="background: #34495e; padding: 6px; border-radius: 4px; text-align: center; margin-top: 8px;">
                        <span style="color: #d4af37; font-weight: bold; font-size: 12px;">📈 ${primeiraOportunidade.lucro.toLocaleString()} silver</span>
                    </div>
                </div>
                
                <div style="position: absolute; top: 8px; right: 8px; background: rgba(212,175,55,0.8); color: #000; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">
                    T${grupo.itemTier}
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', cardHtml);
        window.resultadosExibidos += 2; // Contabilizar como 2 porque mostra múltiplas oportunidades
    });
}

// Função para carregar mais resultados (versão condensada)
function carregarMaisResultados() {
    const container = document.getElementById('resultados-tempo-real');
    
    // Agrupar todas as oportunidades restantes por item
    const todasOportunidades = window.todasOportunidadesAuto;
    const gruposItens = agruparOportunidadesPorItem(todasOportunidades);
    
    // Ordenar grupos pela melhor margem
    gruposItens.sort((a, b) => b.oportunidades[0].margem - a.oportunidades[0].margem);
    
    // Calcular quantos grupos já foram mostrados (dividir por 2 porque cada card vale 2)
    const gruposJaMostrados = Math.floor(window.resultadosExibidos / 2);
    const proximosGrupos = gruposItens.slice(gruposJaMostrados, gruposJaMostrados + 6);
    
    proximosGrupos.forEach((grupo, index) => {
        const cardId = `card-${Date.now()}-${index}`;
        const qualidadeTexto = getQualidadeTexto(grupo.qualidade);
        const qualidadeClass = getQualidadeClass(grupo.qualidade);
        
        // Salvar dados no cache
        window.cardDataCache[cardId] = grupo;
        
        const miniAbas = gerarMiniAbas(grupo.oportunidades, cardId);
        const primeiraOportunidade = grupo.oportunidades[0];
        
        const tempoCompra = calcularTempoDecorrido(primeiraOportunidade.dataCompra);
        const tempoVenda = calcularTempoDecorrido(primeiraOportunidade.dataVenda);
        
        const cardHtml = `
            <div id="${cardId}" onclick="abrirModalDetalhado('${cardId}')" style="background: #2c3e50; border: 2px solid #d4af37; border-radius: 8px; padding: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); min-height: 300px; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 4px 8px rgba(212,175,55,0.3)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <img src="https://render.albiononline.com/v1/item/${grupo.itemId}.png" alt="${grupo.itemNome}" style="width: 32px; height: 32px;">
                    <div style="text-align: center; flex: 1; margin: 0 10px;">
                        <div style="color: #ecf0f1; font-weight: bold; font-size: 12px;">${grupo.itemNome}</div>
                        <div class="${qualidadeClass}" style="font-size: 10px; margin-top: 2px;">${qualidadeTexto}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: #d4af37; font-weight: bold; font-size: 14px;">${primeiraOportunidade.margemLiquida ? primeiraOportunidade.margemLiquida.toFixed(1) : primeiraOportunidade.margem.toFixed(1)}%</div>
                        <div style="color: #95a5a6; font-size: 10px;">margem</div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-bottom: 10px;">
                    <div style="color: #27ae60; font-weight: bold; font-size: 16px; margin-bottom: 2px;">
                        ${primeiraOportunidade.lucro.toLocaleString()} 🪙
                    </div>
                    <div style="color: #95a5a6; font-size: 10px;">lucro por unidade</div>
                </div>
                
                <div style="margin-bottom: 8px;">
                    <div style="color: #bdc3c7; font-size: 10px; margin-bottom: 5px; text-align: center;">
                        ${grupo.oportunidades.length} rota${grupo.oportunidades.length > 1 ? 's' : ''} disponível${grupo.oportunidades.length > 1 ? 'is' : ''}
                    </div>
                    <div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;">
                        ${miniAbas}
                    </div>
                </div>
                
                <div class="detalhes-margem">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
                        <div style="background: #e74c3c; padding: 8px; border-radius: 4px; text-align: center;">
                            <div style="font-size: 9px; margin-bottom: 2px; color: white; font-weight: bold;">Há ${tempoCompra}</div>
                            <div style="font-size: 10px; margin-bottom: 2px; opacity: 0.9;">💰 COMPRAR</div>
                            <div style="font-weight: bold; font-size: 11px;">${primeiraOportunidade.cidadeCompra}</div>
                            <div style="font-size: 13px; margin-top: 2px;">${primeiraOportunidade.precoCompra.toLocaleString()}</div>
                        </div>
                        <div style="background: #27ae60; padding: 8px; border-radius: 4px; text-align: center;">
                            <div style="font-size: 9px; margin-bottom: 2px; color: white; font-weight: bold;">Há ${tempoVenda}</div>
                            <div style="font-size: 10px; margin-bottom: 2px; opacity: 0.9;">💎 VENDER</div>
                            <div style="font-weight: bold; font-size: 11px;">${primeiraOportunidade.cidadeVenda}</div>
                            <div style="font-size: 13px; margin-top: 2px;">${primeiraOportunidade.precoVenda.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    <div style="background: #34495e; padding: 6px; border-radius: 4px; text-align: center; margin-top: 8px;">
                        <span style="color: #d4af37; font-weight: bold; font-size: 12px;">📈 ${primeiraOportunidade.lucro.toLocaleString()} silver</span>
                    </div>
                </div>
                
                <div style="position: absolute; top: 8px; right: 8px; background: rgba(212,175,55,0.8); color: #000; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">
                    T${grupo.itemTier}
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', cardHtml);
        window.resultadosExibidos += 2; // Contabilizar como 2 porque mostra múltiplas oportunidades
    });
    
    // Esconder botão se não houver mais grupos para mostrar
    const totalGrupos = gruposItens.length;
    const gruposMostrados = Math.floor(window.resultadosExibidos / 2);
    if (gruposMostrados >= totalGrupos) {
        document.getElementById('carregar-mais-container').style.display = 'none';
    }
}
