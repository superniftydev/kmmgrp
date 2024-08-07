<x-superniftycmstheme-layout
        :topic="$topic">{{-- ** Required - Sends $topic variable up to layouts/guest.layout.php blade ** --}}
    @include("components.nav-header")
    <main>
        <header>
            <div class="container">
                <h1>{{ $topic->title ?? 'Automatic Layout' }}</h1>
            </div>
        </header>
        @foreach($topic->content['sn_fso'] as $field_name)
            @php
            if($topic->content[$field_name]['type'] !== 'media') $path = "components.fields.{$topic->content[$field_name]['type']}.section";
            else $path = "components.fields.{$topic->content[$field_name]['type']}.{$topic->content[$field_name]['aft']}.section";
            @endphp
            @include($path, [ 'field_name' => $field_name, 'field' => $topic->content[$field_name] ])
        @endforeach
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

    <!--//  auto blade //-->

</x-superniftycmstheme-layout>
