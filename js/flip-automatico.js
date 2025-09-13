// ========================================
// MÓDULO DE FLIP AUTOMÁTICO
// ========================================

// Função para iniciar flip automático
function iniciarFlipAutomatico() {
    const resultDiv = document.getElementById('flip-resultados');
    resultDiv.innerHTML = `
        <div style="background: #34495e; color: #ecf0f1; padding: 25px; border-radius: 12px; margin: 20px auto; max-width: 800px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <h4 style="color: #d4af37; margin-bottom: 20px; text-align: center;">🤖 Flip Automático - Análise Completa</h4>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; color: #bdc3c7; font-weight: bold;">📈 Margem Mínima (%):</label>
                <input type="number" id="flip-auto-margem" value="15" min="1" max="100" style="width: 100%; padding: 12px; border-radius: 8px; border: 2px solid #d4af37; background: #2c3e50; color: #ecf0f1; font-size: 16px;">
            </div>
            
            <div style="margin-bottom: 25px;">
                <label style="display: block; margin-bottom: 15px; color: #bdc3c7; font-weight: bold;">📦 Categorias para Analisar:</label>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <label style="display: flex; align-items: center; background: #2c3e50; padding: 15px; border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: border-color 0.3s;">
                        <input type="checkbox" id="auto-recursos" checked style="margin-right: 12px; scale: 1.3;">
                        <div>
                            <div style="color: #ecf0f1; font-weight: bold; margin-bottom: 3px;">🌿 Recursos Base</div>
                            <div style="color: #95a5a6; font-size: 12px;">Madeira, Fibra, Couro, etc.</div>
                        </div>
                    </label>
                    <label style="display: flex; align-items: center; background: #2c3e50; padding: 15px; border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: border-color 0.3s;">
                        <input type="checkbox" id="auto-refinados" checked style="margin-right: 12px; scale: 1.3;">
                        <div>
                            <div style="color: #ecf0f1; font-weight: bold; margin-bottom: 3px;">⚡ Recursos Refinados</div>
                            <div style="color: #95a5a6; font-size: 12px;">Tecido, Couro, Barras, etc.</div>
                        </div>
                    </label>
                    <label style="display: flex; align-items: center; background: #2c3e50; padding: 15px; border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: border-color 0.3s;">
                        <input type="checkbox" id="auto-bolsas" checked style="margin-right: 12px; scale: 1.3;">
                        <div>
                            <div style="color: #ecf0f1; font-weight: bold; margin-bottom: 3px;">🎒 Bolsas</div>
                            <div style="color: #95a5a6; font-size: 12px;">Normais e de Insight</div>
                        </div>
                    </label>
                </div>
            </div>
            
            <div style="text-align: center;">
                <button onclick="executarFlipAutomatico()" style="background: #e74c3c; color: white; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    🚀 Iniciar Análise Automática
                </button>
            </div>
        </div>
        <div id="flip-auto-resultados" style="margin-top: 20px;"></div>
    `;
}

