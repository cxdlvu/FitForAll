// Inicialização dos ícones Lucide
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Função para scroll suave para seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Função para abrir abas na área do aluno
function openTab(evt, tabName) {
    // Esconder todos os conteúdos das abas
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Remover classe active de todos os botões
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Mostrar o conteúdo da aba selecionada
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Adicionar classe active ao botão clicado
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

// Função para abrir área do aluno com aba específica
function openStudentArea(tabName) {
    // Primeiro, rolar para a área do aluno
    scrollToSection('area-aluno');
    
    // Aguardar um pouco para o scroll completar, então abrir a aba
    setTimeout(() => {
        // Encontrar o botão da aba correspondente
        const tabButtons = document.getElementsByClassName('tab-button');
        let targetButton = null;
        
        switch(tabName) {
            case 'treinos-casa':
                targetButton = tabButtons[0]; // Treinos por Nível
                openTab(null, 'treinos-nivel');
                break;
            case 'plano-iniciante':
                targetButton = tabButtons[4]; // Rotina Semanal
                openTab(null, 'rotina');
                break;
            case 'alimentacao':
                targetButton = tabButtons[2]; // PDF Downloads
                openTab(null, 'downloads');
                break;
            default:
                targetButton = tabButtons[0];
                openTab(null, 'treinos-nivel');
        }
        
        // Remover active de todos os botões
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        
        // Adicionar active ao botão correto
        if (targetButton) {
            targetButton.classList.add('active');
        }
    }, 800);
}

// Função para simular download de PDFs
function downloadPDF(fileName) {
    // Criar um elemento temporário para simular o download
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName + '.pdf';
    
    // Mostrar mensagem de que é uma demonstração
    alert('Esta é uma demonstração. Em um site real, o arquivo "' + fileName + '.pdf" seria baixado automaticamente.');
    
    // Em um site real, você faria algo como:
    // link.href = 'path/to/your/pdf/' + fileName + '.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Função para simular reprodução de vídeos
function playVideo(videoTitle) {
    alert('Esta é uma demonstração. Em um site real, o vídeo "' + videoTitle + '" seria reproduzido.');
    
    // Em um site real, você abriria um modal com o player de vídeo
    // ou redirecionaria para uma página de vídeo
}

// Adicionar event listeners para downloads quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para botões de download
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const titles = [
                'Guia_do_Iniciante',
                '30_Exercicios_em_Casa',
                'Plano_Alimentar_Simples'
            ];
            downloadPDF(titles[index] || 'Documento');
        });
    });
    
    // Event listeners para vídeos
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const titles = [
                'Como fazer flexões corretamente',
                'Treino com garrafa de água',
                'Aquecimento em 5 minutos'
            ];
            playVideo(titles[index] || 'Vídeo');
        });
    });
    
    // Event listener para scroll do header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
    
    // Animação de entrada para elementos quando aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.preview-item, .highlight-card, .content-card, .download-card, .video-card, .extra-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Função para navegação mobile (se necessário no futuro)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Função para smooth scroll nos links do header
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// Função para adicionar efeitos de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.highlight-card, .content-card, .download-card, .video-card, .extra-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Função para lazy loading de imagens (otimização)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Função para feedback visual nos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .download-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Criar efeito ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// CSS para o efeito ripple (adicionado dinamicamente)
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Adicionar CSS do ripple ao documento
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);
});



// ===== CALCULADORAS FITFORALL =====

// Função para mostrar/esconder campo de quadril na calculadora de BF
function toggleCamposBF() {
    const sexo = document.getElementById('sexo-bf').value;
    const quadrilRow = document.getElementById('quadril-row');
    
    if (sexo === 'feminino') {
        quadrilRow.style.display = 'block';
    } else {
        quadrilRow.style.display = 'none';
    }
}

