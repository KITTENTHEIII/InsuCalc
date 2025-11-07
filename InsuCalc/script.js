// Translations object
const translations = {
    pt: {
        mainTitle: 'Calculadora de Insulina',
        configTitle: 'Configurações Pessoais',
        labelCarbRatio: 'Razão Insulina:Carboidrato (1 unidade para X gramas)',
        labelCorrectionFactor: 'Fator de Correção (1 unidade reduz X mg/dL)',
        labelTargetGlucose: 'Glicemia Alvo (mg/dL)',
        btnSave: 'Salvar Configurações',
        calcTitle: 'Calcular Dose',
        labelCurrentGlucose: 'Glicemia Atual (mg/dL)',
        labelCarbs: 'Carboidratos a Consumir (gramas)',
        btnCalculate: 'Calcular Insulina',
        resultLabel: 'Dose Recomendada:',
        infoTitle: '⚕️ Aviso Importante:',
        infoText: 'Esta calculadora é apenas uma ferramenta educacional. Sempre consulte seu médico ou profissional de saúde antes de ajustar suas doses de insulina. Cada pessoa é única e requer acompanhamento individualizado.',
        savedMessage: '✓ Configurações salvas!',
        carbDose: 'Dose para carboidratos',
        correctionDose: 'Dose de correção',
        fillFields: 'Por favor, preencha a glicemia atual e os carboidratos.'
    },
    en: {
        mainTitle: 'Insulin Calculator',
        configTitle: 'Personal Settings',
        labelCarbRatio: 'Insulin:Carb Ratio (1 unit per X grams)',
        labelCorrectionFactor: 'Correction Factor (1 unit lowers X mg/dL)',
        labelTargetGlucose: 'Target Glucose (mg/dL)',
        btnSave: 'Save Settings',
        calcTitle: 'Calculate Dose',
        labelCurrentGlucose: 'Current Glucose (mg/dL)',
        labelCarbs: 'Carbs to Consume (grams)',
        btnCalculate: 'Calculate Insulin',
        resultLabel: 'Recommended Dose:',
        infoTitle: '⚕️ Important Notice:',
        infoText: 'This calculator is only an educational tool. Always consult your doctor or healthcare professional before adjusting your insulin doses. Each person is unique and requires individualized monitoring.',
        savedMessage: '✓ Settings saved!',
        carbDose: 'Dose for carbs',
        correctionDose: 'Correction dose',
        fillFields: 'Please fill in current glucose and carbs.'
    }
};

let currentLang = 'pt';

// Load saved settings on page load
window.onload = function() {
    loadSettings();
    const savedLang = localStorage.getItem('insulinCalcLang') || 'pt';
    setLanguage(savedLang);
};

// Set language function
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('insulinCalcLang', lang);
    
    // Update button states
    document.getElementById('btnPt').classList.toggle('active', lang === 'pt');
    document.getElementById('btnEn').classList.toggle('active', lang === 'en');
    
    // Update all text elements
    const t = translations[lang];
    document.getElementById('mainTitle').textContent = t.mainTitle;
    document.getElementById('configTitle').textContent = t.configTitle;
    document.getElementById('labelCarbRatio').textContent = t.labelCarbRatio;
    document.getElementById('labelCorrectionFactor').textContent = t.labelCorrectionFactor;
    document.getElementById('labelTargetGlucose').textContent = t.labelTargetGlucose;
    document.getElementById('btnSave').textContent = t.btnSave;
    document.getElementById('calcTitle').textContent = t.calcTitle;
    document.getElementById('labelCurrentGlucose').textContent = t.labelCurrentGlucose;
    document.getElementById('labelCarbs').textContent = t.labelCarbs;
    document.getElementById('btnCalculate').textContent = t.btnCalculate;
    document.getElementById('resultLabel').textContent = t.resultLabel;
    document.getElementById('infoTitle').innerHTML = t.infoTitle;
    document.getElementById('infoText').textContent = t.infoText;
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        carbRatio: document.getElementById('carbRatio').value,
        correctionFactor: document.getElementById('correctionFactor').value,
        targetGlucose: document.getElementById('targetGlucose').value
    };
    
    localStorage.setItem('insulinCalcSettings', JSON.stringify(settings));
    
    // Show saved indicator
    const indicator = document.getElementById('savedIndicator');
    indicator.textContent = translations[currentLang].savedMessage;
    indicator.classList.add('show');
    
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 3000);
}

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('insulinCalcSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        document.getElementById('carbRatio').value = settings.carbRatio;
        document.getElementById('correctionFactor').value = settings.correctionFactor;
        document.getElementById('targetGlucose').value = settings.targetGlucose;
    }
}

// Calculate insulin dose
function calculateInsulin() {
    const currentGlucose = parseFloat(document.getElementById('currentGlucose').value);
    const carbs = parseFloat(document.getElementById('carbs').value);
    const carbRatio = parseFloat(document.getElementById('carbRatio').value);
    const correctionFactor = parseFloat(document.getElementById('correctionFactor').value);
    const targetGlucose = parseFloat(document.getElementById('targetGlucose').value);

    // Validate inputs
    if (!currentGlucose || !carbs) {
        alert(translations[currentLang].fillFields);
        return;
    }

    // Calculate carb dose
    const carbDose = carbs / carbRatio;

    // Calculate correction dose
    const glucoseDifference = currentGlucose - targetGlucose;
    const correctionDose = glucoseDifference / correctionFactor;

    // Total dose (minimum 0)
    const totalDose = Math.max(0, carbDose + correctionDose);

    // Display result
    const resultDiv = document.getElementById('result');
    const resultValue = document.getElementById('resultValue');
    const resultDetails = document.getElementById('resultDetails');

    resultValue.textContent = totalDose.toFixed(1) + ' U';
    
    const t = translations[currentLang];
    resultDetails.innerHTML = `
        <div style="margin-top: 15px; font-size: 14px; opacity: 0.9;">
            ${t.carbDose}: ${carbDose.toFixed(1)} U<br>
            ${t.correctionDose}: ${correctionDose.toFixed(1)} U
        </div>
    `;

    resultDiv.classList.add('show');
}