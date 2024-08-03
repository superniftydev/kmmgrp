<div id="toggleTopicStatusW">
    <div id="toggleTopicStatus" data-label="status" data-status="{{ $topic->status ?? 'draft' }}"><i></i></div>
    <ul>
        @foreach(sn_config('superniftycms.status.values') as $v => $value)
            <li data-value="{{ Str::slug($v, '-') }}" >{{ Str::title($value['label']) }}</li>
        @endforeach
    </ul>
</div>
