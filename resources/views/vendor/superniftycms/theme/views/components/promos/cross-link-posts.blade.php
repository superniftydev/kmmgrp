@php
    use Supernifty\CMS\Models\Topic;
@endphp
<section class="cross-link-posts {{ $background_color  ?? 'bg-white'}}">
    <ul>
        @php
            $posts = Topic::where('url', 'LIKE', '%blog/%')->inRandomOrder()->limit(3)->get();

            foreach($posts as $post) {
                if(isset($post->content['main']['value'])) $post->excerpt = strip_tags(str()->limit($post->content['main']['value'], 100));
                else $post->excerpt = "No excerpt available...";
            }
        @endphp
        @foreach($posts as $post)
            @php $image = sn_img($post->content['images']['value'][0] ?? null, 'thumbnail'); @endphp
            <li>
                <a href="/{{ $post->url }}">
                    <div class="img">
                        <img src="{{ $image['url'] ?? config('superniftycms.uploads.images.fpo') }}" alt="{{ $image['alt'] ?? "Untitled Image" }}">
                    </div>
                    <h3>{{ $post->title ?? "Untitled Post" }}</h3>
                    <p>{{ $post->excerpt ?? "No excerpt..." }}</p>
                </a>
            </li>
        @endforeach
    </ul>
</section>
