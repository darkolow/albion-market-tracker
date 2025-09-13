// ========================================
// MÓDULO DE MODAIS E INTERFACE
// ========================================

// Função para fechar modal
function fecharModal(e) {
    if (e && !e.target.classList.contains('modal-bg') && !e.target.classList.contains('modal-close')) {
        return;
    }
    document.getElementById('modalItens').style.display = 'none';
}

// Função para navegar entre abas
function abrirAba(abaId) {
    // Esconder todas as abas
    const abas = document.querySelectorAll('.tab-content');
    abas.forEach(aba => aba.classList.remove('active'));
    
    // Remover classe active de todos os botões
    const botoes = document.querySelectorAll('.tab-button');
    botoes.forEach(botao => botao.classList.remove('active'));
    
    // Mostrar a aba selecionada
    document.getElementById(abaId).classList.add('active');
    
    // Ativar o botão correspondente
    event.target.classList.add('active');
}

// Função para fechar modal detalhado
function fecharModalDetalhado(e) {
    if (e && !e.target.classList.contains('modal-bg') && !e.target.classList.contains('modal-close')) {
        return;
    }
    document.getElementById('modalItens').style.display = 'none';
    window.modalDetalhadoData = null;
}

// Função para navegar entre abas do modal detalhado
function abrirAbaDetalhada(abaId) {
    // Esconder todas as abas
    document.querySelectorAll('.aba-detalhada').forEach(aba => {
        aba.style.display = 'none';
    });
    
    // Remover classe active de todos os botões
    document.querySelectorAll('.tab-btn-detalhado').forEach(btn => {
        btn.style.background = '#34495e';
        btn.style.color = '#ecf0f1';
    });
    
    // Mostrar aba selecionada
    document.getElementById(`aba-${abaId}`).style.display = 'block';
    
    // Ativar botão correspondente
    event.target.style.background = '#d4af37';
    event.target.style.color = '#222';
}

// Função para voltar ao modal do item selecionado
function voltarAoModalDoItem(itemId) {
    // Detectar o tipo de item baseado no ID
    if (itemId.includes('BAG_INSIGHT')) {
        abrirModalBolsas();
    } else if (itemId.includes('BAG')) {
        abrirModalBolsas();
    } else if (itemId.includes('CLOTH') || itemId.includes('LEATHER') || 
               itemId.includes('METALBAR') || itemId.includes('STONEBLOCK') || itemId.includes('PLANKS')) {
        abrirModalRecursosRefinados();
    } else if (itemId.includes('WOOD') || itemId.includes('FIBER') || 
               itemId.includes('HIDE') || itemId.includes('ORE') || itemId.includes('ROCK')) {
        abrirModalRecursos();
    } else {
        console.log('Tipo de item não reconhecido:', itemId);
    }
}
