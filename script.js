// Keys used to persist data in localStorage
const STORAGE_KEY_SETTINGS = 'insulin_settings';
const STORAGE_KEY_THEME = 'insulin_theme';
const STORAGE_KEY_LANGUAGE = 'insulin_language';

// Currently active UI language ('pt' or 'en')
let currentLanguage = 'pt';

// Translations

const TRANSLATIONS = {
    pt: {
        title: '💉 Calculadora de Insulina',
        subtitle: 'Diabetes Tipo 1',
        sectionPersonal: 'Configurações Pessoais',
        labelPeriod: 'Período do Dia',
        optionMorning: 'Manhã (6h - 12h)',
        optionAfternoon: 'Tarde (12h - 18h)',
        optionEvening: 'Noite (18h - 23h)',
        optionNight: 'Madrugada (23h - 6h)',
        labelFsiMorning: 'FSI - Manhã',
        labelFsiAfternoon: 'FSI - Tarde',
        labelFsiEvening: 'FSI - Noite',
        labelFsiNight: 'FSI - Madrugada',
        placeholderFsiMorning: 'Ex: 50 ou 47.5',
        placeholderFsiAfternoon: 'Ex: 45 ou 42.5',
        placeholderFsiEvening: 'Ex: 40 ou 37.5',
        placeholderFsiNight: 'Ex: 55 ou 52.5',
        labelCarbRatio: 'Rácio Insulina/Hidratos (1:X)',
        placeholderCarbRatio: 'Ex: 15 ou 12.5',
        labelGlucoseTarget: 'Meta de Glicemia (mg/dL)',
        placeholderGlucoseTarget: 'Ex: 100',
        sectionCurrent: 'Dados Atuais',
        labelCurrentGlucose: 'Glicemia Atual (mg/dL)',
        placeholderCurrentGlucose: 'Ex: 180',
        labelCarbs: 'Hidratos de Carbono a Consumir (gramas)',
        placeholderCarbs: 'Ex: 60',
        btnCalculate: 'Calcular Dose de Insulina',
        btnSave: '💾 Salvar Configurações',
        btnClear: '🗑️ Limpar Dados',
        btnExport: '⬇️ Exportar',
        btnImport: '⬆️ Importar',
        savedMessage: '✓ Configurações salvas com sucesso!',
        importedMessage: '✓ Configurações importadas com sucesso!',
        resultTitle: '📊 Resultado do Cálculo',
        resultLabelFsi: 'FSI Utilizado',
        resultLabelCorrection: 'Dose de Correção',
        resultLabelCarb: 'Dose para Hidratos de Carbono',
        resultLabelTotal: 'DOSE TOTAL DE INSULINA',
        infoText: '<strong>FSI:</strong> Quanto 1 unidade de insulina diminui sua glicemia (mg/dL)<br><strong>Razão I:C:</strong> Quantos gramas de carboidrato 1 unidade de insulina cobre',
        themeDark: '🌙 Modo Escuro',
        themeLight: '☀️ Modo Claro',
        languageButton: '🌐 English',
        periodNames: { morning: 'Manhã', afternoon: 'Tarde', evening: 'Noite', night: 'Madrugada' },
        alertRequiredFields: 'Por favor, preencha todos os campos obrigatórios (FSI do período selecionado, Razão I:C, Meta e Glicemia Atual)!',
        alertPositiveValues: 'Os valores devem ser maiores que zero!',
        confirmClear: 'Tem certeza que deseja limpar todas as configurações salvas?',
        alertCleared: 'Configurações limpas com sucesso!',
        alertImportError: 'Não foi possível importar o ficheiro. Verifique se é um ficheiro de configurações válido (.json) gerado por esta aplicação.',
        unitMgDl: ' mg/dL',
        unitU: ' U',
        htmlLang: 'pt-PT'
    },
    en: {
        title: '💉 Insulin Calculator',
        subtitle: 'Type 1 Diabetes',
        sectionPersonal: 'Personal Settings',
        labelPeriod: 'Time of Day',
        optionMorning: 'Morning (6am - 12pm)',
        optionAfternoon: 'Afternoon (12pm - 6pm)',
        optionEvening: 'Evening (6pm - 11pm)',
        optionNight: 'Night (11pm - 6am)',
        labelFsiMorning: 'ISF - Morning',
        labelFsiAfternoon: 'ISF - Afternoon',
        labelFsiEvening: 'ISF - Evening',
        labelFsiNight: 'ISF - Night',
        placeholderFsiMorning: 'E.g.: 50 or 47.5',
        placeholderFsiAfternoon: 'E.g.: 45 or 42.5',
        placeholderFsiEvening: 'E.g.: 40 or 37.5',
        placeholderFsiNight: 'E.g.: 55 or 52.5',
        labelCarbRatio: 'Insulin/Carb Ratio (1:X)',
        placeholderCarbRatio: 'E.g.: 15 or 12.5',
        labelGlucoseTarget: 'Blood Glucose Target (mg/dL)',
        placeholderGlucoseTarget: 'E.g.: 100',
        sectionCurrent: 'Current Data',
        labelCurrentGlucose: 'Current Blood Glucose (mg/dL)',
        placeholderCurrentGlucose: 'E.g.: 180',
        labelCarbs: 'Carbohydrates to Consume (grams)',
        placeholderCarbs: 'E.g.: 60',
        btnCalculate: 'Calculate Insulin Dose',
        btnSave: '💾 Save Settings',
        btnClear: '🗑️ Clear Data',
        btnExport: '⬇️ Export',
        btnImport: '⬆️ Import',
        savedMessage: '✓ Settings saved successfully!',
        importedMessage: '✓ Settings imported successfully!',
        resultTitle: '📊 Calculation Result',
        resultLabelFsi: 'ISF Used',
        resultLabelCorrection: 'Correction Dose',
        resultLabelCarb: 'Carbohydrate Dose',
        resultLabelTotal: 'TOTAL INSULIN DOSE',
        infoText: '<strong>ISF:</strong> How much 1 unit of insulin lowers your blood glucose (mg/dL)<br><strong>Carb Ratio:</strong> How many grams of carbohydrate 1 unit of insulin covers',
        themeDark: '🌙 Dark Mode',
        themeLight: '☀️ Light Mode',
        languageButton: '🌐 Português',
        periodNames: { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening', night: 'Night' },
        alertRequiredFields: 'Please fill in all required fields (ISF for the selected period, Carb Ratio, Target and Current Glucose)!',
        alertPositiveValues: 'Values must be greater than zero!',
        confirmClear: 'Are you sure you want to clear all saved settings?',
        alertCleared: 'Settings cleared successfully!',
        alertImportError: 'Could not import the file. Please check that it is a valid settings (.json) file generated by this app.',
        unitMgDl: ' mg/dL',
        unitU: ' U',
        htmlLang: 'en-US'
    }
};

/* ========================================
   FUNCTION: text(key)
   ========================================
   Shorthand to look up a translated string for the
   currently active language.
   ======================================== */
function text(key) {
    return TRANSLATIONS[currentLanguage][key];
}

/* ========================================
   FUNCTION: updatePeriod()
   ========================================
   Updates the UI to highlight the selected time of day.
   Dims the other periods to bring focus to the active one.
   ======================================== */
function updatePeriod() {
    // Gets the selected period (morning, afternoon, evening, night)
    const period = document.getElementById('periodSelect').value;

    // Dims all ISF fields
    document.querySelectorAll('.input-group').forEach(group => {
        const input = group.querySelector('input[id^="fsi"]');
        if (input) {
            group.style.opacity = '0.5';
        }
    });

    // Highlights only the ISF field for the selected period
    // Converts 'morning' to 'Morning' to match the field ID
    const currentFsiField = document.getElementById('fsi' + period.charAt(0).toUpperCase() + period.slice(1));
    if (currentFsiField) {
        currentFsiField.parentElement.style.opacity = '1';
    }
}

/* ========================================
   FUNCTION: collectSettings()
   ========================================
   Collects the current values of all setting fields and
   returns them as a plain object. Used both to save to
   localStorage and to export to a file.
   ======================================== */
function collectSettings() {
    return {
        periodSelect: document.getElementById('periodSelect').value,
        fsiMorning: document.getElementById('fsiMorning').value,
        fsiAfternoon: document.getElementById('fsiAfternoon').value,
        fsiEvening: document.getElementById('fsiEvening').value,
        fsiNight: document.getElementById('fsiNight').value,
        carbRatio: document.getElementById('carbRatio').value,
        glucoseTarget: document.getElementById('glucoseTarget').value
    };
}

/* ========================================
   FUNCTION: applySettings(settings)
   ========================================
   Fills the form fields from a settings object (coming
   from localStorage or an imported file).
   ======================================== */
function applySettings(settings) {
    for (const [field, value] of Object.entries(settings)) {
        const element = document.getElementById(field);
        if (element && value !== undefined && value !== null && value !== '') {
            element.value = value;
        }
    }
}

/* ========================================
   FUNCTION: saveSettings()
   ========================================
   Saves all user settings to localStorage.
   Shows a confirmation message for 3 seconds.
   ======================================== */
function saveSettings() {
    // Collects all values from the setting fields
    const settings = collectSettings();

    // Stores everything as a single JSON record in localStorage
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));

    // Shows the confirmation message
    showMessage(text('savedMessage'));
}

