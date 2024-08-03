@php
    use App\Models\Media;
    use Illuminate\Support\Str;
@endphp

{{--
<?php

function showDOMNode(DOMNode $domNode, $elements = [], $a = 0)
{
    foreach($domNode->childNodes as $node) {
        if(in_array($node->nodeName, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'])) {
            if($node->nodeName === 'p' && Str::isUuid($node->nodeValue)){
                $elements[$a]['tag'] = "img";
                $elements[$a]['image_id'] = $node->nodeValue;
            }
            else {
                $elements[$a]['tag'] = $node->nodeName;
                $elements[$a]['content'] = $node->nodeValue;
            }
            $a++;
        }
        if($node->hasChildNodes()) $elements = showDOMNode($node, $elements, $a);
    }
    return $elements;
}

$doc = new DOMDocument;
$html = [];
$a = 0;
$doc->loadHTML($topic->content['main']['value']);
$elements = showDOMNode($doc);

print "<pre>";
print_r($elements);

exit;

# $paras = $doc->getElementsByTagName('p');
# for($p = 0; $p < $paras->length; $p++) {
#     print "<h2>".htmlspecialchars_decode($paras->item($p)->textContent, ENT_SUBSTITUTE).'</h2>';
# }

?>
--}}

<x-superniftycmstheme-layout :topic="$topic">{{-- ** Required - Sends $topic variable up to layouts/guest.layout.php blade ** --}}

    <!-- Required for dynamic assets that will be modified and compiled by Vite into the build manifest: -->
    {{ Vite::useBuildDirectory(sn_build_directory()) }}

    @include("components.nav-header") {{-- example --}}


    <main>
        <header class="basic slash">
            <div class="container">
                <h1>{{ $topic->title ?? 'Untitled' }}</h1>
            </div>
        </header>

        <?php isset($topic->content['main']['sn_blade']) ? $blade = $topic->content['main']['sn_blade'] : $blade = 'boxed'; ?>
        @include("components.text.".$blade ?? 'boxed', [ 'field' => $topic->content['main']])
    </main>
    @include("components.promos.cross-link-posts", [ "background_color" => "bg-kmm-dark-blue"]) {{-- example --}}
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

    <!--// DEFAULT BLADE //-->

</x-superniftycmstheme-layout>




