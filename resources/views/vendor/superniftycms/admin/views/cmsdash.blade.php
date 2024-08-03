@props(['site'])

<?php foreach($topics as $topic) $topicGroups[$topic['group']][] = $topic; ?>

<x-superniftycmsadmin-layout>

    @include('components.topnav')


    <div id="dashboard">
        @if(count($topicGroups) > 0)
            <div id="topicGroups">
                @foreach($topicGroups as $groupName => $topicGroup)
                    <ul class="topicGroup" data-group="{{ $groupName }}">
                        @foreach($topicGroup as $topic)
                            <li class="topic" data-functionality="{{ $topic['functionality'] }}">
                                <a class="manage" href="{{ route('superniftycms.topics.index', [ 'do' => $topic['functionality'] ]) }}">
                                    <h3>{{ $topic['plural'] ?? 'farts'}}</h3>
                                    <p>{{ $topic['description'] ?? 'more farts'}}</p>
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @endforeach
            </div>
        @else
            <p>Hmm... Please check the value of config('superniftycms.topics') because it looks like it's empty.</p>
        @endif
    </div>
</x-superniftycmsadmin-layout>

