@php

   use Supernifty\CMS\Models\Topic;

   str_contains(url()->current(), '/leadership/') ? $view = "leader" : $view = "leadership";

   $leaders = Topic::where('url', 'LIKE', '%/leadership/%')->get();
   $leaders_sorted[] = $leaders->where('url', 'about-us/leadership/john-shegda')->first();
   $leaders_sorted[] = $leaders->where('url', 'about-us/leadership/eric-wilhelm')->first();
   $leaders_sorted[] = $leaders->where('url', 'about-us/leadership/rick-desrosiers')->first();
   $leaders_sorted[] = $leaders->where('url', 'about-us/leadership/jessica-leggett')->first();
   $leaders_sorted[] = $leaders->where('url', 'about-us/leadership/j-mark-king')->first();
   $leaders_sorted[] = $leaders->where('url', 'about-us/leadership/sue-cloran')->first();
   $leaders_sorted[] = $leaders->where('url', 'about-us/leadership/chris-allen')->first();
   $leaders_sorted[] = $leaders->where('url', 'about-us/leadership/amy-rodgers')->first();
   $leaders_sorted[] = $leaders->where('url', 'about-us/leadership/michelle-martin-laughlin')->first();



   # print "<pre>";
   /*
   foreach($leaders as $leader){
       print $leader->content['headline']['value']."\n";
   }
   print "\n\n";
   foreach($leaders_sorted as $leader){
      if(!is_null($leader)) print $leader->content['headline']['value']."\n";
   }
   print "\n\n";
   */
   # print_r($leaders);
   # exit;


@endphp

<x-superniftycmstheme-layout :topic="$topic">

    @include("components.nav-header")

    <main>

        <header class="basic slash text-dot">
            <div class="container">
                @if($view !== 'leadership')
                @php $image = sn_img($topic->content['images']['value'][0], 750); @endphp
                <img src="{{ $image['url'] ?? config('superniftycms.uploads.images.fpo') }}" alt="{{ $leader->content['full-name']['value'] ?? 'Need Full Name' }}">
                @endif
                <div class="text">
                    <h1>{{ $topic->content['full-name']['value'] ?? 'Leadership' }}</h1>
                    <p class="text-white">{{ $topic->content['title']['value'] ?? 'Leadership' }}</p>
                </div>
            </div>
        </header>


        <section class="body">

            @if($view !== 'leadership')
                <div class="container">
                    {!! $topic->content['body']['value'] ?? "Topic Body" !!}
                    <a class="social" href="{{ $topic->content['linked-in-url']['value'] ?? "https://linkedin" }}">
                        <span><svg><use href="#linkedin"></use></svg></span>
                        <i>Read {{ $topic->content['first-name']['value'] ?? 'this person' }}'s LinkedIn Profile</i>
                    </a>
                </div>
            @endif

            <div class="leadership-dots @if($view === 'leadership') large @else small @endif">

                <div class="slash top text-white"></div>

                @if($view !== 'leadership')
                    <h2>KMM Leadership</h2>
                @endif

                <ul role="list">
                    @foreach($leaders_sorted as $leader)
                        <li>
                            <a href="/{{ $leader->url }}">
                                @php $image = sn_img($leader->content['images']['value'][0], 750); @endphp
                                <img src="{{ $image['url'] ?? config('superniftycms.uploads.images.fpo') }}" alt="{{ $leader->content['full-name']['value'] ?? 'Need Full Name' }}">
                                <h3>{!! $leader->content['full-name']['value'] ?? 'Need Full Name' !!}</h3>
                                <p>{{ $leader->content['title']['value'] ?? 'Need Title' }}</p>
                            </a>
                        </li>
                    @endforeach
                </ul>


            </div>

        </section>


    </main>
    @php $view !== 'leadership' ? $bgcolor = 'bg-gray-100' : $bgcolor = 'bg-white'; @endphp
    @include("components.promos.cross-link-posts", [ "background_color" => $bgcolor ])
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

    <!--// leadership blade //-->

</x-superniftycmstheme-layout>
