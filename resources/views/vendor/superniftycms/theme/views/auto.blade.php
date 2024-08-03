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
            @include('components.fields.'.$topic->content[$field_name]['type'].".section")
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
