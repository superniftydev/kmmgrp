
// Dropzone.autoDiscover = false;


/* upload a folder ----->
https://stackoverflow.com/questions/28200717/dropzone-js-and-full-path-for-each-file/34199946#34199946
 */


window.maxUploadFilesize =  document.querySelector('meta[name="maxuploadfilesize"]') ? document.querySelector('meta[name="maxuploadfilesize"]').content : null;
window.acceptedMimeTypes = document.querySelector('meta[name="acceptedmimetypes"]') ? document.querySelector('meta[name="acceptedmimetypes"]').content : null;
window.acceptedFileTypes = document.querySelector('meta[name="acceptedfiletypes"]') ? document.querySelector('meta[name="acceptedfiletypes"]').content : null;
window.dzPreviewTemplate = document.getElementById("sn_mediaDZTemplate") ? document.getElementById("sn_mediaDZTemplate").innerHTML : null;

window.sn_media = {

    "sn_mediaDZWs": document.querySelectorAll('#topicContent .sn_mediaDZW') ? document.querySelectorAll('#topicContent .sn_mediaDZW') : null,
    'dzWs': {},
    'dzs': {},
    'activeDZ': null,
    'sn_existingMedia': {},
    'mediaDZObjects': {},
    'mediaDZSortable': document.body.id === 'superniftycms-topics-edit', /* only topic-specific media are sortable. global media are not */
    'mediaDZSortables': {},

    'activeMedia': false,
    'sn_selectedMediaIDs': document.getElementById('sn_selectedMediaIDs') ?  document.getElementById('sn_selectedMediaIDs').innerText : null,
    'mediaThumbs': [ 'png', 'jpg', 'jpeg', 'gif', 'webp', 'heic'],
    'mediaSNImages': [ 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'heic'],
    'userUploadedVideos': [ 'mp4', 'webm', 'ogg', 'ogv', 'mkv', 'wmv', 'mov', 'asf' ],
    'outsideVendorVideos': [ 'youtube', 'vimeo' ],

    'mediaModal': document.querySelector('#mediaModal') ? document.querySelector('#mediaModal') : null,
    'mediaMetas': document.querySelectorAll('#mediaModal .metas .meta') ? document.querySelectorAll('#mediaModal .metas .meta') : null,
    'mediaSize': document.querySelector('#mediaSize') ? document.querySelector('#mediaSize') : null,
    'mediaType': document.querySelector('#mediaType') ? document.querySelector('#mediaType') : null,
    'snDocumentImageViewer': document.querySelector('#snDocumentImageViewer img') ? document.querySelector('#snDocumentImageViewer img') : null,
    'documentSummary': document.querySelector('#documentSummary') ? document.querySelector('#documentSummary') : null,
    'snVideoViewer': document.querySelector('#snVideoViewer') ? document.querySelector('#snVideoViewer') : null,
    'outsideVendorVideoID': document.querySelector('#outsideVendorVideoID') ? document.querySelector('#outsideVendorVideoID') : null,
    'outsideVendorVideoViewer': document.querySelector('#outsideVendorVideoViewer') ? document.querySelector('#outsideVendorVideoViewer') : null,

    'userUploadedVideoViewer': document.querySelector('#userUploadedVideoViewer') ? document.querySelector('#userUploadedVideoViewer') : null,
    'userUploadedVideoW': document.querySelector('#userUploadedVideoW') ? document.querySelector('#userUploadedVideoW') : null,
    'userUploadedVideo': document.querySelector('#userUploadedVideoW video') ? document.querySelector('#userUploadedVideoW video') : null,

    'setVimeoPosterURL': async (dataObject) =>  {
        try{
            await fetch('https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + dataObject.vendor_media_id)
                .then((response) => {
                    if (!response.ok) { /* throw new Error('vimeo video poster not found'); */ }
                    return response.json();
                })
                .then((data) => {

                    document.querySelector("[data-media_id='"  +  dataObject.id + "'] img").src = data.thumbnail_url;
                    console.log('!!! --> set vimeo poster image:', data);

                })
                .catch((error) => {
                    console.log('!!! --> setVimeoPosterURL error:', error);
                });

        } catch (error) {
            console.log(error);
            // Expected output: ReferenceError: nonExistentFunction is not defined
            // (Note: the exact output may be browser-dependent)
        }
    },

    'getYouTubePosterURL': (vendor_media_id, target_img) => {
        return 'https://img.youtube.com/vi/' + vendor_media_id + '/0.jpg';
    },



    'setOutsideVendorVideoURL': (e) => {
        console.log('-------> running setOutsideVendorVideoURL()...');
        let vendor = document.body.dataset.media_modal_status;
        let url = '';
        if(vendor === 'youtube'){
            url = 'https://www.youtube.com/embed/' + e.target.innerText + '?autoplay=1&loop=0&byline=1&title=1';
        }
        else if(vendor === 'vimeo'){
            url = 'https://player.vimeo.com/video/' + e.target.innerText + '?autoplay=1&loop=0&byline=1&title=1';
        }
        sn_media.outsideVendorVideoViewer.querySelector('iframe').src = url;
        sn_media.saveMediaModalData();
    },



    'listenSetOutVendorVideoURL': () => {
        let outsideVendorVideoIDField = document.getElementById('outsideVendorVideoID');
        outsideVendorVideoIDField.addEventListener('blur', sn_media.setOutsideVendorVideoURL);
    },

    'saveMediaMetas': () => {

        console.log('sn_media.activeMedia: ', sn_media.activeMedia);

        /*
        sn_helpers.postData(sn_globals.cms_url + '/media/deprecated...', 'post', sn_media.activeMedia)
            .then(data => {


                document.body.classList.add('updated');

                // update all preview elements
                let existingMediaPreviewElements = document.querySelectorAll(".dz-preview[data-media_id='" + data.media_id + "']");

                if(sn_media.activeMedia){
                    if(sn_media.activeMedia.media_id === 'new') { sn_media.activeMedia.media_id = data.media_id; }

                    // update the newest .dz-preview media_id from 'new' data.media_id or video poster url placements will fail
                    let newPreviewElement = document.querySelector(".dropzone .dz-preview[data-media_id='new']");
                    if(newPreviewElement){
                        newPreviewElement.dataset.media_id = data.media_id;
                        let target_img = newPreviewElement.querySelector('.dz-image img')
                        if(sn_media.activeMedia.type === 'vimeo') { sn_media.setVimeoPosterURL(sn_media.activeMedia.vendor_media_id, target_img); }
                        else if(sn_media.activeMedia.type === 'youtube') { sn_media.setYouTubePosterURL(sn_media.activeMedia.vendor_media_id, target_img); }
                    }

                }

                for (let p = 0; p < existingMediaPreviewElements.length; p++) {
                    existingMediaPreviewElements[p].classList.remove('vendor-video-error');
                    existingMediaPreviewElements[p].setAttribute('data-media_id', data.media_id);
                }

                setTimeout(() => {
                    document.body.classList.remove('updated');
                }, 2000);

            })
            .catch((error) => { console.error('Error:', error); });
            */




    },

    'createMediaPreviewElementNotDZFile': (mockFile, target) => {
        let mediaPreview = document.querySelector('#sn_mediaDZTemplate .dz-preview').cloneNode(true);
        if(sn_media.mediaThumbs.includes(mockFile.type)){ mediaPreview.querySelector('img').src = sn_media.getMediaPreviewURL(mockFile); }
        mediaPreview = sn_media.populateMediaPreviewElement(mediaPreview, mockFile);
        sn_media.dzs[sn_media.activeMedia.zid].append(mediaPreview);
        sn_media.dzs[sn_media.activeMedia.zid].classList.remove('empty');
    },

    'createMediaPreviewElementDZ': (dz, file) => {


        console.log('[ dz ]------> ', dz);
        console.log('[ file ]------> ', file);


        let metasInput = file.metas;
        let metasObject = false;
        if(metasInput.constructor === String) { metasObject = JSON.parse(metasInput); }
        else if(metasInput.constructor === Object) { metasObject = metasInput; }
        console.log('[ metasObject ]------> ', metasObject);

        if(metasObject){
            let mf = { name: metasObject.title, size: metasObject.original_file_size };
            console.log('[ mf ]------> ', mf);
            dz.options.addedfile.call(dz, mf);
            dz.files.push(mf);
            console.log('file.type: ', file.type);
            console.log('sn_media.mediaThumbs', sn_media.mediaThumbs);

            if(sn_media.mediaThumbs.includes(file.type) || file.type === 'svg'){

                console.log('[ dz ]------> ', dz);
                console.log('[ mf ]------> ', mf);
                console.log('[ sn_media.getMediaPreviewURL(file) ]------> ', sn_media.getMediaPreviewURL(file));

                // dz.options.thumbnail.call(dz, mf, sn_media.getMediaPreviewURL(file));
            }
            mf.previewElement = sn_media.populateMediaPreviewElement(mf.previewElement, file);

        }
    },

    'setActiveMediaData': (dataStore) => {
        console.log('setActiveMediaData target ----> ', dataStore);
        let metasInput = dataStore.closest('[data-metas]') ? dataStore.closest('[data-metas]').dataset.metas : '';

        /* clean up legacy json data */
        console.log('----------------> metasInput before clean: ', metasInput);
        if(metasInput.charAt(0) === '"'){ metasInput = metasInput.slice(1); }
        if(metasInput.substring(metasInput.length - 1) === '"'){ metasInput = metasInput.substring(0, metasInput.length - 1); }
        metasInput = metasInput.replaceAll('"}', '');
        metasInput = metasInput.replaceAll('{"', '');
        metasInput = metasInput.replaceAll('","', '|');
        metasInput = metasInput.replaceAll('":"', ':');
        console.log('----------------> metasInput after clean: ', metasInput);
        let metasObject= sncms_dz_func.pipedStringToObject(metasInput);

        sn_media.activeMedia = {
            'topic_id': document.body.dataset.topic_id,
            'topic_field': dataStore.closest('.snfw') ? dataStore.closest('.snfw').dataset.field : document.body.dataset.topic_field,
            'media_id': dataStore.closest('[data-media_id]') ? dataStore.closest('[data-media_id]').dataset.media_id : null,
            'title': dataStore.closest('[data-title]') ? dataStore.closest('[data-title]').dataset.title : 'Untitled Media',
            'vendor_media_id': dataStore.closest('[data-vendor_media_id]') ? dataStore.closest('[data-vendor_media_id]').dataset.vendor_media_id : null,
            'url_original': dataStore.closest('[data-url_original]') ? dataStore.closest('[data-url_original]').dataset.url_original : null,
            'url_thumbnail': dataStore.closest('[data-url_thumbnail]') ? dataStore.closest('[data-url_thumbnail]').dataset.url_thumbnail : null,
            'type': dataStore.closest('[data-type]') ? dataStore.closest('[data-type]').dataset.type : null,
            'ext': dataStore.closest('[data-ext]') ? dataStore.closest('[data-ext]').dataset.ext : '',
            'metas': sncms_dz_func.pipedStringToObject(metasInput),
            'size': sn_helpers.fileSize(metasObject.original_file_size),
            'aft': dataStore.closest('[data-aft]') ? dataStore.closest('[data-aft]').dataset.aft : null,
            'zid': dataStore.closest('.snfw') ? dataStore.closest('.snfw').id : 'global'
        };
        console.log('setActiveMediaData result (sn_media.activeMedia): ', sn_media.activeMedia);
    },

    'saveMediaModalData': () => {

        console.log('-----> running saveMediaModalData()....');

        let new_vendor_video = false;
        let type= document.body.dataset.media_modal_status;
        let vendor_media_id_field = document.getElementById('outsideVendorVideoID');
        let vendor_media_id = vendor_media_id_field ? vendor_media_id_field.innerText.trim() : '';

        console.log('type: ', type);
        console.log('vendor_media_id_field: ', vendor_media_id_field);
        console.log('vendor_media_id: ', vendor_media_id);

        if(
            ((type === 'youtube' || type === 'vimeo') && vendor_media_id.length > 3) ||
            (type !== 'youtube' && type !== 'vimeo')
        ){

            let metas = {};
            let metaFields = document.querySelectorAll('.metas .snfw.meta');
            console.log('metaFields: ', metaFields);
            if(metaFields){
                for (let m= 0; m < metaFields.length; m++) {
                    let ce = metaFields[m].querySelector('[contenteditable]');
                    metas[ce.dataset.meta.trim()] = ce.innerText.trim()
                }
            }

            let data = {
                'media_id': document.body.dataset.modal_media_id,
                'metas': metas,
                'topic_id': document.body.dataset.topic_id,
                'topic_field': document.body.dataset.topic_field
            }

            if(type === 'youtube' || type === 'vimeo'){
                data['type'] = type;
                data['vendor_media_id'] = vendor_media_id;
            }

            if(data.media_id === 'new') { new_vendor_video = true; }

            sn_helpers.postData(sn_globals.cms_url + '/media/set', 'post', data)
                .then(function (data) {
                    console.log('---------> saveMediaModalData response: ', data.media);
                    if(new_vendor_video){
                        document.body.dataset.modal_media_id = data.media.id;
                        let mediaPreview = sncms_dz_func.generateMediaPreview(data.media, document.body.dataset.media_modal_status);
                        document.querySelector(".snfw[data-field='" + document.body.dataset.topic_field + "'] .mediazone").appendChild(mediaPreview);
                        sn_media.toggleMediaModalListener();
                        sn_topics.saveTopic();
                    }
                    setTimeout(() => {
                        console.log('two seconds later: ', data.media);
                    }, 2000);
                })
                .catch((error) => { console.error('!!! --> saveMediaModalData error:', error); });

        }


    },

    'toggleMediaModal': (e) => {

        console.log('toggleMediaModal was requested...', e.target);

        /* close */
        if(document.body.hasAttribute('data-media_modal_status')){

            sn_media.saveMediaModalData();

            sn_media.userUploadedVideo.pause();
            sn_media.userUploadedVideoViewer.removeAttribute('data_media_id');
            // sn_media.userUploadedVideoW.querySelector("img").removeAttribute('src');
            sn_media.userUploadedVideo.removeAttribute('poster');
            let videoSources= sn_media.userUploadedVideo.querySelectorAll("source");
            if(videoSources){
                for (let v = 0; v < videoSources.length; v++) {
                    videoSources[v].removeAttribute('src');
                }
            }


            document.body.removeAttribute('data-modal_media_id');
            document.body.removeAttribute('data-media_modal_vendor_media_id');
            document.body.removeAttribute('data-media_modal_media_type');
            document.body.removeAttribute('data-media_modal_status');
            document.body.removeAttribute('data-topic_field');



            sn_media.snDocumentImageViewer.removeAttribute('src');
            if(sn_media.snVideoViewer.querySelector('video')) { sn_media.snVideoViewer.querySelector('video').remove(); }
            sn_media.outsideVendorVideoViewer.querySelector('iframe').removeAttribute('src');
            sn_media.activeMedia = false;
            if(sn_media.mediaMetas){
                for (let m = 0; m < sn_media.mediaMetas.length; m++) {
                    sn_media.mediaMetas[m].querySelector('[contenteditable]').innerText = '';
                }
            }
            sn_media.mediaType.innerText = '';
            sn_media.mediaSize.innerText = '';
            sn_media.outsideVendorVideoID.innerText = '';
            sn_media.outsideVendorVideoID.dataset.vendor = '';
            sn_media.outsideVendorVideoID.dataset.cv = '';
        }

        /* open */
        else {

            /* adding a NEW outside vendor video */
            if(
                (e.target.closest('.snfw').dataset.aft === 'youtube' || e.target.closest('.snfw').dataset.aft === 'vimeo') &&
                !e.target.closest('.mz-preview')
            ){

                let data = {}
                data['media'] = {
                    'created_at': null,
                    'created_by': null,
                    'id': 'new',
                    'last_updated_by': null,
                    'metas': {'tags': null, 'notes': null, 'title': 'New Video', description: null, original_file_size: null },
                    'type': e.target.closest('.snfw').dataset.aft,
                    'updated_at': null,
                    'vendor_media_id': 'Enter Video ID Here...'
                };
                sn_media.populateMediaModal(e.target, data);
            }

            /* everything else */
            else {

                let media_id = e.target.closest('.mz-preview').dataset.media_id;
                sn_helpers.postData(sn_globals.cms_url + '/media/get', 'post', {
                        'media_id': media_id,
                    })
                    .then(function (data) {
                        sn_media.populateMediaModal(e.target, data);
                        setTimeout(() => {
                            console.log('again with the get media data: ', data.media);
                        }, 2000);
                    })
                    .catch((error) => { console.error('!!! --> toggleMediaModal error:', error); });

            }

        }
    },


    'populateMediaModal': (target, data) => {

        console.log('populateMediaModal media.data: ', data.media);
        let metasObject;

        /* attempt to clean corrupted json data */
        let metasInput = data.media.metas ? data.media.metas : {};
        if(metasInput.constructor !== Object) {
            console.log('----------------> metasInput before clean: ', metasInput);
            if(metasInput.charAt(0) === '"'){ metasInput = metasInput.slice(1); }
            if(metasInput.substring(metasInput.length - 1) === '"'){ metasInput = metasInput.substring(0, metasInput.length - 1); }
            metasInput = metasInput.replaceAll('"}', '');
            metasInput = metasInput.replaceAll('{"', '');
            metasInput = metasInput.replaceAll('","', '|');
            metasInput = metasInput.replaceAll('":"', ':');
            console.log('----------------> metasInput after clean: ', metasInput);
            metasObject = sncms_dz_func.pipedStringToObject(metasInput);
        }
        else { metasObject = data.media.metas; }

        /* set file size */
        if(typeof metasObject['original_file_size'] !== 'undefined'){
            sn_media.mediaSize.innerText = sn_helpers.fileSize(metasObject['original_file_size']);
        }

        /* set file title */
        if(typeof metasObject['title'] !== 'undefined'){
            sn_media.mediaType.innerText = metasObject['title'];
        }

        /* set the metas */
        let metaFields = document.querySelectorAll('.metas .snfw.meta');
        console.log('metaFields: ', metaFields);
        if(metaFields){
            for (let m= 0; m < metaFields.length; m++) {
                let ce = metaFields[m].querySelector('[contenteditable]');
                console.log('ce.dataset.meta.trim()', ce.dataset.meta.trim());

                if(
                    !Object.is(ce.dataset.meta, undefined) &&
                    !Object.is(metasObject, undefined) &&
                    metasObject[ce.dataset.meta.trim()] !== undefined &&
                    metasObject[ce.dataset.meta.trim()] !== 'undefined' &&
                    metasObject[ce.dataset.meta.trim()] !== null &&
                    metasObject[ce.dataset.meta.trim()] !== 'null'
                ) {
                    ce.innerText = metasObject[ce.dataset.meta.trim()];
                }
            }
        }

        let aft =  target.closest('.snfw').dataset.aft;

        /* now set the ui to be displayed based on the file type */
        document.body.dataset.modal_media_id = data.media.id; /* redundant - clean up */
        document.body.dataset.topic_field = target.closest('.snfw').dataset.field;
        document.body.setAttribute('data-media_modal_status', aft);
        document.body.setAttribute('data-media_modal_media_id', data.media.id); /* redundant - clean up */

        /* images  */
        if(aft === 'images'){
            sn_media.snDocumentImageViewer.src =  data.media.urls.original;
        }

        /* videos */
        else if(aft === 'videos'){
            sn_media.userUploadedVideoViewer.dataset.media_id = data.media.id;
            if(data.media.id !== 'new'){
                sn_media.setUserUploadedVideoViewerURLS('NOT_IMPLEMENTED');
            }
        }

        /* outside vendor video */
        else if(aft === 'youtube' || aft === 'vimeo'){
            console.log('hello!!!!!!!!! - youtube   tryin...');

            document.body.setAttribute('data-media_modal_media_type', data.media.type);
            document.body.setAttribute('data-media_modal_vendor_media_id', data.media.vendor_media_id);
            sn_media.outsideVendorVideoID.dataset.vendor = data.media.type;
            sn_media.outsideVendorVideoID.dataset.cv = data.media.vendor_media_id;
            if(data.media.id !== 'new'){
                sn_media.outsideVendorVideoID.innerText = data.media.vendor_media_id;
                let url = '';
                if(data.media.type === 'youtube'){
                    console.log('hello!!!!!!!!! - youtube   ');
                    url = 'https://www.youtube.com/embed/' + data.media.vendor_media_id + '?autoplay=1&loop=0&byline=1&title=1';
                }

                else if (data.media.type === 'vimeo'){
                    url = 'https://player.vimeo.com/video/' + data.media.vendor_media_id + '?autoplay=1&loop=0&byline=1&title=1';
                }
                sn_media.outsideVendorVideoViewer.querySelector('iframe').src = url;

            }
        }

        /* documents of all types */
        else if(aft === 'documents'){
            sn_media.documentSummary.dataset.type = data.media.type;
        }

    },




    'toggleMediaModalListener': () => {
        let modalTriggers = document.querySelectorAll(".mz-preview, .closeModal");
        if(modalTriggers){
            for (let m = 0; m < modalTriggers.length; m++) {
                console.log('======== ==== ===== === ===> ', modalTriggers[m]);
                modalTriggers[m].removeEventListener('click', sn_media.toggleMediaModal);
                modalTriggers[m].addEventListener('click', sn_media.toggleMediaModal, null);
            }
        }
    },

    /* adjust to field specific */

    'toggleSelectedMedia': (targetDZPreview) => {

        if(document.body.id !== 'superniftycms-media-index'){
            let zid = targetDZPreview.closest('.snfw') ? targetDZPreview.closest('.snfw').id : 'global';
            targetDZPreview.remove();

            sncms_dz_func.saveSortedMediaZone(zid);
        }

        else if(document.body.id === 'superniftycms-media-index'){
            targetDZPreview.classList.toggle('selected');
            let selectedMedia = document.querySelectorAll('.dropzone .dz-preview.selected');
            let sn_selectedMediaIDs = [];
            if(selectedMedia){
                for (let s = 0; s < selectedMedia.length; s++) {
                    sn_selectedMediaIDs.push(selectedMedia[s].dataset.media_id);
                }
            }

            let data = {
                'selected_media_ids': sn_selectedMediaIDs,
                'topic_id': document.body.dataset.topic_id,
                'topic_field_type': document.body.dataset.topic_field_type,
                'topic_field': document.body.dataset.topic_field
            };

            sn_helpers.postData(sn_globals.cms_url + '/media/topic/assign', 'post', data)
                .then(data => {
                    document.body.classList.add('updated');
                    setTimeout(() => {
                        document.body.classList.remove('updated');
                    }, 2000);
                })
                .catch((error) => { console.error('!!! --> sn_media.toggleSelectedMedia error:', error); });

        }


    },

    'dzOptions': {
        url: sn_globals.cms_url + '/media/deprecated...',
        headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
        maxFilesize: maxUploadFilesize,
        acceptedFiles: null,
        method: "post",
        withCredentials: false,
        timeout: null,
        parallelUploads: 8,
        uploadMultiple: false,
        chunking: false,
        forceChunking: false,
        chunkSize: 2 * 1024 * 1024,
        parallelChunkUploads: false,
        retryChunks: false,
        retryChunksLimit: 3,
        paramName: "file",
        createImageThumbnails: true,
        maxThumbnailFilesize: 10,
        thumbnailWidth: 500,
        thumbnailHeight: 500,
        thumbnailMethod: "crop", // crop | contain
        resizeMethod: "crop", // crop | contain
        resizeWidth: null,
        resizeHeight: null,
        resizeMimeType: null,
        resizeQuality: 0.8,
        filesizeBase: 1000,
        maxFiles: 999,
        defaultHeaders: true,
        clickable: true,
        ignoreHiddenFiles: true,
        autoProcessQueue: true,
        autoQueue: true,
        addRemoveLinks: false,
        previewsContainer: null,
        disablePreviews: false,
        hiddenInputContainer: "body",
        capture: null,
        renameFile: null,
        forceFallback: false,
        dictDefaultMessage: "",
        dictFallbackMessage: "Your browser doesn't support drag and drop file uploads.",
        dictFallbackText: "Please use the fallback form below to upload your files.",
        dictFileTooBig: "This file is too large ({{filesize}}MB). Max is {{maxFilesize}}MB.",
        dictInvalidFileType: "You can't upload files of this type.",
        dictResponseError: "Server responded with {{statusCode}} code.",
        dictCancelUpload: "Cancel upload",
        dictUploadCanceled: "Upload canceled.",
        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
        dictRemoveFile: "",
        dictRemoveFileConfirmation: null,
        dictMaxFilesExceeded: "You can not upload any more files.",
        dictFileSizeUnits: { tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b" },
        previewTemplate: dzPreviewTemplate,
        binaryBody: false,

        addedfile: function (file) {
            file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
            if(!this.previewsContainer.classList.contains('init')){
                let firstPreview = this.previewsContainer.firstChild;
                if(firstPreview){ this.previewsContainer.insertBefore(file.previewElement, firstPreview); }
                else { this.previewsContainer.append(file.previewElement); }
            }
            else { this.previewsContainer.append(file.previewElement); }
            return false;
        },

        transformFile: function(file, done) {
            if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/) && file.type !== 'image/gif') {
                return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
            } else {
                return done(file);
            }
        },

        init: function() {
            let dz = this;
            // this.element.querySelector('.dz-default.dz-message').remove();
            let snfw = this.element.closest('.snfw');
            let zid = snfw ? snfw.id : 'global';

            console.log('snfw.dataset.aft: ', snfw.dataset.aft);
            console.log('sn_media.sn_existingMedia[zid]: ', sn_media.sn_existingMedia[zid]);


            /* load existing media */
            if(!Object.is(sn_media.sn_existingMedia[zid], null)) {
                try {
                    for (const existingSourceMedia of sn_media.sn_existingMedia[zid]) {
                        sn_media.createMediaPreviewElementDZ(dz, existingSourceMedia);
                    }
                    this.element.classList.remove('init');
                } catch (e) { console.log('!!! --> createMediaPreviewElementDZ error: ', e); }
            }

            this.on('addedfile', function(file) {
                this.options.acceptedFiles = snfw.dataset.accepted;
                console.log('FILE THAT WAS JUST DROPPED: ', file);
            });

            this.on('error', function(file, xhr) {
                file.previewElement.remove();
                snfw.classList.add('file-upload-error');
                setTimeout(() => {
                    snfw.classList.remove('file-upload-error');
                }, 1000);
            });

            /* add additional topic data to post request */
            this.on('sending', function(file, xhr, formData) {
                formData.append('topic_id', document.body.dataset.topic_id);
                formData.append('topic_field', snfw.dataset.field);
            });

            /* file upload success */
            this.on('success', function(file, xhr, formData) {

                console.log("!!! --> dropzone success");
                console.log('!!! --> file: ', file);
                console.log('!!! --> xhr: ', xhr);

                /* if a new topic was created, prevent user from manually reloading view and creating a new blank topic */
                if(xhr.new_topic){
                    sn_topics.id = xhr.topic_id;
                    let current = window.location.href;
                    window.location.replace(current.replace("create", "edit/" + xhr.topic_id));
                    document.querySelector('meta[name="topic-id"]').content = xhr.topic_id;
                    document.querySelector("input[name='topic_id']").value = xhr.topic_id;
                }

                /* populate preview element data */
                if (file.previewElement) {

                    file.previewElement.classList.remove('dz-processing');
                    file.previewElement.classList.add('dz-complete');

                    file.previewElement.dataset.media_id = xhr.media_id;
                    file.previewElement.dataset.type = xhr.ext;
                    file.previewElement.dataset.metas = 'title|' + file.upload.filename + ',original_file_size|' + xhr.original_file_size;
                    file.previewElement.dataset.title = file.upload.filename;

                    file.previewElement.querySelector(".dz-filename").innerText = file.upload.filename;
                    file.previewElement.querySelector(".dz-size").dataset.type = xhr.ext;
                    // if(file.upload.filename.length > 1){ file.previewElement.querySelector('.dz-abbr').innerText = file.upload.filename[0].toUpperCase() + file.upload.filename[1].toLowerCase(); }
                    if(!sn_media.mediaThumbs.includes(xhr.ext)){ file.previewElement.dataset.original = xhr.urls.original; }

                    document.body.classList.add('updated');
                    if(document.body.hasAttribute('data-topic_id')){
                        document.querySelector("input[name='topic_id']").value = xhr.topic_id;
                    }

                    /* images */
                    if(sn_media.mediaSNImages.includes(xhr.ext)){
                        file.previewElement.classList.add('tsniam');
                        file.previewElement.dataset.original = xhr.urls.original;
                    }

                    /* videos urls, poster and .dz-preview thumbnail */
                    if(sn_media.userUploadedVideos.includes(xhr.ext)){
                        /* file.previewElement.classList.add('processing'); */
                        file.previewElement.classList.add('tuuvam');
                        /* file.previewElement.removeAttribute('data-thumbnail'); */

                        if(xhr.urls.original){
                            file.previewElement.setAttribute('data-original', xhr.urls.original);
                            file.previewElement.setAttribute('data-poster', xhr.urls.poster);
                            file.previewElement.querySelector('img').setAttribute('src', xhr.urls.poster);
                            /* file.previewElement.setAttribute('data-mp4', '/media/uploads/' + xhr.media_id + '/video.mp4'); */
                            /* file.previewElement.setAttribute('data-webm', '/media/uploads/' + xhr.media_id + '/video.webm'); */
                            /* file.previewElement.setAttribute('data-ogg', '/media/uploads/' + xhr.media_id + '/video.ogg'); */
                        }
                    }

                    setTimeout(() => {
                        document.body.classList.remove('updated');
                        console.log('zid', zid);
                        if(zid !== 'global'){
                            sncms_dz_func.saveSortedMediaZone(zid);
                        }
                    }, 2000);
                }
            });

            // remove file
            this.on('removedfile', function(file, xhr, formData) {
                if(
                    !file.previewElement.classList.contains('dz-error') &&
                    file.previewElement.dataset.media_id !== 'new'
                ){
                    let data = { 'id': file.previewElement.dataset.media_id };
                    sn_helpers.postData(sn_globals.cms_url + '/media/destroy/' + file.previewElement.dataset.media_id, 'post', data)
                        .then(data => {
                            console.log('!!! --> removedfile: ', data);
                            console.log('zid', zid);
                            if(zid !== 'global'){
                                sn_media.saveMediaSortData(zid);
                            }
                        })
                        .catch((error) => { console.error('!!! -- removedfile error:', error); });
                }
                file.previewElement.remove();
            });

            this.on('dragenter', function(file, xhr, formData) { console.log('file', file); if(Object.is(file.fromElement, null)){ this.element.classList.add("dz-drag-hover"); } });
            this.on('dragover', function(file, xhr, formData) { console.log('file', file); if(Object.is(file.fromElement, null)){ this.element.classList.add("dz-drag-hover"); } });
            this.on('dragleave', function(file, xhr, formData) { console.log('file', file); if(Object.is(file.fromElement, null)){ this.element.classList.remove("dz-drag-hover");  }});
            this.on('drop', function(file, xhr, formData) { console.log('file', file); if(Object.is(file.fromElement, null)){ this.element.classList.remove("dz-drag-hover"); } });
            this.on('dragend', file => { console.log('file', file); this.element.classList.remove("dz-drag-hover"); });
            this.on('complete', function(file, xhr, formData) { sn_media.mediaWFileCheck(); console.log('!!! --> mediaWFileCheck @ dz.complete'); });
            this.on('dragstart', function(file, xhr, formData) {});
            this.on('processing', function(file, xhr, formData) {});
            this.on('thumbnail', function(file, xhr, formData) {});
            this.on('queuecomplete', function(file, xhr, formData) {});
            this.on("maxfilesexceeded", function(file){});
            this.on('reset', function(file, xhr, formData) {});
            this.on('errormultiple', function(file, xhr, formData) {});
            this.on('processingmultiple', function(file, xhr, formData) {});
            this.on('uploadprogress', function(file, xhr, formData) {});
            this.on('totaluploadprogress', function(file, xhr, formData) {});
            this.on('sendingmultiple', function(file, xhr, formData) {});
            this.on('successmultiple', function(file, xhr, formData) {});
            this.on('canceled', function(file, xhr, formData) {});
            this.on('canceledmultiple', function(file, xhr, formData) {});
            this.on('completemultiple', function(file, xhr, formData) {});
            this.on('maxfilesexceeded', function(file, xhr, formData) {});
            this.on('maxfilesreached', function(file, xhr, formData) {});
        },
        params(files, xhr, chunk) {
            if (chunk) {
                return {
                    dzuuid: chunk.file.upload.uuid,
                    dzchunkindex: chunk.index,
                    dztotalfilesize: chunk.file.size,
                    dzchunksize: this.options.chunkSize,
                    dztotalchunkcount: chunk.file.upload.totalChunkCount,
                    dzchunkbyteoffset: chunk.index * this.options.chunkSize,
                };
            }
        },

    },

    'mediaWFileCheck': () => {

        /* if/when required again, convert to for each...
        if(sn_media.mediaDZs[FILE_ID]){
            document.body.classList.add('dz');
            let media = sn_media.mediaDZs[FILE_ID].querySelectorAll('.dz-preview');
            if (media.length > 0) { sn_media.mediaDZs[FILE_ID].classList.remove("empty"); }
            else { sn_media.mediaDZs[FILE_ID].classList.add("empty"); }
        }

         */


    },

    'openGlobalMediaLibrary': (e) => {
        window.open(sn_globals.cms_url + '/media/all/' + document.body.dataset.topic_id + '/' + e.target.closest('.snfwi').dataset.field, "_self");
    },

    'openGlobalMediaLibraryListener': () => {
        let globalMediaLibraryTriggers = document.querySelectorAll(".openGlobalMediaLibrary");
        if(globalMediaLibraryTriggers){
            for (let g = 0; g < globalMediaLibraryTriggers.length; g++) {
                globalMediaLibraryTriggers[g].removeEventListener('click', sn_media.openGlobalMediaLibrary);
                globalMediaLibraryTriggers[g].addEventListener('click', sn_media.openGlobalMediaLibrary, null);
            }
        }
    },

    'toggleDZPreviewContextMenus': (e) => {
        let t = e.target.closest('.dz-preview');
        t.classList.toggle('cm');
        t.addEventListener("mouseleave", function(b) {
            b.target.classList.remove('cm', 'warn', 'media_id-copied');
        })
    },

    'toggleDZPreviewContextMenusListener': () => {
        let DZPreviewContextMenuToggles = document.querySelectorAll("#mediaDZ .dz-preview .cm");
        if(DZPreviewContextMenuToggles){
            for (let p = 0; p < DZPreviewContextMenuToggles.length; p++) {
                DZPreviewContextMenuToggles[p].removeEventListener('click', sn_media.toggleDZPreviewContextMenus, null);
                DZPreviewContextMenuToggles[p].addEventListener('click', sn_media.toggleDZPreviewContextMenus, null);
            }
        }
    },

    'deleteMedia': () => {
        if(sn_helpers.contextMenu.dataset.media_id !== 'new'){
            let data = { 'id': sn_helpers.contextMenu.dataset.media_id };
            sn_helpers.postData(sn_globals.cms_url + '/media/destroy/' + sn_helpers.contextMenu.dataset.media_id, 'post', data)
                .then(data => {
                    console.log('!!! --> sn_helpers.postData response @ sn_media.deleteMedia: ', data);

                    let targetDirectory = document.querySelector("#filesW li.directory[data-name='" + sn_helpers.contextMenu.dataset.media_id + "']");
                    if(targetDirectory){ targetDirectory.remove(); }

                    document.body.classList.add('updated');
                    setTimeout(() => {
                        document.body.classList.remove('updated');
                    }, 2000);
                })
                .catch((error) => { console.error('!!! --> sn_media.deleteMedia error:', error); });
        }


        let target_preview_element = document.querySelector(".dz-preview[data-media_id='" + sn_helpers.contextMenu.dataset.media_id + "']");
        let zid = target_preview_element.closest('.snfw') ? target_preview_element.closest('.snfw').id : 'global';
        target_preview_element.remove();

        console.log('zid', zid);
        if(zid !== 'global'){
            sncms_dz_func.saveSortedMediaZone(zid);
        }

        sn_media.mediaWFileCheck(zid);
        console.log('!!! --> sn_helpers.mediaWFileCheck @ sn_helpers.deleteMedia');
    },


    'updateTargetMediaMeta' : (target) => {
        try {
            let metas = sn_media.mediaModal.querySelectorAll('.snfw.meta .media-input');
            if(metas){
                let metaString = '';
                for (let i = 0; i < metas.length; i++) {
                    metaString += metas[i].dataset.meta + '|' +  metas[i].innerText + ',';
                }
                target.dataset.metas = metaString.substring(0, metaString.length - 1);
                console.log('updateTargetMediaMeta produced this string: ', metaString.substring(0, metaString.length - 1));
            }
        } catch (error) {
            console.log('updateTargetMediaMeta ran into an issue...');
        }
    },

    'metaStringToObject' : (string) => {
        try {
            let metaObject = {};
            /* tags|null,notes|null,title|Great Image,description|null,original_file_size|679428 */
            let kvs = string.split(',');
            for (let i = 0; i < kvs.length; i++) {
                let kv = kvs[i].split('|');
                metaObject[kv[0]] = kv[1];
            }
            return metaObject;
        } catch (error) {
            console.log('metaStringToObject ran into an issue...');
        }
    },

    'metaObjectToString' : (metaObject) => {
        try {
            let metaString = '';

            console.log('metaObject: ', JSON.parse(metaObject));
            for (const [k, v] of Object.entries(JSON.parse(metaObject))) {
                metaString += k + '|' + v + ',';
            }
            return metaString.substring(0, metaString.length - 1);
        } catch (error) {
        }
    },

    'mediaTitleSizeFromMeta' : (input) => {
        try {
            let object = null;
            if(input.constructor === String) { object = JSON.parse(input); }
            else if(input.constructor === Object) { object = input; }
            console.log('object for size: ', object);
            let title = '';
            for (const [k, v] of Object.entries(JSON.parse(object))) {
                if(k === 'title'){ title = v; }
                if(k === 'original_file_size'){ title = title + ' | ' + sn_helpers.fileSize(v); }
            }
            console.log('result for title_size: ', title);

            return title;
        } catch (error) {
        }
    },

    'mediaSizeFromMeta' : (input) => {
        try {

            let object = null;
            if(input.constructor === String) { object = JSON.parse(input); }
            else if(input.constructor === Object) { object = input; }
            console.log('object for size: ', object);
            let size = '';
            for (const [k, v] of Object.entries(JSON.parse(object))) {
                if(k === 'original_file_size'){ size = sn_helpers.fileSize(v); }
            }
            console.log('result for size: ', size);
            return size;
        } catch (error) {
        }
    },

    'populateMediaPreviewElement': (element, file) => {

        /*

        // baseline
        element.dataset.media_id = file.media_id;
        element.dataset.type = file.type;


        let metasString = '';
        let metasObject = false;
        if(file.metas) {
            console.log('1. file.metas is set...');
            if(file.metas.constructor === String) { metasObject = JSON.parse(file.metas); }
            else if(file.metas.constructor === Object) { metasObject = file.metas; }
            console.log('-----------> metasObject: ', metasObject);
            if(metasObject.constructor === Object){
                for (const [k, v] of Object.entries(metasObject)) {
                    metasString += k + ':' + v + '|';
                }
                return metasString.substring(0, metasString.length - 1);
            }
        }
        element.dataset.metas = metasString;

        element.querySelector('[data-dz-size]').innerHTML = sn_helpers.fileSize(file.size);
        element.querySelector(".dz-size").dataset.type = file.type;
        element.classList.add('dz-complete');
        // element.classList.add('dz-success');
        // element.querySelector('.dz-created_at').innerText = file.created_at;
        // element.querySelector('.dz-created_by').innerText = img.created_by;

        // if viewing global media, is this specific media in use by the current topic_id?
        if(sn_media.sn_selectedMediaIDs && sn_media.sn_selectedMediaIDs.includes(file.media_id)){ element.classList.add('selected'); }

        // outside vendor videos (youtube|vimeo)
        if(sn_media.outsideVendorVideos.includes(file.type)){
            element.classList.add('tovvam'); // toggle outside vendor video media modal
            element.dataset.vendor_media_id = file.vendor_media_id;
            if(file.type === 'vimeo') { sn_media.setVimeoPosterURL(file.vendor_media_id, element.querySelector('img')); }
            else if(file.type === 'youtube') { sn_media.setYouTubePosterURL(file.vendor_media_id, element.querySelector('img')); }
        }

        // user uploaded videos
        if(sn_media.userUploadedVideos.includes(file.type)){
            element.classList.add('tuuvam');
            element.removeAttribute('data-thumbnail');
            element.setAttribute('data-original', file.urls.original);
            // element.setAttribute('data-mp4', file.urls.mp4);
            // element.setAttribute('data-webm', file.urls.webm);
            // element.setAttribute('data-ogg', file.urls.ogg);
            element.setAttribute('data-poster', file.urls.poster);
            element.querySelector('img').setAttribute('src', file.urls.poster);
        }


        // console.log('---------------------->   file: ', file);



        if(sn_media.mediaSNImages.includes(file.type)){
            element.classList.add('tsniam'); // toggles media modal
            element.dataset.original = file.urls['original'];
            element.querySelector('img').setAttribute('alt', file.metas.title);
        }



        return element;

        */


    },

    'getMediaPreviewURL': (file) => {
        if(file.urls === 'new') { return 'new'; }
        if(file.urls['thumbnail']) { return file.urls['thumbnail']; }
        if(file.urls['poster']) { return file.urls['poster']; }
        if(file.urls['original']) { return file.urls['original']; }
        console.log('file.urls: ', file.urls);
        return null;
    },

    'initMediaManager': () => {
        sn_media.openGlobalMediaLibraryListener();
        sn_media.toggleMediaModalListener();
        sn_helpers.initContentEditables();
        sn_media.toggleDZPreviewContextMenusListener();
        sn_media.mediaWFileCheck();
        sn_media.listenSetOutVendorVideoURL();
    },

    'setUserUploadedVideoViewerURLS': (target) => {
        /* sn_media.userUploadedVideoW.querySelector("img").src = target.dataset.poster; */
        sn_media.userUploadedVideo.setAttribute('poster', target.dataset.poster);
        let types = {
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'ogg': 'video/ogg',
        }
        sn_media.userUploadedVideo.querySelector("source[type='" + types[target.dataset.type] + "']").setAttribute('src', target.dataset.original);
        /* sn_media.userUploadedVideo.querySelector("source[type='video/mp4']").setAttribute('src', target.dataset.mp4); */
        /* sn_media.userUploadedVideo.querySelector("source[type='video/webm']").setAttribute('src', target.dataset.webm); */
        /* sn_media.userUploadedVideo.querySelector("source[type='video/ogg']").setAttribute('src', target.dataset.ogg); */
        sn_media.userUploadedVideo.load();
    }

};

