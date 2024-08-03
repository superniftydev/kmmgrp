@auth
    <ul id="sn_adminFT"
        @if(isset($topic['id'])) data-topic_id="{{ $topic['id'] ?? '' }}" data-topic_status="{{ $topic['status'] ?? '' }}" @endif
    >

   @if(isset($topic['id']))<li data-e data-url="/admin/topic/edit/{{ $topic['id']}}"></li> @endif
   @if(isset($topic['id']))<li data-d data-url="{{ url('/admin') }}"></li> @endif
   <li data-tm></li>
</ul>
@endauth
