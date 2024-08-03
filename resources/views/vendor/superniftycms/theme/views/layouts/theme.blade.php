@props(['topic']) {{-- ** required ** --}}
    <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<!--[ {{ $environment ?? 'environment not set' }} ]--> {{--// handy for development //--}}
<head>

 {{--  @include('admin.tools.head') {{-- ** required for the (S) admin tools ** --}}

    <title>{{ config('app.name', 'Supernifty!') }} :: {{ $topic->title ?? 'Hello!' }}</title>

    @include("components.meta") {{--// example meta tags (resources/views/components/meta.blade.php) //--}}

    {{--// add config/schema.php //--}}

    <meta name="generator" content="Supernifty 1.0" />

    <!-- Google Fonts API -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <script src="https://cdn.jsdelivr.net/npm/google-fonts-css2@2.0.0/dist/umd/index.min.js"></script>



    <!--// lightgallery //-->
    <link href="{{ secure_asset('build/static/js/lightgallery/css/lightgallery-bundle.css') }}">
    <script src="{{ secure_asset('build/static/js/lightgallery/lightgallery.min.js') }}"></script>
    <script src="{{ secure_asset('build/static/js/lightgallery/plugins/autoplay/lg-autoplay.min.js') }}"></script>


    {{-- ** required for dynamic assets that will be modified and compiled by Vite into the build manifest ** --}}
    @vite([
    'resources/css/app.css',
    'resources/js/app.js',

    'resources/views/vendor/superniftycms/admin/css/sncms_fe_admin.css',
    'resources/views/vendor/superniftycms/admin/js/sncms_fe_admin.js',
    'resources/views/vendor/superniftycms/admin/css/sncms_fe.css',
    'resources/views/vendor/superniftycms/admin/js/sncms_fe.js',


    'resources/views/vendor/superniftycms/theme/css/theme.css',
    'resources/views/vendor/superniftycms/theme/js/theme.js',


    'resources/views/vendor/superniftycms/theme/js/modelloader.js',
    'resources/views/vendor/superniftycms/theme/js/modelviewer.js',


    /* 'resources/views/vendor/superniftycms/theme/js/facility-map.js', */
    /* 'resources/views/vendor/superniftycms/theme/js/welcome-header-video.js', */



    ])

    @yield('css') {{-- load view-specific css (if any) --}}
    @yield('head') {{-- load view-specific head elements (if any) --}}

    @include("components.loader-style") {{--// example page load animation css //--}}

    <!-- favicon -->
    <link rel="icon" href="{{ secure_asset('img/favicons/favicon.ico') }}" sizes="32x32">
    <link rel="apple-touch-icon" href="{{ secure_asset('img/favicons/apple-touch-icon.png') }}"><!-- 180×180 -->

</head>
<body

    {{-- not required, but handy for view-specific pcss/css/js rules & references --}}
    @if(isset($topic))
        id="{{ $topic['url'] ?? 'guest' }}-page"
        data-topic_id="{{ $topic['id'] ?? '' }}"
        data-topic_url="{{ $topic['url'] ?? '' }}"
    @endif

    @auth data-admin @endauth {{-- ** required for administrative access ** --}}
    class="loading" {{--// used for the components.logo-loader in this starter site //--}}
>

@include("components.loader") {{--// example page load animation html //--}}


@include("tools.sncms_fe_admin") {{--// example page load animation html //--}}


{{ $slot }} {{-- ** required to load the view-specific content ** --}}

{{-- @include('admin.tools.body') {{-- ** required for the (S) admin tools ** --}}

@yield('js') {{--// load view-specific javascript (if any) //--}}
</body>
</html>
