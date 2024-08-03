<?php


use Supernifty\CMS\Models\Media;
use Supernifty\CMS\Models\Topic;

$posts = Topic::where('functionality', 'posts')
    ->where('url', '!=', 'blog')
    ->orderBy('created_at', 'desc')
    ->get();


$featured_image = sn_img($topic->content['featured-image']['value'][0] ?? '9c3195b2-7572-4e54-969b-057d6af77626', 1500);







# print "<pre>";
# print_r($posts);
# exit;

?>

<x-superniftycmstheme-layout :topic="$topic">
    @include("components.nav-header")
    <main>
        <header class="basic slash">
            <div class="container">
                <h1>{{ $topic->title ?? 'About' }}</h1>
            </div>
            <i></i>
            <img src="{{ $featured_image['url'] ?? config('superniftycms.uploads.images.fpo') }}"
                 alt="{{ $featured_image['alt'] ?? "Untitled Image" }}">
        </header>

        <div class="container">

            <div class="grid grid-cols-12 gap-4 my-12">

                <div class="col-span-9">
                    {!!  $topic->content['main']['value'] ?? '' !!}

                    @if($topic->content['images']['value'])
                        <div class="gallery slashes">
                            <ul>
                                @foreach($topic->content['images']['value'] as $image_id)
                                    @php $media = Media::find($image_id); @endphp
                                    <li>
                                        <a data-src="{{ sn_img($media, 1000)['url'] }}"
                                           data-sub-html="<h4>{{ $media->metas['title'] ?? 'KMM Image Title' }}</h4><p>{{ $media->metas['description'] ?? 'KMM Image Description' }}</p>">
                                            <img src="{{ sn_img($media, 250)['url'] }}"
                                                 alt="{{ $media->metas['title'] ?? 'KMM Image Title' }} - {{ $media->metas['description'] ?? 'KMM Image Description' }}">
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                </div>
                <div class="col-span-3">
                    @php $posts = Topic::where('functionality', 'posts')->inRandomOrder()->limit(5)->get(); @endphp
                    @if(isset($posts))
                        <ul class="featured-posts">
                            @foreach($posts as $post)
                                <li><a href="/{{ $post->url }}">{{ $post->title ?? 'Untitled Post' }}</a></li>
                            @endforeach
                        </ul>
                    @endif

                </div>

            </div>

        </div>

    </main>
    @include("components.footer") {{-- example --}}
    @include("components.sprites") {{-- example --}}

    @section('head')

        {{--For elements required in the head section for this specific view (e.g.: analytics, pixel tags, etc.) --}}

    @endsection

    @section('css')

        @vite([
          'resources/views/vendor/superniftycms/theme/vendor/lightgallery/css/lightgallery-bundle.css'
        ])

    @endsection

    @section('js')
        @vite([
            'resources/views/vendor/superniftycms/theme/vendor/lightgallery/lightgallery.min.js',
            'resources/views/vendor/superniftycms/theme/vendor/lightgallery/plugins/thumbnail/lg-thumbnail.min.js',
            'resources/views/vendor/superniftycms/theme/vendor/lightgallery/plugins/zoom/lg-zoom.min.js',
            'resources/views/vendor/superniftycms/theme/vendor/lightgallery/plugins/autoplay/lg-autoplay.min.js',
            'resources/views/vendor/superniftycms/theme/vendor/lightgallery/plugins/fullscreen/lg-fullscreen.min.js',
        ])
    @endsection

    <!--// post blade //-->

</x-superniftycmstheme-layout>




