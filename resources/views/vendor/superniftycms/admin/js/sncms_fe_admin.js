
window.sncms_fe_admin_vars = {
    'context_menu': false,
    'context_menu_target': false,
    'context_menu_target_field': false,
    'cms_url': document.getElementById('sncms_fe_admin').dataset.cms_url,
    'csrf_token': document.getElementById('sncms_fe_admin').dataset.csrf_token,
    'css_prefix': document.getElementById('sncms_fe_admin').dataset.css_prefix,
    'topic_id': document.getElementById('sncms_fe_admin').dataset.topic_id,
}

window.sncms_fe_admin_func = {

    'postData': async (url = '', method, data = {}) => {
        const response = await fetch(url, {
            method: method, // GET, POST, PUT, DELETE, etc.
            mode: 'cors', // cors, no-cors, same-origin
            cache: 'no-cache', // default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // same-origin, include, omit
            headers: {
                'X-CSRF-TOKEN': sncms_fe_admin_vars.csrf_token,
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // follow, manual, error
            referrerPolicy: 'no-referrer', // no-referrer-when-downgrade, no-referrer, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    },

    "openContextMenu": (e) => {

        // set target
        let target = e.target.closest("[data-cm]")
        sncms_fe_admin_vars.context_menu_target = target;
        sncms_fe_admin_vars.context_menu_target.setAttribute('data-sncms_cm_target', '1');

        console.log('context menu target:', target);

        // set menu
        sncms_fe_admin_vars.context_menu = document.getElementById('sncms_cm_' + target.dataset.cm);
        sncms_fe_admin_vars.context_menu_target_field = target.dataset.field;

        // sncms_fe_admin_func.positionContextMenu(e, sncms_fe_admin_vars.context_menu);
        sncms_fe_admin_vars.context_menu.classList.add('active');


        sncms_fe_admin_vars.context_menu.querySelector('.sncms_cm_x').removeEventListener('click', sncms_fe_admin_func.closeContextMenu, null);
        sncms_fe_admin_vars.context_menu.querySelector('.sncms_cm_x').addEventListener('click', sncms_fe_admin_func.closeContextMenu, null);

        let current_classes = sncms_fe_admin_vars.context_menu_target.classList.value.split(' ');
        if(current_classes.length > 0){
            for (let c = 0; c < current_classes.length; c++) {
                let selected_style_option = sncms_fe_admin_vars.context_menu.querySelector(".sncms_cm_css option[value='" + current_classes[c] + "']");
                if(selected_style_option) {
                    selected_style_option.selected = true;
                }
            }
        }
        console.log('current class list: ', sncms_fe_admin_vars.context_menu_target.classList.value);

        /* dim defaults */
        let css_selects = sncms_fe_admin_vars.context_menu.querySelectorAll('.sncms_cm_css select');
        for (let c = 0; c < css_selects.length; c++) {
            if(css_selects[c].value.includes('--')){
                css_selects[c].setAttribute('data-default', 'default');
            }
            else {
                css_selects[c].removeAttribute('data-default');
            }
        }

        if(
            sncms_fe_admin_vars.context_menu_target.dataset.blades !== undefined &&
            JSON.parse(sncms_fe_admin_vars.context_menu_target.dataset.blades) &&
            !!sncms_fe_admin_vars.context_menu_target.dataset.blades
        ){
            sncms_fe_admin_vars.context_menu.classList.add('blades');
            let available_blades = JSON.parse(sncms_fe_admin_vars.context_menu_target.dataset.blades);
            console.log('available_blades: ', available_blades);
            if(available_blades){
                sncms_fe_admin_vars.context_menu.querySelector(".sncms_cm_blade i").innerText = available_blades.label;
                let blade_select = sncms_fe_admin_vars.context_menu.querySelector(".sncms_cm_blade select");

                for (const [k, v] of Object.entries(available_blades.values)) {

                    blade_select.options[blade_select.options.length] = new Option(v.label, k);

                    console.log('v: ', v, 'v.s: ', v.s);

                    /* values */
                    if(v.s !== undefined && v.s != null && v.s.constructor.name === "Object"){

                        let currentJSO = sncms_fe.sectionJSO(sncms_fe_admin_vars.context_menu_target);
                        console.log('currentJSO:', currentJSO);

                        sncms_fe_admin_vars.context_menu.classList.add('s');
                        let js_list = sncms_fe_admin_vars.context_menu.querySelector(".sncms_cm_js");

                        for (const [kk, vv] of Object.entries(v.s)) {

                            console.log('kk: ', kk, 'vv: ', vv);

                            let input = false;


                            if(vv.includes('|')){
                                let values;
                                let settings = vv.split('|');
                                settings[1].includes(',') ? values = settings[1].split(',') : values = settings[1];
                                console.log('settings split from | : ', settings);

                                if(settings[0].includes('text')) {
                                    let cv = currentJSO[kk] ? currentJSO[kk] : values;
                                    input = document.createElement("input");
                                    input.setAttribute("name", kk);
                                    input.setAttribute("type", "text");
                                    input.setAttribute("value", cv);
                                }

                                else if(settings[0].includes('select')) {
                                    let cv = currentJSO[kk] ? currentJSO[kk] : values[0];
                                    input = document.createElement("select");
                                    input.setAttribute("name", kk);
                                    for (let o = 0; o < values.length; o++) {
                                        input.options[input.options.length] = new Option(values[o], values[o]);
                                    }
                                    input.setAttribute("value", cv);
                                }

                                else if(settings[0].includes('checkbox')) {
                                    let cv = currentJSO[kk] ? currentJSO[kk] : values;
                                    input = document.createElement("input");
                                    input.setAttribute("name", kk);
                                    input.setAttribute("type", "checkbox");
                                    console.log('checkbox value: ', values);
                                    if(cv.includes('y')){ input.checked = true; }

                                }

                            }

                            if(input){
                                let label = document.createElement("label");
                                let text = document.createTextNode(kk);
                                label.appendChild(text);
                                js_list.appendChild(label);
                                js_list.appendChild(input);
                            }

                        }

                    }

                }

                /* set all values */
                blade_select.value = sncms_fe_admin_vars.context_menu_target.dataset.blade;
            }
        }

        sncms_fe_admin_func.listenSetCSS();
        sncms_fe_admin_func.listenSetJS();
        sncms_fe_admin_func.listenSetBlade();
        sncms_fe_admin_func.listenGoToLinks();

    },

    "dragContextMenu": (m) => {
        let handle = m.querySelector('.sncms_cm_h');
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

        handle.onmousedown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            m.classList.add('moving');
            document.onmouseup = dmu;
            document.onmousemove = dmm;
        };

        let dmm = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            m.style.top = `${m.offsetTop - pos2}px`;
            m.style.left = `${m.offsetLeft - pos1}px`;
        };

        let dmu = () => {
            document.onmouseup = null;
            document.onmousemove = null;
            m.classList.remove('moving');
        };

    },

    "closeContextMenu": () => {
        if (sncms_fe_admin_vars.context_menu) {
            sncms_fe_admin_vars.context_menu_target.removeAttribute('data-sncms_cm_target');
            let css_selects = sncms_fe_admin_vars.context_menu.querySelectorAll('.sncms_cm_css select');
            for (let c = 0; c < css_selects.length; c++) {
                css_selects[c].selectedIndex = 0;
                css_selects[c].removeAttribute('data-default');
            }
            sncms_fe_admin_vars.context_menu_target = false;
            sncms_fe_admin_vars.context_menu_target_field = false;
            sncms_fe_admin_vars.context_menu.classList.remove('active', 'blades', 'js');
            sncms_fe_admin_vars.context_menu.querySelector(".sncms_cm_blade select").innerText = '';
            sncms_fe_admin_vars.context_menu.querySelector(".sncms_cm_js").innerText = '';
            sncms_fe_admin_vars.context_menu = false;

        }
    },

    "getCursorPosition": (e) => {
        let x = 0;
        let y = 0;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else if (e.clientX || e.clientY) {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return {x: x, y: y};
    },

    "positionContextMenu": (e, context_menu) => {
        let clickCoords = sncms_fe_admin_func.getCursorPosition(e);
        let clickCoordsX = clickCoords.x;
        let clickCoordsY = clickCoords.y;
        context_menu.style.left = clickCoordsX + "px";
        context_menu.style.top = clickCoordsY + "px";
    },

    "saveFe": (data) => {
        console.log('data being sent to server: ', data);
        sncms_fe_admin_func.postData('/' + sncms_fe_admin_vars.cms_url + '/topic/save/fe', 'post', data)
            .then(response => {
                console.log('!!! --> saveTopicFe: ', response);
                if (response.result === 'ok') {
                    console.log('topic saved...');
                    if(data.k === 'sn_blade' && response.html) {
                        sncms_fe_admin_vars.context_menu_target.querySelector('.w:first-child').innerHTML = response.html;
                        if(window['init']) { init(); }
                        console.log('that was a blade change');
                    }
                }
            })
            .catch((error) => {
                console.error('!!! --> saveTopicFe error:', error);
            });
    },

    "setBlade": (e) => {
        let data = {
            't': sncms_fe_admin_vars.topic_id,
            'f': sncms_fe_admin_vars.context_menu_target_field,
            'k': 'sn_blade',
            'v': e.target.value,
        };
        sncms_fe_admin_func.saveFe(data);
    },

    "listenSetBlade": () => {
        let bladeSelects = document.querySelectorAll('#sncms_cm_bcs .sncms_cm_blade select');
        if(bladeSelects){
            for (let b = 0; b < bladeSelects.length; b++) {
                bladeSelects[b].removeEventListener('change', sncms_fe_admin_func.setBlade, null);
                bladeSelects[b].addEventListener('change', sncms_fe_admin_func.setBlade, null);
            }
        }
    },

    "setCSS": (e) => {

        /* set ui */
        let lose;
        let add;
        if(e.target.closest('select')) {
            lose = sncms_fe_admin_vars.css_prefix + '-' +  e.target.closest('select').name;
            add = e.target.closest('select').value;
            if(add.includes('--')) { e.target.closest('select').setAttribute('data-default', '1'); }
            else { e.target.closest('select').removeAttribute('data-default'); }
        }
        else if(e.target.closest('input')) {
            lose = sncms_fe_admin_vars.css_prefix + '-' +  e.target.closest('input').name;
            if(e.target.closest('input').type === 'checkbox'){
                e.target.closest('input').checked ? add = 'y' : add = 'n';
            }
            else { add = e.target.closest('input').value; }
        }
        console.log('lose: ', lose);
        console.log('add: ', add);
        console.log('current class list: ', sncms_fe_admin_vars.context_menu_target.classList.value);
        let regex = new RegExp(lose, 'g');
        let current_classes = sncms_fe_admin_vars.context_menu_target.classList.value.split(' ');
        let remove = current_classes.filter((x) => x.match(regex));
        if(remove.length > 0) { sncms_fe_admin_vars.context_menu_target.classList.remove(remove[0]); }
        sncms_fe_admin_vars.context_menu_target.classList.add(add);
        console.log('updated class list: ', sncms_fe_admin_vars.context_menu_target.classList.value);
        console.log('removed: ', remove[0]);

        /* update topic */
        let data = {
            't': sncms_fe_admin_vars.topic_id,
            'f': sncms_fe_admin_vars.context_menu_target_field,
            'k': 'sn_css',
            'v': sncms_fe_admin_vars.context_menu_target.classList.value,
        };
        sncms_fe_admin_func.saveFe(data);
    },

    "listenSetCSS": () => {
        let cssInputs = document.querySelectorAll('#sncms_cm_bcs .sncms_cm_css select, #sncms_cm_bcs .sncms_cm_css input');
        if(cssInputs){
            for (let s = 0; s < cssInputs.length; s++) {
                cssInputs[s].removeEventListener('change', sncms_fe_admin_func.setCSS, null);
                cssInputs[s].addEventListener('change', sncms_fe_admin_func.setCSS, null);
            }
        }
    },

    "setJS": (e) => {

        /* set ui */
        /*  data-s="loop:1|delay:5000|transition:fade" */
        let lose;
        let add;
        if(e.target.closest('select')) {
            lose = e.target.closest('select').name + ':';
            add = e.target.closest('select').value;
            if(add.includes('--')) { e.target.closest('select').setAttribute('data-default', '1'); }
            else { e.target.closest('select').removeAttribute('data-default'); }
        }
        else if(e.target.closest('input')) {
            lose = e.target.closest('input').name + ':';
            if(e.target.closest('input').type === 'checkbox'){
                e.target.closest('input').checked ? add = 'y' : add = 'n';
            }
            else { add = e.target.closest('input').value; }
        }
        console.log('lose: ', lose);
        console.log('add: ', add);
        console.log('current js string: ', sncms_fe_admin_vars.context_menu_target.dataset.s);
        let regex = new RegExp(lose, 'g');
        let current_js_keypairs = sncms_fe_admin_vars.context_menu_target.dataset.s.split('|');
        let remove = current_js_keypairs.filter((x) => x.match(regex));
        let updated_js_keypairs_array = current_js_keypairs.filter(keypair => !keypair.includes(lose));
        updated_js_keypairs_array.push(lose + add);
        let updated_js_keypairs_string = updated_js_keypairs_array.join('|');

        if(updated_js_keypairs_string.charAt(0) === '|'){
            updated_js_keypairs_string = updated_js_keypairs_string.slice(1);
        }
        console.log('updated_js_keypairs_string: ', updated_js_keypairs_string);
        sncms_fe_admin_vars.context_menu_target.dataset.s = updated_js_keypairs_string;
        console.log('removed: ', remove[0]);

        /* update topic */
        let data = {
            't': sncms_fe_admin_vars.topic_id,
            'f': sncms_fe_admin_vars.context_menu_target_field,
            'k': 'sn_js',
            'v': updated_js_keypairs_string,
        };
        console.log('data going to server: ', data);
        sncms_fe_admin_func.saveFe(data);
    },

    "listenSetJS": () => {
        let jsInputs = document.querySelectorAll('#sncms_cm_bcs .sncms_cm_js input, #sncms_cm_bcs .sncms_cm_js select');
        if(jsInputs){
            for (let s = 0; s < jsInputs.length; s++) {
                jsInputs[s].removeEventListener('change', sncms_fe_admin_func.setJS, null);
                jsInputs[s].addEventListener('change', sncms_fe_admin_func.setJS, null);
            }
        }
    },

    "goToLink": (e) => {
        let url;
        if(e.target.dataset.link === 'sncms_dashboard') { url = '/' + sncms_fe_admin_vars.cms_url; }
        else if(e.target.dataset.link === 'sncms_edit_topic') { url = '/' + sncms_fe_admin_vars.cms_url + '/topic/edit/' + sncms_fe_admin_vars.topic_id; } // /cms/topic/edit/9c16ec95-43ed-477e-a8b7-0a3802fd2767
        window.location.href = url;
    },

    "listenGoToLinks": () => {
        let links = document.querySelectorAll('#sncms_cm_bcs .sncms_cm_footer i[data-link]');
        if(links){
            for (let l = 0; l < links.length; l++) {
                links[l].removeEventListener('click', sncms_fe_admin_func.goToLink, null);
                links[l].addEventListener('click', sncms_fe_admin_func.goToLink, null);
            }
        }
    },

    'init': (e) => {

        document.addEventListener("contextmenu", function (e) {
            if(e.target.closest("[data-cm]")) {
                e.preventDefault();
                if(sncms_fe_admin_vars.context_menu) { sncms_fe_admin_func.closeContextMenu(); }
                sncms_fe_admin_func.openContextMenu(e);
            }
        });

        document.addEventListener("scroll", (event) => {
            if(sncms_fe_admin_vars.context_menu_target){
                let observer = new IntersectionObserver(function (targets) {
                    if (!targets[0].isIntersecting && sncms_fe_admin_vars.context_menu && sncms_fe_admin_vars.context_menu_target) {
                        sncms_fe_admin_func.closeContextMenu();
                        console.log('the target has left the viewport so the menu was closed...');
                    }
                });
                observer.observe(sncms_fe_admin_vars.context_menu_target);
            }
        });

        document.addEventListener("mouseup", (e) => {
            switch (e.button) {
                case 0:
                    console.log("left button click");
                    break;
                case 1:
                    console.log("Middle button clicked.");
                    break;
                case 2:
                    console.log("Right button clicked.");
                    break;
                default:
                    console.log(`Unknown button code: ${e.button}`);
            }
        });

        document.addEventListener("keydown", (event) => {
            let keyValue = event.key;
            let codeValue = event.code;
            if(keyValue === 'Escape' || codeValue === 'Escape') { sncms_fe_admin_func.closeContextMenu(); }
            // console.log("keyValue: " + keyValue);
            // console.log("codeValue: " + codeValue);
        }, false);

        sncms_fe_admin_func.dragContextMenu(document.getElementById('sncms_cm_bcs'));


    }

}


sncms_fe_admin_func.init();