// Calculadora 1: TMB e Gasto Calórico Diário
function calcularTMB() {
    const idade = parseFloat(document.getElementById('idade-tmb').value);
    const peso = parseFloat(document.getElementById('peso-tmb').value);
    const altura = parseFloat(document.getElementById('altura-tmb').value);
    const sexo = document.getElementById('sexo-tmb').value;
    const atividade = parseFloat(document.getElementById('atividade-tmb').value);
    
    const resultadoDiv = document.getElementById('resultado-tmb');
    
    // Validação
    if (!idade || !peso || !altura || !sexo || !atividade) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Cálculo da TMB usando fórmula de Mifflin-St Jeor
    let tmb;
    if (sexo === 'masculino') {
        tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
    } else {
        tmb = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
    }
    
    const gastoTotal = tmb * atividade;
    const paraEmagrecer = gastoTotal - 500;
    const paraGanharMassa = gastoTotal + 300;
    
    resultadoDiv.innerHTML = `
        <h4>📊 Seus Resultados</h4>
        <div class="result-item">
            <span class="result-label">TMB (Taxa Metabólica Basal):</span>
            <span class="result-value">${Math.round(tmb)} kcal/dia</span>
        </div>
        <div class="result-item">
            <span class="result-label">Gasto Total Diário:</span>
            <span class="result-value">${Math.round(gastoTotal)} kcal/dia</span>
        </div>
        <div class="result-tip">
            <strong>💡 Dicas para seus objetivos:</strong><br>
            • Para <strong>emagrecer</strong>: consuma cerca de ${Math.round(paraEmagrecer)} kcal/dia<br>
            • Para <strong>manter o peso</strong>: consuma cerca de ${Math.round(gastoTotal)} kcal/dia<br>
            • Para <strong>ganhar massa</strong>: consuma cerca de ${Math.round(paraGanharMassa)} kcal/dia<br><br>
            <em>Lembre-se: mudanças graduais são mais sustentáveis!</em>
        </div>
    `;
    
    resultadoDiv.classList.add('show');
}

// Calculadora 2: Macronutrientes
function calcularMacros() {
    const peso = parseFloat(document.getElementById('peso-macro').value);
    const calorias = parseFloat(document.getElementById('calorias-macro').value);
    const objetivo = document.getElementById('objetivo-macro').value;
    
    const resultadoDiv = document.getElementById('resultado-macro');
    
    // Validação
    if (!peso || !calorias || !objetivo) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    let proteina, carboidrato, gordura;
    
    // Definir macros baseado no objetivo
    switch(objetivo) {
        case 'emagrecer':
            proteina = peso * 2.2; // 2.2g por kg
            gordura = peso * 0.8; // 0.8g por kg
            carboidrato = (calorias - (proteina * 4) - (gordura * 9)) / 4;
            break;
        case 'manter':
            proteina = peso * 1.8; // 1.8g por kg
            gordura = peso * 1.0; // 1.0g por kg
            carboidrato = (calorias - (proteina * 4) - (gordura * 9)) / 4;
            break;
        case 'ganhar':
            proteina = peso * 2.0; // 2.0g por kg
            gordura = peso * 1.2; // 1.2g por kg
            carboidrato = (calorias - (proteina * 4) - (gordura * 9)) / 4;
            break;
    }
    
    resultadoDiv.innerHTML = `
        <h4>🍽️ Seus Macronutrientes</h4>
        <div class="macro-breakdown">
            <div class="macro-item">
                <div class="macro-name">Proteína</div>
                <div class="macro-value">${Math.round(proteina)}g</div>
            </div>
            <div class="macro-item">
                <div class="macro-name">Carboidrato</div>
                <div class="macro-value">${Math.round(carboidrato)}g</div>
            </div>
            <div class="macro-item">
                <div class="macro-name">Gordura</div>
                <div class="macro-value">${Math.round(gordura)}g</div>
            </div>
        </div>
        <div class="result-tip">
            <strong>🥗 Alimentos baratos para bater os macros:</strong><br>
            • <strong>Proteína:</strong> Ovos, frango, feijão, lentilha, sardinha<br>
            • <strong>Carboidrato:</strong> Arroz, batata, aveia, banana, pão integral<br>
            • <strong>Gordura:</strong> Azeite, amendoim, abacate, castanhas<br><br>
            <em>Distribua ao longo do dia e varie os alimentos!</em>
        </div>
    `;
    
    resultadoDiv.classList.add('show');
}

// Calculadora 3: IMC
function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso-imc').value);
    const altura = parseFloat(document.getElementById('altura-imc').value) / 100; // converter cm para m
    
    const resultadoDiv = document.getElementById('resultado-imc');
    
    // Validação
    if (!peso || !altura) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const imc = peso / (altura * altura);
    let classificacao, classe, mensagem;
    
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        classe = 'abaixo';
        mensagem = 'Considere ganhar peso de forma saudável com acompanhamento.';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
        classe = 'normal';
        mensagem = 'Parabéns! Mantenha seus hábitos saudáveis.';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
        classe = 'sobrepeso';
        mensagem = 'Uma pequena mudança nos hábitos pode fazer diferença.';
    } else {
        classificacao = 'Obesidade';
        classe = 'obesidade';
        mensagem = 'Procure orientação profissional para mudanças graduais.';
    }
    
    resultadoDiv.innerHTML = `
        <h4>📏 Seu IMC</h4>
        <div class="result-item">
            <span class="result-label">Índice de Massa Corporal:</span>
            <span class="result-value">${imc.toFixed(1)}</span>
        </div>
        <div class="imc-classification ${classe}">
            ${classificacao}
        </div>
        <div class="result-tip">
            <strong>💭 Lembre-se:</strong><br>
            ${mensagem}<br><br>
            <em>"O número não define você, mas ajuda a entender onde está."</em>
        </div>
    `;
    
    resultadoDiv.classList.add('show');
}

