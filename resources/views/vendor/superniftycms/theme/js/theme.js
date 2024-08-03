/* theme.js */

import _ from 'lodash';
window._ = _;

/* to access in blade: <img src="{{ Vite::asset('resources/img/image.png') }}">  */
import.meta.glob([
    '../img/**',
])

import lightGallery from 'lightgallery';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

/**
 * Load the axios HTTP library to automatically attach the CSRF token
 * to all request headers based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.theme_js = {

    /* mobile menu elements */
    'tmm': () => { document.body.classList.toggle('smm'); },
    'mmts': document.querySelectorAll("#mmt, body.smm .mmt"),
    'sps': document.querySelectorAll("[data-sp]"),

    /* ajax handler */
    'postData': async (url = '', method, data = {}) => {
        const response = await fetch(url, {
            method: method, // GET, POST, PUT, DELETE, etc.
            mode: 'cors', // cors, no-cors, same-origin
            cache: 'no-cache', // default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // same-origin, include, omit
            headers: { 'Content-Type': 'application/json', },
            redirect: 'follow', // follow, manual, error
            referrerPolicy: 'no-referrer', // no-referrer-when-downgrade, no-referrer, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    },

    'checkScrollPoint': (wrap, item, partial) => {
        let wrapHeight = wrap.clientHeight;
        let rectItem = item.getBoundingClientRect();
        let offsetItem = {
            top: rectItem.top + window.scrollY,
            left: rectItem.left + window.scrollX
        };
        let rectW = wrap.getBoundingClientRect();
        let offsetW = {
            top: rectW.top + window.scrollY,
            left: rectW.left + window.scrollX
        };
        let itemTop = offsetItem.top - offsetW.top;
        let itemBottom = itemTop + item.clientHeight;
        let isTotal = itemTop >= 0 && itemBottom <= wrapHeight;
        let isPart =
            ((itemTop < 0 && itemBottom > 0) ||
                (itemTop > 0 && itemTop <= wrap.clientHeight)) &&
            partial;
        return isTotal || isPart;
    },

    'listenScrollPoint': (e) => {
        let wrap = e.target.closest('[data-spw]');
        wrap.addEventListener('scroll', function () {
            if(theme_js.checkScrollPoint(wrap, e.target, true)) {
                document.body.dataset.scrollpoint = e.target.dataset.sp;
                console.log('Item ' + e.target.dataset.sp + ' is visible...');
            }
        });
    },

    'debounce': (x) => {
        let f;
        return (...params) => {
            if (f) { cancelAnimationFrame(f); }
            f = requestAnimationFrame(() => { x(...params); });
        }
    },

    'storeScroll': () => {
        if(window.scrollY > 100) {
            document.body.classList.add('scrolled');
        }
        else {
            document.body.classList.remove('scrolled');
        }
    },

    'init': () => {

        /* manage page loader animation */
        document.onreadystatechange = function() {
            if(document.readyState !== "complete") {
                document.querySelector("body").style.visibility = "hidden";
            } else {
                document.querySelector("#view-loader").classList.remove('loading');
                document.querySelector("body").style.visibility = "visible";
            }
        };

        /* toggle mobile menu */
        if(theme_js.mmts){
            for (let t = 0; t < theme_js.mmts.length; t++) {
                theme_js.mmts[t].addEventListener('click', theme_js.tmm);
            }
        }

        /* init scrollPoints */
        if(theme_js.sps){
            for (let s = 0; s < theme_js.sps.length; s++) {
                theme_js.sps[s].addEventListener('click', theme_js.listenScrollPoint);
            }
        }

        document.addEventListener('scroll', theme_js.debounce(theme_js.storeScroll), { passive: true });
        theme_js.storeScroll();


        let galleries = document.querySelectorAll('.gallery');
        console.log('galleries', galleries);
        if(galleries){
            for (let g = 0; g < galleries.length; g++) {

                lightGallery(galleries[g], {
                    selector: 'a',
                    mode: 'lg-fade',
                    easing: 'ease',
                    plugins: [lgAutoplay, lgZoom, lgThumbnail],
                    licenseKey: 'gpl',
                    speed: 500,
                });

            }
        }




    },

}

document.addEventListener('DOMContentLoaded', function () {
    theme_js.init();
});



