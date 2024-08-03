

window.modelviewer_js = {

    'models': document.querySelectorAll('model-viewer'),
    'activeModel': document.querySelector('model-viewer.active'),
    'material': null,
    'modelViewerControls': document.querySelectorAll('#modelViewerControls input'),
    'colorInput': document.querySelector('#colorInput'),
    'exposureInput': document.querySelector('#exposureInput'),
    'scaleInput': document.querySelector('#scaleInput'),
    'rollInput': document.querySelector('#rollInput'),
    'pitchInput': document.querySelector('#pitchInput'),
    'yawInput': document.querySelector('#yawInput'),
    'metalInput': document.querySelector('#metalInput'),
    'roughInput': document.querySelector('#roughInput'),
    'reset': document.querySelector('#resetButton'),
    'posterURL': null,
    'downloadPosterButton': document.querySelector('#downloadPosterButton'),

    'setColor': () => {
        let colorString = modelviewer_js.colorInput.value;
        const [material] = modelviewer_js.activeModel.model.materials;
        material.pbrMetallicRoughness.setBaseColorFactor(colorString);
    },
    'listenChangeColor': () => { modelviewer_js.colorInput.addEventListener('input', modelviewer_js.setColor, null); },

    'setScale': () => { let x = (Math.floor((modelviewer_js.scaleInput.value) * 100) / 100).toFixed(2); modelviewer_js.activeModel.scale = `${x} ${x} ${x}`; },
    'listenChangeScale': () => { modelviewer_js.scaleInput.addEventListener('input', modelviewer_js.setScale, null); },

    'setRoll': (e) => {
        let current = document.querySelector("[camera-orbit]").getAttribute('camera-orbit').split(' ');
        let new_value = (Math.floor((e.target.value) * 100) / 100).toFixed(2) + 'rad ' + current[1] + ' ' + current[2];
        modelviewer_js.activeModel.setAttribute('camera-orbit', new_value);
    },
    'listenChangeRoll': () => { modelviewer_js.rollInput.addEventListener('input', modelviewer_js.setRoll, null); },

    'setPitch': (e) => {
        let current = document.querySelector("[camera-orbit]").getAttribute('camera-orbit').split(' ');
        let new_value = current[0] + ' ' + (Math.floor((e.target.value) * 100) / 100).toFixed(2) + 'rad ' + current[2];
        modelviewer_js.activeModel.setAttribute('camera-orbit', new_value);
    },
    'listenChangePitch': () => { modelviewer_js.pitchInput.addEventListener('input', modelviewer_js.setPitch, null); },

    'setYaw': (e) => {
        let current = document.querySelector("[camera-orbit]").getAttribute('camera-orbit').split(' ');
        let new_value = current[0] + ' ' + current[1] + ' ' + (Math.floor((e.target.value) * 100) / 100).toFixed(2) + 'm';
        modelviewer_js.activeModel.setAttribute('camera-orbit', new_value);
    },
    'listenChangeYaw': () => { modelviewer_js.yawInput.addEventListener('input', modelviewer_js.setYaw, null); },

    'setMetal': () => { modelviewer_js.activeModel.model.materials[0].pbrMetallicRoughness.setMetallicFactor(modelviewer_js.metalInput.value); },
    'listenChangeMetal': () => { modelviewer_js.metalInput.addEventListener('input', modelviewer_js.setMetal, null); },

    'setRough': () => { modelviewer_js.activeModel.model.materials[0].pbrMetallicRoughness.setRoughnessFactor(modelviewer_js.roughInput.value);},
    'listenChangeRough': () => { modelviewer_js.roughInput.addEventListener('input', modelviewer_js.setRough, null); },

    'copyModelSettingsToClipboard': () => {
        let ro = modelviewer_js.activeModel.getAttribute('camera-orbit');
        let op = ro.split(' ');
        let orbit = parseFloat(op[0]).toFixed(2) + 'rad ' + parseFloat(op[1]).toFixed(2) + 'rad ' + parseFloat(op[2]).toFixed(2) + 'm';
        let settings = modelviewer_js.colorInput.value + '|' +
            (Math.floor((modelviewer_js.exposureInput.value) * 100) / 100).toFixed(2) + '|' +
            (Math.floor((modelviewer_js.scaleInput.value) * 100) / 100).toFixed(2) + '|' +
                orbit + '|' +
            modelviewer_js.metalInput.value + '|' +
            modelviewer_js.roughInput.value;
        console.log('settings: ', settings);
        try {
            navigator.clipboard.writeText(settings);
        } catch (error) {
            console.log('document not focused...');
        }
        return settings;
    },

    'setActiveModel': (e) => {
        if(e === undefined){ return; }
        if(e.target === undefined){  modelviewer_js.activeModel = e; }
        else { modelviewer_js.activeModel = e.target; }

        document.body.dataset.active_model_id = modelviewer_js.activeModel.id;

        if(!modelviewer_js.activeModel.classList.contains('active')){
            for (let m = 0; m < modelviewer_js.models.length; m++) {
                modelviewer_js.models[m].classList.remove('active');
            }
            modelviewer_js.activeModel.classList.add('active');

            // update all the settings
            setTimeout(() => {

                let settings = modelviewer_js.activeModel.dataset.settings.split('|');

                modelviewer_js.colorInput.value = settings[0];
                // modelviewer_js.exposureInput.value = settings[1];
                modelviewer_js.scaleInput.value = settings[2];

                let parts = settings[3].split(' ');
                modelviewer_js.rollInput.value = parts[0];
                modelviewer_js.pitchInput.value = parts[1];
                modelviewer_js.yawInput.value = parts[2];

                modelviewer_js.metalInput.value = settings[4];
                modelviewer_js.roughInput.value = settings[5];

                }, 250);
        }

    },

    'downloadPoster': async () => {
        await new Promise(resolve => requestAnimationFrame(() => resolve()));
        const blob = await modelviewer_js.activeModel.toBlob({ mimeType: 'image/png', idealAspect: true });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = modelviewer_js.activeModel.dataset.title + '.png';
        a.click();
        setTimeout(function() {
            a.remove();
            URL.revokeObjectURL(modelviewer_js.downloadPosterButton);
        }, 0);
    },

    'loadModel': (target) => {

        console.log('target: ', target);
        console.log('target: ', target);

        let settings = target.dataset.settings.split('|');

        console.log('model loaded...');


        /* color */
        const [material] = target.model.materials;
        material.pbrMetallicRoughness.setBaseColorFactor(settings[0]);

        /* scale */
        target.scale = settings[2] + ' ' + settings[2] + ' ' + settings[2];

        setTimeout(() => {
            target.closest('.model').classList.add('loaded');
        }, 250);


        target.addEventListener('model-visibility', function(evt) {
            console.log(evt);
        })







        target.addEventListener("load", (e) => {

            if(modelviewer_js.colorInput && modelviewer_js.activeModel){
                    modelviewer_js.setColor();
                    modelviewer_js.setScale();
                    modelviewer_js.setMetal();
                    modelviewer_js.setRough();
            }

            // console.log('target 1: ', target);
            // console.log('target.dataset.settings', target.dataset.settings);
            let settings = target.dataset.settings.split('|');

            console.log('model loaded...');


            /* color */
            const [material] = target.model.materials;
            material.pbrMetallicRoughness.setBaseColorFactor(settings[0]);

            /* scale */
            target.scale = settings[2] + ' ' + settings[2] + ' ' + settings[2];

            setTimeout(() => {
                target.closest('.model').classList.add('loaded');
            }, 250);

        });

        // target.dismissPoster();
    },

    'modelInViewport': (el, partiallyVisible = false) => {
        const { top, left, bottom, right } = el.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;
        return partiallyVisible
            ? ((top > 0 && top < innerHeight) ||
                (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
            : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    },


    'init': (e) => {

        if(modelviewer_js.models){

            document.addEventListener("scroll", (event) => {
                document.body.removeAttribute('data-active_model_id');
            });

            console.log('there is at least one model...');

            for (let m = 0; m < modelviewer_js.models.length; m++) {

                /*

                // is the model in the viewport on page load?
                if(modelviewer_js.modelInViewport(modelviewer_js.models[m], true)){ // add ', true' for partial
                    // modelviewer_js.loadModel(modelviewer_js.models[m]);
                }

                // is the model in the viewport after the page has scrolled?
                document.addEventListener("scroll", (event) => {
                    console.log('scroll');
                    if(
                        modelviewer_js.modelInViewport(modelviewer_js.models[m], true) // && // ', true' for partial
                        // !modelviewer_js.models[m].closest('.model').classList.contains('loaded') // if it hasn't already loaded
                    ){
                        modelviewer_js.loadModel(modelviewer_js.models[m]);
                    }
                });

                */



                modelviewer_js.models[m].addEventListener('load', function(evt) {
                    console.log('---> ', evt);
                })


                modelviewer_js.loadModel(modelviewer_js.models[m]);
                modelviewer_js.models[m].addEventListener('click', modelviewer_js.setActiveModel, null);

            }
        }

        if(modelviewer_js.modelViewerControls.length > 0){
            modelviewer_js.listenChangeRoll();
            modelviewer_js.listenChangePitch();
            modelviewer_js.listenChangeYaw();
            modelviewer_js.listenChangeScale();
            modelviewer_js.listenChangeColor();
            modelviewer_js.listenChangeMetal();
            modelviewer_js.listenChangeRough();
            for (let m = 0; m < modelviewer_js.modelViewerControls.length; m++) {
                modelviewer_js.modelViewerControls[m].addEventListener('change', modelviewer_js.copyModelSettingsToClipboard, null);
            }
            modelviewer_js.downloadPosterButton.addEventListener("click", (e) => { modelviewer_js.downloadPoster(); });
        }

    }

}

if(modelviewer_js.models){
    setTimeout(() => {
        modelviewer_js.init();
    }, 2000);

}
