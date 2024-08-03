<x-guest-layout :topic="$topic">{{-- ** Required - Sends $topic variable up to layouts/guest.layout.php blade ** --}}

    <!-- Required for dynamic assets that will be modified and compiled by Vite into the build manifest: -->
    {{ Vite::useBuildDirectory(sn_build_directory()) }}

    @include("components.nav-header") {{-- example --}}
    <main>

        {{-- form --}}
        <section id="body" class="w-full mx-auto max-w-3xl sm:px-6 lg:px-8">

            <h1 class="text-center">{{ $topic->content['headline']['value'] ?? 'contact us' }}</h1>
            {!! $topic->content['body']['value'] ?? '' !!}
            <div class="form basic">
                <div class="intro">
                    <form action="#" id="contactForm" method="post">
                        @csrf
                        <input type="hidden" name="contact_form_submitted" value="1"/>
                        <div class="f">
                            <input id="f_name" type="text" name="name" placeholder="First & Last">
                            <label for="f_name" tabindex="-1">name</label>
                        </div>
                        <div class="f">
                            <input id="f_email" type="email" name="email" required placeholder="example@domain.com">
                            <label for="f_email" tabindex="-1">email</label>
                        </div>
                        <div class="f">
                            <input id="f_phone" type="tel" name="phone" placeholder="000-000-0000">
                            <label for="f_phone" tabindex="-1">phone</label>
                        </div>
                        <div class="f">
                            <textarea id="f_message" name="message" required
                                      placeholder="Whatever you'd like to say..."></textarea>
                            <label for="f_message" tabindex="-1">message</label>
                        </div>
                        <button type="button">send message</button>
                    </form>
                </div>
                <div class="working">
                    <div class="loader-w">
                        <div class="loader dots">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="success">
                    <h2>{{ $topic->content['thanks_headline']['value'] ?? "Thanks!" }}</h2>
                    <p>{{ $topic->content['thanks_body']['value'] ?? "We'll be in touch as soon as possible." }}</p>
                    <p><a href="/"><strong>Home Page</strong></a></p>
                </div>
                <div class="error">
                    <h2>Oops!</h2>
                    <p>Sorry. That didn't work.</p>
                    <p>We're looking into it.</p>
                    <p>Maybe just give us a call?</p>
                </div>
            </div>
        </section>
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
        @vite(["{$environment_root}/resources/js/contact.js"])

    @endsection

</x-guest-layout>