// Função para executar flip automático
async function executarFlipAutomatico() {
    const margem = parseFloat(document.getElementById('flip-auto-margem').value) || 15;
    const incluirRecursos = document.getElementById('auto-recursos').checked;
    const incluirRefinados = document.getElementById('auto-refinados').checked;
    const incluirBolsas = document.getElementById('auto-bolsas').checked;
    
    if (!incluirRecursos && !incluirRefinados && !incluirBolsas) {
        alert('Selecione pelo menos uma categoria para analisar!');
        return;
    }
    
    const resultDiv = document.getElementById('flip-auto-resultados');
    
    // Resetar variáveis globais
    window.todasOportunidadesAuto = [];
    window.resultadosExibidos = 0;
    window.cardDataCache = {}; // Cache para dados dos cards condensados
    
    // Mostrar container de resultados em tempo real
    resultDiv.innerHTML = `
        <div style="background: #34495e; color: #ecf0f1; padding: 20px; border-radius: 12px; margin: 20px auto; max-width: 1200px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <h5 style="color: #d4af37; margin-bottom: 15px; text-align: center;">🔍 Análise em Andamento...</h5>
            <div style="background: #2c3e50; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: center;">
                <div id="progress-text" style="color: #ecf0f1; margin-bottom: 10px;">Preparando análise...</div>
                <div style="background: #34495e; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div id="progress-bar" style="background: #d4af37; height: 100%; width: 0%; transition: width 0.3s ease;"></div>
                </div>
            </div>
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="color: #95a5a6; font-size: 14px;">⏱️ Processo pode levar alguns minutos dependendo da quantidade de itens</div>
            </div>
            
            <!-- Container para resultados em tempo real -->
            <div id="resultados-tempo-real" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-top: 20px;"></div>
            
            <!-- Botão carregar mais (inicialmente oculto) -->
            <div id="carregar-mais-container" style="text-align: center; margin-top: 20px; display: none;">
                <button onclick="carregarMaisResultados()" style="background: #3498db; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    📊 Carregar Mais Resultados
                </button>
            </div>
        </div>
    `;
    
    // Gerar lista de itens para analisar
    const itensParaAnalisar = gerarListaItensAutomatico(incluirRecursos, incluirRefinados, incluirBolsas);
    
    // Analisar cada item em tempo real
    let itemProcessado = 0;
    
    for (const item of itensParaAnalisar) {
        try {
            document.getElementById('progress-text').textContent = `Analisando ${item.nome}... (${itemProcessado + 1}/${itensParaAnalisar.length})`;
            document.getElementById('progress-bar').style.width = `${((itemProcessado + 1) / itensParaAnalisar.length) * 100}%`;
            
            const oportunidades = await analisarItemAutomatico(item.id, margem);
            
            // Se encontrou oportunidades, adicionar informações do item e mostrar imediatamente
            if (oportunidades.length > 0) {
                oportunidades.forEach(op => {
                    op.itemNome = item.nome;
                    op.itemTier = item.tier;
                });
                
                window.todasOportunidadesAuto.push(...oportunidades);
                adicionarOportunidadesTempoReal(oportunidades);
            }
            
            itemProcessado++;
            
            // Pequena pausa para não sobrecarregar a API
            await new Promise(resolve => setTimeout(resolve, 200));
            
        } catch (error) {
            console.error(`Erro ao analisar ${item.nome}:`, error);
            itemProcessado++;
        }
    }
    
    // Análise concluída
    document.getElementById('progress-text').textContent = `Análise concluída! Total de oportunidades: ${window.todasOportunidadesAuto.length}`;
    
    // Mostrar botão "Carregar Mais" se houver mais resultados
    if (window.todasOportunidadesAuto.length > window.resultadosExibidos) {
        document.getElementById('carregar-mais-container').style.display = 'block';
    }
    
    // Se não encontrou nenhuma oportunidade
    if (window.todasOportunidadesAuto.length === 0) {
        document.getElementById('resultados-tempo-real').innerHTML = `
            <div style="grid-column: 1 / -1; background: #2c3e50; padding: 20px; border-radius: 8px; text-align: center; border: 2px dashed #95a5a6;">
                <div style="color: #95a5a6; font-size: 18px; margin-bottom: 10px;">📭 Nenhuma oportunidade encontrada</div>
                <div style="color: #7f8c8d; font-size: 14px;">Tente diminuir a margem mínima ou verificar outras categorias</div>
            </div>
        `;
    }
}

// Função para gerar lista de itens para análise automática
function gerarListaItensAutomatico(incluirRecursos, incluirRefinados, incluirBolsas) {
    const itens = [];
    const tiers = [4, 5, 6, 7, 8]; // T4 a T8
    
    if (incluirRecursos) {
        const tiposRecursos = ['WOOD', 'FIBER', 'HIDE', 'ORE', 'ROCK'];
        tiposRecursos.forEach(tipo => {
            tiers.forEach(tier => {
                const nomeMap = {
                    'WOOD': 'Madeira',
                    'FIBER': 'Fibra',
                    'HIDE': 'Couro',
                    'ORE': 'Minério',
                    'ROCK': 'Pedra'
                };
                itens.push({
                    id: `T${tier}_${tipo}`,
                    nome: `${nomeMap[tipo]} T${tier}`,
                    tier: tier
                });
            });
        });
    }
    
    if (incluirRefinados) {
        const tiposRefinados = [
            {tipo: 'CLOTH', nome: 'Tecido'},
            {tipo: 'LEATHER', nome: 'Couro'},
            {tipo: 'METALBAR', nome: 'Barra de Metal'},
            {tipo: 'STONEBLOCK', nome: 'Bloco de Pedra'},
            {tipo: 'PLANKS', nome: 'Tábua'}
        ];
        tiposRefinados.forEach(({tipo, nome}) => {
            tiers.forEach(tier => {
                itens.push({
                    id: `T${tier}_${tipo}`,
                    nome: `${nome} T${tier}`,
                    tier: tier
                });
            });
        });
    }
    
    if (incluirBolsas) {
        // Bolsas normais e de insight
        tiers.forEach(tier => {
            if (tier >= 2) { // Bolsas normais T2+
                itens.push({
                    id: `T${tier}_BAG`,
                    nome: `Bolsa T${tier}`,
                    tier: tier
                });
            }
            
            if (tier >= 4) { // Bolsas de insight T4+
                itens.push({
                    id: `T${tier}_BAG_INSIGHT`,
                    nome: `Bolsa de Insight T${tier}`,
                    tier: tier
                });
            }
        });
    }
    
    return itens;
}
