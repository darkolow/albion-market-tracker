// ========================================
// MÓDULO DE EXIBIÇÃO DE RESULTADOS
// ========================================

// Funções auxiliares para qualidade
function getQualidadeTexto(quality) {
    switch(Number(quality)) {
        case 1: return 'Normal';
        case 2: return 'Bom';
        case 3: return 'Excepcional';
        case 4: return 'Perfeito';
        case 5: return 'Excelente';
        default: return 'Normal';
    }
}

function getQualidadeClass(quality) {
    switch(Number(quality)) {
        case 1: return 'quality-normal';
        case 2: return 'quality-good';
        case 3: return 'quality-outstanding';
        case 4: return 'quality-excellent';
        case 5: return 'quality-masterpiece';
        default: return 'quality-normal';
    }
}

// Função para exibir os resultados básicos
function exibirResultados(dados, itemId) {
    const resultDiv = document.getElementById('result');
    
    // Filtrar dados para recursos (apenas qualidade NORMAL)
    if (isRecurso(itemId)) {
        dados = dados.filter(item => Number(item.quality) === 1);
    }
    
    // Determinar imagem do item
    let itemIcon = itemId;
    if (itemId.includes('WOOD')) itemIcon = 'T4_WOOD';
    else if (itemId.includes('FIBER')) itemIcon = 'T4_FIBER'; 
    else if (itemId.includes('HIDE')) itemIcon = 'T4_HIDE';
    else if (itemId.includes('ORE')) itemIcon = 'T4_ORE';
    else if (itemId.includes('ROCK')) itemIcon = 'T4_ROCK';
    
    let html = `
        <div style="background: #34495e; color: #ecf0f1; padding: 20px; border-radius: 12px; margin: 20px auto; max-width: 800px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px;">
                <img src="https://render.albiononline.com/v1/item/${itemIcon}.png" alt="${itemId}" style="width: 48px; height: 48px;">
                <h3 style="color: #d4af37; margin: 0;">${itemId}</h3>
                <button onclick="voltarAoModalDoItem('${itemId}')" style="background: #3498db; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">
                    🔄 Trocar Item
                </button>
            </div>
            <table style="width: 100%; border-collapse: collapse; background: #2c3e50; border-radius: 8px; overflow: hidden;">
                <thead>
                    <tr style="background: #d4af37; color: #222;">
                        <th style="padding: 12px; text-align: left;">Cidade</th>
                        <th style="padding: 12px; text-align: center;">Qualidade</th>
                        <th style="padding: 12px; text-align: right;">Menor Venda</th>
                        <th style="padding: 12px; text-align: right;">Maior Compra</th>
                        <th style="padding: 12px; text-align: center;">Atualizado</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    dados.forEach(item => {
        const qualidadeTexto = getQualidadeTexto(item.quality);
        const qualidadeClass = getQualidadeClass(item.quality);
        const tempoVenda = calcularTempoDecorrido(item.sell_price_min_date);
        const tempoCompra = calcularTempoDecorrido(item.buy_price_max_date);
        const corTempoVenda = obterCorTempo(item.sell_price_min_date);
        const corTempoCompra = obterCorTempo(item.buy_price_max_date);
        
        html += `
            <tr style="border-bottom: 1px solid #34495e;">
                <td style="padding: 12px; font-weight: bold;">${item.city}</td>
                <td style="padding: 12px; text-align: center;">
                    <span class="${qualidadeClass}" style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                        ${qualidadeTexto}
                    </span>
                </td>
                <td style="padding: 12px; text-align: right; color: #e74c3c; font-weight: bold;">
                    ${item.sell_price_min ? item.sell_price_min.toLocaleString() + ' 🪙' : 'N/A'}
                    <div style="font-size: 10px; color: ${corTempoVenda}; margin-top: 2px;">${tempoVenda}</div>
                </td>
                <td style="padding: 12px; text-align: right; color: #27ae60; font-weight: bold;">
                    ${item.buy_price_max ? item.buy_price_max.toLocaleString() + ' 🪙' : 'N/A'}
                    <div style="font-size: 10px; color: ${corTempoCompra}; margin-top: 2px;">${tempoCompra}</div>
                </td>
                <td style="padding: 12px; text-align: center; color: #95a5a6; font-size: 12px;">
                    📊 ${calcularTempoDecorrido(item.sell_price_min_date)}
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table></div>';
    resultDiv.innerHTML = html;
}

