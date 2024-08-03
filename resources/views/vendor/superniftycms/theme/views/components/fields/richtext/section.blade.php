<section
    data-s="{{ $topic->content[$field_name]['sn_js'] ?? "" }}"
    class="{{ $topic->content[$field_name]['sn_css'] ?? "" }}"
    @auth
    data-cm="bcs"
    data-field="{{ $field_name }}"
    data-blade="{{ $topic->content[$field_name]['sn_blade'] ?? "" }}"
    data-blades="{{ json_encode(config('superniftycms.blades.richtext')) }}"
    @endauth
>
    <div class="w">
        {!! $topic->content[$field_name]['value'] ?? "" !!}
    </div>
</section>
