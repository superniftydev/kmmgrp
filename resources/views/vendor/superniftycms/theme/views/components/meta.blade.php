
    <!--// meta //-->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta property="og:locale" content="{{ config('app.locale') }}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ config('app.name') }}">

    <meta name="language" content="{{ config('app.language') }}">
    <meta name="domain" content="{{ config('app.session_domain') }}">

    @if(isset($topic))
    <meta property="og:title" content="{{ $topic->title ?? 'Hello!' }} | {{ config('app.name') }}">
    <meta name="description" content="{{ $topic->metas['description']['value'] ?? 'Meta Description' }}">
    <meta property="og:description" content="{{ $topic->metas['description']['value'] ?? 'Meta Description' }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="article:author" content="{{ config('app.name') }}">
    <meta property="article:published_time" content="{{ Carbon\Carbon::parse($topic['created_at'])->toISOString() }}">
    <meta property="article:modified_time" content="{{ Carbon\Carbon::parse($topic['updated_at'])->toISOString() }}">
    <meta property="og:image" content="">
    <meta name="twitter:card" content="summary_large_image">
    @endif

    <!--// links //-->
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="canonical" href="{{ url()->current() }}">
    <link rel="shortlink" href="{{ url()->current() }}">

