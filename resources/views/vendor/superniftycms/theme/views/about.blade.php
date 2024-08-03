<x-superniftycmstheme-layout :topic="$topic">
    @include("components.nav-header")
    <main>
        <header>
            <div class="container">
                <h1>{{ $topic->title ?? 'About' }}</h1>
            </div>
        </header>
        <div class="container">

            {!!  $topic->content['main']['value'] ?? '' !!}

            @if(isset($topic->content['images']['value']))
                <div class="grid grid-cols-4 gap-4 my-12">
                    @foreach($topic->content['images']['value'] as $image_id)
                        @php $image = sn_img($image_id, 750); @endphp
                        <img src="{{ $image['url'] ?? config('superniftycms.uploads.images.fpo') }}" alt="{{ $image['alt'] ?? "Untitled Image" }}">
                    @endforeach
                </div>
            @endif
        </div>
    </main>
    @include("components.footer")
    @include("components.sprites")

    @section('head')

        {{--// elements for the head section of this specific view (e.g.: analytics, pixel tags, etc.) //--}}

    @endsection

    @section('css')

        {{--// css/pcss required for this specific view //--}}

    @endsection

    @section('js')

        {{--// js required for this specific view // --}}

    @endsection

    <!--// about blade //-->

</x-superniftycmstheme-layout>




