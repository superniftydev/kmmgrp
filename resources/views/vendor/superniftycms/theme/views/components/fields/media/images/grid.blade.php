<?php # dd($media); ?>

<h1>Grid</h1>



{{--


@if($media['type'] === 'svg')
    {!! file_get_contents($media['url']) !!}

@elseif($media['type'] === 'jpg' || $media['type'] === 'jpeg' || $media['type'] === 'png' || $media['type'] === 'gif' || $media['type'] === 'heic')
    <figure>
        <img
            srcset="{{ $media['srcset'] ?? '' }}"
            sizes="{{ $media['sizes'] ?? '' }}"
            src="{{ $media['fallback'] ?? '' }}"
            title="{{ $media['title'] ?? '' }}"
            alt="{{ $media['description'] ?? '' }}"
        />
        <figcaption>{{ $media['title'] ?? '' }}</figcaption>
    </figure>

@elseif($media['type'] === 'mp4' || $media['type'] === 'ogv' || $media['type'] === 'webm' || $media['type'] === 'mov' || $media['type'] === 'wmv')
    <video controls playsinline poster="{{ $media['urls']['poster'] ?? '' }}" preload="none">
        <source src="{{ $media['urls']['mp4'] ?? '' }}" type="video/mp4" />
        <source src="{{ $media['urls']['webm'] ?? '' }}" type="video/webm" />
        <source src="{{ $media['urls']['ogg'] ?? '' }}" type="video/ogg" />
        Sorry, your browser doesn't support embedded videos...
    </video>

@elseif($media['type'] === 'youtube' || $media['vimeo'])
    <div class="vwrap">
        <iframe
            class="video"
            src="{{ $media['urls']['video'] ?? 'nope'}}"
            title="{{ $media['title'] ?? 'nope'}}"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    </div>

@elseif($media['type'] === 'glb')
    <div class="glb" data-url="{{ $media->url }}"></div>

@endif
--}}
