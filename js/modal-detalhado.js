// ========================================
// MÓDULO DO MODAL DETALHADO
// ========================================

// Função para abrir modal detalhado ao clicar no card
function abrirModalDetalhado(cardId) {
    event.stopPropagation(); // Evitar conflitos de clique
    
    const dadosCard = window.cardDataCache[cardId];
    if (!dadosCard) return;
    
    const melhorOportunidade = dadosCard.oportunidades[0];
    const modal = document.getElementById('modalItens');
    
    const qualidadeTexto = getQualidadeTexto(dadosCard.qualidade);
    
    modal.innerHTML = `
        <div class='modal-bg' onclick='fecharModalDetalhado(event)' style='z-index: 10000;'>
            <div class='modal' style='max-width: 1000px; width: 95%; max-height: 90vh; overflow-y: auto;'>
                <span class='modal-close' onclick='fecharModalDetalhado(event)'>&times;</span>
                
                <!-- Cabeçalho do Modal -->
                <div style='background: #34495e; color: #ecf0f1; padding: 20px; border-radius: 12px 12px 0 0; text-align: center; border-bottom: 3px solid #d4af37;'>
                    <div style='display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;'>
                        <img src="https://render.albiononline.com/v1/item/${dadosCard.itemId}.png" alt="${dadosCard.itemNome}" style="width: 64px; height: 64px;">
                        <div>
                            <h3 style='color: #d4af37; margin: 0; margin-bottom: 5px;'>${dadosCard.itemNome}</h3>
                            <div style='color: #bdc3c7; font-size: 14px;'>${qualidadeTexto} • T${dadosCard.itemTier}</div>
                        </div>
                        <div style='text-align: center; background: #2c3e50; padding: 10px; border-radius: 8px;'>
                            <div style='color: #d4af37; font-size: 24px; font-weight: bold; margin-bottom: 2px;'>${melhorOportunidade.margemLiquida ? melhorOportunidade.margemLiquida.toFixed(1) : melhorOportunidade.margem.toFixed(1)}%</div>
                            <div style='color: #95a5a6; font-size: 12px;'>Melhor Margem</div>
                        </div>
                    </div>
                </div>
                
                <!-- Sistema de Abas -->
                <div style='background: #2c3e50; padding: 0; border-bottom: 2px solid #34495e;'>
                    <div style='display: flex; overflow-x: auto;'>
                        <button class='tab-btn-detalhado' onclick='abrirAbaDetalhada("visao-geral")' style='background: #d4af37; color: #222; border: none; padding: 15px 20px; cursor: pointer; font-weight: bold; border-bottom: 3px solid #d4af37;'>
                            📊 Visão Geral
                        </button>
                        <button class='tab-btn-detalhado' onclick='abrirAbaDetalhada("calculadora")' style='background: #34495e; color: #ecf0f1; border: none; padding: 15px 20px; cursor: pointer; font-weight: bold;'>
                            🧮 Calculadora
                        </button>
                        <button class='tab-btn-detalhado' onclick='abrirAbaDetalhada("rotas")' style='background: #34495e; color: #ecf0f1; border: none; padding: 15px 20px; cursor: pointer; font-weight: bold;'>
                            🗺️ Rotas
                        </button>
                        <button class='tab-btn-detalhado' onclick='abrirAbaDetalhada("historico")' style='background: #34495e; color: #ecf0f1; border: none; padding: 15px 20px; cursor: pointer; font-weight: bold;'>
                            📈 Histórico
                        </button>
                        <button class='tab-btn-detalhado' onclick='abrirAbaDetalhada("notas")' style='background: #34495e; color: #ecf0f1; border: none; padding: 15px 20px; cursor: pointer; font-weight: bold;'>
                            📝 Notas
                        </button>
                    </div>
                </div>
                
                <!-- Conteúdo das Abas -->
                <div style='background: #34495e; color: #ecf0f1; padding: 20px; border-radius: 0 0 12px 12px; min-height: 400px;'>
                    
                    <!-- Aba Visão Geral -->
                    <div id='aba-visao-geral' class='aba-detalhada active'>
                        ${gerarAbaVisaoGeral(dadosCard)}
                    </div>
                    
                    <!-- Aba Calculadora -->
                    <div id='aba-calculadora' class='aba-detalhada' style='display: none;'>
                        ${gerarAbaCalculadora(dadosCard)}
                    </div>
                    
                    <!-- Aba Rotas -->
                    <div id='aba-rotas' class='aba-detalhada' style='display: none;'>
                        ${gerarAbaRotas(dadosCard)}
                    </div>
                    
                    <!-- Aba Histórico -->
                    <div id='aba-historico' class='aba-detalhada' style='display: none;'>
                        ${gerarAbaHistorico(dadosCard)}
                    </div>
                    
                    <!-- Aba Notas -->
                    <div id='aba-notas' class='aba-detalhada' style='display: none;'>
                        ${gerarAbaNotas(dadosCard)}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Salvar dados no contexto global para as abas
    window.modalDetalhadoData = dadosCard;
}

// Função para gerar conteúdo da aba Visão Geral
function gerarAbaVisaoGeral(dadosCard) {
    const melhorOp = dadosCard.oportunidades[0];
    const taxas = calcularTaxas(melhorOp.precoCompra, melhorOp.precoVenda, false);
    
    let html = `
        <h4 style='color: #d4af37; margin-bottom: 20px; text-align: center;'>📊 Análise Completa da Oportunidade</h4>
        
        <!-- Resumo Principal -->
        <div style='display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;'>
            <div style='background: #2c3e50; padding: 20px; border-radius: 10px; border-left: 4px solid #e74c3c;'>
                <h5 style='color: #e74c3c; margin-bottom: 15px; text-align: center;'>💰 COMPRAR EM</h5>
                <div style='text-align: center;'>
                    <div style='font-size: 24px; font-weight: bold; color: #ecf0f1; margin-bottom: 8px;'>${melhorOp.cidadeCompra}</div>
                    <div style='font-size: 18px; color: #d4af37; margin-bottom: 5px;'>${melhorOp.precoCompra.toLocaleString()} silver</div>
                    <div style='font-size: 12px; color: #95a5a6;'>por unidade</div>
                    <div style='font-size: 14px; color: #bdc3c7; margin-top: 8px;'>
                        📦 Pack: ${(melhorOp.precoCompra * 999).toLocaleString()} silver
                    </div>
                </div>
            </div>
            
            <div style='background: #2c3e50; padding: 20px; border-radius: 10px; border-left: 4px solid #27ae60;'>
                <h5 style='color: #27ae60; margin-bottom: 15px; text-align: center;'>💎 VENDER EM</h5>
                <div style='text-align: center;'>
                    <div style='font-size: 24px; font-weight: bold; color: #ecf0f1; margin-bottom: 8px;'>${melhorOp.cidadeVenda}</div>
                    <div style='font-size: 18px; color: #d4af37; margin-bottom: 5px;'>${melhorOp.precoVenda.toLocaleString()} silver</div>
                    <div style='font-size: 12px; color: #95a5a6;'>por unidade</div>
                    <div style='font-size: 14px; color: #bdc3c7; margin-top: 8px;'>
                        📈 Pack: ${(melhorOp.precoVenda * 999).toLocaleString()} silver
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Análise Financeira -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px; margin-bottom: 25px;'>
            <h5 style='color: #d4af37; margin-bottom: 15px; text-align: center;'>💼 Análise Financeira (Pack 999 unidades)</h5>
            <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;'>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 12px; margin-bottom: 5px;'>INVESTIMENTO TOTAL</div>
                    <div style='color: #e74c3c; font-size: 18px; font-weight: bold;'>${(melhorOp.precoCompra * 999).toLocaleString()}</div>
                </div>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 12px; margin-bottom: 5px;'>RECEITA BRUTA</div>
                    <div style='color: #27ae60; font-size: 18px; font-weight: bold;'>${(melhorOp.precoVenda * 999).toLocaleString()}</div>
                </div>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 12px; margin-bottom: 5px;'>TAXAS TOTAIS</div>
                    <div style='color: #f39c12; font-size: 18px; font-weight: bold;'>${(taxas.totalTaxas * 999).toLocaleString()}</div>
                </div>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 12px; margin-bottom: 5px;'>LUCRO LÍQUIDO</div>
                    <div style='color: #d4af37; font-size: 18px; font-weight: bold;'>${(taxas.lucroLiquido * 999).toLocaleString()}</div>
                </div>
            </div>
        </div>
        
        <!-- Todas as Oportunidades -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px;'>
            <h5 style='color: #d4af37; margin-bottom: 15px; text-align: center;'>🔄 Todas as Rotas Disponíveis (${dadosCard.oportunidades.length})</h5>
            <div style='max-height: 300px; overflow-y: auto;'>
    `;
    
    dadosCard.oportunidades.forEach((op, index) => {
        const taxasOp = calcularTaxas(op.precoCompra, op.precoVenda, false);
        html += `
            <div style='background: #34495e; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid ${index === 0 ? '#d4af37' : '#95a5a6'};'>
                <div style='display: flex; justify-content: space-between; align-items: center;'>
                    <div style='flex: 1;'>
                        <div style='color: #ecf0f1; font-weight: bold; margin-bottom: 5px;'>
                            ${op.cidadeCompra} → ${op.cidadeVenda}
                        </div>
                        <div style='color: #bdc3c7; font-size: 12px;'>
                            📍 ${op.precoCompra.toLocaleString()} → ${op.precoVenda.toLocaleString()} silver
                        </div>
                    </div>
                    <div style='text-align: right;'>
                        <div style='color: #d4af37; font-weight: bold; font-size: 16px;'>${taxasOp.margemLiquida.toFixed(1)}%</div>
                        <div style='color: #27ae60; font-size: 12px;'>${(taxasOp.lucroLiquido * 999).toLocaleString()} 🪙</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}
