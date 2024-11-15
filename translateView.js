import { store, getContext, getElement, getConfig } from '@wordpress/interactivity';

const {
    hooks: {
        applyFilters
    }
} = wp;

const {
    fn: {
        validateConfig,
        loadJs,
        execute
    },
    Selector,
    Events
} = wecodeart;

const NAME = 'translate';
const NAMESPACE = `wecodeart/${NAME}`;
// Define specific mappings for languages to flags
const FLAGS_MAP = {
    af: 'za',       // South Africa
    sq: 'al',       // Albania
    am: 'et',       // Ethiopia
    ar: 'sa',       // Saudi Arabia (for Arabic-speaking countries)
    hy: 'am',       // Armenia 
    eu: 'es',       // Basque (Spain)
    be: 'by',       // Belarus
    bn: 'bd',       // Bangladesh
    bs: 'ba',       // Bosnia and Herzegovina 
    ca: 'es',       // Catalan (Spain)
    ceb: 'ph',      // Philippines
    ny: 'mw',       // Malawi
    'zh-CN': 'cn',  // China (Simplified Chinese)
    'zh-TW': 'tw',  // Taiwan (Traditional Chinese)
    co: 'fr',       // Corsica (France) 
    cs: 'cz',       // Czech Republic
    da: 'dk',       // Denmark 
    en: 'gb',       // English-speaking countries, default to GB
    eo: 'eo',       // Esperanto (use a universal flag or custom icon)
    et: 'ee',       // Estonia
    tl: 'ph',       // Philippines  
    fy: 'nl',       // Frisian (Netherlands)
    gl: 'es',       // Galician (Spain)
    ka: 'ge',       // Georgia 
    el: 'gr',       // Greece
    gu: 'in',       // Gujarati (India) 
    ha: 'ng',       // Nigeria
    haw: 'us',      // Hawaii (United States)
    iw: 'il',       // Israel (Hebrew)
    hi: 'in',       // Hindi (India)
    hmn: 'la',      // Laos (unofficial)  
    ig: 'ng',       // Nigeria 
    ga: 'ie',       // Ireland 
    ja: 'jp',       // Japan
    jw: 'id',       // Javanese (Indonesia)
    kn: 'in',       // Kannada (India)
    kk: 'kz',       // Kazakhstan
    km: 'kh',       // Cambodia
    ko: 'kr',       // South Korea
    ku: 'tr',       // Kurdish (Turkey)
    ky: 'kg',       // Kyrgyzstan
    lo: 'la',       // Laos
    la: 'va',       // Latin (Vatican City as reference)  
    lb: 'lu',       // Luxembourg  
    ms: 'my',       // Malaysia
    ml: 'in',       // Malayalam (India) 
    mi: 'nz',       // Maori (New Zealand)
    mr: 'in',       // Marathi (India) 
    my: 'mm',       // Myanmar (Burmese)
    ne: 'np',       // Nepal 
    ps: 'af',       // Afghanistan (Pashto)
    fa: 'ir',       // Iran (Persian)  
    pa: 'in',       // Punjabi (India)  
    sm: 'ws',       // Samoa
    gd: 'gb',       // Scotland (part of the United Kingdom)
    sr: 'rs',       // Serbia
    st: 'za',       // Sesotho (South Africa)
    sn: 'zw',       // Shona (Zimbabwe)
    sd: 'pk',       // Sindhi (Pakistan)
    si: 'lk',       // Sinhala (Sri Lanka) 
    sl: 'si',       // Slovenia  
    su: 'id',       // Sundanese (Indonesia)
    sw: 'ke',       // Swahili (Kenya)
    sv: 'se',       // Sweden
    tg: 'tj',       // Tajikistan
    ta: 'in',       // Tamil (India)
    te: 'in',       // Telugu (India)  
    uk: 'ua',       // Ukraine
    ur: 'pk',       // Pakistan 
    vi: 'vn',       // Vietnam
    cy: 'gb',       // Welsh (United Kingdom)
    xh: 'za',       // Xhosa (South Africa)
    yi: 'il',       // Yiddish (Israel)
    yo: 'ng',       // Yoruba (Nigeria)
    zu: 'za'        // Zulu (South Africa)
};

const { state, callbacks } = store(NAMESPACE, {
    state: {
        widget: undefined,
        translateTo: undefined,
        get languageFlag() {
            const { pageLanguage, translateTo, flagsUrl } = state;
            const currentLanguage = translateTo ?? pageLanguage;

            // Determine the flag based on the language mapping or default to the language code
            const flag = FLAGS_MAP[currentLanguage] ?? currentLanguage;

            return `${flagsUrl.replace(/\/$/, '')}/${flag}.svg`;
        },
        get currentLanguage() {
            const keyValue = document.cookie.match("(^|;) ?googtrans=([^;]*)(;|$)");

            return keyValue ? keyValue[2].split('/')[2] : null;
        }
    },
    actions: {
        updateLanguage: () => {
            const { ref: { value } } = getElement();
            state.translateTo = value;
        },
    },
    callbacks: {
        onInit: () => {
            const { ref } = getElement();

            const { currentLanguage, translateTo, pageLanguage, languageFlag } = state;

            const selectEl = Selector.findOne('select.form-select', ref);

            if (getContext()?.flag) {
                selectEl.style.setProperty('--wp--input--icon-select', `url('${languageFlag}')`);
            }

            selectEl.value = currentLanguage || pageLanguage;

            // If has preferred and page language is not the same as page/preferred
            if (currentLanguage && [pageLanguage, translateTo].includes(currentLanguage) !== true) {
                callbacks.loadApi(() => state.translateTo = currentLanguage);
            }
        },
        changeLanguage: () => {
            const { ref } = getElement();
            const { languageFlag, widget } = state;

            if (getContext()?.flag) {
                Selector.findOne('select.form-select', ref).style.setProperty('--wp--input--icon-select', `url('${languageFlag}')`);
            }

            const select = Selector.findOne('.goog-te-combo', widget);

            if (select) {
                select.value = state.translateTo;
                Events.trigger(select, 'change');
            }
        },
        loadApi: (cb) => {
            if (state.widget) {
                return;
            }

            const { ref } = getElement();

            const { pageLanguage, includedLanguages } = callbacks.getConfig();

            window.wecodeartTranslate = () => {
                const selector = `${ref.getAttribute('id')}-el`;
                new google.translate.TranslateElement({
                    includedLanguages: [...new Set([pageLanguage, ...includedLanguages])].join(','),
                    // pageLanguage,
                    autoDisplay: false
                }, selector);

                state.widget = Selector.findOne(`#${selector}`, ref);
            };

            loadJs('//translate.google.com/translate_a/element.js?cb=wecodeartTranslate', execute(cb));
        },
        getConfig: () => {
            const context = getContext();
            const config = { ...state, ...context };

            return applyFilters('wecodeart.interactive.config', config, NAME);
        },
        validateConfig: () => validateConfig(NAME, callbacks.getConfig(), getConfig(NAMESPACE)),
    }
});