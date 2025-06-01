// wwwroot/js/language-selector.js

window.languageSelector = (function () {
    // Holds the .NET object reference passed from Blazor
    let dotnetRef = null;

    // Tracks whether Google Translate has been initialized
    let initialized = false;

    return {
        /**
         * Called from Blazor’s OnAfterRenderAsync (firstRender).
         * Stores the DotNetObjectReference so we can invoke
         * .NET methods (like HandleTranslationComplete) later.
         */
        init: function (dotnetObjRef) {
            dotnetRef = dotnetObjRef;

            // Ensure there is a container for the Google Translate widget.
            // We keep it hidden since we don’t want the default banner UI.
            if (!document.getElementById('google_translate_element')) {
                const container = document.createElement('div');
                container.id = 'google_translate_element';
                container.style.display = 'none';
                document.body.appendChild(container);
            }
        },

        /**
         * Dynamically loads the Google Translate script and instantiates
         * a TranslateElement tied to our hidden container.
         *
         * Returns a Promise<boolean> indicating success.
         */
        initGoogleTranslate: function () {
            return new Promise((resolve, reject) => {
                if (initialized) {
                    // Already initialized
                    resolve(true);
                    return;
                }

                // Define the global callback that the Google script will call
                window.googleTranslateElementInit = function () {
                    try {
                        /* eslint-disable no-undef */
                        new google.translate.TranslateElement(
                            {
                                pageLanguage: 'pt',    // adjust if your default page language is different
                                autoDisplay: false     // prevents Google from showing the floating banner
                            },
                            'google_translate_element'
                        );
                        /* eslint-enable no-undef */
                        initialized = true;
                        resolve(true);
                    } catch (err) {
                        console.error('Error creating TranslateElement:', err);
                        reject(false);
                    }
                };

                // Insert the Google Translate <script> tag into the page
                const script = document.createElement('script');
                script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                script.async = true;
                script.onerror = function () {
                    console.error('Failed to load Google Translate script.');
                    reject(false);
                };
                document.body.appendChild(script);
            });
        },

        /**
         * Switches the translation language by manipulating the hidden
         * <select class="goog-te-combo"> that Google injects.
         *
         * @param {string} langCode – the BCP-47 code (e.g., "en", "es", "fr", etc.)
         * @returns {boolean} – false if not initialized or <select> not found, true otherwise
         */
        changeLanguage: function (langCode) {
            if (!initialized) {
                console.warn('Google Translate has not been initialized yet.');
                return false;
            }

            const select = document.querySelector('select.goog-te-combo');
            if (!select) {
                console.warn('Could not find the Google Translate <select> element.');
                return false;
            }

            select.value = langCode;
            // Trigger the “change” event so Google Translate picks up the new value
            select.dispatchEvent(new Event('change'));

            // Give Google Translate a moment to apply the language, then inform Blazor
            setTimeout(() => {
                if (dotnetRef) {
                    dotnetRef.invokeMethodAsync('HandleTranslationComplete', langCode)
                        .catch(err => console.error('Error invoking .NET method:', err));
                }
            }, 500);

            return true;
        },

        /**
         * Simple diagnostic helper: logs a warning. You could expand this
         * to inspect network errors or look at the Google script tag state.
         */
        diagnose: function () {
            console.warn('languageSelector.diagnose: Google Translate not initialized correctly.');
        },

        /**
         * Cleans up the Google Translate container and flags so that
         * if the Blazor component is disposed, the widget is removed.
         */
        dispose: function () {
            const el = document.getElementById('google_translate_element');
            if (el) {
                el.innerHTML = '';
                el.remove();
            }
            initialized = false;
            dotnetRef = null;
        }
    };
})();
