<?php


use Supernifty\CMS\Models\Topic;

$posts = Topic::where('functionality', 'posts')
    ->where('url', '!=', 'blog')
    ->orderBy('created_at', 'desc')
    ->get();

# print "<pre>";
# print_r($posts);
# exit;

?>

<x-superniftycmstheme-layout
    :topic="$topic">{{-- ** Required - Sends $topic variable up to layouts/guest.layout.php blade ** --}}

    <!-- Required for dynamic assets that will be modified and compiled by Vite into the build manifest: -->

    @include("components.nav-header") {{-- example --}}
    <main>
        <header>
            <div class="container">
                <h1>{{ $topic->title ?? 'About' }}</h1>
            </div>
        </header>

        <div class="container">
            {!!  $topic->content['main']['value'] ?? '' !!}

            @if(isset($posts) && count($posts) > 0)
                <ol class="my-12">
                    @foreach($posts as $post)
                        <li><a href="{{ $post->url }}">{{ $post->title }}</a></li>
                    @endforeach
                </ol>
            @endif

            @if(isset($topic->content['images']['value']))
                <div class="grid grid-cols-4 gap-4 my-12">
                    @foreach($topic->content['images']['value'] as $image_id)
                        @php $image = sn_img($image_id, 250); @endphp
                        <img src="{{ $image['url'] ?? config('superniftycms.uploads.images.fpo') }}"
                             alt="{{ $image['alt'] ?? "Untitled Image" }}">
                    @endforeach
                </div>
            @endif
        </div>
    </main>
    @include("components.footer") {{-- example --}}
    @include("components.sprites") {{-- example --}}

    @section('head')

        {{--For elements required in the head section for this specific view (e.g.: analytics, pixel tags, etc.) --}}

    @endsection

    @section('css')

        {{--

        For any CSS/PCSS required for this specific view:

        <!-- For static javascript assets such as external libraries that will not be modified -->
        <link rel="stylesheet" href="{{ sn_static_asset('css/static.css') }}">

        --}}

    @endsection

    @section('js')

        {{--

        For any Javascript required for this specific view:

        <!-- For static javascript assets such as external libraries that will not be modified: -->
        <script src="{{ sn_static_asset('js/static.js') }}"></script>

        <!-- Tell Vite where your script(s) is/are: -->
        @vite(["{$environment_root}/resources/js/example1.js"])
        @vite(["{$environment_root}/resources/js/example2.js"])

        --}}

    @endsection

    <!--// WELCOME BLADE //-->

</x-superniftycmstheme-layout>
