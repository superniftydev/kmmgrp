<header class="capability">
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>


    <?php
    $product = App\Models\Topic::where('id', '9c4d51d7-8464-4bb0-b2c7-99f13c02c480')->first();
    $settings = explode('|', $product->content['display-settings']['value']);

    ?>

    <div class="model">
        <model-viewer
            id="{{ $product->id }}"
            camera-orbit="4.306632725775436rad 1.728632216475061rad 10m"
            {{-- min-camera-orbit="{{ $settings[3] ?? 'none'}}" --}}
            {{-- max-camera-orbit="{{ $settings[3] ?? 'none'}}" --}}
            min-field-of-view="0deg"
            max-field-of-view="180deg"
            auto-rotate
            disable-zoom
            camera-controls
            exposure="1"
            disable-tap
            reveal="auto"
            shadow-intensity="0"
            shadow-softness="1"
            touch-action="pan-y"
            src="/kmmgrpcom/{{ $product->content['glb']['value'][0] ?? '' }}/original.glb"
            tone-mapping="neutral"
            alt="{{ sn_slug($product->title) ?? 'untitled-model' }}"
            data-s="{{ $settings[2] }}"
            data-model="{{ $product->content['glb']['value'][0] ?? '' }}"
            data-title="{{ sn_slug($product->title) ?? 'untitled-model' }}"
            data-settings="{{ $product->content['display-settings']['value'] ?? '' }}"
            data-capabilities="{{ $product->content['capabilities']['value'] ?? '' }}"
        >
        </model-viewer>
    </div>



    <div class="content">
        <h1 data-eyebrow="KMM Capability">Wire EDM</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue tortor a enim placerat, non bibendum diam pharetra.</p>
    </div>
    <div class="slash bottom text-white"></div>
</header>

{{--

media id
media alt tag
eyebrow
headline
description
cta text
cta link

background-color
content background-color
slash-bottom-color


--}}