// Calculadora 4: Tempo até a Meta
function calcularTempoMeta() {
    const pesoAtual = parseFloat(document.getElementById('peso-atual-meta').value);
    const pesoMeta = parseFloat(document.getElementById('peso-meta').value);
    
    const resultadoDiv = document.getElementById('resultado-meta');
    
    // Validação
    if (!pesoAtual || !pesoMeta) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const diferenca = Math.abs(pesoAtual - pesoMeta);
    const perdaSaudavelPorSemana = 0.5; // kg por semana
    const semanas = Math.ceil(diferenca / perdaSaudavelPorSemana);
    const meses = Math.round(semanas / 4.33);
    
    const objetivo = pesoAtual > pesoMeta ? 'emagrecer' : 'ganhar peso';
    
    resultadoDiv.innerHTML = `
        <h4>🎯 Tempo até sua Meta</h4>
        <div class="result-item">
            <span class="result-label">Diferença de peso:</span>
            <span class="result-value">${diferenca.toFixed(1)} kg</span>
        </div>
        <div class="result-item">
            <span class="result-label">Tempo estimado:</span>
            <span class="result-value">${semanas} semanas (≈ ${meses} meses)</span>
        </div>
        <div class="result-tip">
            <strong>⏰ Seu plano:</strong><br>
            Para ${objetivo} de forma saudável, você precisará de aproximadamente <strong>${semanas} semanas</strong>.<br><br>
            <em>"Um dia de cada vez. Só depende de você."</em><br><br>
            💡 <strong>Dica:</strong> Mudanças graduais são mais duradouras que mudanças drásticas!
        </div>
    `;
    
    resultadoDiv.classList.add('show');
}

// Calculadora 5: Consumo de Água
function calcularAgua() {
    const peso = parseFloat(document.getElementById('peso-agua').value);
    const treina = document.getElementById('treina-agua').value;
    
    const resultadoDiv = document.getElementById('resultado-agua');
    
    // Validação
    if (!peso || !treina) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Cálculo base: 35ml por kg de peso
    let aguaBase = (peso * 35) / 1000; // converter ml para litros
    
    // Adicionar extra se treina
    if (treina === 'sim') {
        aguaBase += 0.5; // 500ml extra para quem treina
    }
    
    const copos = Math.round(aguaBase * 4); // considerando copos de 250ml
    
    resultadoDiv.innerHTML = `
        <h4>💧 Seu Consumo de Água</h4>
        <div class="result-item">
            <span class="result-label">Recomendação diária:</span>
            <span class="result-value">${aguaBase.toFixed(1)} litros</span>
        </div>
        <div class="result-item">
            <span class="result-label">Equivale a:</span>
            <span class="result-value">${copos} copos (250ml)</span>
        </div>
        <div class="result-tip">
            <strong>💡 Dicas para beber mais água:</strong><br>
            • Tenha sempre uma garrafa por perto<br>
            • Beba um copo ao acordar<br>
            • Use apps ou alarmes como lembrete<br>
            • Adicione limão ou hortelã para variar<br><br>
            <em>"Beba aos poucos. Até 2L já fazem muita diferença."</em>
        </div>
    `;
    
    resultadoDiv.classList.add('show');
}

