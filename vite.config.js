import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import {viteStaticCopy} from 'vite-plugin-static-copy'


export default defineConfig({

    plugins: [

        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',

                /* superniftycms */

                /* admin */
                'resources/views/vendor/superniftycms/admin/css/styles.css',
                'resources/views/vendor/superniftycms/admin/js/sn_helpers.js',
                'resources/views/vendor/superniftycms/admin/js/sn_mediaManager.js',
                'resources/views/vendor/superniftycms/admin/js/sn_topicManager.js',
                'resources/views/vendor/superniftycms/admin/js/sn_transcriptorField.js',

                /* frontend admin */
                'resources/views/vendor/superniftycms/admin/css/sncms_fe_admin.css',
                'resources/views/vendor/superniftycms/admin/js/sncms_fe_admin.js',

                /* frontend public */
                'resources/views/vendor/superniftycms/admin/css/sncms_fe.css',
                'resources/views/vendor/superniftycms/admin/js/sncms_fe.js',

                /* theme */
                'resources/views/vendor/superniftycms/theme/css/theme.css',
                'resources/views/vendor/superniftycms/theme/js/theme.js',
                'resources/views/vendor/superniftycms/theme/js/contact.js',
                'resources/views/vendor/superniftycms/theme/js/facility-map.js',
                'resources/views/vendor/superniftycms/theme/js/modelloader.js',
                'resources/views/vendor/superniftycms/theme/js/modelviewer.js',
                'resources/views/vendor/superniftycms/theme/js/newsletter.js',
                'resources/views/vendor/superniftycms/theme/js/welcome-header-video.js',

            ],
            refresh: true,
        }),


        /*

        set the path for static assets to copy to the build directory

        viteStaticCopy({
            targets: [
                {
                    src: 'resources/views/vendor/superniftycms/theme/static',
                    dest: ``
                }
            ]
        }),

        in the blade: {{ secure_asset('build/static/img/example.png') }}
        in the blade: {{ secure_asset('build/static/js/example.js') }}

        */

        viteStaticCopy({
            targets: [
                {
                    src: 'resources/views/vendor/superniftycms/theme/static',
                    dest: ``
                }
            ]
        }),




    ],
});
