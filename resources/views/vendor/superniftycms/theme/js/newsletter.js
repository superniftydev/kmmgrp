
window.newsletter_js = {

    'newsletterSignupForm': document.getElementById('newsletterSignupForm'),
    'dismissNewsletterSignupFormXs': document.querySelectorAll("#newsletterSignupForm .x"),

    'displayNewsletterSignupForm' : () => {
        setTimeout(() => {
            document.body.setAttribute('data-newslettersignupform', 'display');
        }, parseInt(document.getElementById('newsletterSignupForm').dataset.displaydelay));
    },

    'dismissNewsletterSignupForm' : () => {
        document.body.setAttribute('data-newslettersignupform', 'hide');

        theme_js.postData('/api/newsletter', 'post', { 'newsletter_signup_actioned': 'dismissed' })
            .then(data => {
                console.log('!!! --> newsletter_js.dismissNewsletterSignupForm data:', data);
            })
            .catch((error) => {
                console.error('!!! --> newsletter_js.dismissNewsletterSignupForm error:', error);
            });
    },

    'listenDismissNewsletterSignupForm' : (e) => {
        for (let x = 0; x < newsletter_js.dismissNewsletterSignupFormXs.length; x++) {
            newsletter_js.dismissNewsletterSignupFormXs[x].removeEventListener('click', newsletter_js.dismissNewsletterSignupForm);
            newsletter_js.dismissNewsletterSignupFormXs[x].addEventListener('click', newsletter_js.dismissNewsletterSignupForm);
        }
    },

    'validateEmail': (e) => {
        /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm.test(e.target.value) ?
            document.body.setAttribute('data-newslettersignupform', 'valid') :
            document.body.setAttribute('data-newslettersignupform', 'display');
    },

    'listenValidateEmail': () => {
        newsletter_js.newsletterSignupForm.querySelector("input[type='email']").addEventListener('keyup', newsletter_js.validateEmail);
    },

    'submitNewsletterSignupForm' : (e) => {
        e.preventDefault();
        document.body.setAttribute('data-newslettersignupform', 'working');
        theme_js.postData('/api/newsletter', 'post', Object.fromEntries(new FormData(e.target)))
            .then(data => {
                document.body.setAttribute('data-newslettersignupform', 'success');
            })
            .catch((error) => {
                document.body.setAttribute('data-newslettersignupform', 'error');
                console.error('!!! --> newsletter_js.submitNewsletterSignupForm error:', error);
            });
    },

    'listenNewsletterSignupFormSubmission' : (e) => {
        newsletter_js.newsletterSignupForm.addEventListener('submit', newsletter_js.submitNewsletterSignupForm, null);
    },

     'init': () => {
        newsletter_js.listenValidateEmail();
        newsletter_js.displayNewsletterSignupForm();
        newsletter_js.listenDismissNewsletterSignupForm();
        newsletter_js.listenNewsletterSignupFormSubmission();
    }

}

document.addEventListener('DOMContentLoaded', function() {
    if(newsletter_js.newsletterSignupForm){
        newsletter_js.init();
    }
});
