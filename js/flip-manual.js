// ========================================
// MÓDULO DE FLIP MANUAL
// ========================================

// Função para abrir flip manual
function abrirFlipManual() {
    const resultDiv = document.getElementById('flip-resultados');
    resultDiv.innerHTML = `
        <div style="background: #34495e; color: #ecf0f1; padding: 25px; border-radius: 12px; margin: 20px auto; max-width: 600px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <h4 style="color: #d4af37; margin-bottom: 20px; text-align: center;">🔍 Flip Manual - Análise Personalizada</h4>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; color: #bdc3c7; font-weight: bold;">📦 Item Selecionado:</label>
                <div style="background: #2c3e50; padding: 15px; border-radius: 8px; border: 2px solid #d4af37;">
                    <div id="flip-item-display" style="color: #ecf0f1; font-size: 16px; text-align: center;">
                        Nenhum item selecionado
                    </div>
                    <input type="hidden" id="flip-item" value="">
                    <div style="text-align: center; margin-top: 10px;">
                        <button onclick="abrirModalPrincipalFlip()" style="background: #d4af37; color: #222; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                            🔍 Selecionar Item
                        </button>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; color: #bdc3c7; font-weight: bold;">📈 Margem Mínima (%):</label>
                <input type="number" id="flip-margem" value="10" min="1" max="100" style="width: 100%; padding: 12px; border-radius: 8px; border: 2px solid #d4af37; background: #2c3e50; color: #ecf0f1; font-size: 16px;">
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 15px; color: #bdc3c7; font-weight: bold;">🏙️ Cidades para Análise:</label>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                    <label style="display: flex; align-items: center; background: #2c3e50; padding: 10px; border-radius: 6px; cursor: pointer;">
                        <input type="checkbox" id="cidade-caerleon" checked style="margin-right: 8px; scale: 1.2;">
                        <span style="color: #ecf0f1;">Caerleon</span>
                    </label>
                    <label style="display: flex; align-items: center; background: #2c3e50; padding: 10px; border-radius: 6px; cursor: pointer;">
                        <input type="checkbox" id="cidade-bridgewatch" checked style="margin-right: 8px; scale: 1.2;">
                        <span style="color: #ecf0f1;">Bridgewatch</span>
                    </label>
                    <label style="display: flex; align-items: center; background: #2c3e50; padding: 10px; border-radius: 6px; cursor: pointer;">
                        <input type="checkbox" id="cidade-martlock" checked style="margin-right: 8px; scale: 1.2;">
                        <span style="color: #ecf0f1;">Martlock</span>
                    </label>
                    <label style="display: flex; align-items: center; background: #2c3e50; padding: 10px; border-radius: 6px; cursor: pointer;">
                        <input type="checkbox" id="cidade-fortsterling" checked style="margin-right: 8px; scale: 1.2;">
                        <span style="color: #ecf0f1;">Fort Sterling</span>
                    </label>
                    <label style="display: flex; align-items: center; background: #2c3e50; padding: 10px; border-radius: 6px; cursor: pointer;">
                        <input type="checkbox" id="cidade-lymhurst" checked style="margin-right: 8px; scale: 1.2;">
                        <span style="color: #ecf0f1;">Lymhurst</span>
                    </label>
                    <label style="display: flex; align-items: center; background: #2c3e50; padding: 10px; border-radius: 6px; cursor: pointer;">
                        <input type="checkbox" id="cidade-thetford" checked style="margin-right: 8px; scale: 1.2;">
                        <span style="color: #ecf0f1;">Thetford</span>
                    </label>
                </div>
            </div>
            
            <div style="text-align: center;">
                <button onclick="buscarFlipManual()" style="background: #27ae60; color: white; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    🚀 Analisar Oportunidades
                </button>
            </div>
        </div>
    `;
}

// Função para buscar flip manual
function buscarFlipManual() {
    const itemSelecionado = document.getElementById('flip-item').value;
    const margem = parseFloat(document.getElementById('flip-margem').value) || 10;
    
    if (!itemSelecionado || itemSelecionado === 'Nenhum item selecionado') {
        alert('Por favor, selecione um item primeiro!');
        return;
    }
    
    // Coletar cidades selecionadas
    const cidadesSelecionadas = [];
    if (document.getElementById('cidade-caerleon').checked) cidadesSelecionadas.push('Caerleon');
    if (document.getElementById('cidade-bridgewatch').checked) cidadesSelecionadas.push('Bridgewatch');
    if (document.getElementById('cidade-martlock').checked) cidadesSelecionadas.push('Martlock');
    if (document.getElementById('cidade-fortsterling').checked) cidadesSelecionadas.push('Fort Sterling');
    if (document.getElementById('cidade-lymhurst').checked) cidadesSelecionadas.push('Lymhurst');
    if (document.getElementById('cidade-thetford').checked) cidadesSelecionadas.push('Thetford');
    
    if (cidadesSelecionadas.length < 2) {
        alert('Selecione pelo menos 2 cidades para comparar preços!');
        return;
    }
    
    const resultDiv = document.getElementById('flip-resultados');
    const existingContent = resultDiv.innerHTML;
    
    // Mostrar loading
    resultDiv.innerHTML = existingContent + `
        <div id="flip-loading" style="background: #34495e; color: #ecf0f1; padding: 20px; border-radius: 12px; margin: 20px auto; max-width: 600px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="text-align: center;">
                <div style="color: #d4af37; font-size: 18px; margin-bottom: 15px;">🔄 Analisando oportunidades...</div>
                <div style="background: #2c3e50; height: 4px; border-radius: 2px; overflow: hidden;">
                    <div style="background: #d4af37; height: 100%; width: 0%; animation: loading 2s ease-in-out infinite;" id="loading-bar"></div>
                </div>
                <style>
                    @keyframes loading {
                        0% { width: 0%; }
                        50% { width: 100%; }
                        100% { width: 0%; }
                    }
                </style>
            </div>
        </div>
    `;
    
    // Buscar preços do item em todas as cidades selecionadas
    buscarOportunidadesFlip(itemSelecionado, cidadesSelecionadas, margem);
}

// Função para abrir o modal de seleção de itens para o flip
function abrirModalPrincipalFlip() {
    // Definir contexto como flip para as funções de seleção
    window.flipMode = true;
    abrirModalPrincipal();
}
