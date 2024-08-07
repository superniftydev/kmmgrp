@php
    use Supernifty\CMS\Models\Media;
    use Supernifty\CMS\Models\Topic;
@endphp
<x-superniftycmstheme-layout :topic="$topic">
    @include("components.nav-header")
    <main>

        <header class="capability slash">
            @if(isset($topic->content['header-product-id']))
                    <?php
                    $product = Topic::where('id', $topic->content['header-product-id']['value'])->first();
                    $settings = $topic->content['model-display-settings']['value'];
                    $interactive = true;
                    ?>

                <div class="model">
                    @include('components.models.viewer', [ 'product' => $product, 'settings' => $settings ])
                    @include('components.models.controls')
                </div>
            @endif
            <div class="content">
                <h1 data-eyebrow="{{ $topic->content['header-eyebrow']['value'] ?? 'Need Eyebrow' }}">{{ $topic->content['header-headline']['value'] ?? 'Need Headline' }}</h1>
                {!! $topic->content['header-bullets']['value'] ?? "<ul><li>Need bullets...</li></ul>" !!}
            </div>
        </header>

        <section class="body">
            <div class="slice text-white"><a href="{{ $topic->content['header-cta-url']['value'] ?? "/contact" }}" class="cta-button">{{ $topic->content['header-cta-text']['value'] ?? "Contact Us" }}</a>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 py-12">
                <div class="flex flex-col col-span-1 lg:col-span-8">
                    {!! $topic->content['body-copy']['value'] ?? 'Need Intro' !!}
                    <a href="{{ $topic->content['body-cta-url']['value'] ?? "/contact" }}"
                       class="cta-button mr-auto">{{ $topic->content['body-cta-text']['value'] ?? "Contact Us" }}</a>
                </div>
                <div class="col-span-1 lg:col-span-4 flex flex-col">
                    @if($topic->content['images-from-the-floor']['value'])
                        <div class="gallery slashes">
                            <h3>Shots From The Floor</h3>
                            <ul>
                                @foreach($topic->content['images-from-the-floor']['value'] as $image_id)
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
            </div>
        </section>


    </main>
    @include("components.promos.cross-link-posts", [ "background_color" => "bg-white"]) {{-- example --}}
    @include("components.footer") {{-- example --}}
    @include("components.sprites") {{-- example --}}

    @section('head')

        {{--For elements required in the head section for this specific view (e.g.: analytics, pixel tags, etc.) --}}

    @endsection

    @section('css')
        @vite([
          'resources/views/vendor/superniftycms/theme/static/js/lightgallery/css/lightgallery-bundle.css'
        ])
    @endsection

    @section('js')
        @vite([
            'resources/views/vendor/superniftycms/theme/static/js/model-viewer.js',
            'resources/views/vendor/superniftycms/theme/static/js/lightgallery/lightgallery.min.js',
            'resources/views/vendor/superniftycms/theme/static/js/lightgallery/plugins/thumbnail/lg-thumbnail.min.js',
            'resources/views/vendor/superniftycms/theme/static/js/lightgallery/plugins/zoom/lg-zoom.min.js',
            'resources/views/vendor/superniftycms/theme/static/js/lightgallery/plugins/autoplay/lg-autoplay.min.js',
            'resources/views/vendor/superniftycms/theme/static/js/lightgallery/plugins/fullscreen/lg-fullscreen.min.js',
        ])
    @endsection

</x-superniftycmstheme-layout>





