
Dropzone.autoDiscover = false;


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

    'setVimeoPosterURL': async (vendor_media_id, target_img) =>  {
        try{
            await fetch('https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + vendor_media_id)
                .then((response) => {
                    if (!response.ok) { /* throw new Error('vimeo video poster not found'); */ }
                    return response.json();
                })
                .then((data) => {
                    target_img.src = data.thumbnail_url;
                    return true;
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

    'setYouTubePosterURL': (vendor_media_id, target_img) => {
        target_img.src = 'https://img.youtube.com/vi/' + vendor_media_id + '/0.jpg';
        return true;
    },

    'setOutsideVendorVideoURL': () => {
        let url = '';
        if(sn_media.activeMedia.type === 'youtube'){ url = 'https://www.youtube.com/embed/' + sn_media.activeMedia.vendor_media_id + '?autoplay=1&loop=0&byline=1&title=1'; }
        else if(sn_media.activeMedia.type === 'vimeo'){ url = 'https://player.vimeo.com/video/' + sn_media.activeMedia.vendor_media_id + '?autoplay=1&loop=0&byline=1&title=1'; }
        sn_media.outsideVendorVideoViewer.querySelector('iframe').src = url;
    },

    'saveMedia': () => {
        sn_media.activeMedia.topic_id = sn_topics.activeTopic.id;
        sn_media.activeMedia.parent_slug = sn_topics.activeTopic.parent_slug;
        sn_helpers.postData(sn_globals.cms_url + '/media/save', 'post', sn_media.activeMedia)
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

    },

    'createMediaPreviewElementNotDZFile': (mockFile, target) => {
        let mediaPreview = document.querySelector('#sn_mediaDZTemplate .dz-preview').cloneNode(true);
        if(sn_media.mediaThumbs.includes(mockFile.type)){ mediaPreview.querySelector('img').src = sn_media.getMediaPreviewURL(mockFile); }
        mediaPreview = sn_media.populateMediaPreviewElement(mediaPreview, mockFile);
        sn_media.dzs[sn_media.activeMedia.dzid].append(mediaPreview);
        sn_media.dzs[sn_media.activeMedia.dzid].classList.remove('empty');
    },

    'createMediaPreviewElementDZ': (dz, file) => {
        let mf = { name: file.title, size: file.size };
        dz.options.addedfile.call(dz, mf);
        dz.files.push(mf);
        console.log('file.type: ', file.type);
        console.log('sn_media.mediaThumbs', sn_media.mediaThumbs);

        if(sn_media.mediaThumbs.includes(file.type) || file.type === 'svg'){
            dz.options.thumbnail.call(dz, mf, sn_media.getMediaPreviewURL(file));
        }
        else if(sn_media.outsideVendorVideos.includes(file.type)){
        }
        mf.previewElement = sn_media.populateMediaPreviewElement(mf.previewElement, file);
    },

    'setActiveMediaData': (target) => {

        console.log('setActiveMediaData target ----> ', target);

        let topic_id = document.body.dataset.topic_id;
        let topic_field= target.closest('.snfw') ? target.closest('.snfw').dataset.field : document.body.dataset.topic_field;
        let media_id = null;

        /* youtube or vimeo */
        if(target.hasAttribute('data-accepted') && (target.dataset.accepted === 'youtube') || target.dataset.accepted === 'vimeo'){
            media_id = 'new'
        }

        /* core */
        sn_media.activeMedia = {
            'topic_id': topic_id,
            'topic_field': topic_field,
            'media_id': media_id ? media_id : target.dataset.media_id,
            'vendor_media_id': target.dataset.vendor_media_id,
            'original': target.dataset.original,
            'type': target.dataset.type,
            'aft': target.closest('.snfw') ?  target.closest('.snfw').dataset.aft : null,
            'dzid': target.closest('.snfw') ? target.closest('.snfw').id : 'global'
        };

        /* metas */
        if(!Object.is(target.dataset.metas, null) && !Object.is(target.dataset.metas, undefined)) {
            sn_media.activeMedia['metas'] = sn_media.metaStringToObject(target.dataset.metas);
        }
        console.log('setActiveMediaData result (sn_media.activeMedia): ', sn_media.activeMedia);
    },

    'toggleMediaModal': (e) => {

        if(e.target.closest('.dz-preview')) { sn_media.setActiveMediaData(e.target.closest('.dz-preview')); }

        if(document.body.hasAttribute('data-media-modal-close-reload')){
            window.location.replace(document.body.getAttribute('data-media-modal-close-reload'));
        }

        // e.preventDefault();
        let target = e;
        if(!e.isConnected){ target = e.target; }

        // sn_media.updateTargetMediaMeta(target);

        /* close */
        if(document.body.hasAttribute('data-media_modal_status')){

            let target_dz_preview_element = document.querySelector("[data-media_id='" + sn_media.activeMedia.media_id + "']");
            target_dz_preview_element.dataset.metas = sn_media.metaObjectToString(sn_media.activeMedia.metas);

            if(document.body.dataset.media_modal_status === 'ovv' && sn_media.outsideVendorVideoID.innerText.length > 3){
                console.log('save one...');
                sn_media.saveMedia();
            }
            else if(document.body.dataset.media_modal_status !== 'ovv') {
                sn_media.saveMedia();
                console.log('save two...');
            }


            // sn_media.saveMedia();
            document.body.classList.add('updated');
            setTimeout(() => {
                document.body.classList.remove('updated');
            }, 2000);

            sn_media.userUploadedVideo.pause();
            sn_media.userUploadedVideoViewer.removeAttribute('data_media_id');
            // sn_media.userUploadedVideoW.querySelector("img").removeAttribute('src');
            sn_media.userUploadedVideo.removeAttribute('poster');
            sn_media.userUploadedVideo.querySelector("source[type='video/mp4']").removeAttribute('src');
            sn_media.userUploadedVideo.querySelector("source[type='video/webm']").removeAttribute('src');
            sn_media.userUploadedVideo.querySelector("source[type='video/ogg']").removeAttribute('src');

            document.body.removeAttribute('data-media_modal_vendor_media_id');
            document.body.removeAttribute('data-media_modal_media_type');
            document.body.removeAttribute('data-media_modal_status');

            sn_media.snDocumentImageViewer.removeAttribute('src');
            if(sn_media.snVideoViewer.querySelector('video')) { sn_media.snVideoViewer.querySelector('video').remove(); }
            sn_media.outsideVendorVideoViewer.querySelector('iframe').removeAttribute('src');
            sn_media.activeMedia = false;

            /* convert below to a for each on all meta */

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


            // userUploadedVideo stuff...

        }

        /* open */
        else {

            /* click from .dz-preview */
            if(target.closest('.dz-preview')){
                target = target.closest('.dz-preview');
            }

            /* click from #sn_contextMenu ul#sn_CMDZMedia li.edit-details */
            else if(target.closest("ul#sn_CMDZMedia")){
                target = document.querySelector(".dz-preview[data-media_id='" + target.closest('ul').dataset.media_id + "']");
            }

            /* click from add vimeo or youtube button */
            else if(target.classList.contains('snfw')) {
                target.dataset.title = e.target.dataset.type.charAt(0).toUpperCase() + e.target.dataset.type.slice(1) + ' Video';
                target.dataset.description = '';
                target.dataset.original = '';
                target.dataset.type = e.target.dataset.type;
                target.dataset.vendor_media_id = 'new';
                target.dataset.size = '';
                target.dataset.tags = 'video, ' +  e.target.dataset.type;
                target.dataset.dzid = target.closest('.snfw') ? target.closest('.snfw').id : 'global'; /* global uploads have since been disabled */
            }

            if(!target.classList.contains('snfw') && !Object.is(sn_media.activeMedia['metas'], undefined) && !Object.is(sn_media.activeMedia['metas'].original_file_size, undefined)) {
                target.dataset.size = sn_helpers.fileSize(sn_media.activeMedia['metas'].original_file_size);
            }

            let dzid = target.closest('.snfw') ? target.closest('.snfw').id : 'global';

            /* set active media data */
            sn_media.setActiveMediaData(target);

            /* set ui values */
            sn_media.dzWs[dzid].dataset.type = sn_media.activeMedia.type;
            sn_media.mediaSize.innerText = target.dataset.size;
            sn_media.mediaType.innerText = target.dataset.type;

            /* set the metas */
            if(sn_media.mediaMetas){

                /* apply the newly created object values to their associated contenteditables */
                for (let m = 0; m < sn_media.mediaMetas.length; m++) {
                    let ce = sn_media.mediaMetas[m].querySelector('[contenteditable]');

                    if(
                        !Object.is(ce.dataset.meta, undefined) &&
                        !Object.is(sn_media.activeMedia['metas'], undefined) &&
                        sn_media.activeMedia['metas'][ce.dataset.meta.trim()] !== undefined &&
                        sn_media.activeMedia['metas'][ce.dataset.meta.trim()] !== 'undefined' &&
                        sn_media.activeMedia['metas'][ce.dataset.meta.trim()] !== null &&
                        sn_media.activeMedia['metas'][ce.dataset.meta.trim()] !== 'null'
                    ) {
                        ce.innerText = sn_media.activeMedia['metas'][ce.dataset.meta.trim()];
                    }
                }
            }

            /* now set the ui to be displayed based on the file type */

            /* image stored in the local file, so  */
            if(target.classList.contains('tsniam')){ // this class never gets set...
                document.body.setAttribute('data-media_modal_status', 'sni');
                sn_media.snDocumentImageViewer.src = sn_media.activeMedia.original; // and this is undefined...
            }

            /* user uploaded video */
            else if(target.classList.contains('tuuvam')){
                document.body.setAttribute('data-media_modal_status', 'uuv');
                sn_media.userUploadedVideoViewer.dataset.media_id = sn_media.activeMedia.media_id;
                if(sn_media.activeMedia.media_id !== 'new'){
                    sn_media.setUserUploadedVideoViewerURLS(target);
                }
            }

            /* outside vendor video */
            else if(sn_media.activeMedia.aft === 'youtube' || sn_media.activeMedia.aft === 'vimeo'){
                document.body.setAttribute('data-media_modal_media_type', sn_media.activeMedia.type);
                document.body.setAttribute('data-media_modal_vendor_media_id', sn_media.activeMedia.vendor_media_id);
                document.body.setAttribute('data-media_modal_status', 'ovv');
                sn_media.outsideVendorVideoID.dataset.vendor = sn_media.activeMedia.type;
                sn_media.outsideVendorVideoID.dataset.cv = sn_media.activeMedia.vendor_media_id;
                sn_media.dzWs[dzid].dataset.vendor_media_id = sn_media.activeMedia.vendor_media_id;
                // sn_media.outsideVendorVideoViewer.dataset.vendor_media_id = sn_media.activeMedia.vendor_media_id;
                if(sn_media.activeMedia.media_id !== 'new'){
                    sn_media.setOutsideVendorVideoURL(target);
                    sn_media.outsideVendorVideoID.innerText = sn_media.activeMedia.vendor_media_id;
                }
            }

            /* documents of all types */
            else if(
                target.dataset.type ==='doc' ||
                target.dataset.type ==='docx' ||
                target.dataset.type ==='xls' ||
                target.dataset.type ==='xlsx' ||
                target.dataset.type ==='ppt' ||
                target.dataset.type ==='pptx' ||
                target.dataset.type ==='pdf' ||
                target.dataset.type ==='svg' ||
                target.dataset.type ==='txt' ||
                target.dataset.type ==='json'
            ){
                document.body.setAttribute('data-media_modal_status', 'document');
                sn_media.documentSummary.dataset.type = target.dataset.type;
            }

        }
    },

    'toggleMediaModalListener': () => {
        let modalTriggers = document.querySelectorAll(".dz-preview .dz-image, .snfw[data-aft='vimeo'], .snfw[data-aft='youtube'], .closeModal, ul#sn_CMDZMedia li.edit-details");
        if(modalTriggers){
            for (let m = 0; m < modalTriggers.length; m++) {
                modalTriggers[m].removeEventListener('click', sn_media.toggleMediaModal);
                modalTriggers[m].addEventListener('click', sn_media.toggleMediaModal, null);
            }
        }
    },

    /* adjust to field specific */

    'toggleSelectedMedia': (targetDZPreview) => {

        if(document.body.id !== 'superniftycms-media-index'){
            let dzid = targetDZPreview.closest('.snfw') ? targetDZPreview.closest('.snfw').id : 'global';
            targetDZPreview.remove();

            sn_media.saveMediaSortData(dzid);
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
        url: sn_globals.cms_url + '/media/save',
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
            this.element.querySelector('.dz-default.dz-message').remove();
            let snfw = this.element.closest('.snfw');
            let dzid = snfw ? snfw.id : 'global';

            this.options.clickable = snfw.dataset.aft !== 'youtube' && snfw.dataset.aft !== 'vimeo';
            console.log('snfw.dataset.aft: ', snfw.dataset.aft);


            /* load existing media */
            if(!Object.is(sn_media.sn_existingMedia[dzid], null)) {
                try {
                    for (const existingSourceMedia of sn_media.sn_existingMedia[dzid]) {
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
                        console.log('dzid', dzid);
                        if(dzid !== 'global'){
                            sn_media.saveMediaSortData(dzid);
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
                            console.log('dzid', dzid);
                            if(dzid !== 'global'){
                                sn_media.saveMediaSortData(dzid);
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
        let dzid = target_preview_element.closest('.snfw') ? target_preview_element.closest('.snfw').id : 'global';
        target_preview_element.remove();

        console.log('dzid', dzid);
        if(dzid !== 'global'){
            sn_media.saveMediaSortData(dzid);
        }

        sn_media.mediaWFileCheck(dzid);
        console.log('!!! --> sn_helpers.mediaWFileCheck @ sn_helpers.deleteMedia');
    },

    'saveMediaSortData': (dzid) => {

        console.log('sn_media.dzs: ', sn_media.dzs);
        console.log('dzid: ', dzid);
        if(sn_media.dzs[dzid]){
            console.log('zlorp');
            let mediaSortOrder= [];
            let media = sn_media.dzs[dzid].querySelectorAll(".dz-preview");
            if(media){
                for (let a = 0; a < media.length; a++) {
                    mediaSortOrder.push(media[a].dataset.media_id);
                }
                sn_media.dzs[dzid].classList.remove('empty');
            }
            else { sn_media.dzs[dzid].classList.add('empty'); }

            let mediaSortData = {
                'topic_id': document.body.dataset.topic_id,
                'topic_field': sn_media.dzs[dzid].closest('.snfw').dataset.field,
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
                .catch((error) => { console.error('!!! --> saveMediaSortData error:', error); });
        }
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
            for (const [k, v] of Object.entries(metaObject)) {
                metaString += k + '|' + v + ',';
            }
            return metaString.substring(0, metaString.length - 1);
        } catch (error) {
        }
    },

    'mediaTitleSizeFromMeta' : (metaObject) => {
        try {
            let title = '';
            for (const [k, v] of Object.entries(metaObject)) {
                if(k === 'title'){ title = v; }
                if(k === 'original_file_size'){ title = title + ' | ' + sn_helpers.fileSize(v); }
            }
            return title;
        } catch (error) {
        }
    },

    'populateMediaPreviewElement': (element, file) => {

        /* baseline */
        element.dataset.media_id = file.media_id;
        element.dataset.type = file.type;

        /* store meta data as string in .dz-preview data-metas */
        if(!Object.is(file.metas, null)) {
            element.dataset.metas = sn_media.metaObjectToString(file.metas);
            element.dataset.title_size = sn_media.mediaTitleSizeFromMeta(file.metas);
        }

        element.querySelector('[data-dz-size]').innerHTML = sn_helpers.fileSize(file.size);
        element.querySelector(".dz-size").dataset.type = file.type;
        element.classList.add('dz-complete');
        /* element.classList.add('dz-success'); */
        /* element.querySelector('.dz-created_at').innerText = file.created_at; */
        /* element.querySelector('.dz-created_by').innerText = img.created_by; */

        /* if viewing global media, is this specific media in use by the current topic_id? */
        if(sn_media.sn_selectedMediaIDs && sn_media.sn_selectedMediaIDs.includes(file.media_id)){ element.classList.add('selected'); }

        /* outside vendor videos (youtube|vimeo) */
        if(sn_media.outsideVendorVideos.includes(file.type)){
            element.classList.add('tovvam'); // toggle outside vendor video media modal
            element.dataset.vendor_media_id = file.vendor_media_id;
            if(file.type === 'vimeo') { sn_media.setVimeoPosterURL(file.vendor_media_id, element.querySelector('img')); }
            else if(file.type === 'youtube') { sn_media.setYouTubePosterURL(file.vendor_media_id, element.querySelector('img')); }
        }

        /* user uploaded videos */
        if(sn_media.userUploadedVideos.includes(file.type)){
            element.classList.add('tuuvam');
            element.removeAttribute('data-thumbnail');
            element.setAttribute('data-original', file.urls.original);
            /* element.setAttribute('data-mp4', file.urls.mp4); */
            /* element.setAttribute('data-webm', file.urls.webm); */
            /* element.setAttribute('data-ogg', file.urls.ogg); */
            element.setAttribute('data-poster', file.urls.poster);
            element.querySelector('img').setAttribute('src', file.urls.poster);
        }

        /* mediaSNImages */
        if(sn_media.mediaSNImages.includes(file.type)){
            element.classList.add('tsniam'); /* toggles media modal */
            element.dataset.original = file.urls['original'];
            element.querySelector('img').setAttribute('alt', file.metas.title);
        }
        return element;
    },

    'getMediaPreviewURL': (file) => {
        if(file.urls === 'new') { return 'new'; }
        if(file.urls['thumbnail']) { return file.urls['thumbnail']; }
        if(file.urls['poster']) { return file.urls['poster']; }
        if(file.urls['original']) { return file.urls['original']; }
        return null;
    },

    'initMediaManager': () => {
        sn_media.openGlobalMediaLibraryListener();
        sn_media.toggleMediaModalListener();
        sn_helpers.initContentEditables();
        sn_media.toggleDZPreviewContextMenusListener();
        sn_media.mediaWFileCheck();
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




/* ~~~~~~~~~~~~~~~~~~~~ media dropzones & sortables ~~~~~~~~~~~~~~~~~~~~ */

if(sn_media.sn_mediaDZWs){

    for (let z = 0; z < sn_media.sn_mediaDZWs.length; z++) {

        let dzid = sn_media.sn_mediaDZWs[z].closest('.snfw') ? sn_media.sn_mediaDZWs[z].closest('.snfw').id : 'global';

        sn_media.dzWs[dzid] = sn_media.sn_mediaDZWs[z];
        sn_media.dzs[dzid] = sn_media.sn_mediaDZWs[z].querySelector(".dropzone");
        sn_media.sn_existingMedia[dzid] = sn_media.sn_mediaDZWs[z].querySelector('.sn_mediaExisting');
        sn_media.sn_existingMedia[dzid] && sn_media.sn_existingMedia[dzid].innerText.length > 0 ? sn_media.sn_existingMedia[dzid] = JSON.parse(sn_media.sn_existingMedia[dzid].innerText) : sn_media.sn_existingMedia[dzid] = null;
        console.log(sn_media.sn_existingMedia[dzid]);

        sn_media.dzs[dzid].classList.remove('vendor-video-error');

        sn_media.mediaDZObjects[dzid] = new Dropzone(sn_media.dzs[dzid], sn_media.dzOptions);

        /* override createThumbnail function for heif or heic */
        sn_media.mediaDZObjects[dzid].origCreateThumbnail = sn_media.mediaDZObjects[dzid].createThumbnail
        sn_media.mediaDZObjects[dzid].createThumbnail = function(file, ...args) {
            if (file.type === 'image/heif' || file.type === 'image/heic') {
                heic2any({ blob: file, toType: 'image/jpeg' })
                    .then(converted => sn_media.sn_media.mediaDZObjects[z].origCreateThumbnail(converted, ...args))
                    .catch(() => sn_media.sn_media.mediaDZObjects[z].origCreateThumbnail(file, ...args))
            } else {
                sn_media.mediaDZObjects[dzid].origCreateThumbnail(file, ...args)
            }
        }

        if(sn_media.mediaDZSortable){
            console.log('there is a sortable');

            sn_media.mediaDZSortables[dzid] = Sortable.create(sn_media.dzs[dzid], {
                draggable: '.dz-preview',

                onEnd: function (e) {

                    document.body.setAttribute('data-mediaSorted', true);
                    console.log('media sortable ended...');
                    setTimeout(() => {
                        document.body.removeAttribute('data-mediaSorted');
                        sn_media.saveMediaSortData(dzid);
                        sn_media.mediaWFileCheck(dzid);
                        console.log('!!! --> mediaWFileCheck @ Sortable.onEnd: source');
                    }, 500);
                },
            });

        }

        console.log('marfle again:', sn_media.dzs[dzid]);


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











