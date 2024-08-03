@props(['site'])
<x-superniftycmsadmin-layout>

    @include('components.topnav')

    <div id="topicsBody">

        <div id="sn_adminHeader">
            <div>
                <h1>{{ $settings['plural'] }}</h1>
                <form id="createTopicForm" method="post" action="{{ route('superniftycms.topics.create') }}">
                    @csrf
                    <input type="hidden" name="url_prefix">
                    <input type="hidden" name="clone_id">
                    <input type="hidden" name="functionality" value="{{ $settings['functionality'] }}">
                    <button type="submit">New {{ $settings['label'] ?? '' }}</button>
                </form>
            </div>
            <form id="destroyTopicForm" method="post" action="{{ route('superniftycms.topics.destroy') }}">
                @csrf
                <input type="hidden" name="topic_id" value="">
            </form>
        </div>

        @if(isset($topics))
            <div id="topicList" class="topicActions">
                {!! $topics !!}
            </div>
        @else
            <p>No Topics found!</p>
        @endif

    </div>
</x-superniftycmsadmin-layout>
