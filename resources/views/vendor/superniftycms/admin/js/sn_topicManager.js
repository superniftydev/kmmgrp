'use strict';
/*
import '../bootstrap';
import Alpine from 'alpinejs';
import Isotope from 'isotope-layout';
import Sortable from 'sortablejs';

 */



// window.Alpine = Alpine;
// Alpine.start();
window.scrollTo(0,1);

window.sn_topics = {

    'activeTopic': {},
    'topicActionButtons': document.querySelectorAll('.topicActions [data-a]') ? document.querySelectorAll('.topicActions [data-a]') : null,
    'topicTagsW': document.querySelector('#topicTagsW') ? document.querySelector('#topicTagsW') : null,
    'topicTagsInput': document.querySelector('#topicTagsInput') ? document.querySelector('#topicTagsInput') : null,
    'snmde': {},

    'deleteChildTopicForm': document.querySelector('#deleteChildTopicForm') ? document.querySelector('#deleteChildTopicForm') : null,
    'warnDeleteChildTopicButton': document.querySelector('#warnDeleteChildTopicButton') ? document.querySelector('#warnDeleteChildTopicButton') : null,

    'toggleEditorModeSelect': document.querySelector('#toggleEditorModeSelect') ? document.querySelector('#toggleEditorModeSelect') : null,
    'topicChildren': document.querySelector('.spreadsheet.children tbody') ? document.querySelector('.spreadsheet.children tbody') : null,
    'topicChildrenFilters': document.querySelector('#topicChildrenFilters') ? document.querySelector('#topicChildrenFilters') : null,
    'topicChildrenFilterButtons': document.querySelectorAll('#topicChildrenFilters li[data-action]') ? document.querySelectorAll('#topicChildrenFilters li[data-action]') : null,
    'manualSortTopicList': null,
    'manualSortTopicListActive': false,
    'topicFilterButtons': [],
    'topicChildrenSorts': document.querySelector('#topicChildrenSorts') ? document.querySelector('#topicChildrenSorts') : null,
    'topicChildrenSortButtons': document.querySelectorAll('#topicChildrenSorts li[data-action]') ? document.querySelectorAll('#topicChildrenSorts li[data-action]') : null,
    'topicSortButtons': [],
    'topicSortData': [],
    'sorting': false,
    'isoSortTopicList': null,
    'isoSortTopicListActive': false,
    'activetinyMce': null,

    'topicChildrenW': document.querySelector('#topicChildrenW') ? document.querySelector('#topicChildrenW') : null,
    'manualTopicSortToggle': document.querySelector('#manualTopicSortToggle') ? document.querySelector('#manualTopicSortToggle') : null,

    'topicEditForm': document.getElementById('topicEditForm') ? document.getElementById('topicEditForm') : null,

    'topicFieldTemplates': document.getElementById('sn_topicFieldTemplates') ? document.getElementById('sn_topicFieldTemplates') : null,

    'topicContentAndMetaFieldSorts': document.querySelectorAll('#topicEditForm .sort') ? document.querySelectorAll('#topicEditForm .sort') : null,

    'droppers': document.querySelectorAll('.dropper'),

    'topicChanged': () => {
        if(document.body.hasAttribute("data-url_status") && ( document.body.dataset.url_status === 'ok' || document.body.dataset.url_status === 'stet')){
            document.body.setAttribute('data-display_topic_save_button', 'y');
        }
        else {
            document.body.removeAttribute('data-display_topic_save_button');
        }
        document.body.dataset.blade = document.getElementById('topicBlade').value;


    },

    'saveTopic': (e) => {
        let data = sn_topics.constructTopicDataObject();
        console.log('data being sent to server: ', data);

        sn_helpers.postData(sn_globals.cms_url + '/topic/save', 'post', data)
            .then(response => {
                console.log('!!! --> saveTopic: ', response);
                if (response.result === 'ok') {
                    document.body.removeAttribute('data-display_topic_save_button');
                }
            })
            .catch((error) => {
                console.error('!!! --> saveTopic error:', error);
            });

    },


    /* ~~~~~~~~~~~~~~~~~~~~ toggle meta ~~~~~~~~~~~~~~~~~~~~ */

    'toggleTopicMetaData': () => {
        document.body.hasAttribute('data-display_topic_meta') ? document.body.removeAttribute('data-display_topic_meta') : document.body.setAttribute('data-display_topic_meta', 'y')
    },

    'toggleTopicMetaDataListener': () => {
        const toggleTopicMetaDataButton = document.getElementById("toggleTopicMetaData");
        if(toggleTopicMetaDataButton){
            toggleTopicMetaDataButton.removeEventListener('click', sn_topics.toggleTopicMetaData, null);
            toggleTopicMetaDataButton.addEventListener('click', sn_topics.toggleTopicMetaData, null);
        }
    },



    /* ~~~~~~~~~~~~~~~~~~~~ topic actions ~~~~~~~~~~~~~~~~~~~~ */


    'topicActions': (e) => {

        e.preventDefault(); /* for those nested in links */


        /* dashboard */
        if(e.target.dataset.a === 'newparenttopic' || e.target.dataset.a === 'newparenttopic'){
            window.open(e.target.dataset.url, "_self");
        }

        /* topic-specific actions */
        else if(e.target.closest("[data-u]")){

            let target = e.target.closest("[data-u]");
            console.log('target', target);

            if(e.target.dataset.a ==='e'){
                window.open(sn_globals.cms_url + '/topic/edit/' + e.target.closest("[data-ti]").dataset.ti, "_self");

                // console.log('e.target: ', e.target);
                // console.log('sn_globals.cms_url: ', sn_globals.cms_url);
                // console.log('e.target.closest("[data-ti]").dataset.ti: ',  e.target.closest("[data-ti]").dataset.ti);
                // console.log('url: ',  sn_globals.cms_url + '/topic/edit/' + e.target.closest("[data-ti]").dataset.ti);

            }
            else if(e.target.dataset.a ==='v'){ window.open('/' + e.target.closest("[data-u]").dataset.u, "_blank"); }


            else if(e.target.dataset.a === '+' || e.target.dataset.a === 'c') {
                let url_prefix = e.target.closest("li[data-u]").dataset.u;
                if(e.target.dataset.a === 'c'){
                    let url_prefix_parts = url_prefix.split('/');
                    url_prefix_parts.pop();
                    url_prefix = url_prefix_parts.join('/');
                    document.querySelector("#createTopicForm input[name='clone_id']").value = e.target.closest("li[data-ti]").dataset.ti;
                }
                document.querySelector("#createTopicForm input[name='url_prefix']").value = url_prefix;
                document.querySelector("#createTopicForm").submit();

            }

            else if(e.target.dataset.a ==='x'){
                let target = e.target.closest("li[data-ti]");
                if(target.classList.contains('warn')){
                    let destroyTopicForm = document.getElementById('destroyTopicForm');
                    destroyTopicForm.querySelector("input[name='topic_id']").value = target.dataset.ti;
                    destroyTopicForm.submit();
                }
                else {
                    target.classList.add('warn');
                    e.target.addEventListener('mouseleave', function(b) {
                        e.target.classList.remove('warn');
                    });
                }
            }

        }



        else if(e.target.dataset.a ==='topicview'){ window.open('/' + document.body.dataset.topic_url, "_blank"); }


          /*
        else if(e.target.dataset.a === 'newparenttopic'){ window.open(e.target.dataset.url, "_self"); }

        else if(e.target.dataset.a ==='topicnewchild'){
            let createChildTopicForm = document.getElementById('createChildTopicForm');
            createChildTopicForm.submit();
        }

           */

    },


    'updateTopicStatus' : (e) => {
        if(e.target.closest("[data-s]")){
            e.target.closest("[data-s]").dataset.s = e.target.dataset.v;
            e.target.closest("ul").previousSibling.dataset.l = e.target.dataset.l;
        }
        else {
            document.body.dataset.topic_status = e.target.dataset.v;
        }
        sn_helpers.postData(sn_globals.cms_url + '/topic/status/save', 'post', {
                'url': e.target.closest("[data-u]") ? e.target.closest("[data-u]").dataset.u : document.getElementById('topicURL').value,
                'status': e.target.dataset.v,
            })
            .then(response => {
                console.log('!!! --> saveTopicStatus: ', response);
            })
            .catch((error) => {
                console.error('!!! --> saveTopicStatus error:', error);
            });
    },


    'listenUpdateTopicStatus': () => {
        let topicStatusMenus = document.querySelectorAll(".sn_ddmenu.status li[data-v]");
        if(topicStatusMenus){
            for (let m = 0; m < topicStatusMenus.length; m++) {
                topicStatusMenus[m].removeEventListener('click', sn_topics.updateTopicStatus, null);
                topicStatusMenus[m].addEventListener('click', sn_topics.updateTopicStatus, null);
            }
        }
    },




    'setTextFieldTag': (e) => {
        e.target.closest(".tag").dataset.tag = e.target.value;
    },

    'listenSetTextFieldTag': () => {
        let textFieldTagSelects = document.querySelectorAll('.textTagSelect');
        if(textFieldTagSelects){
            for (let s = 0; s < textFieldTagSelects.length; s++) {
                textFieldTagSelects[s].addEventListener( "change", sn_topics.setTextFieldTag, false);
            }
        }
    },

    'deleteTopic': (e) => {
        if(e.target.classList.contains('warn')){
            document.getElementById('destroyTopicForm').submit();
        }
        else {
            e.target.classList.add('warn');
            e.target.addEventListener('mouseleave', function(b) {
                e.target.classList.remove('warn');
            });
        }
    },

    'listenDeleteTopic': () => {
        let deleteTopicButton = document.getElementById('deleteTopicButton');
        if(deleteTopicButton){
            deleteTopicButton.addEventListener( "click", sn_topics.deleteTopic, false);
        }
    },

    'listenTopicActions': () => {
        if(sn_topics.topicActionButtons) {
            for (let b = 0; b < sn_topics.topicActionButtons.length; b++) {
                sn_topics.topicActionButtons[b].addEventListener( "click", sn_topics.topicActions, false);
            }
        }
    },

    'constructTopicDataObject': () => {

        let data = {};
        let sorts = {};
        let content = {};

        data['id'] = document.body.dataset.topic_id;
        data['title'] = document.getElementById('topicTitle').innerText.trim();
        data['url'] = document.getElementById('topicURL').value.trim();
        if(data['url'].charAt(data['url'].length - 1) === '-') data['url'] = data['url'].substring(0, data['url'].length - 1);
        document.getElementById('topicURL').value = data['url']
        /* history.pushState({},"", data['url']); */

        data['blade'] = document.getElementById('topicBlade').value;

        let contentFields = document.querySelectorAll("#topicEditForm .sort.content .snfw");
        if(contentFields){
            let sort = [];
            for (let i = 0; i < contentFields.length; i++) {
                let field = {};
                console.log('xxx ---> ', contentFields[i].querySelector(".settings .n"));
                let name = contentFields[i].querySelector(".settings .n");
                field['name'] = name.innerText.length > 0 && name.innerText !== 'Untitled Field' ? sn_helpers.slugify(name.innerText.trim()) : 'untitled_field_' + i;
                content[field['name']] = {};
                sort.push(field['name']);
                if(contentFields[i].querySelector('.editor.text')){
                    content[field['name']]['type'] = 'text';
                    content[field['name']]['value'] = contentFields[i].querySelector('.editor.text').innerText;
                    content[field['name']]['sn_tag'] = contentFields[i].querySelector(".settings .tag select").value;
                }
                else if(contentFields[i].querySelector('.editor.richtext')){
                    content[field['name']]['type'] = 'richtext';
                    content[field['name']]['value'] = contentFields[i].querySelector('.editor.richtext').innerHTML;
                }
                else if(contentFields[i].querySelector('.dropzone')){
                    content[field['name']]['type'] = 'media';
                    content[field['name']]['aft'] = contentFields[i].dataset.aft;
                    let media_sort = [];
                    let media= contentFields[i].querySelectorAll('.dz-preview');
                    if(media){
                        for (let m = 0; m < media.length; m++) {
                            media_sort.push(media[m].dataset.media_id);
                        }
                    }
                    content[field['name']]['value'] = media_sort;
                }
            }
            content['sn_fso'] = sort;
        }

        let metas = {};
        metas.title = document.getElementById("metas_title").value;
        metas.description = document.getElementById("metas_description").value;
        metas.keyphrase = document.getElementById("metas_keyphrase").value;
        metas.keywords = document.getElementById("metas_keywords").value;
        metas.author = document.getElementById("metas_author").value;
        metas.robots = document.getElementById("metas_robots").value;
        metas.googlebot = document.getElementById("metas_googlebot").value;
        metas.publish_date = document.getElementById("metas_publish_date").value;
        metas.last_modified = document.getElementById("metas_last_modified").value;
        metas.remove = document.getElementById("metas_remove").value;

        let active_category_lis = document.querySelectorAll('#metas_categories li.active');
        let active_categories = [];
        if(active_category_lis){
            for (let a = 0; a < active_category_lis.length; a++) {
                active_categories.push(active_category_lis[a].innerText.toLowerCase());
            }
        }
        metas.categories = active_categories;

        let active_tag_lis = document.querySelectorAll('#metas_tags li.active');
        let active_tags = [];
        if(active_tag_lis){
            for (let a = 0; a < active_tag_lis.length; a++) {
                active_tags.push(active_tag_lis[a].innerText.toLowerCase());
            }
        }
        metas.tags = active_tags;

        metas.featured_media_id = document.getElementById('featured_media_id').dataset.featured_media_id;

        data['sn_content'] = content; /* 'sn_' prefix added to remove conflict with Laravel's protected $request->content property */
        data['metas'] = metas;
        return data;
    },


    'validateTopicURL' : () => {
        console.log('validateTopicURL...');
        let topicURLInput = document.getElementById('topicURL');
        let url = sn_helpers.urlify(topicURLInput.value);
        topicURLInput.style.width = topicURLInput.value.length + "ch";




        /* history.pushState({},"",url); */
        topicURLInput.value = url;
        if(url.length > 0){
            sn_helpers.postData(
                    sn_globals.cms_url + '/topic/validatetopicurl',
                    'post',
                    {
                        'id': document.body.dataset.topic_id,
                        'url': url
                    })
                .then(response => {
                    console.log('validateTopicURL response: ', response);
                    document.body.dataset.url_status = response.result;
                        sn_topics.topicChanged();
                    return response;
                })
                .catch((error) => { console.error('!!! --> validateTopicURL error:', error); });
        }
        else {
            return 'empty';
        }

    },

    'listenValidateTopicURL': () => {
        let topicURLInput =  document.getElementById('topicURL');
        if(topicURLInput){
            topicURLInput.addEventListener('keyup', sn_topics.validateTopicURL, false);
        }
    },


    'initSortTopicContentOrMetaFields':  (target) => {
        Sortable.create(target, {
            draggable: ".snfw",
            handle: ".settings .h",
            group: {
                name: "fields",
                put: true,
                ghostClass: "sortable-ghost",
                animation: 150,
            },
            onStart: function (e) {
                console.log('before sort...');
                /* because content is often duplicated within activated tinyMCEs */
                let snfwis = document.querySelectorAll('.snfwi');
                if(snfwis){
                    for (let s = 0; s < snfwis.length; s++) {
                        snfwis[s].classList.add('sn_moving_tiny_mces');
                    }
                }
            },

            onEnd: function (e) {
                let snfwis = document.querySelectorAll('.snfwi');
                if(snfwis){
                    for (let s = 0; s < snfwis.length; s++) {
                        snfwis[s].classList.remove('sn_moving_tiny_mces');
                    }
                }
                sn_topics.topicChanged();
                setTimeout(() => {
                    console.log('target is sorted...');
                }, 1500);
            },
        });

        let fieldSource = document.querySelector('#fieldSource .w');
        if(fieldSource){

            Sortable.create(fieldSource, {
                draggable: ".snfw",
                sort: false,
                group: {
                    name: "fields",
                    pull: 'clone',
                    put: false,
                    ghostClass: 'dragging',
                    animation: 150,
                },
                onMove: function (e) {},
                onClone: function (e) {},
                onEnd: function (e) {
                    if((e.item.dataset.type === 'richtext') && e.to.classList.contains('metas')) {
                        e.item.remove();
                        return false;
                    }
                    else {
                        sn_topics.initDroppedField(e.item);
                        setTimeout(() => {
                            console.log('target is sorted...');
                        }, 500);
                    }

                },
            });

        }

    },

    'initDroppedField': (field) => {
        let type = field.dataset.type;
        let new_field_id = Math.random().toString(20).substring(2, 15);
        // field.querySelector('.n').innerText = 'untitled-field';
        field.querySelector('.snfwi').id = 'untitled-field-' + new_field_id;
        if(type === 'richtext'){
            field.querySelector('.editor.richtext').id = 't_' + document.body.dataset.topic_id + '_' + new_field_id;
        }
        sn_helpers.initContentEditables();
        sn_topics.listenDestroyContentOrMetaField();
        sn_media.initMediaManager();
        sn_topics.topicChanged();

    },

    'urlerize': (e) => {
        let topicURLInput= document.getElementById('topicURL');
        if(topicURLInput){
            let url_prefix;
            document.body.dataset.url_prefix.length > 0 ? url_prefix = document.body.dataset.url_prefix + '/' : url_prefix = '';
            topicURLInput.value = url_prefix + sn_helpers.urlify(document.getElementById('topicTitle').innerText);
            sn_topics.validateTopicURL(e);
        }
    },

    'listenURLerize': (e) => {
        let pageTitle = document.getElementById('topicTitle');
        if(pageTitle){
            pageTitle.removeEventListener('input', sn_topics.urlerize, null);
            pageTitle.addEventListener('input', sn_topics.urlerize, null);
        }
    },

    'goToURL': (e) => {
        window.open('/' + document.getElementById('topicURL').value, "_blank");
    },

    'listentGoToURL': (e) => {
        let goToURLButton = document.getElementById('gotourl');
        if(goToURLButton){
            goToURLButton.removeEventListener('click', sn_topics.goToURL, null);
            goToURLButton.addEventListener('click', sn_topics.goToURL, null);
        }
    },

    'destroyContentOrMetaField': (e) => {
        let target = e.target.closest('.snfw');
        if(target.classList.contains('warn')){
            target.remove();
            sn_topics.topicChanged();
        }
        else {
            target.classList.add('warn');
            target.addEventListener('mouseleave', function(b) {
                target.classList.remove('warn');
            });
        }
    },

    'catTagToggle': (e) => {
        e.target.classList.toggle('active');
        sn_topics.topicChanged();
    },



    'listenDestroyContentOrMetaField': (e) => {
        let destroyContentOrMetaFields = document.querySelectorAll('.settings i.x');
        if(destroyContentOrMetaFields){
            for (let b = 0; b < destroyContentOrMetaFields.length; b++) {
                destroyContentOrMetaFields[b].removeEventListener('click', sn_topics.destroyContentOrMetaField, null);
                destroyContentOrMetaFields[b].addEventListener('click', sn_topics.destroyContentOrMetaField, null);
            }
        }
    },

    'listenTopicChanges': () => {
        let updateInputs = document.querySelectorAll(".editor, .n, .aft, .sn_css, .sn_blade, .mfw input, .mfw textarea");
        if(updateInputs){
            for (let i = 0; i < updateInputs.length; i++) {
                updateInputs[i].removeEventListener('input', sn_topics.topicChanged);
                updateInputs[i].addEventListener('input', sn_topics.topicChanged, null);
            }
        }

        let fieldNameInputs = document.querySelectorAll("body#superniftycms-topics-edit select");
        if(fieldNameInputs){
            for (let i = 0; i < fieldNameInputs.length; i++) {
                fieldNameInputs[i].removeEventListener('change', sn_topics.topicChanged);
                fieldNameInputs[i].addEventListener('change', sn_topics.topicChanged, null);
            }
        }

        let metaCatTags = document.querySelectorAll("body#superniftycms-topics-edit .mfw ul li");
        if(metaCatTags){
            for (let ct = 0; ct < metaCatTags.length; ct++) {
                metaCatTags[ct].removeEventListener('click', sn_topics.catTagToggle);
                metaCatTags[ct].addEventListener('click', sn_topics.catTagToggle, null);
            }
        }




    },

    'listenSaveTopic': () => {
        let topicSaveButton = document.querySelector("#editorFormW .snSaveButton");
        if(topicSaveButton){
            topicSaveButton.removeEventListener('click', sn_topics.saveTopic);
            topicSaveButton.addEventListener('click', sn_topics.saveTopic, null);
        }
    },

    'populateDateField': () => {
        let mfw_dates = document.querySelectorAll(".mfw.date");
        if(mfw_dates){
            for (let i = 0; i < mfw_dates.length; i++) {
                mfw_dates[i].querySelector("input[type='datetime-local']").value = mfw_dates[i].dataset.date;
            }
        }
    },

    "initFileDroppers": () => {

        let droppers = document.querySelectorAll('.sncms-dropper');
        if(droppers) {
            console.log('droppers: ', droppers);

            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(e => {
                for (let d = 0; d < droppers.length; d++) {
                    droppers[d].addEventListener(e, sn_topics.preventDefaults, false);
                }
                document.body.addEventListener(e, sn_topics.preventDefaults, false);
            });

            ['dragenter', 'dragover'].forEach(e => {
                for (let d = 0; d < droppers.length; d++) {
                    droppers[d].addEventListener(e, sn_topics.highlight, false);
                }
            });

            ['dragleave', 'drop'].forEach(e => {
                for (let d = 0; d < droppers.length; d++) {
                    droppers[d].addEventListener(e, sn_topics.unhighlight, false);
                }
            });

            for (let d = 0; d < droppers.length; d++) {
                droppers[d].addEventListener('drop', sn_topics.handleDrop, false);
            }

        }

    },

    "uploadProgress": [],
    "progressBar": document.getElementById('progressBar'),

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

    "handleDrop": (e) => {

        console.log('handleDrop', e.target);

        let wrap = e.target.parentElement;
        let accepted = wrap.dataset.accepted.split('|');
        wrap.classList.remove('bad-file-type');

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
                        wrap.classList.add('bad-file-type');
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
        sn_topics.handleFiles(files);
    },

    "initializeProgress": (numFiles) => {
        sn_topics.progressBar.style.width = "0";
        sn_topics.uploadProgress = [];
        for(let i = numFiles; i > 0; i--) {
            sn_topics.uploadProgress.push(0);
        }
    },

    "updateProgress": (fileNumber, percent) => {
        sn_topics.uploadProgress[fileNumber] = percent;
        sn_topics.progressBar.style.width = sn_topics.uploadProgress.reduce((tot, curr) => tot + curr, 0) / sn_topics.uploadProgress.length + '%';
    },

    "handleFiles": (files) => {
        files = [...files];
        sn_topics.initializeProgress(files.length);
        files.forEach(sn_topics.uploadFile);
        files.forEach(sn_topics.previewFile);
    },

    "previewFile": (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            document.querySelector('#featured_media_id img').src = reader.result;
            // console.log('reader.result: ', reader.result);
        }
    },

    "uploadFile": (file, i) => {
        let url = sn_globals.cms_url + '/media/save';
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        xhr.open('post', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('X-CSRF-TOKEN', sn_helpers.csrfToken);
        xhr.responseType = 'json';

        xhr.upload.addEventListener("progress", function(e) {
            sn_topics.updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
        });

        xhr.addEventListener('readystatechange', function() {

            // working
            if (xhr.readyState === 4 && xhr.status === 200) {
                sn_topics.updateProgress(i, 100);
            }

            // complete
            else if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
                console.log('upload complete...');
            }

            // error
            else {
                console.log('upload error: ', xhr);
            }

        });

        xhr.upload.addEventListener("load", function() {
            setTimeout(() => {
                sn_topics.progressBar.style.opacity = "0";
                setTimeout(() => {
                    sn_topics.progressBar.style.width = "0%";
                    sn_topics.progressBar.style.opacity = "1";
                }, 1000);
            }, 2500);
        });

        xhr.onload = function() {
            if (this.status === 200) {
                console.log('response', this.response);
                document.getElementById('featured_media_id').dataset.featured_media_id = this.response.featured_media_id;

            }
        };

        formData.append('topic_id', document.body.dataset.topic_id);
        formData.append('featured_media_id', document.getElementById('featured_media_id').dataset.featured_media_id);
        formData.append('file', file);
        xhr.send(formData);
    },



    'init': () => {
        sn_topics.listenTopicActions();
        sn_topics.listenTopicChanges();
        sn_topics.listenSaveTopic();
        sn_topics.listenDeleteTopic();
        sn_topics.listentGoToURL();
        sn_topics.listenUpdateTopicStatus();

        sn_topics.listenDestroyContentOrMetaField();
        sn_topics.listenValidateTopicURL();
        sn_topics.toggleTopicMetaDataListener();
        sn_topics.populateDateField();
        sn_topics.initFileDroppers();
        sn_topics.listenSetTextFieldTag();

        if(sn_topics.topicContentAndMetaFieldSorts){
            for (let t = 0; t < sn_topics.topicContentAndMetaFieldSorts.length; t++) {
                sn_topics.initSortTopicContentOrMetaFields(sn_topics.topicContentAndMetaFieldSorts[t]);
            }
        }

    }

}

sn_topics.init();

document.body.dataset.topic_id ? sn_topics.activeTopic.id = document.body.dataset.topic_id : sn_topics.activeTopic.id = null
document.body.dataset.topic_status ? sn_topics.activeTopic.status = document.body.dataset.topic_status : sn_topics.activeTopic.status = null



/* ~~~~~~~~~~~~~~~~~~~~ topic updates ~~~~~~~~~~~~~~~~~~~~ */



if(typeof sn_topics !== "undefined"){
    if(sn_topics.topicTagsW) {
        let topicTagsInput = new TagsInput({
            selector: 'topicTagsInput',
            duplicate: false,
            max: 10
        });
        topicTagsInput.addData(sn_topics.topicTagsW.dataset.tags.split(','));
    }
}

/* ~~~~~~~~~~~~~~~~~~~~ init ~~~~~~~~~~~~~~~~~~~~ */






