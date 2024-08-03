<header class="swiper">
    <div class="swiper-wrapper">
        @foreach($slides as $id => $slide)
            <div class="swiper-slide">
                <a href="{{ $slide->content['cta-url']['value'] ?? 'https://google.com' }}">
                    <div class="img">
                        @php $image = sn_img($slide->content['image']['value'][0], 1500); @endphp
                        <img src="{{$image['url'] ?? config('superniftycms.uploads.images.fpo') }}" alt="{{ $image['alt'] ?? "Untitled Image" }}">
                    </div>
                    <div class="content">
                        <h1 data-eyebrow="{{ $slide->content['eyebrow']['value'] ?? 'Eyebrow' }}">{{ $slide->content['headline']['value'] ?? 'Headline' }}</h1>
                        <p>{{ $slide->content['description']['value'] ?? 'Description' }}</p>
                        {{-- @if(sn_can('content'))<a class="sne" href="/admin/topic/edit/{{ $slide->id }}" target="sn_edit"></a> @endif --}}
                    </div>
                    <button>{{ $slide->content['cta-text']['value'] ?? 'cta-text' }}</button>
                    <i></i>
                </a>
            </div>
        @endforeach
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <div class="autoplay-progress">
        <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"></circle></svg>
        <span></span>
    </div>
</header>


<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js" integrity="sha512-Ysw1DcK1P+uYLqprEAzNQJP+J4hTx4t/3X2nbVwszao8wD+9afLjBQYjz7Uk4ADP+Er++mJoScI42ueGtQOzEA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css" integrity="sha512-rd0qOHVMOcez6pLWPVFIv7EfSdGKLt+eafXh4RO/12Fgr41hDQxfGvoi1Vy55QIVcQEujUE1LQrATCLl2Fs+ag==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script>
    document.addEventListener('DOMContentLoaded', function () {

        let swiperConfigs = {};

        const progressCircle = document.querySelector(".autoplay-progress svg");
        const progressContent = document.querySelector(".autoplay-progress span");

        swiperConfigs['slideshow'] = {

            loop: true,
            effect: 'fade', /* slide|fade|cube|coverflow|flip|creative|cards */
            fadeEffect: { crossFade: true },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 2500,
            slidesPerView: 1,
            spaceBetween: 0,
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },

                1024: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                1280: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                1536: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            on: {
                autoplayTimeLeft(s, time, progress) {
                    progressCircle.style.setProperty("--progress", 1 - progress);
                    progressContent.textContent = `${Math.ceil(time / 1000)}`;
                }
            }
        };

        let c = 'slideshow';
        new Swiper('.swiper', swiperConfigs[c]);
    });


</script>




