<x-guest-layout :topic="$topic">{{-- ** Required - Sends $topic variable up to layouts/guest.layout.php blade ** --}}

    <!-- Required for dynamic assets that will be modified and compiled by Vite into the build manifest: -->
    {{ Vite::useBuildDirectory(sn_build_directory()) }}

    @include("components.nav-header") {{-- example --}}
    <main>
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1>{{ $topic->title ?? 'About' }}</h1>
            {!!  $topic->content['main']['value'] ?? '' !!}

            @if(isset($topic->content['images']['value']))
                <h2>There are images</h2>
                <div class="grid grid-cols-4 gap-4">
                    @foreach($topic->content['images']['value'] as $image_id)
                        <img src="{{ sn_media_upload_url($image_id, 250) }}" class="">
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

</x-guest-layout>
