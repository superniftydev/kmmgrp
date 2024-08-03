<section
    data-s="{{ $topic->content[$field_name]['sn_js'] ?? "" }}"
    class="{{ $topic->content[$field_name]['sn_css'] ?? "" }}"
    @auth
        data-cm="bcs"
        data-field="{{ $field_name }}"
        data-blade="{{ $topic->content[$field_name]['sn_blade'] ?? "" }}"
        data-blades="{{ json_encode(config('superniftycms.blades.media.images')) }}"
    @endauth
>
    <div class="w">
        @php
            $blade = $topic->content[$field_name]['sn_blade'] ?? 'auto';
            if(strlen($blade) === 0) $blade = "auto";
        @endphp
        @if(View::exists('components.fields.media.images.').($topic->content[$field_name]['sn_blade'] ?? "slides"))
            @include('components.fields.media.images.'.($blade ?? "auto"))
        @else
            <p style="border:2px dashed currentColor!important;margin:1rem auto!important;padding:2rem!important;width:50vw!important;text-align:center!important;">[ View <strong>{{$blade}}</strong> is missing! ]</p>
        @endif
    </div>
</section>
