
window.modelviewer_js = {
    'modelViewerW': document.getElementById("modelsW"),
    'modelViewer': document.querySelector("model-viewer"),
    'header': document.querySelector("header"),
    'material': null,
    'activeModel': null,
    'models': document.querySelectorAll('#models li[data-model]'),
    'capabilities': document.querySelector('#capabilities'),
    'slideNumber': 0,
    'slideTimer': '',
    'slideInterval': 5000,
    'color': document.querySelector('#color'),
    'exposure': document.querySelector('#exposure'),
    'scale': document.querySelector('#scale'),
    'roll': document.querySelector('#roll'),
    'pitch': document.querySelector('#pitch'),
    'yaw': document.getElementById('yaw'),
    'metal': document.querySelector('#metal'),
    'rough': document.querySelector('#rough'),
    'reset': document.querySelector('#reset'),
    'posterURL': null,
    'downloadPosterButton': document.querySelector('#downloadPosterButton'),

    'setColor': () => {
        const colorString =  modelviewer_js.color.value;
        const [material] = modelviewer_js.modelViewer.model.materials;
        material.pbrMetallicRoughness.setBaseColorFactor(colorString);
    },
    'listenChangeColor': () => { modelviewer_js.color.addEventListener('input', modelviewer_js.setColor, null); },

    'setScale': () => { let x = (Math.floor((modelviewer_js.scale.value) * 100) / 100).toFixed(2); modelviewer_js.modelViewer.scale = `${x} ${x} ${x}`; },
    'listenChangeScale': () => { modelviewer_js.scale.addEventListener('input', modelviewer_js.setScale, null); },

    'setRoll': (e) => {
        let current = document.querySelector("[camera-orbit]").getAttribute('camera-orbit').split(' ');
        let new_value = (Math.floor((e.target.value) * 100) / 100).toFixed(2) + 'rad ' + current[1] + ' ' + current[2];
        document.querySelector("[camera-orbit]").setAttribute('camera-orbit', new_value);
    },
    'listenChangeRoll': () => {
            if(modelviewer_js.roll) { modelviewer_js.roll.addEventListener('input', modelviewer_js.setRoll, null); }
        },

    'setPitch': (e) => {
        let current = document.querySelector("[camera-orbit]").getAttribute('camera-orbit').split(' ');
        let new_value = current[0] + ' ' + (Math.floor((e.target.value) * 100) / 100).toFixed(2) + 'rad ' + current[2];
        document.querySelector("[camera-orbit]").setAttribute('camera-orbit', new_value);
    },
    'listenChangePitch': () => {
        if(modelviewer_js.roll) {
            modelviewer_js.pitch.addEventListener('input', modelviewer_js.setPitch, null); }
        },

    'setYaw': (e) => {
        let current = document.querySelector("[camera-orbit]").getAttribute('camera-orbit').split(' ');
        let new_value = current[0] + ' ' + current[1] + ' ' + (Math.floor((e.target.value) * 100) / 100).toFixed(2) + 'm';
        document.querySelector("[camera-orbit]").setAttribute('camera-orbit', new_value);
    },
    'listenChangeYaw': () => { modelviewer_js.yaw.addEventListener('input', modelviewer_js.setYaw, null); },

    'setMetal': () => { modelviewer_js.modelViewer.model.materials[0].pbrMetallicRoughness.setMetallicFactor(modelviewer_js.metal.value); },
    'listenChangeMetal': () => { modelviewer_js.metal.addEventListener('input', modelviewer_js.setMetal, null); },

    'setRough': () => { modelviewer_js.modelViewer.model.materials[0].pbrMetallicRoughness.setRoughnessFactor(modelviewer_js.rough.value);},
    'listenChangeRough': () => { modelviewer_js.rough.addEventListener('input', modelviewer_js.setRough, null); },

    'getSettings': () => {
        let settings = modelviewer_js.color.value + '|' +
            (Math.floor((modelviewer_js.exposure.value) * 100) / 100).toFixed(2) + '|' +
            (Math.floor((modelviewer_js.scale.value) * 100) / 100).toFixed(2) + '|' +
            document.querySelector("[camera-orbit]").getAttribute('camera-orbit') + '|' +
            modelviewer_js.metal.value + '|' +
            modelviewer_js.rough.value;
        console.log('settings: ', settings);
        try {
            navigator.clipboard.writeText(settings);
        } catch (error) {
            console.log('document not focused...');
        }
        return settings;
    },

    'setModelViewerSource': (e) => {

        modelviewer_js.modelViewer.classList.remove('loaded');

        if(e === undefined){ return; }
        if(e.target === undefined){  modelviewer_js.activeModel = e; }
        else { modelviewer_js.activeModel = e.target; }

        // update all the settings
        setTimeout(() => {

            let settings = modelviewer_js.activeModel.dataset.settings.split('|');

            modelviewer_js.color.value = settings[0];
            modelviewer_js.modelViewer.exposure = settings[1];

            modelviewer_js.modelViewer.scale = `${settings[2]} ${settings[2]} ${settings[2]}`;
            modelviewer_js.scale.value = settings[2];

            document.querySelector("[camera-orbit]").setAttribute('camera-orbit', settings[3]);
            let parts = settings[3].split(' ');
            modelviewer_js.roll.value = parts[0];
            modelviewer_js.pitch.value = parts[1];
            modelviewer_js.yaw.value = parts[2];

            modelviewer_js.metal.value = settings[4];
            modelviewer_js.rough.value = settings[5];

            let models= document.querySelectorAll('#models li[data-model]');
            for (let m= 0; m < models.length; m++) { models[m].classList.remove('active'); }
            modelviewer_js.activeModel.classList.add('active');

            modelviewer_js.modelViewer.src = 'https://kmmgrp.test/kmmgrpcom/' + modelviewer_js.activeModel.dataset.model + '/original.glb';
        }, 250);

    },

    'listenSetModelViewerSource': (e) => {
        let models = document.querySelectorAll('#models li[data-model]');
        if(models){
            for (let m = 0; m < models.length; m++) {
                if(m === 0){ modelviewer_js.setModelViewerSource(models[m]); }
                models[m].addEventListener('click', modelviewer_js.setModelViewerSource, null);
            }
        }
    },

    'changeActiveSlide': () => {
        if(modelviewer_js.slideNumber < modelviewer_js.models.length - 1){ modelviewer_js.slideNumber++; }
        else { modelviewer_js.slideNumber = 0; }
        for (let m = 0; m < modelviewer_js.models.length; m++) {
            if(m === modelviewer_js.slideNumber) {
                modelviewer_js.setModelViewerSource(modelviewer_js.models[m]);
                setTimeout(() => {
                    modelviewer_js.models[m].classList.add('active');
                }, 250);
            }
            else { modelviewer_js.models[m].classList.remove('active');}
        }
        /* modelviewer_js.slideTimer = setTimeout("modelviewer_js.changeActiveSlide()", 5000); */
    },

    'pauseSlideshow': () => { clearTimeout(modelviewer_js.slideTimer); },
    'startSlideshow': () => { modelviewer_js.changeActiveSlide(); },

    'downloadPoster': async () => {

        await new Promise(resolve => requestAnimationFrame(() => resolve()));
        const blob = await modelviewer_js.modelViewer.toBlob({ mimeType: 'image/png', idealAspect: true });


        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = modelviewer_js.activeModel.dataset.title + '.png';
        a.click();
        setTimeout(function() {
            a.remove();
            URL.revokeObjectURL(modelviewer_js.downloadPosterButton);
        }, 0);

    },

    'init': (e) => {
        modelviewer_js.activeModel = document.querySelector("[data-model].active");
        modelviewer_js.setModelViewerSource();
        modelviewer_js.listenSetModelViewerSource();
        modelviewer_js.listenChangeRoll();
        modelviewer_js.listenChangePitch();
        modelviewer_js.listenChangeYaw();
        modelviewer_js.listenChangeScale();
        modelviewer_js.listenChangeColor();
        modelviewer_js.listenChangeMetal();
        modelviewer_js.listenChangeRough();
        modelviewer_js.modelViewer.addEventListener("load", (e) => {
            modelviewer_js.activeModel = document.querySelector("[data-model].active");
            modelviewer_js.setModelViewerSource(modelviewer_js.activeModel);
            modelviewer_js.setColor();
            modelviewer_js.setScale();
            modelviewer_js.setMetal();
            modelviewer_js.setRough();
            // modelviewer_js.capabilities.dataset.capabilities = modelviewer_js.activeModel.dataset.capabilities;
            setTimeout(() => {
                modelviewer_js.modelViewer.classList.add('loaded');
            }, 250);
        });
        modelviewer_js.startSlideshow();
        modelviewer_js.header.addEventListener("mouseover", (e) => { modelviewer_js.pauseSlideshow(); });
        modelviewer_js.header.addEventListener("mouseleave", (e) => { modelviewer_js.changeActiveSlide(); });
        modelviewer_js.downloadPosterButton.addEventListener("click", (e) => { modelviewer_js.downloadPoster(); });
        const inputs = document.querySelectorAll('input');
        if(inputs){
            for (let m = 0; m < inputs.length; m++) {
                inputs[m].addEventListener('change', modelviewer_js.getSettings, null);
            }

        }

    }
}

if(modelviewer_js.modelViewer){

    console.log('yaw: ', modelviewer_js.yaw);
    modelviewer_js.init();
}
