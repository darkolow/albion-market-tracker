// ========================================
// MÓDULO DE ABAS DA CALCULADORA
// ========================================

// Função para gerar conteúdo da aba Calculadora
function gerarAbaCalculadora(dadosCard) {
    const melhorOp = dadosCard.oportunidades[0];
    
    return `
        <h4 style='color: #d4af37; margin-bottom: 20px; text-align: center;'>📊 Calculadora Avançada</h4>
        
        <!-- Simulador de Volume -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
            <h5 style='color: #f39c12; margin-bottom: 15px;'>📦 Simulador de Volume</h5>
            <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(25px, 1fr)); gap: 5px; margin-bottom: 15px;'>
                <button onclick="calcularVolume(${melhorOp.precoCompra}, ${melhorOp.precoVenda}, 999)" style='background: #34495e; color: #ecf0f1; border: 2px solid #d4af37; padding: 8px 2px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 10px;'>
                    999
                </button>
                <button onclick="calcularVolume(${melhorOp.precoCompra}, ${melhorOp.precoVenda}, 1999)" style='background: #34495e; color: #ecf0f1; border: 2px solid #d4af37; padding: 8px 2px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 10px;'>
                    1.999
                </button>
                <button onclick="calcularVolume(${melhorOp.precoCompra}, ${melhorOp.precoVenda}, 9999)" style='background: #34495e; color: #ecf0f1; border: 2px solid #d4af37; padding: 8px 2px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 10px;'>
                    9.999
                </button>
                <div style='display: flex; flex-direction: column; gap: 5px;'>
                    <input type='number' id='volume-customizado' placeholder='Custom' style='padding: 8px 2px; border-radius: 4px; border: 2px solid #d4af37; background: #34495e; color: #ecf0f1; font-size: 10px; text-align: center; font-weight: bold;'>
                    <button onclick="calcularVolumeCustomizado(${melhorOp.precoCompra}, ${melhorOp.precoVenda})" style='background: #d4af37; color: #222; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-weight: bold; font-size: 9px;'>
                        OK
                    </button>
                </div>
            </div>
            <div id='resultado-volume' style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                <div style='color: #95a5a6;'>Selecione um volume acima para ver os cálculos</div>
            </div>
        </div>
        
        <!-- Comparação Premium vs Normal -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
            <h5 style='color: #f39c12; margin-bottom: 15px;'>⭐ Premium vs Normal (999 unidades)</h5>
            <div style='display: grid; grid-template-columns: 1fr 1fr; gap: 20px;'>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c;'>
                    <h6 style='color: #e74c3c; margin-bottom: 10px; text-align: center;'>👤 Usuário Normal</h6>
                    <div id='calculo-normal'>${gerarCalculoPremium(melhorOp, false)}</div>
                </div>
                <div style='background: #34495e; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12;'>
                    <h6 style='color: #f39c12; margin-bottom: 10px; text-align: center;'>⭐ Usuário Premium</h6>
                    <div id='calculo-premium'>${gerarCalculoPremium(melhorOp, true)}</div>
                </div>
            </div>
        </div>
        
        <!-- Simulador de Mudança de Preços -->
        <div style='background: #2c3e50; padding: 20px; border-radius: 10px;'>
            <h5 style='color: #f39c12; margin-bottom: 15px;'>📈 Simulador de Cenários</h5>
            <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-bottom: 15px;'>
                <div>
                    <label style='color: #bdc3c7; font-size: 14px; margin-bottom: 5px; display: block;'>Preço de Compra:</label>
                    <input type='number' id='preco-compra-sim' value='${melhorOp.precoCompra}' style='width: 100%; padding: 8px; border-radius: 6px; border: 2px solid #d4af37; background: #34495e; color: #ecf0f1;'>
                </div>
                <div>
                    <label style='color: #bdc3c7; font-size: 14px; margin-bottom: 5px; display: block;'>Preço de Venda:</label>
                    <input type='number' id='preco-venda-sim' value='${melhorOp.precoVenda}' style='width: 100%; padding: 8px; border-radius: 6px; border: 2px solid #d4af37; background: #34495e; color: #ecf0f1;'>
                </div>
                <div style='display: flex; align-items: end;'>
                    <button onclick='simularCenario()' style='background: #d4af37; color: #222; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%;'>
                        🔄 Simular
                    </button>
                </div>
            </div>
            <div id='resultado-simulacao' style='background: #34495e; padding: 15px; border-radius: 8px; text-align: center;'>
                <div style='color: #95a5a6;'>Modifique os preços acima e clique em Simular</div>
            </div>
        </div>
    `;
}

// Funções auxiliares para as abas

