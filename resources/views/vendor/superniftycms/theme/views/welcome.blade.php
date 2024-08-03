@php
    use Supernifty\CMS\Models\Media;
    use Supernifty\CMS\Models\Topic;
    $products = Topic::where('url', 'LIKE', '%products/%')->where('status', 'live')->get();
@endphp
<x-superniftycmstheme-layout :topic="$topic">

    <!-- Required for dynamic assets that will be modified and compiled by Vite into the build manifest: -->

    @include("components.nav-header") {{-- example --}}
    <main>

        {{-- header slideshow --}}
        @include('.components.homepage-slideshow', [ 'slides' => Topic::where('url', 'LIKE', '%homepage-slideshow/%')->where('status', 'live')->get() ])

        <!--// mission statement //-->
        <section id="mission-statement">
            <div class="container">
                <div class="statement box-links dark">
                    {!! $topic->content['mission-statement']['value'] ?? 'Mission Statement' !!}
                </div>
            </div>
            <div class="slash bottom text-kmm-dark-blue"></div>
        </section>

        <section id="capabilities" class="bg-blue-600">
            <ul>
                <li class="model">
                    <a href="/capabilities/vertical-machining">
                        @php $product = $products->where('id', '9c4d3e30-87d8-4857-bc8e-1111a0694e6d')->first(); @endphp
                        @include('components.models.viewer', [ 'product' => $product, 'settings' => $product->content['display-settings']['value']])
                        <h3><strong><i>Vertical <br>Machining</i></strong></h3>
                    </a>
                </li>

                <li class="model">
                    <a href="/capabilities/wire-edm">
                        @php $product = $products->where('id', '9c4d51d7-8464-4bb0-b2c7-99f13c02c480')->first(); @endphp
                        @include('components.models.viewer', [ 'product' => $product, 'settings' => $product->content['display-settings']['value']])
                        <h3><strong><i>Wire EDM</i></strong></h3>
                    </a>
                </li>

                <li class="model">
                    <a href="/capabilities/ram-edm">
                        @php $product = $products->where('id', '9c4d55ed-3892-4a10-92d1-f1175bd28c32')->first(); @endphp
                        @include('components.models.viewer', [ 'product' => $product, 'settings' => $product->content['display-settings']['value']])
                        <h3><strong><i>Ram EDM</i></strong></h3>
                    </a>
                </li>

                <li class="model">
                    <a href="/capabilities/swiss-screw-machining">
                        @php $product = $products->where('id', '9c4d4d12-b44b-4647-8d5c-64097773759b')->first(); @endphp
                        @include('components.models.viewer', [ 'product' => $product, 'settings' => $product->content['display-settings']['value']])
                        <h3><strong><i>Swiss Screw<br>Machining</i></strong></h3>
                    </a>
                </li>

                <li class="model">
                    <a href="/capabilities/micro-machining">
                        @php $product = $products->where('id', '9c4f2ec4-ac22-48c2-89dd-c0d54cc21b26')->first(); @endphp
                        @include('components.models.viewer', [ 'product' => $product, 'settings' => $product->content['display-settings']['value']])
                        <h3><strong><i>Micro <br>Machining</i></strong></h3>
                    </a>
                </li>

                <li class="model">
                    <a href="/capabilities/cnc-turning">
                        @php $product = $products->where('id', '9c4d2360-d503-4174-abea-42b9c9b683c2')->first(); @endphp
                        @include('components.models.viewer', [ 'product' => $product, 'settings' => $product->content['display-settings']['value']])
                        <h3><strong><i>CNC Turning</i></strong></h3>
                    </a>
                </li>

                <li class="model">
                    <a href="/capabilities/cnc-milling">
                        @php $product = $products->where('id', '9c4d6274-97fe-443f-9302-9e5ec05a5e84')->first(); @endphp
                        @include('components.models.viewer', [ 'product' => $product, 'settings' => $product->content['display-settings']['value']])
                        <h3><strong><i>CNC Milling</i></strong></h3>
                    </a>
                </li>

                <li class="ctaW">
                    <a class="cta-slash" href="#">
                        <h4>Challenge Us</h4>
                        <p>If you can imagine it, we can make it.</p>
                        <strong>Contact Us</strong>
                        <i></i>
                    </a>
                </li>
            </ul>
            @include('components.models.controls')
        </section>



