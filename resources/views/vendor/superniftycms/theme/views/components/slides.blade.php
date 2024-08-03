<div class="reveal">
    <div class="slides">
        <style>body .reveal ul li a.active svg circle { animation-duration: 7500ms; }</style>
        @foreach($slides as $slide)
            <section data-slide="{{ $loop->index }}" data-autoslide="7500">
                @php $image = App\Models\Media::find($slide->content['values']['images'][0] ?? 'fpo'); @endphp
                <img src="{{ sn_media_upload_url($image ?? 'fpo', 2000) }}" alt="{{ $image->metas['title'] ?? 'Image' }}">
            </section>
        @endforeach
    </div>
    <ul class="titles">
        @foreach($slides as $slide)
            <li data-title="{{ $loop->index }}" @if($loop->index === 0) class="active" @endif>
                <a href="#{{ $loop->index }}" data-title="{{ $loop->index }}"
                   data-loop="{{ $loop->index }}" @if($loop->index === 0) class="active" @endif>
                    <h2>Title {{ $loop->index }}</h2>
                    <h3>Subhead {{ $loop->index }}</h3>
                </a>
            </li>
        @endforeach
    </ul>
    <ul class="descriptions">
        @foreach($slides as $slide)
            <li data-description="{{ $loop->index }}">
                <div>
                    <i class="x"></i>
                    <p>Description Paragraph {{ $loop->index }}</p>
                </div>
            </li>
        @endforeach
    </ul>

    <ul class="dots">
        @foreach($slides as $slide)
            <li><a href="#{{ $loop->index }}" data-dot="{{ $loop->index }}"
                   @if($loop->index === 0) class="active" @endif>
                    <svg>
                        <circle r="9" cx="10" cy="10"></circle>
                    </svg>
                </a></li>
        @endforeach
    </ul>

</div>

