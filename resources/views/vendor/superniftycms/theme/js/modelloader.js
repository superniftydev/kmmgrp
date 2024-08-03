
window.modelloader_js = {
    'models': document.querySelectorAll('model-viewer'),
    'loadModel': (model) => {
        let s = model.dataset.s;
        // model.scale = s + ' ' + s + ' ' + s ;
       //  model.dismissPoster();
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
}


/* is the model in the viewport */
if(modelloader_js.models){
    for (let m = 0; m < modelloader_js.models.length; m++) {

        if(modelloader_js.modelInViewport(modelloader_js.models[m], true)){ // add ', true' for partial
            modelloader_js.loadModel(modelloader_js.models[m]);
        }

        modelloader_js.models[m].addEventListener("load", (e) => {
            modelloader_js.models[m].closest('li').classList.add('loaded');
        });

        document.addEventListener("scroll", (event) => {
            console.log('scroll');
            if(modelloader_js.modelInViewport(modelloader_js.models[m], true)){ // add ', true' for partial
                modelloader_js.loadModel(modelloader_js.models[m]);
            }
        });

    }
}