<!--// who we are //-->
<section id="who-we-are">
<div class="slash top text-kmm-dark-blue"></div>
<div class="container">
   <div class="statement">
       {!! $topic->content['who-we-are']['value'] ?? 'Who We Are' !!}
   </div>
</div>
<div class="slash bottom text-kmm-dark-blue"></div>
</section>


{{--

<section id="who-we-serve">
<div class="slash top text-kmm-dark-blue"></div>
<div class="container">
   {!! $topic->content['who-we-serve'] ?? "Who We Serve" !!}
   <div class="grid grid-cols-1 md:grid-cols-8 gap-x-4 gap-y-8 w-full">
       <div class="mask md:col-span-3 place-content-center a16x9">
           <img
               src="{{ sn_media_upload_url('9c319827-e54e-4146-a805-daffce9a040a', 750) }}"
               alt="{{ $image->metas['title'] ?? 'Image Title' }}">
       </div>
       <div class="md:col-span-5 place-content-center">{!! $topic->content['medical'] ?? "Medical" !!}</div>
       <div class="mask md:col-span-3 place-content-center a16x9">
           <img
               src="{{ sn_media_upload_url('9c3198a0-4b6a-4a6c-b7d7-e061a9bd7be0', 750) }}"
               alt="{{ $image->metas['title'] ?? 'Image Title' }}">
       </div>
       <div class="md:col-span-5 place-content-center">{!! $topic->content['hi-tech'] ?? "Hi-Tech" !!}</div>
       <div class="mask md:col-span-3 place-content-center a16x9">
           <img
               src="{{ sn_media_upload_url('9c31980a-cff1-484e-9acd-7aa3c04afd1a', 750) }}"
               alt="{{ $image->metas['title'] ?? 'Image Title' }}">
       </div>
       <div class="md:col-span-5 place-content-center">{!! $topic->content['aerospace'] ?? "Aerospace" !!}</div>
       <div class="mask md:col-span-3 place-content-center a16x9">
           <img
               src="{{ sn_media_upload_url('9c319849-92d1-46af-8ef3-fe483facfa12', 750) }}"
               alt="{{ $image->metas['title'] ?? 'Image Title' }}">
       </div>
       <div class="md:col-span-5 place-content-center">{!! $topic->content['robotics'] ?? "Robotics" !!}</div>
   </div>
</div>
<div class="slash bottom text-kmm-dark-blue"></div>
</section>
--}}
<div class="client-logos">
<div class="container">
   <h2 class="text-center text-white">KMM Provides Solutions For</h2>
   @if(isset($topic['content']['partner-logos']['value']))
       @php $logos = Media::find($topic->content['partner-logos']['value'])->sortBy('title', SORT_NATURAL); @endphp
       <div class="logo-grid">
           @foreach($logos as $logo)
               @php $image = sn_img($logo, 1500); @endphp
               <img src="{{ $image['url'] ?? config('superniftycms.uploads.images.fpo') }}" alt="{{ $image['alt'] ?? "Untitled Image" }}">
           @endforeach
       </div>
   @endif
</div>
</div>

</main>


@include("components.promos.cross-link-posts", [ "background_color" => "bg-kmm-dark-blue"]) {{-- example --}}
@include("components.footer") {{-- example --}}
@include("components.sprites") {{-- example --}}

@section('head')

{{--For elements required in the head section for this specific view (e.g.: analytics, pixel tags, etc.) --}}
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>

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