sn_media.initMediaManager();




/* ~~~~~~~~~~~~~~~~~~~~ media  sortables ~~~~~~~~~~~~~~~~~~~~ */

if(sn_media.sn_mediaDZWs){

    for (let z = 0; z < sn_media.sn_mediaDZWs.length; z++) {

        if(sn_media.mediaDZSortable){
            console.log('there is a sortable');


        }



    }

}





// sn_media.initMediaManager();





/*

video transcript creator code




if(sn_media.userUploadedVideoViewer){
    const pps = document.querySelectorAll(".pp");
    function togglePlayPause() {

        if(sn_media.userUploadedVideoW.classList.contains('pause')){

            sn_media.userUploadedVideo.play();
            sn_media.userUploadedVideoW.classList.remove("pause");
            sn_media.userUploadedVideoW.classList.add("play");
            console.log('video should be playing');

        } else {

            sn_media.userUploadedVideo.pause();
            sn_media.userUploadedVideoW.classList.add("pause");
            sn_media.userUploadedVideoW.classList.remove("play");
        }

    }

    let secondsDisplay = document.getElementById('secondsDisplay');

    sn_media.userUploadedVideo.addEventListener("timeupdate", () => {
        if(sn_media.userUploadedVideo.currentTime > 0){
            sn_media.userUploadedVideo.controls = true;
        }
    });

    pps.forEach(pp => {
        // pp.addEventListener("click", togglePlayPause);
        // console.log('togglePlayPause FIRED TOO');
    });

    sn_media.userUploadedVideo.addEventListener('ended', function() {
        // sn_media.userUploadedVideo.controls = false;
        sn_media.userUploadedVideoW.classList.remove("play");
    });

    document.addEventListener("playVideo", () => {
        togglePlayPause();
    });
    document.addEventListener("pauseVideo", () => {
        togglePlayPause();
    });


    sn_media.userUploadedVideo.addEventListener('timeupdate', function() {
        window.videoCurrentTime = sn_media.userUploadedVideo.currentTime;
        // secondsDisplay.innerText = sn_media.userUploadedVideo.currentTime;
        // console.log('window.videoCurrentTime: ', window.videoCurrentTime);
    });

}




 */











