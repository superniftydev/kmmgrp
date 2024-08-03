<?php
use Supernifty\CMS\Models\Topic;
if(isset($topic) && isset($topic->id)){
    $key = array_search($topic->functionality, array_column(config('superniftycms.topics'), 'functionality'));
    $settings = config('superniftycms.topics.'.$key);
     # dd($settings);
}



?>
<nav class="sncms_topnav">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="{{ route('superniftycms.cmsdash') }}">CMS Dash</a></li>
        @if(isset($topic->functionality) && str_contains($topic->url, '/')) <li><a href="{{ route('superniftycms.topics.index', [ 'do' => $topic->functionality ]) }}">{{ $settings['plural'] }}</a></li> @endif
        @if(isset($topic->id))<li class="topicTitleDisplay">{{ $topic->title }}</li>
        @elseif(isset( $settings['plural']))<li class="topicTitleDisplay">{{  $settings['plural'] }}</li>@endif
    </ul>
</nav>

