window.contact_js = {
    'contactForm': document.querySelector('#contactForm'),
    'submitContactForm' : (e) => {
        console.log('it did a submit...');
        e.preventDefault();
        document.body.setAttribute('data-contactform', 'working');
        theme_js.postData('/api/contact', 'post', Object.fromEntries(new FormData(document.getElementById('contactForm'))))
            .then(data => {
                document.body.setAttribute('data-contactform','success');
                window.scrollTo(0,0);
                console.log('!!! --> contact_js.submitContactForm response: ', data);
            })
            .catch((error) => {
                document.body.setAttribute('data-contactform','error');
                window.scrollTo(0,0);
                console.error('!!! --> contact_js.submitContactForm error:', error);
            });
    },

    'listenFormSubmission' : () => {
        let contactFormButton = document.querySelector('#contactForm button');
        contactFormButton.addEventListener('click', contact_js.submitContactForm, null);
        console.log('it is listening for a submit...');
    },


}

document.addEventListener('DOMContentLoaded', function() {
    if(contact_js.contactForm){
        console.log('the form exists...');
        contact_js.listenFormSubmission();
    }
});
