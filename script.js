/* ========================================
   CALCULADORA DE INSULINA - DIABETES TIPO 1
   ========================================
   
   Este ficheiro contém toda a lógica JavaScript da calculadora.
   
   Funcionalidades principais:
   - Cálculo da dose de insulina baseado em FSI e ratio I:C
   - Salvamento e carregamento de configurações (usando cookies)
   - Validação de dados inseridos pelo utilizador
   - Interface dinâmica que destaca o período ativo
   ======================================== */

/* ========================================
   FUNÇÃO: atualizarPeriodo()
   ========================================
   Atualiza a interface para destacar o período do dia selecionado.
   Reduz a opacidade dos outros períodos para dar foco ao ativo.
   ======================================== */
function atualizarPeriodo() {
    // Obtém o período selecionado (manha, tarde, noite, madrugada)
    const periodo = document.getElementById('periodoFSI').value;
    
    // Mapeamento dos valores para nomes legíveis
    const periodos = {
        'manha': 'Manhã',
        'tarde': 'Tarde',
        'noite': 'Noite',
        'madrugada': 'Madrugada'
    };
    
    // Reduz a opacidade de todos os campos FSI
    document.querySelectorAll('.input-group').forEach(group => {
        const input = group.querySelector('input[id^="fsi"]');
        if (input) {
            group.style.opacity = '0.5';
        }
    });
    
    // Destaca apenas o campo FSI do período selecionado
    // Converte 'manha' para 'Manha' para corresponder ao ID do campo
    const fsiAtual = document.getElementById('fsi' + periodo.charAt(0).toUpperCase() + periodo.slice(1));
    if (fsiAtual) {
        fsiAtual.parentElement.style.opacity = '1';
    }
}

/* ========================================
   FUNÇÃO: salvarConfiguracoes()
   ========================================
   Guarda todas as configurações do utilizador em cookies.
   Os cookies duram 1 ano (31536000 segundos).
   Mostra mensagem de confirmação por 3 segundos.
   ======================================== */
function salvarConfiguracoes() {
    // Recolhe todos os valores dos campos de configuração
    const config = {
        periodoFSI: document.getElementById('periodoFSI').value,
        fsiManha: document.getElementById('fsiManha').value,
        fsiTarde: document.getElementById('fsiTarde').value,
        fsiNoite: document.getElementById('fsiNoite').value,
        fsiMadrugada: document.getElementById('fsiMadrugada').value,
        razaoCarboidrato: document.getElementById('razaoCarboidrato').value,
        metaGlicemia: document.getElementById('metaGlicemia').value
    };

    // Cria um objeto para armazenar os dados
    const configData = {};
    for (const [key, value] of Object.entries(config)) {
        configData[key] = value;
    }

    // Guarda cada configuração num cookie separado
    // Prefixo 'insulina_' para identificar os cookies desta aplicação
    for (const [key, value] of Object.entries(configData)) {
        document.cookie = `insulina_${key}=${value}; max-age=31536000; path=/`;
    }

    // Mostra mensagem de confirmação
    const mensagem = document.getElementById('mensagemSalva');
    mensagem.classList.add('show');
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        mensagem.classList.remove('show');
    }, 3000);
}

/* ========================================
   FUNÇÃO: carregarConfiguracoes()
   ========================================
   Carrega as configurações guardadas dos cookies.
   Executada automaticamente quando a página é carregada.
   ======================================== */
function carregarConfiguracoes() {
    // Obtém todos os cookies
    const cookies = document.cookie.split(';');
    const config = {};

    // Procura cookies que começam com 'insulina_'
    cookies.forEach(cookie => {
        const [nome, valor] = cookie.trim().split('=');
        if (nome.startsWith('insulina_')) {
            // Remove o prefixo 'insulina_' para obter o nome do campo
            const campo = nome.replace('insulina_', '');
            config[campo] = valor;
        }
    });

    // Preenche os campos com os valores guardados
    for (const [campo, valor] of Object.entries(config)) {
        const elemento = document.getElementById(campo);
        if (elemento && valor) {
            elemento.value = valor;
        }
    }
}

/* ========================================
   FUNÇÃO: limparConfiguracoes()
   ========================================
   Remove todas as configurações guardadas.
   Pede confirmação antes de executar.
   Limpa os cookies e reseta os campos para valores padrão.
   ======================================== */