// Função para exibir resultados de flip
function exibirResultadosFlip(itemId, oportunidades, margemMinima) {
    const loadingDiv = document.getElementById('flip-loading');
    
    if (oportunidades.length === 0) {
        loadingDiv.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="color: #e74c3c; font-size: 18px; margin-bottom: 10px;">❌ Nenhuma oportunidade encontrada</div>
                <div style="color: #95a5a6;">
                    Não foram encontradas oportunidades de flip com margem mínima de ${margemMinima}% para este item.
                    <br>Tente diminuir a margem ou verificar outras cidades.
                </div>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="background: #34495e; color: #ecf0f1; padding: 20px; border-radius: 12px; max-width: 800px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <h4 style="color: #d4af37; text-align: center; margin-bottom: 20px;">
                🎯 ${oportunidades.length} Oportunidade${oportunidades.length > 1 ? 's' : ''} Encontrada${oportunidades.length > 1 ? 's' : ''}
            </h4>
            <div style="display: grid; gap: 15px;">
    `;
    
    // Mostrar top 5 oportunidades
    const topOportunidades = oportunidades.slice(0, 5);
    
    topOportunidades.forEach((op, index) => {
        const qualidadeTexto = getQualidadeTexto(op.qualidade);
        const qualidadeClass = getQualidadeClass(op.qualidade);
        const taxas = calcularTaxas(op.precoCompra, op.precoVenda, false);
        const lucroPackNormal = taxas.lucroLiquido * 999;
        const investimentoPack = op.precoCompra * 999;
        
        html += `
            <div style="background: #2c3e50; border: 2px solid ${index === 0 ? '#d4af37' : '#95a5a6'}; border-radius: 10px; padding: 20px; position: relative;">
                ${index === 0 ? '<div style="position: absolute; top: -10px; right: 15px; background: #d4af37; color: #222; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold;">🏆 MELHOR</div>' : ''}
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;">
                    <div style="text-align: center; background: #e74c3c; padding: 15px; border-radius: 8px;">
                        <div style="color: white; font-weight: bold; margin-bottom: 5px;">💰 COMPRAR EM</div>
                        <div style="font-size: 20px; color: white; margin-bottom: 5px;">${op.cidadeCompra}</div>
                        <div style="font-size: 16px; color: #ecf0f1;">${op.precoCompra.toLocaleString()} silver</div>
                        <div style="font-size: 12px; color: #bdc3c7; margin-top: 5px;">
                            📦 Pack: ${investimentoPack.toLocaleString()} silver
                        </div>
                    </div>
                    
                    <div style="text-align: center; background: #27ae60; padding: 15px; border-radius: 8px;">
                        <div style="color: white; font-weight: bold; margin-bottom: 5px;">💎 VENDER EM</div>
                        <div style="font-size: 20px; color: white; margin-bottom: 5px;">${op.cidadeVenda}</div>
                        <div style="font-size: 16px; color: #ecf0f1;">${op.precoVenda.toLocaleString()} silver</div>
                        <div style="font-size: 12px; color: #bdc3c7; margin-top: 5px;">
                            📈 +${op.lucro.toLocaleString()} por unidade
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px;">
                    <div style="background: #34495e; padding: 10px; border-radius: 6px; text-align: center;">
                        <div style="color: #95a5a6; font-size: 11px;">MARGEM BRUTA</div>
                        <div style="color: #f39c12; font-weight: bold;">${op.margem.toFixed(1)}%</div>
                    </div>
                    <div style="background: #34495e; padding: 10px; border-radius: 6px; text-align: center;">
                        <div style="color: #95a5a6; font-size: 11px;">MARGEM LÍQUIDA</div>
                        <div style="color: #d4af37; font-weight: bold;">${op.margemLiquida.toFixed(1)}%</div>
                    </div>
                    <div style="background: #34495e; padding: 10px; border-radius: 6px; text-align: center;">
                        <div style="color: #95a5a6; font-size: 11px;">LUCRO PACK</div>
                        <div style="color: #27ae60; font-weight: bold; font-size: 13px;">${lucroPackNormal.toLocaleString()}</div>
                    </div>
                    <div style="background: #34495e; padding: 10px; border-radius: 6px; text-align: center;">
                        <div style="color: #95a5a6; font-size: 11px;">QUALIDADE</div>
                        <div class="${qualidadeClass}" style="font-weight: bold; font-size: 11px;">${qualidadeTexto}</div>
                    </div>
                </div>
                
                <div style="background: #34495e; padding: 12px; border-radius: 6px; text-align: center;">
                    <div style="color: #bdc3c7; font-size: 12px; margin-bottom: 5px;">
                        ⏰ Compra: há ${calcularTempoDecorrido(op.dataCompra)} | Venda: há ${calcularTempoDecorrido(op.dataVenda)}
                    </div>
                </div>
            </div>
        `;
    });
    
    if (oportunidades.length > 5) {
        html += `
            <div style="text-align: center; padding: 20px; background: #2c3e50; border-radius: 8px; border: 2px dashed #95a5a6;">
                <div style="color: #95a5a6; margin-bottom: 10px;">
                    +${oportunidades.length - 5} oportunidade${oportunidades.length - 5 > 1 ? 's' : ''} adicional${oportunidades.length - 5 > 1 ? 'is' : ''}
                </div>
                <div style="color: #7f8c8d; font-size: 14px;">
                    Use o Flip Automático para ver todas as oportunidades organizadas
                </div>
            </div>
        `;
    }
    
    html += `</div></div>`;
    
    loadingDiv.innerHTML = html;
}
