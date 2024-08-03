<model-viewer
    id="{{ $product->id }}"
    camera-orbit="4.306632725775436rad 1.728632216475061rad 10m"
    auto-rotate
    disable-zoom
    exposure="1"
    disable-tap
    @if(isset($interactive)) camera-controls @endif
    reveal="auto"
    shadow-intensity="0"
    shadow-softness="1"
    src="/media/{{ $product->content['glb']['value'][0] ?? '' }}/original.glb"
    tone-mapping="neutral"
    alt="{{ Str::slug($product->title) ?? 'untitled-model' }}"
    data-model="{{ $product->content['glb']['value'][0] ?? '' }}"
    data-title="{{ Str::slug($product->title) ?? 'untitled-model' }}"
    data-settings="{{ $settings ?? '' }}"
    data-capabilities="{{ $product->content['capabilities']['value'] ?? '' }}"
>
</model-viewer>
