window.sncms_fe = {

    'sectionJSO' : (target) => {
        let object = {};
        let section = target.closest('section');
        if(section && section.hasAttribute('data-s')){
            let jsString = section.dataset.s;
            if(jsString.length > 0 && jsString.includes('|') && jsString.includes(':')){
                let jsKeyPairsArray = jsString.split('|');
                if(Array.isArray(jsKeyPairsArray)){
                    for(let kp = 0; kp < jsKeyPairsArray.length; kp++) {
                        let a = jsKeyPairsArray[kp].split(':');
                        object[a[0]] = a[1];
                    }
                }
            }
        }
        console.log('jso object :', object);
        return object;
    },


}



