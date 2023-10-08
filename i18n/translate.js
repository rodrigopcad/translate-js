document.addEventListener('DOMContentLoaded', async () => {
    const language = localStorage.getItem('language') || 'pt-br';
    await Translate.setTranslation(language);
});


const Translate = {
    async setTranslation(language) {
        localStorage.setItem('language', language);

        const translation = await fetch(`/i18n/${language}.json`)
            .then(res => res.json());

        Array.from(document.querySelectorAll('[translate-key]'))
            .map(item => {
                item.textContent = translation[item.getAttribute('translate-key')];
            });
    },

    setSelectedOption() {
        const activeLanguage = localStorage.getItem('language');

        document.querySelector('#language-selector')
            .querySelectorAll('option')
            .forEach(option => {
                if (option.value === activeLanguage) {
                    option.setAttribute('selected', '');
                }
            });
    }
}