// Calculadora 6: Percentual de Gordura Corporal
function calcularBF() {
    const sexo = document.getElementById('sexo-bf').value;
    const altura = parseFloat(document.getElementById('altura-bf').value);
    const pescoco = parseFloat(document.getElementById('pescoco-bf').value);
    const cintura = parseFloat(document.getElementById('cintura-bf').value);
    const quadril = parseFloat(document.getElementById('quadril-bf').value);
    
    const resultadoDiv = document.getElementById('resultado-bf');
    
    // Validação
    if (!sexo || !altura || !pescoco || !cintura) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    if (sexo === 'feminino' && !quadril) {
        alert('Para mulheres, a medida do quadril é obrigatória.');
        return;
    }
    
    let bf;
    
    // Fórmula da Marinha dos EUA
    if (sexo === 'masculino') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(cintura - pescoco) + 0.15456 * Math.log10(altura)) - 450;
    } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(cintura + quadril - pescoco) + 0.22100 * Math.log10(altura)) - 450;
    }
    
    let classificacao, classe, faixa;
    
    if (sexo === 'masculino') {
        if (bf < 6) {
            classificacao = 'Atleta de elite';
            classe = 'atleta';
            faixa = 'Muito baixo';
        } else if (bf < 14) {
            classificacao = 'Atleta/Fitness';
            classe = 'atleta';
            faixa = 'Excelente';
        } else if (bf < 18) {
            classificacao = 'Saudável';
            classe = 'saudavel';
            faixa = 'Bom';
        } else if (bf < 25) {
            classificacao = 'Aceitável';
            classe = 'saudavel';
            faixa = 'Aceitável';
        } else {
            classificacao = 'Acima do ideal';
            classe = 'acima';
            faixa = 'Alto';
        }
    } else {
        if (bf < 16) {
            classificacao = 'Atleta de elite';
            classe = 'atleta';
            faixa = 'Muito baixo';
        } else if (bf < 21) {
            classificacao = 'Atleta/Fitness';
            classe = 'atleta';
            faixa = 'Excelente';
        } else if (bf < 25) {
            classificacao = 'Saudável';
            classe = 'saudavel';
            faixa = 'Bom';
        } else if (bf < 32) {
            classificacao = 'Aceitável';
            classe = 'saudavel';
            faixa = 'Aceitável';
        } else {
            classificacao = 'Acima do ideal';
            classe = 'acima';
            faixa = 'Alto';
        }
    }
    
    resultadoDiv.innerHTML = `
        <h4>📊 Seu Percentual de Gordura</h4>
        <div class="result-item">
            <span class="result-label">Estimativa de BF%:</span>
            <span class="result-value">${bf.toFixed(1)}%</span>
        </div>
        <div class="bf-classification ${classe}">
            ${classificacao} (${faixa})
        </div>
        <div class="result-tip">
            <strong>📏 Sobre a medição:</strong><br>
            Esta é uma estimativa baseada na fórmula da Marinha dos EUA. Para resultados mais precisos, considere métodos como DEXA ou bioimpedância.<br><br>
            <em>"Esse número é só um ponto de partida. Foque no progresso."</em><br><br>
            💡 <strong>Dica:</strong> Tire fotos e medidas regulares - elas mostram progresso melhor que a balança!
        </div>
    `;
    
    resultadoDiv.classList.add('show');
}

// Função para limpar todos os resultados das calculadoras
function limparCalculadoras() {
    const resultados = document.querySelectorAll('.calc-result');
    resultados.forEach(resultado => {
        resultado.classList.remove('show');
        resultado.innerHTML = '';
    });
    
    // Limpar todos os campos de input
    const inputs = document.querySelectorAll('.calc-form input, .calc-form select');
    inputs.forEach(input => {
        input.value = '';
    });
}

// Adicionar função para scroll suave para calculadoras
function scrollToCalculadoras() {
    scrollToSection('calculadoras');
}

// Atualizar a função de navegação para incluir calculadoras
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners existentes...
    
    // Adicionar event listener para link de calculadoras
    const calcLink = document.querySelector('a[href="#calculadoras"]');
    if (calcLink) {
        calcLink.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToCalculadoras();
        });
    }
});


// ===== MODAL DA POLÍTICA DE USO =====
function openPolicyModal() {
    document.getElementById('policyModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Previne scroll da página
}

function closePolicyModal() {
    document.getElementById('policyModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura scroll da página
}

// Fechar modal clicando fora dele
window.onclick = function(event) {
    const modal = document.getElementById('policyModal');
    if (event.target === modal) {
        closePolicyModal();
    }
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePolicyModal();
    }
});

// ===== DOWNLOAD DOS EXTRAS ESPECIAIS =====
function downloadPDF(filename) {
    // Simula o download do PDF
    const link = document.createElement('a');
    link.href = filename;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Feedback visual
    showDownloadFeedback();
}

function showDownloadFeedback() {
    // Cria um elemento de feedback temporário
    const feedback = document.createElement('div');
    feedback.textContent = 'Download iniciado! 📥';
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00FF88, #008CFF);
        color: #1a1a1a;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove o feedback após 3 segundos
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 3000);
}

// Adiciona animações CSS para o feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