{{--
@php $slides = Topic::where('url', 'like', '%homepage-slideshow/%')->get(); # dd($slides); @endphp
@if(isset($slides))
<div id="homepage-slideshow">
@include("components.slides")
<div class="slash bottom text-white"></div>
</div>
@endif
--}}


{{--

<img src="{{ sn_media_upload_url('9c538fa4-43a2-4da5-908d-3c074343972d', 1000) }}">
<video autoplay muted loop id="myVideo">
<source src="{{ sn_media_upload_url('9c45879c-6c0e-4c90-a149-f8083ec61213', 'original') }}" type="video/mp4">
</video>
--}}


{{--

<div class="video-wrap">
<div class="vw">
<video id="video" autoplay muted loop preload="none">
<source src="{{ sn_media_upload_url('9c45879c-6c0e-4c90-a149-f8083ec61213', 'original') }}" />
<track src="{{ sn_media_upload_url('9c4587bd-7be1-4b58-9ac9-6e390f8ab00f') }}" label="English Captions" kind="subtitles" srclang="en">
<p>Sorry, but it appears your browser doesn't support embedded videos...</p>
</video>
<div id="timer"></div>
<button id="playpause"></button>
<div id="progress">
<div class="progress"></div>
</div>
<ul id="titles">
<li data-t="welcome"><span><strong>KMM Group</strong><i>Unlocking The Science of Manufacturing</i></span></li>
<li data-t="quicktour"><span>How About<br>A Quick Tour?</span></li>
<li data-t="letsgo"><span>Let's Go!</span></li>
<li data-t="rick"><span>Rick</span></li>
<li data-t="hmc"><span>Horizontal<br/>Machining<br/>Centers</span></li>
<li data-t="cleanroom"><span>Cleanroom<br/>Assembly &<br/>Packaging</span></li>
<li data-t="edm"><span>EDM</span></li>
<li data-t="millturn"><span>Mill Turn</span></li>
<li data-t="cncswiss"><span>CNC Swiss</span></li>
<li data-t="bargrinding"><span>Bar Grinding</span></li>
<li data-t="infeedgrinding"><span>InFeed<br/>Grinding</span></li>
<li data-t="multiaxiscncodid"><span>Multi-Axis<br/>CNC OD/ID</span></li>
<li data-t="guidewire"><span>Guidewire<br/>Grinding</span></li>
<li data-t="rand"><span>Research &<br/>Development</span></li>
<li data-t="shipping"><span>Shipping &<br/>Receiving</span></li>
</ul>
<div class="slash bottom text-white"></div>
</div>
</div>
<div class="container">
{!!  $topic['content']['values']['main'] ?? '' !!}



@if(isset($topic['content']['values']['images']))
<div class="grid grid-cols-4 gap-4 my-12">
@foreach($topic['content']['values']['images'] as $image_id)
   @php $image = Media::find($image_id); @endphp
   <div class="trap-1"><img src="{{ sn_media_upload_url($image, 750) }}" alt="{{ $image->metas['title'] ?? 'Image Title' }}"></div>
@endforeach
</div>
@endif
</div>

--}}




{{--

<!--// product header //-->
<header>
<div id="modelsW">
@include("products.modelviewer")
<ul id="models">
@foreach($products as $product)
   <li
       data-model="{{ $product->content['values']['glb'][0] ?? '' }}"
       data-title="{{ sn_slug($product->title) ?? 'untitled-model' }}"
       data-settings="{{ $product->content['values']['display-settings'] ?? '' }}"
       data-capabilities="{{ $product->content['values']['capabilities'] ?? '' }}"
       @if($loop->first) class="active" @endif
   ></li>
@endforeach
</ul>
</div>
<div id="headlineW">
<h1><i>Unlocking</i><i>The Science of</i><i>Manufacturing</i></h1>
</div>
<div id="ctaW"><a class="cta" href="/capabilities">Explore Our Capabilities</a></div>
</header>
--}}


