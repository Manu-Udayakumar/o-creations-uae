/* =========================================================================
   i18n — Language Switching Engine
   ========================================================================= */
(function () {
    'use strict';

    const DEFAULT_LANG = 'ar';
    const STORAGE_KEY = 'ocreation_lang';

    /* ── Get saved language or default ── */
    function getSavedLang() {
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    }

    /* ── Apply translations to the page ── */
    function applyLanguage(lang) {
        const html = document.documentElement;

        /* Set direction and lang attribute */
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        /* Update page title */
        if (translations.page_title) {
            document.title = translations.page_title[lang] || document.title;
        }

        /* Translate all elements with data-i18n (innerHTML) */
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                el.innerHTML = translations[key][lang];
            }
        });

        /* Translate all elements with data-i18n-text (textContent only) */
        document.querySelectorAll('[data-i18n-text]').forEach(el => {
            const key = el.getAttribute('data-i18n-text');
            if (translations[key] && translations[key][lang]) {
                el.textContent = translations[key][lang];
            }
        });

        /* Translate placeholders */
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (translations[key] && translations[key][lang]) {
                el.setAttribute('placeholder', translations[key][lang]);
            }
        });

        /* Translate aria-labels */
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (translations[key] && translations[key][lang]) {
                el.setAttribute('aria-label', translations[key][lang]);
            }
        });

        /* Translate select options */
        document.querySelectorAll('option[data-i18n]').forEach(opt => {
            const key = opt.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                opt.textContent = translations[key][lang];
                opt.value = translations[key]['en']; // keep value in English for WhatsApp
            }
        });

        /* Update toggle button text */
        const toggleBtn = document.getElementById('lang-toggle-btn');
        if (toggleBtn && translations.lang_toggle) {
            toggleBtn.querySelector('.lang-toggle-text').textContent = translations.lang_toggle[lang];
        }

        /* Add body class for CSS hooks */
        document.body.classList.toggle('lang-ar', lang === 'ar');
        document.body.classList.toggle('lang-en', lang === 'en');

        /* Save preference */
        localStorage.setItem(STORAGE_KEY, lang);
    }

    /* ── Toggle between languages ── */
    function toggleLanguage() {
        const current = getSavedLang();
        const next = current === 'ar' ? 'en' : 'ar';
        applyLanguage(next);
    }

    /* ── Initialize on DOM ready ── */
    function init() {
        const lang = getSavedLang();
        applyLanguage(lang);

        /* Bind toggle button */
        const toggleBtn = document.getElementById('lang-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleLanguage);
        }
    }

    /* Run when DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* Expose for external use */
    window.i18n = { applyLanguage, toggleLanguage, getSavedLang };
})();
