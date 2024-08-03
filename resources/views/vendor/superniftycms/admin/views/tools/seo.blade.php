<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:locale" content="{{ config('app.locale') }}" />
<meta property="og:locale:alternate" content="{{ config('app.locale_alternate') }}" />
<meta name="language" content="{{ config('app.language') ?? 'en_US' }}">
<meta name="rating" content="general">
<meta name="google-site-verification" content="{{ config('superniftycms.seo.googleSiteVerification') }}">

<link rel="profile" href="https://gmpg.org/xfn/11">
<meta name="domain" content="{{ config('app.session_domain') }}">
<link rel="canonical" href="{{ url()->current() }}">
<link rel="shortlink" href="{{ url()->current() }}">

<meta name="apple-mobile-web-app-capable" content="{{ config('superniftycms.vendor.apple.webAppBarCapable') }}">
<meta name="apple-mobile-web-app-status-bar-style" content="{{ config('superniftycms.vendor.apple.webAppBarColor') }}">
<meta name="format-detection" content="{{ config('superniftycms.vendor.apple.formatDetection') }}">

<link rel="icon" href="{{ Vite::asset('resources/img/favicons/favicon.ico') }}" sizes="32x32">
<link rel="icon" href="{{ Vite::asset('resources/img/favicons/favicon.svg') }}" type="image/svg+xml">
<link rel="apple-touch-icon" href="{{ Vite::asset('resources/img/favicons/180x180.png') }}">

<script type="application/ld+json">{!! json_encode(config('superniftycms.schema'), JSON_UNESCAPED_SLASHES) !!}</script>";

<title>{{ $topic->title ?? 'NEEDS_TOPIC_TITLE' }} :: {{ config('superniftycms.brand') }}</title>
<meta name="robots" content="{{ $topic->metas['robots'] ?? config('superniftycms.seo.robots') }}">
<meta name="googlebot" content="{{ $topic->metas['googlebot'] ?? config('superniftycms.seo.googlebot') }}">

<!--// https://github.com/Donatello-za/rake-php-plus //-->
<meta name="keywords" content="{{ $topic->metas['keywords'] ?? 'NEEDS_META_KEYWORDS' }}">
<meta name="description" content="{{ $topic->metas['description'] ?? 'NEEDS_META_DESCRIPTION' }}">
<link rel="author" href="{{ $topic->metas['author'] ?? config('superniftycms.users.defaultAuthor') }}" />

<meta property="article:author" content="{{ $topic->metas['author'] ?? config('superniftycms.users.defaultAuthor') }}">
<meta property="article:published_time" content="{{ $topic->created_at ?? Carbon::now()->subDays(20)->toDateTimeString() }}">
<meta property="article:modified_time" content="{{ $topic->last_updated ?? Carbon::now()->subDays(5)->toDateTimeString() }}">

<meta property="og:type" content="website" />
<meta property="og:url" content="{{ url()->current() }}">
<meta property="og:title" content="{{ $topic->title ?? 'NEEDS_TOPIC_TITLE' }}">
<meta property="og:description" content="{{ $topic->metas['description'] ?? 'NEEDS_META_DESCRIPTION' }}" />
<meta property="og:site_name" content="{{ config('superniftycms.brand') }}" />
<meta property="og:see_also" content="{{ config('superniftycms.url') }}">
<meta property="og:updated_time" content="{{ $topic->last_updated ?? Carbon::now()->subDays(5)->toDateTimeString() }}">

<meta property="og:image" content="{{ $topic->metas['featured-image']['url'] ?? 'NEEDS_FEATURED_IMAGE_URL' }}" />
<meta property="og:image:secure_url" content="{{ $topic->metas['featured-image']['url'] ?? 'NEEDS_FEATURED_IMAGE_URL' }}" />
<meta property="og:image:type" content="{{ $topic->metas['featured-image']['type'] ?? 'NEEDS_FEATURED_IMAGE_TYPE' }}" />
<meta property="og:image:alt" content="{{ $topic->title ?? 'NEEDS_TOPIC_TITLE' }}" />
<meta property="og:image:width" content={{ config('superniftycms.images.featured.default.width') ?? 1200 }} />
<meta property="og:image:height" content={{ config('superniftycms.images.featured.default.height') ?? 628 }} />

<meta name="twitter:card" content="summary">
<meta name="twitter:url" content="{{ url()->current() }}">
<meta name="twitter:title" content="{{ $topic->title ?? 'NEEDS_TOPIC_TITLE' }}">
<meta name="twitter:description" content="{{ $topic->metas['description'] ?? 'NEEDS_META_DESCRIPTION' }}">
<meta name="twitter:image" content="{{ $topic->metas['xtwitter-image']['url'] ?? 'NEEDS_XTWITTER_IMAGE_URL' }}">
<meta name="twitter:image:alt" content="{{ $topic->title ?? 'NEEDS_TOPIC_TITLE' }}">


<!--// https://sameerwasim.github.io/blog/create-a-dynamic-xml-sitemap-with-php //-->