/* ========================================
   FUNCTION: loadSettings()
   ========================================
   Loads the settings saved in localStorage.
   Runs automatically when the page loads.
   ======================================== */
function loadSettings() {
    const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!data) return;

    try {
        const settings = JSON.parse(data);
        applySettings(settings);
    } catch (error) {
        // If the saved data is corrupted, ignore it
        console.error('Could not load saved settings:', error);
    }
}

/* ========================================
   FUNCTION: clearSettings()
   ========================================
   Removes all saved settings.
   Asks for confirmation before proceeding.
   Clears localStorage and resets fields to their defaults.
   ======================================== */
function clearSettings() {
    // Asks the user for confirmation
    if (confirm(text('confirmClear'))) {
        // Removes the record stored in localStorage
        localStorage.removeItem(STORAGE_KEY_SETTINGS);

        // Resets all fields to their default values
        document.getElementById('periodSelect').value = 'morning';
        document.getElementById('fsiMorning').value = '';
        document.getElementById('fsiAfternoon').value = '';
        document.getElementById('fsiEvening').value = '';
        document.getElementById('fsiNight').value = '';
        document.getElementById('carbRatio').value = '';
        document.getElementById('glucoseTarget').value = '100';

        // Updates the UI
        updatePeriod();

        // Confirms to the user
        alert(text('alertCleared'));
    }
}

