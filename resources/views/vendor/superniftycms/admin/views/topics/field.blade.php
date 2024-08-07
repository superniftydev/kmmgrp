@php # print "<pre>"; print_r($field); print "</pre>"; exit; @endphp
@php # print "<pre>"; print_r($mediaJSON); print "</pre>"; exit; @endphp


@if($field['type'] === 'media')
    <?php
        $accepted_array = config("superniftycms.uploads.accepted.".($field['aft'] ?? "images"));
        if(is_array($accepted_array)) {
            $accepted = implode("|", $accepted_array);
            $accepted_error = implode(', ', array_keys($accepted_array)).' ONLY PLEASE!';
        }
    ?>

<div class="snfw sort" id="snfw-{{ Str::slug($field_name) }}" data-field="{{ $field_name }}" data-type="{{ $field['type'] }}" data-aft="{{ $field['aft'] }}" data-accepted="{{ $accepted ?? '*' }}" data-error="{{ $accepted_error ?? 'WRONG FILE TYPE' }}">
    <div class="settings">
        <div class="h"></div>
        <div class="n" contenteditable>{{ $field_name }}</div>
        <i class="x"></i>
    </div>
    <div class="snfwi">
        @if($field['aft'] === 'youtube' || $field['aft'] === 'vimeo')
            @include('media.mediazone-click', [ 'media' => $mediaJSON[$field_name] ?? '' ])
        @else
            @include('media.mediazone-drop', [ 'media' => $mediaJSON[$field_name] ?? '' ])
        @endif
    </div>
</div>


@elseif($field['type'] === 'text' || $field['type'] === 'richtext')

    <div class="snfw transcriptor sort" id="snfw-{{ Str::slug($field_name) }}" data-field="{{ $field_name }}" data-type="{{ $field['type'] ?? 'text' }}">
        <div class="settings">
            <div class="h"></div>
            <div class="n" contenteditable>{{ $field_name }}</div>
                @if($field['type'] === 'text')
                    @php $tags = config('superniftycms.htmltags') ?? null; @endphp
                    @if(is_array($tags))
                    <div class="tag" data-tag="{{ $field['sn_tag'] ?? 'p' }}">
                        <select class="textTagSelect">
                            @foreach($tags as $tag)
                                <option value="{{ $tag }}" @if(isset($field['sn_tag']) && $tag === $field['sn_tag']) selected @endif>{{ $tag }}</option>
                            @endforeach
                        </select>
                    </div>
                    @endif
                @endif
            <i class="x"></i>
        </div>

        <div class="snfwi contenteditableW">
            <div id="snfwi_{{$topic->id}}_{{$field_name}}" class="editor {{ $field['type'] }}">{!! $value !!}</div>
       </div>
        <ol class="final"></ol>
        <ul class="dictationTools"><li><select class="l"></select></li><li><select class="d"></select></li><li class="mic"></li><li class="reset"></li><li class="done"></li><li class="init"></li></ul>
        <span class="interim"></span>
    </div>

@elseif($field['type'] === 'data')

    <div class="snfw sort" id="{{ Str::slug($field_name) }}-snfw" data-field="{{ $field_name }}" data-type="data">
        <div class="settings">
            <div class="h"></div>
            <div class="n" contenteditable>{{ $field_name }}</div>
            <i class="x"></i>
        </div>
        <div class="snfwi contenteditableW">
            <div class="editor {{ $field['type'] }}">{!! $value !!}</div>
        </div>
    </div>

@endif
