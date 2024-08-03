


@foreach($topic->content['sn_fso'] as $field_name)
    @if($topic->content[$field_name]['type'] === 'richtext')
        @include($topic->content[$field_name]['sn_blade'], [ 'field' => $topic->content[$field_name] ]);
    @elseif($topic->content[$field_name]['type'] === 'text')
        {{ $topic->content[$field_name]['value'] }}
    @elseif($topic->content[$field_name]['type'] === 'media')
        <pre>@php print_r( $topic->content[$field_name]['value'])@endphp</pre>
    @endif



    <hr>




@endforeach