/* ========================================
   FUNCTION: exportSettings()
   ========================================
   Generates a .json file with the current settings and
   triggers a download in the user's browser.
   Useful as a backup or to move settings between devices.
   ======================================== */
function exportSettings() {
    const settings = collectSettings();

    // Adds useful metadata to the exported file
    const exportData = {
        app: 'Insulin Calculator',
        version: 1,
        exportedAt: new Date().toISOString(),
        settings: settings
    };

    const content = JSON.stringify(exportData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Creates a temporary link to trigger the download
    const link = document.createElement('a');
    const today = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `insulin-settings-${today}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Releases the temporary URL created for the blob
    URL.revokeObjectURL(url);
}

/* ========================================
   FUNCTION: importSettings(event)
   ========================================
   Reads a .json file chosen by the user (via an
   input type="file") and applies the settings in it.
   Accepts both the format exported by this app and a
   plain settings object.
   ======================================== */
function importSettings(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            // Supports both the full exported format (with metadata)
            // and a plain object containing only the settings
            const settings = data.settings ? data.settings : data;

            applySettings(settings);
            updatePeriod();

            // Automatically saves the imported settings
            localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));

            showMessage(text('importedMessage'));
        } catch (error) {
            alert(text('alertImportError'));
            console.error('Error importing settings:', error);
        } finally {
            // Clears the file input value to allow re-importing the same file
            event.target.value = '';
        }
    };

    reader.readAsText(file);
}

/* ========================================
   FUNCTION: showMessage(message)
   ========================================
   Shows the given text in the confirmation banner for
   3 seconds.
   ======================================== */
function showMessage(message) {
    const messageBox = document.getElementById('savedMessage');
    const span = messageBox.querySelector('span');
    if (span) {
        span.textContent = message;
    }
    messageBox.classList.add('show');

    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
}

/* ========================================
   FUNCTION: toggleTheme()
   ========================================
   Switches between light and dark mode, and saves the
   user's preference in localStorage.
   ======================================== */
function toggleTheme() {
    const darkModeActive = document.body.classList.toggle('dark-mode');
    localStorage.setItem(STORAGE_KEY_THEME, darkModeActive ? 'dark' : 'light');
    updateThemeButtonLabel(darkModeActive);
}

/* ========================================
   FUNCTION: applySavedTheme()
   ========================================
   Applies the saved theme (light/dark) as soon as the page
   loads, also respecting the operating system's preference
   if the user has never chosen one before.
   ======================================== */
function applySavedTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    let useDarkMode;

    if (savedTheme) {
        useDarkMode = savedTheme === 'dark';
    } else {
        // No saved preference: follow the system preference
        useDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    document.body.classList.toggle('dark-mode', useDarkMode);
    updateThemeButtonLabel(useDarkMode);
}

/* ========================================
   FUNCTION: updateThemeButtonLabel(darkModeActive)
   ========================================
   Updates the label of the theme toggle button.
   ======================================== */
function updateThemeButtonLabel(darkModeActive) {
    const button = document.getElementById('themeButton');
    if (button) {
        button.textContent = darkModeActive ? text('themeLight') : text('themeDark');
    }
}

/* ========================================
   FUNCTION: toggleLanguage()
   ========================================
   Switches the UI language between Portuguese and English,
   and saves the preference in localStorage.
   ======================================== */
function toggleLanguage() {
    const newLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    applyLanguage(newLanguage);
    localStorage.setItem(STORAGE_KEY_LANGUAGE, newLanguage);
}

/* ========================================
   FUNCTION: applySavedLanguage()
   ========================================
   Applies the saved language preference as soon as the page
   loads. Falls back to the browser's language, defaulting to
   Portuguese if it isn't English.
   ======================================== */
function applySavedLanguage() {
    const savedLanguage = localStorage.getItem(STORAGE_KEY_LANGUAGE);
    let language;

    if (savedLanguage) {
        language = savedLanguage;
    } else {
        const browserLanguage = navigator.language || navigator.userLanguage || '';
        language = browserLanguage.toLowerCase().startsWith('en') ? 'en' : 'pt';
    }

    applyLanguage(language);
}

/* ========================================
   FUNCTION: applyLanguage(language)
   ========================================
   Applies the given language ('pt' or 'en') to every
   translatable element in the page, using the data-i18n
   and data-i18n-placeholder attributes.
   ======================================== */
function applyLanguage(language) {
    currentLanguage = TRANSLATIONS[language] ? language : 'pt';
    const dictionary = TRANSLATIONS[currentLanguage];

    // Translates elements with a data-i18n attribute (text content)
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (dictionary[key] !== undefined) {
            element.textContent = dictionary[key];
        }
    });

    // Translates elements with a data-i18n-html attribute (HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        if (dictionary[key] !== undefined) {
            element.innerHTML = dictionary[key];
        }
    });

    // Translates placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (dictionary[key] !== undefined) {
            element.setAttribute('placeholder', dictionary[key]);
        }
    });

    // Updates the language toggle button label
    const languageButton = document.getElementById('languageButton');
    if (languageButton) {
        languageButton.textContent = dictionary.languageButton;
    }

    // Updates the theme button label, keeping it in sync with dark mode state
    updateThemeButtonLabel(document.body.classList.contains('dark-mode'));

    // Updates the document's lang attribute for accessibility/SEO
    document.documentElement.setAttribute('lang', dictionary.htmlLang);

    // Refreshes any already-visible calculation results in the new language
    refreshResultLabelsIfVisible();
}

/* ========================================
   FUNCTION: refreshResultLabelsIfVisible()
   ========================================
   If a calculation result is currently being shown, re-runs
   the period name translation so it matches the new language
   without requiring the user to recalculate.
   ======================================== */
function refreshResultLabelsIfVisible() {
    const resultSection = document.getElementById('resultSection');
    const periodUsedElement = document.getElementById('periodUsed');
    if (!resultSection || !periodUsedElement || !resultSection.classList.contains('show')) {
        return;
    }

    const period = document.getElementById('periodSelect').value;
    const periodNames = text('periodNames');
    if (periodNames[period]) {
        periodUsedElement.textContent = periodNames[period];
    }
}

/* ========================================
   FUNCTION: calculateInsulin()
   ========================================
   MAIN FUNCTION - Calculates the required insulin dose.

   Formulas used:
   1. Correction Dose = (Current Glucose - Target) / ISF
   2. Carbohydrate Dose = Grams of Carbs / Carb Ratio
   3. Total Dose = Correction Dose + Carbohydrate Dose

   Validates all data before calculating.
   ======================================== */
function calculateInsulin() {
    // ===== DATA COLLECTION =====

    // Gets the selected time of day
    const period = document.getElementById('periodSelect').value;

    // Builds the ID of the ISF field matching the period
    // E.g. 'morning' -> 'fsiMorning'
    const fsiId = 'fsi' + period.charAt(0).toUpperCase() + period.slice(1);
    const fsi = parseFloat(document.getElementById(fsiId).value);

    // Gets the other required values (decimals allowed)
    const carbRatio = parseFloat(document.getElementById('carbRatio').value);
    const target = parseFloat(document.getElementById('glucoseTarget').value);
    const currentGlucose = parseFloat(document.getElementById('currentGlucose').value);
    const carbs = parseFloat(document.getElementById('carbs').value);

    // ===== DATA VALIDATION =====

    // Checks that the required fields are filled in
    if (!fsi || !carbRatio || !target || !currentGlucose) {
        alert(text('alertRequiredFields'));
        return;
    }

    // Checks that the values are positive
    if (fsi <= 0 || carbRatio <= 0 || target <= 0 || currentGlucose <= 0) {
        alert(text('alertPositiveValues'));
        return;
    }

    // ===== CALCULATIONS =====

    // Calculates how far the current glucose is from the target
    const glucoseDifference = currentGlucose - target;

    // Calculates the correction dose
    // If negative (glucose below target), the dose is 0
    let correctionDose = glucoseDifference / fsi;
    if (correctionDose < 0) {
        correctionDose = 0;
    }

    // Calculates the dose for carbohydrates
    // If no carbs were entered, the dose is 0
    let carbDose = 0;
    if (carbs && carbs > 0) {
        carbDose = carbs / carbRatio;
    }

    // Calculates the total dose (sum of both doses)
    const totalDose = correctionDose + carbDose;

    // ===== DISPLAYING RESULTS =====

    // Updates the HTML elements with the results
    const periodNames = text('periodNames');
    document.getElementById('periodUsed').textContent = periodNames[period];
    document.getElementById('fsiUsed').textContent = fsi.toFixed(1) + text('unitMgDl');
    document.getElementById('correctionDose').textContent = correctionDose.toFixed(1) + text('unitU');
    document.getElementById('carbDose').textContent = carbDose.toFixed(1) + text('unitU');
    document.getElementById('totalDose').textContent = totalDose.toFixed(1) + text('unitU');

    // Shows the results area with an animation
    document.getElementById('resultSection').classList.add('show');

    // Smoothly scrolls down to the results
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ========================================
   EVENT LISTENERS
   ======================================== */

// Adds "press Enter to calculate" behavior to all input fields
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateInsulin();
        }
    });
});

// Wires up the theme toggle button
const themeButton = document.getElementById('themeButton');
if (themeButton) {
    themeButton.addEventListener('click', toggleTheme);
}

// Wires up the language toggle button
const languageButton = document.getElementById('languageButton');
if (languageButton) {
    languageButton.addEventListener('click', toggleLanguage);
}

// Wires up the export button
const exportButton = document.getElementById('exportButton');
if (exportButton) {
    exportButton.addEventListener('click', exportSettings);
}

// Wires up the import file input
const importInput = document.getElementById('importInput');
if (importInput) {
    importInput.addEventListener('change', importSettings);
}

/* ========================================
   INITIALIZATION
   ========================================
   Runs when the page loads
   ======================================== */

// Applies the saved language (or browser default) first, so
// all static text is in the right language from the start
applySavedLanguage();

// Applies the saved theme (light/dark) to avoid a "flash" of
// the wrong theme
applySavedTheme();

// Loads the saved settings (if any)
loadSettings();

// Updates the UI to highlight the initial period
updatePeriod();