function limparConfiguracoes() {
    // Pede confirmação ao utilizador
    if (confirm('Tem certeza que deseja limpar todas as configurações salvas?')) {
        // Obtém todos os cookies
        const cookies = document.cookie.split(';');
        
        // Remove apenas os cookies desta aplicação
        cookies.forEach(cookie => {
            const nome = cookie.split('=')[0].trim();
            if (nome.startsWith('insulina_')) {
                // Define max-age=0 para eliminar o cookie
                document.cookie = `${nome}=; max-age=0; path=/`;
            }
        });

        // Reseta todos os campos para valores padrão
        document.getElementById('periodoFSI').value = 'manha';
        document.getElementById('fsiManha').value = '';
        document.getElementById('fsiTarde').value = '';
        document.getElementById('fsiNoite').value = '';
        document.getElementById('fsiMadrugada').value = '';
        document.getElementById('razaoCarboidrato').value = '';
        document.getElementById('metaGlicemia').value = '100';

        // Atualiza a interface
        atualizarPeriodo();
        
        // Confirma ao utilizador
        alert('Configurações limpas com sucesso!');
    }
}

/* ========================================
   FUNÇÃO: calcularInsulina()
   ========================================
   FUNÇÃO PRINCIPAL - Calcula a dose de insulina necessária.
   
   Fórmulas utilizadas:
   1. Dose de Correção = (Glicemia Atual - Meta) / FSI
   2. Dose de Carboidratos = Gramas de HC / Ratio I:C
   3. Dose Total = Dose de Correção + Dose de Carboidratos
   
   Valida todos os dados antes de calcular.
   ======================================== */
function calcularInsulina() {
    // ===== RECOLHA DE DADOS =====
    
    // Obtém o período do dia selecionado
    const periodo = document.getElementById('periodoFSI').value;
    
    // Constrói o ID do campo FSI correspondente ao período
    // Ex: 'manha' -> 'fsiManha'
    const fsiId = 'fsi' + periodo.charAt(0).toUpperCase() + periodo.slice(1);
    const fsi = parseFloat(document.getElementById(fsiId).value);
    
    // Obtém os outros valores necessários
    const razaoCarb = parseFloat(document.getElementById('razaoCarboidrato').value);
    const meta = parseFloat(document.getElementById('metaGlicemia').value);
    const glicemiaAtual = parseFloat(document.getElementById('glicemiaAtual').value);
    const carboidratos = parseFloat(document.getElementById('carboidratos').value);

    // ===== VALIDAÇÃO DE DADOS =====
    
    // Verifica se os campos obrigatórios estão preenchidos
    if (!fsi || !razaoCarb || !meta || !glicemiaAtual) {
        alert('Por favor, preencha todos os campos obrigatórios (FSI do período selecionado, Razão I:C, Meta e Glicemia Atual)!');
        return;
    }

    // Verifica se os valores são positivos
    if (fsi <= 0 || razaoCarb <= 0 || meta <= 0 || glicemiaAtual <= 0) {
        alert('Os valores devem ser maiores que zero!');
        return;
    }

    // ===== CÁLCULOS =====
    
    // Calcula quanto a glicemia está acima/abaixo da meta
    const diferencaGlicemia = glicemiaAtual - meta;
    
    // Calcula dose de correção
    // Se negativo (glicemia abaixo da meta), a dose será 0
    let doseCorrecao = diferencaGlicemia / fsi;
    if (doseCorrecao < 0) {
        doseCorrecao = 0;
    }

    // Calcula dose para carboidratos
    // Se não foram inseridos carboidratos, a dose será 0
    let doseCarboidratos = 0;
    if (carboidratos && carboidratos > 0) {
        doseCarboidratos = carboidratos / razaoCarb;
    }

    // Calcula dose total (soma das duas doses)
    const doseTotal = doseCorrecao + doseCarboidratos;

    // ===== APRESENTAÇÃO DE RESULTADOS =====
    
    // Mapeamento para mostrar o nome legível do período
    const periodos = {
        'manha': 'Manhã',
        'tarde': 'Tarde',
        'noite': 'Noite',
        'madrugada': 'Madrugada'
    };

    // Atualiza os elementos HTML com os resultados
    document.getElementById('periodoUtilizado').textContent = periodos[periodo];
    document.getElementById('fsiUtilizado').textContent = fsi.toFixed(0) + ' mg/dL';
    document.getElementById('doseCorrecao').textContent = doseCorrecao.toFixed(1) + ' U';
    document.getElementById('doseCarboidratos').textContent = doseCarboidratos.toFixed(1) + ' U';
    document.getElementById('doseTotal').textContent = doseTotal.toFixed(1) + ' U';

    // Mostra a área de resultados com animação
    document.getElementById('resultado').classList.add('show');
    
    // Faz scroll suave até aos resultados
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ========================================
   EVENT LISTENERS
   ======================================== */

// Adiciona a funcionalidade de pressionar Enter para calcular
// em todos os campos de input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularInsulina();
        }
    });
});

/* ========================================
   INICIALIZAÇÃO
   ========================================
   Executa quando a página é carregada
   ======================================== */

// Carrega as configurações guardadas (se existirem)
carregarConfiguracoes();

// Atualiza a interface para destacar o período inicial
atualizarPeriodo();