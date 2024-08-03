@php use Supernifty\CMS\Models\Media; @endphp
<div class="gallery slashes">
    <ul>
        @foreach( $topic->content[$field_name]['value'] as $image_id)
            @php $media = Media::find($image_id); @endphp
            <li>
                <a data-src="{{ sn_img($media, 1000)['url'] }}"
                   data-sub-html="<h4>{{ $media->metas['title'] ?? 'KMM Image Title' }}</h4><p>{{ $media->metas['description'] ?? 'KMM Image Description' }}</p>">
                    <img src="{{ sn_img($media, 250)['url'] }}" alt="{{ $media->metas['title'] ?? 'KMM Image Title' }} - {{ $media->metas['description'] ?? 'KMM Image Description' }}">
                </a>
            </li>
        @endforeach
    </ul>
</div>