function calcularVolume(precoCompra, precoVenda, volume) {
    const taxas = calcularTaxas(precoCompra, precoVenda, false);
    const resultadoDiv = document.getElementById('resultado-volume');
    
    resultadoDiv.innerHTML = `
        <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;'>
            <div style='background: #2c3e50; padding: 10px; border-radius: 6px; text-align: center;'>
                <div style='color: #95a5a6; font-size: 11px; margin-bottom: 3px;'>INVESTIMENTO</div>
                <div style='color: #e74c3c; font-weight: bold;'>${(precoCompra * volume).toLocaleString()}</div>
            </div>
            <div style='background: #2c3e50; padding: 10px; border-radius: 6px; text-align: center;'>
                <div style='color: #95a5a6; font-size: 11px; margin-bottom: 3px;'>RECEITA</div>
                <div style='color: #27ae60; font-weight: bold;'>${(precoVenda * volume).toLocaleString()}</div>
            </div>
            <div style='background: #2c3e50; padding: 10px; border-radius: 6px; text-align: center;'>
                <div style='color: #95a5a6; font-size: 11px; margin-bottom: 3px;'>TAXAS</div>
                <div style='color: #f39c12; font-weight: bold;'>${(taxas.totalTaxas * volume).toLocaleString()}</div>
            </div>
            <div style='background: #2c3e50; padding: 10px; border-radius: 6px; text-align: center;'>
                <div style='color: #95a5a6; font-size: 11px; margin-bottom: 3px;'>LUCRO LÍQUIDO</div>
                <div style='color: #d4af37; font-weight: bold;'>${(taxas.lucroLiquido * volume).toLocaleString()}</div>
            </div>
        </div>
        <div style='margin-top: 15px; text-align: center; color: #bdc3c7;'>
            Volume: ${volume.toLocaleString()} unidades | Margem: ${taxas.margemLiquida.toFixed(2)}%
        </div>
    `;
}

function calcularVolumeCustomizado(precoCompra, precoVenda) {
    const volume = parseInt(document.getElementById('volume-customizado').value);
    if (volume && volume > 0) {
        calcularVolume(precoCompra, precoVenda, volume);
    }
}

function gerarCalculoPremium(oportunidade, premium) {
    const taxas = calcularTaxas(oportunidade.precoCompra, oportunidade.precoVenda, premium);
    const volume = 999;
    
    return `
        <div style='margin-bottom: 10px;'>
            <div style='color: #95a5a6; font-size: 12px;'>Taxa de Transação:</div>
            <div style='color: #f39c12; font-weight: bold;'>${premium ? '4%' : '8%'}</div>
        </div>
        <div style='margin-bottom: 10px;'>
            <div style='color: #95a5a6; font-size: 12px;'>Taxas Totais:</div>
            <div style='color: #e74c3c; font-weight: bold;'>${(taxas.totalTaxas * volume).toLocaleString()}</div>
        </div>
        <div style='margin-bottom: 10px;'>
            <div style='color: #95a5a6; font-size: 12px;'>Lucro Líquido:</div>
            <div style='color: #27ae60; font-weight: bold;'>${(taxas.lucroLiquido * volume).toLocaleString()}</div>
        </div>
        <div>
            <div style='color: #95a5a6; font-size: 12px;'>Margem Líquida:</div>
            <div style='color: #d4af37; font-weight: bold; font-size: 16px;'>${taxas.margemLiquida.toFixed(2)}%</div>
        </div>
    `;
}

function simularCenario() {
    const precoCompra = parseFloat(document.getElementById('preco-compra-sim').value);
    const precoVenda = parseFloat(document.getElementById('preco-venda-sim').value);
    
    if (precoCompra && precoVenda && precoCompra > 0 && precoVenda > 0) {
        const taxas = calcularTaxas(precoCompra, precoVenda, false);
        const volume = 999;
        
        document.getElementById('resultado-simulacao').innerHTML = `
            <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px;'>
                <div style='background: #2c3e50; padding: 10px; border-radius: 6px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 11px; margin-bottom: 3px;'>INVESTIMENTO</div>
                    <div style='color: #e74c3c; font-weight: bold;'>${(precoCompra * volume).toLocaleString()}</div>
                </div>
                <div style='background: #2c3e50; padding: 10px; border-radius: 6px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 11px; margin-bottom: 3px;'>RECEITA</div>
                    <div style='color: #27ae60; font-weight: bold;'>${(precoVenda * volume).toLocaleString()}</div>
                </div>
                <div style='background: #2c3e50; padding: 10px; border-radius: 6px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 11px; margin-bottom: 3px;'>LUCRO</div>
                    <div style='color: #d4af37; font-weight: bold;'>${(taxas.lucroLiquido * volume).toLocaleString()}</div>
                </div>
                <div style='background: #2c3e50; padding: 10px; border-radius: 6px; text-align: center;'>
                    <div style='color: #95a5a6; font-size: 11px; margin-bottom: 3px;'>MARGEM</div>
                    <div style='color: ${taxas.margemLiquida > 0 ? '#27ae60' : '#e74c3c'}; font-weight: bold;'>${taxas.margemLiquida.toFixed(2)}%</div>
                </div>
            </div>
            <div style='color: #bdc3c7; font-size: 12px;'>
                ${taxas.margemLiquida > 0 ? '✅ Oportunidade viável!' : '❌ Oportunidade não viável'}
            </div>
        `;
    }
}
