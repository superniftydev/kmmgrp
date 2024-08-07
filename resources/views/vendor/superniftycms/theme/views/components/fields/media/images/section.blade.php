<section
    data-s="{{ $topic->content[$field_name]['sn_js'] ?? "" }}"
    class="{{ $topic->content[$field_name]['sn_css'] ?? "" }}"
    @auth
        data-cm="bcs"
        data-field="{{ $field_name }}"
        data-blade="{{ $topic->content[$field_name]['sn_blade'] ?? "" }}"
        {{-- data-blades="{{ json_encode(config('superniftycms.blades.media.')) }}" 2 need aft after media.--}}
    @endauth
>
    <div class="w">

        @php
            $topic->content[$field_name]['sn_blade'] ? $blade = $topic->content[$field_name]['sn_blade'] : $blade = 'slides';
            $path = "components.fields.media.images.{$blade}";
        @endphp

        @if(View::exists($path))
            @include($path, [ 'field_name' => $field_name, 'field' => $topic->content[$field_name] ])
        @else
            <p style="border:2px dashed currentColor!important;margin:1rem auto!important;padding:2rem!important;width:50vw!important;text-align:center!important;">[ View <strong>{{$field_name}} | {{$blade}}</strong> is missing! ]</p>
        @endif
    </div>
</section>
