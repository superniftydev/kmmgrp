@props(['topic'])
@props(['url_status'])

<x-superniftycmsadmin-layout :topic="$topic" :url_prefix="$url_prefix" :url_status="'ok'">

    <div class="adminViewW">
        @if ($errors->any())
            <h2 class="text-2xl text-red-500 mb-4 font-bold">Oops!</h2>
            <p class="text-red-500 mb-4 font-bold">Please fix the issues below:</p>
            <div class="alert alert-danger alert-dismissible">
                <button type="button" class="btn bg-gray-800 text-white hover:bg-gray-700-close"
                        data-bs-dismiss="alert"></button>
                <strong>
                    {!! implode('<br/>', $errors->all('<span>:message</span>')) !!}
                </strong>
            </div>
        @endif

        @include('components.topnav')

        <div id="editorFormW">
            <button type="button" class="snSaveButton">Save</button>
            <form id="topicEditForm" class="w-full relative" method="post" action="{{ route('superniftycms.topics.save') }}"
                  enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="topic_id" value="{{ $topic->id ?? 'new' }}"/>
                <input type="hidden" name="status" value="{{ $topic->status ?? 'new' }}" id="topicStatus"
                       class="update">
                <div class="titleTools">
                    <div id="topicURLW">
                        <i id="pageurl" data-url="{{ secure_url($topic->url) }}"></i>
                        <i data-domain="{{ env('APP_URL') }}"></i>
                        <input type="text" id="topicURL" value="{{ $topic->url ?? '' }}"/>
                    </div>
                    <ul id="tools" class="tools topicActions" data-functionality="{{ $topic->functionality }}">
                        <li id="gotourl"></li>
                        <li class="sn_ddmenu status">
                            <i></i>
                            <ul>@foreach(config('superniftycms.status.topics.values') as $v => $value)
                                    <li data-v="{{$v}}" data-l="{{$value['label'] }}"></li>
                                @endforeach</ul>
                        </li>
                    </ul>
                </div>

                <section id="topicContent">

                    <!--// title : displays in the browser title bar //-->
                    <div id="titleSNFW" class="snfw">
                        <div id="title-snfwi" data-field="title" class="snfwi text contenteditableW">
                            <div id="topicTitle" contenteditable data-name="title"
                                 class="editor nobr topicTitleInput"
                                 data-placeholder="Untitled Topic">{{ $topic->title ?? '' }}</div>
                        </div>
                    </div>

                    {{-- content fields --}}
                    @php # print "<pre>"; print_r($topic->content); exit; @endphp

                    @if(!is_null($topic->content['sn_fso']))
                        <div class="sort content">
                            @foreach ($topic->content['sn_fso'] as $field_name)
                                @if(isset($topic->content[$field_name]['type']))
                                    {{-- if a user has deleted the content in a field, that value will not be set --}}
                                    @php isset($topic->content[$field_name]['value']) ? $value = $topic->content[$field_name]['value'] : $value = ''; # print "<pre>";  print_r($topic->content); exit; @endphp
                                    @php # if(!isset($topic->content[$field_name]['type'])) { print "<pre>"; print_r($topic->content); exit; } @endphp
                                    @include("topics.field", [ "field_name" => $field_name, "field" => $topic->content[$field_name], "value" => $value, "media" => $topic->media ?? [], "mediaJSON" => $topic->mediaJSON['content'] ?? [] ])
                                @endif
                            @endforeach
                        </div>
                    @else
                        <p class="flex justify-center text-center p-12 text-red-500">Looks like there are issues with
                            the settings for this topic.</p>
                    @endif

                    @if(is_array($sn_view_blades))
                    <div id="bladeFields">
                        <div id="bladeW" class="labelSelect">
                            <label>Page Layout:</label>
                            <select id="topicBlade" name="blade">
                                <option value="components.auto" selected>auto</option>
                                @foreach($sn_view_blades as $label => $blade)
                                    <option value="{{ $blade }}"
                                        @if($blade === $topic->blade) selected @endif>{{ $label }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    @else
                        <input id="topicBlade" type="hidden" name="blade" value="{{ $topic->blade ?? 'auto' }}">
                    @endif
                </section>

                <section id="topicMetas" class="panel">
                    @include('topics.metas')
                </section>
            </form>
            <button id="deleteTopicButton"></button>
            <form id="destroyTopicForm" method="post" action="{{ route('superniftycms.topics.destroy') }}">
                @csrf
                <input type="hidden" name="topic_id" value="{{ $topic->id }}">
            </form>
        </div>
        <div id="fieldSource">
            <div class="w">
            @php
                $source_data_field['type'] = 'data';
                $source_text_field['type'] = 'text';
                $source_richtext_field['type'] = 'richtext';
                $source_image_field = [ 'type' => 'media', 'aft' => 'images' ];
                $source_mp4_field = [ 'type' => 'media', 'aft' => 'videos' ];
                $source_youtube_field = [ 'type' => 'media', 'aft' => 'youtube' ];
                $source_vimeo_field = [ 'type' => 'media', 'aft' => 'vimeo' ];

            @endphp
            @include("topics.field", [ "field_name" => "new-text-field", "field" => $source_text_field, "value" => '', "media" => [], "mediaJSON" => [] ])
            @include("topics.field", [ "field_name" => "new-rich-text-field", "field" => $source_richtext_field, "value" => '', "media" => [], "mediaJSON" => [] ])
            @include("topics.field", [ "field_name" => "new-image-field", "field" => $source_image_field, "value" => '', "media" => [], "mediaJSON" => [] ])
            @include("topics.field", [ "field_name" => "new-mp4-field", "field" => $source_mp4_field, "value" => '', "media" => [], "mediaJSON" => [] ])
            @include("topics.field", [ "field_name" => "new-youtube-field", "field" => $source_youtube_field, "value" => '', "media" => [], "mediaJSON" => [] ])
            @include("topics.field", [ "field_name" => "new-vimeo-field", "field" => $source_vimeo_field, "value" => '', "media" => [], "mediaJSON" => [] ])
            @include("topics.field", [ "field_name" => "new-data-field", "field" => $source_data_field, "value" => '', "media" => [], "mediaJSON" => [] ])

            </div>
        </div>
    </div>
    <?php $topic = $topic->getAttributes(); $content = json_decode($topic['content'], true); ?>
    @include('dropzone.template')
    @include('dropzone.modal')
</x-superniftycmsadmin-layout>
