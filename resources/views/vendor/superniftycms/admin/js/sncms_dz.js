window.sncms_dz_vars = {

    'mediaZones': document.querySelectorAll('.mediazone'),
    'mediaZoneDrops': document.querySelectorAll('.mediazone.drop'),
    'mediaZoneClicks': document.querySelectorAll('.mediazone.click'),
    'mediaZoneSorts': {},
    'previewTemplates': {
        'images': document.querySelector('#mz-preview-templates .mz-preview.images'),
        'vimeo': document.querySelector('#mz-preview-templates .mz-preview.vimeo'),
        'youtube': document.querySelector('#mz-preview-templates .mz-preview.youtube'),
        'documents': document.querySelector('#mz-preview-templates .mz-preview.documents'),
        'models': document.querySelector('#mz-preview-templates .mz-preview.models'),
        'videos': document.querySelector('#mz-preview-templates .mz-preview.videos'),
    },
    "uploadProgress": [],
}

window.sncms_dz_func = {

    'saveSortedMediaZone': (zid) => {
        console.log('!!!!!!!!!!!! -------->>>>>>> saveSortedMediaZone: sncms_dz_vars.mediaZoneSorts: ', sncms_dz_vars.mediaZoneSorts);
        console.log('!!!!!!!!!!!! -------->>>>>>> saveSortedMediaZone: sortable zid: ', zid);
        console.log('!!!!!!!!!!!! -------->>>>>>> saveSortedMediaZone[zid]: ', sncms_dz_vars.mediaZoneSorts[zid]);

        if(sncms_dz_vars.mediaZoneSorts[zid]){
            console.log('sortable found: ', sncms_dz_vars.mediaZoneSorts[zid]);
            let mediaSortOrder= [];
            let badMedia = sncms_dz_vars.mediaZoneSorts[zid].el.children;
            let media = document.querySelectorAll("#" + zid + " .mediazone .mz-preview");



            console.log('media sortable object: ', media);
            // console.log('betterMedia: ', betterMedia);
            if(media){
                for (let a = 0; a < media.length; a++) {
                    mediaSortOrder.push(media[a].dataset.media_id);
                }
                sncms_dz_vars.mediaZoneSorts[zid].el.closest('.snfw').classList.remove('empty');
            }
            else { sncms_dz_vars.mediaZoneSorts[zid].el.closest('.snfw').classList.add('empty'); }

            let mediaSortData = {
                'topic_id': document.body.dataset.topic_id,
                'topic_field': sncms_dz_vars.mediaZoneSorts[zid].el.closest('.snfw').dataset.field,
                'media_sort_order': mediaSortOrder,
            };
            console.log('mediaSortData: ', mediaSortData);
            sn_helpers.postData(sn_globals.cms_url + '/media/sort', 'post', mediaSortData)
                .then(data => {
                    document.body.classList.add('updated');
                    setTimeout(() => {
                        document.body.classList.remove('updated');
                    }, 2000);
                })
                .catch((error) => { console.error('!!! --> saveSortedMediaZone error:', error); });

        }
    },

    "init": () => {

        if(sncms_dz_vars.mediaZones) {
            console.log('sncms_dz_vars.mediaZones: ', sncms_dz_vars.mediaZones);

            for (let z = 0; z < sncms_dz_vars.mediaZones.length; z++) {

                let zid;
                let sort;
                let single= sncms_dz_vars.mediaZones[z].classList.contains('single');
                let drop= sncms_dz_vars.mediaZones[z].classList.contains('drop');
                let click= sncms_dz_vars.mediaZones[z].classList.contains('click');
                let aft= sncms_dz_vars.mediaZones[z].closest("[data-aft]").dataset.aft;
                if(single) {
                    zid = sncms_dz_vars.mediaZones[z].id;
                    sort = false;
                }
                else {
                    zid = sncms_dz_vars.mediaZones[z].closest('.snfw').id;
                    sort= true;
                }

                if(sort){
                    let existingMediaObject = false;
                    let existingMediaJSON = sncms_dz_vars.mediaZones[z].closest(".snfw").querySelector('.existingMediaJSON');
                    if(existingMediaJSON && existingMediaJSON.innerText.length > 0) existingMediaObject = JSON.parse(existingMediaJSON.innerText);
                    if(existingMediaObject){
                        for (let m = 0; m < existingMediaObject.length; m++) {
                            let mediaPreview= sncms_dz_func.generateMediaPreview(existingMediaObject[m], aft);
                            sncms_dz_vars.mediaZones[z].appendChild(mediaPreview);
                        }
                    }

                    sncms_dz_vars.mediaZoneSorts[zid] = Sortable.create(sncms_dz_vars.mediaZones[z], {
                        draggable: ".mz-preview",
                        revertOnSpill: true,
                        onStart: function (e) {

                            contentSort.option('disabled', true);
                            document.body.classList.add('nodrop');
                            e.target.closest('.mediazone').classList.add('okdrop');
                            console.log('move target info: ', e.target);
                        },

                        onMove: function(e) {
                            // return e.related.className !== 'what' // event.related is the key
                        },

                        onEnd: function (e) {
                            contentSort.option('disabled', false);
                            document.body.classList.remove('nodrop');
                            e.target.closest('.mediazone').classList.remove('okdrop');
                            document.body.setAttribute('data-mediaSorted', true);
                            console.log('media sortable ended...');
                            setTimeout(() => {
                                document.body.removeAttribute('data-mediaSorted');
                                sncms_dz_func.saveSortedMediaZone(zid);
                                sn_media.mediaWFileCheck(zid);
                                console.log('!!! --> mediaWFileCheck @ Sortable.onEnd: source');
                            }, 500);
                        },
                    });

                }

                if(drop){

                    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(e => {
                        sncms_dz_vars.mediaZones[z].addEventListener(e, sncms_dz_func.preventDefaults, false);
                        document.body.addEventListener(e, sncms_dz_func.preventDefaults, false);
                    });

                    ['dragenter', 'dragover'].forEach(e => {
                        sncms_dz_vars.mediaZones[z].addEventListener(e, sncms_dz_func.highlight, false);
                    });

                    ['dragleave', 'drop'].forEach(e => {
                        sncms_dz_vars.mediaZones[z].addEventListener(e, sncms_dz_func.unhighlight, false);
                    });

                    sncms_dz_vars.mediaZones[z].addEventListener('drop', sncms_dz_func.handleDrop, true);
                    sncms_dz_vars.mediaZones[z].addEventListener('click', sncms_dz_func.handleClick, true);
                }

                if(click){
                    sncms_dz_vars.mediaZones[z].addEventListener('click', sncms_dz_func.addVendorVideo, true);
                }

            }

        }

    },

    'generateMediaPreview': (dataObject, aft) => {
        console.log('aft', aft);

        let mediaPreview = sncms_dz_vars.previewTemplates[aft].cloneNode(true);
        mediaPreview.dataset.media_id = dataObject.id;

        if(dataObject.urls){
            if (dataObject.urls.original){
                mediaPreview.dataset.url_original = dataObject.urls.original;
            }

            if (dataObject.urls.thumbnail){
                mediaPreview.dataset.url_thumbnail = dataObject.urls.thumbnail;
                mediaPreview.querySelector('img').src = dataObject.urls.thumbnail;
            }

            if (dataObject.type === 'svg'){
                mediaPreview.dataset.url_thumbnail = dataObject.urls.original;
                mediaPreview.querySelector('img').src = dataObject.urls.original;
            }

        }

        if (dataObject.type === 'youtube'){
            mediaPreview.querySelector('img').src = sn_media.getYouTubePosterURL(dataObject.vendor_media_id);
        }

        if (dataObject.type === 'vimeo'){
            sn_media.setVimeoPosterURL(dataObject);
        }

        mediaPreview.dataset.ext = dataObject.type;
        mediaPreview.dataset.created_by = dataObject.created_by;
        mediaPreview.dataset.created_at = dataObject.created_at;

        let metasInput = dataObject.metas;
        let metasObject = false;
        if(metasInput.constructor === String) { metasObject = JSON.parse(metasInput); }
        else if(metasInput.constructor === Object) { metasObject = metasInput; }
        console.log('metasObject: ', metasObject);
        if(metasObject.constructor === Object) {
            mediaPreview.dataset.title = metasObject.title ? metasObject.title : 'Untitled';
        }
        return mediaPreview;
    },

    'pipedStringToObject' : (pipedString) => {
        try {
            let object = {};
            let kvs = pipedString.split('|');
            for (let i = 0; i < kvs.length; i++) {
                let kv = kvs[i].split(':');
                object[kv[0]] = kv[1];
            }
            return object;
        } catch (error) {
            console.log('sncms_dz_func.pipedStringToObject ran into an issue...');
        }
    },

    'objectToPipedString' : (object) => {
        try {
            let pipedString = '';
            for (const [k, v] of Object.entries(object)) {
                pipedString += k + ':' + v + '|';
            }
            return pipedString.substring(0, pipedString.length - 1);
        } catch (error) {
            console.error(error);
            console.log('sncms_dz_func.objectToPipedString ran into an issue...');
        }
    },

    "preventDefaults": (e) => {
        e.preventDefault();
        e.stopPropagation();
    },
    "highlight": (e) => {
        e.target.parentElement.classList.add('dragover');
    },
    "unhighlight": (e) => {
        e.target.parentElement.classList.remove('dragover');
    },

    "handleClick": (e) => {
        /* open file browser TODO: implement this functionality */
        console.log('handleClick', e.target);
    },

    "addVendorVideo": (e) => {
        console.log('addVendorVideo', e.target);
        if(
            (e.target.closest('.snfw').dataset.aft === 'youtube' || e.target.closest('.snfw').dataset.aft === 'vimeo') &&
            !e.target.closest(".mz-preview")
        ){
            sn_media.toggleMediaModal(e);
        }
    },

    "handleDrop": (e) => {

        console.log('handleDrop', e.target);
        let dataStore;
        let dz= e.target.parentElement;
        dz.classList.contains('single') ? dataStore = dz : dataStore = dz.closest('.snfw');
        let accepted = dataStore.dataset.accepted.split('|');
        dataStore.classList.remove('bft');

        let files = [];
        if (e.dataTransfer.items) {

            /* try DataTransferItemList interface to access the file(s) */
            [...e.dataTransfer.items].forEach((item, i) => {

                /* if dropped item is a file, add to files */
                if (item.kind === "file") {
                    let file = item.getAsFile();
                    if(accepted.includes(file.type)){
                        files.push(file);
                        console.log(`… file[${i}].name = ${file.name}`);
                        console.log(file.type);
                    }
                    else {
                        dataStore.classList.add('bft');
                        return false;
                    }
                }
            });
        } else {

            /* or use DataTransfer interface to access the file(s) */
            [...e.dataTransfer.files].forEach((file, i) => {
                files.push(file);
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
        sncms_dz_func.handleFiles(files, e);
    },

    "initializeProgress": (numFiles) => {
        sncms_dz_vars.progressBar.style.width = "0";
        sncms_dz_vars.uploadProgress = [];
        for(let i = numFiles; i > 0; i--) {
            sncms_dz_func.uploadProgress.push(0);
        }
    },

    "updateProgress": (targetZone, percent) => {
        console.log('targetZone in updateProgress: ', targetZone);
        console.log('updateProgress percent: ', percent);
        targetZone.closest('[data-aft]').querySelector('.progressBar').style.width = percent + '%';
        // targetZone.closest('[data-aft').querySelector('.progressBar').style.width = sncms_dz_func.uploadProgress.reduce((tot, curr) => tot + curr, 0) / sncms_dz.uploadProgress.length + '%';
    },

    "handleFiles": (files, e) => {
        console.log('handleFiles e :', e.srcElement);
        let targetZone = e.srcElement;
        files = [...files];
        // sncms_dz_func.initializeProgress(files.length);
        files.forEach(function(current, i, a) {
            let min = 1000000000000000;
            let max = 9999999999999999;
            let x = Math.random() * (max - min) + min;
            sncms_dz_func.uploadFile(current, x, targetZone);
            sncms_dz_func.previewFile(current, x, targetZone);
        }, e);
    },

    "previewFile": (file, x, target) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            console.log('reader in previewFile:', reader);
            console.log('target in previewFile:', target);
            console.log('target tag in previewFile:', target.tagName);
            if(target.tagName === 'IMG'){ target.src = reader.result; }
            else {
                let type = target.closest(".snfw").dataset.aft;
                console.log('type in previewFile: ', type);
                let mediaPreview = sncms_dz_vars.previewTemplates[type].cloneNode(true);
                mediaPreview.dataset.media_id = 'temp-' + x;

                if(mediaPreview.querySelector('img')){
                    mediaPreview.querySelector('img').src = reader.result;
                }


                target.appendChild(mediaPreview);
            }
        }
    },

    "uploadFile": (file, x, targetImage) => {

        let dataStore, media_id;
        targetImage.closest('.mediazone.drop').classList.contains('single') ? dataStore = targetImage.closest('.sncms-dz') : dataStore = targetImage.closest('.snfw');
        dataStore.hasAttribute('data-featured_media_id') ? media_id = dataStore.getAttribute('data-featured_media_id') : media_id = 'temp-' + x;
        let targetZone = targetImage.closest('.mediazone.drop');

        console.log('-------> targetImage: ', targetImage);
        let url = sn_globals.cms_url + '/media/upload';
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        xhr.open('post', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('X-CSRF-TOKEN', sn_helpers.csrfToken);
        xhr.responseType = 'json';
        console.log('targetImage in uploadFile: ', targetImage);
        xhr.upload.addEventListener("progress", function(e) {
            console.log('nested targetZone in uploadFile: ', targetZone);
            sncms_dz_func.updateProgress(targetZone, (e.loaded * 100.0 / e.total) || 100);
        });
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4 && xhr.status === 200) { sncms_dz_func.updateProgress(targetZone, 100); }
            else if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
                console.log('upload complete...', x);
            }
            else { console.log('upload error: ', xhr); }
        });
        xhr.upload.addEventListener("load", function(e) {


        });

        console.log('===========================================');
        console.log('FILE UPLOAD DATA (file): ', file);
        console.log('FILE UPLOAD DATA (x): ', x);
        console.log('FILE UPLOAD DATA (targetImage): ', targetImage);


        xhr.onload = function() {
            if (this.status === 200) {
                console.log('!!!!!!!  -----> FILE UPLOAD DATA (this.response): ', this.response);
                console.log('===========================================');

                if(this.response.type === 'topic_media'){
                    let previewFile = targetZone.querySelector(".mz-preview[data-media_id='temp-" + x +"']");
                    previewFile.dataset.media_id = this.response.media_id;
                    previewFile.dataset.url_original = this.response.urls.original;
                    previewFile.dataset.url_thumbnail = this.response.urls.thumbnail;
                    previewFile.dataset.size = this.response.size;
                    previewFile.dataset.ext = this.response.ext;
                    previewFile.dataset.created_by = this.response.created_by;
                    previewFile.dataset.created_at = this.response.created_at;
                    previewFile.dataset.last_updated_by = this.response.last_updated_by;
                    previewFile.dataset.updated_at = this.response.updated_at;
                }
                if(this.response.type === 'featured_media'){
                    document.getElementById('featured_media_id').dataset.featured_media_id = this.response.featured_media_id;
                }

                sn_topics.saveTopic();

                let pb = targetZone.closest('[data-aft]').querySelector('.progressBar');
                setTimeout(() => {
                    pb.style.opacity = "0";
                    setTimeout(() => {
                        pb.style.width = "0%";
                        pb.style.opacity = "1";
                    }, 1000);
                }, 750);
            }
        };

        formData.append('topic_id', document.body.dataset.topic_id);
        formData.append('media_id', media_id);
        formData.append('type', dataStore.dataset.type);
        formData.append('topic_field', dataStore.dataset.field);
        formData.append('aft', dataStore.dataset.aft);
        formData.append('file', file);
        xhr.send(formData);
    },

}

sncms_dz_func.init();
