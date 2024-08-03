<div id="modelviewer">
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
    <model-viewer

        camera-orbit="4.306632725775436rad 1.728632216475061rad 10m"
        min-camera-orbit="-100rad -100rad 10m"
        max-camera-orbit="100rad 100rad 50m"
        min-field-of-view="0deg"
        max-field-of-view="180deg"
        auto-rotate
        disable-zoom
        camera-controls
        exposure="1"
        disable-tap
        shadow-intensity="0"
        shadow-softness="1"
        touch-action="pan-y"
        src="" {{-- https://kmmgrp.test/kmmgrpcom/{{ $topic->content['values']['glb'][0] }}/original.glb --}}
        tone-mapping="neutral"
        alt="3D Model"
    >
    </model-viewer>
</div>

<div id="modelViewerControls" class="controls">
    <input id="color" type="color" value="#1083ff"/>
    <div class="ranger" data-label="exposure"><input id="exposure" type="range" min="0" max="3" step=".01" value="1"></div>
    <div class="ranger" data-label="scale"><input id="scale" type="range" min=".1" max="10" step="0.01" value="1"></div>
    <div class="ranger" data-label="roll"><input id="roll" type="range" min="0" max="5" step=".1" value="2.5"></div>
    <div class="ranger" data-label="pitch"><input id="pitch" type="range" min="-25" max="25" step="1" value="2.5"></div>
    <div class="ranger" data-label="yaw"><input id="yaw" type="range" min="-25" max="25" step=".1" value="0"></div>
    <div class="ranger" data-label="metal"><input id="metal" type="range" min="0" max="1" step="0.01" value=".5"></div>
    <div class="ranger" data-label="roughness"><input id="rough" type="range" min="0" max="1" step="0.01" value=".5"></div>
    <div id="downloadPosterButton"></div>
</div>

{{ Vite::useBuildDirectory(sn_build_directory()) }}
@vite(["{$environment_root}/resources/js/modelviewergrid.js"])

