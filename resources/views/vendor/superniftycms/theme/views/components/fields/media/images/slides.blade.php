@php use Supernifty\CMS\Models\Media; @endphp
<div class="swiper">
    <div class="swiper-wrapper">
        @foreach($topic->content[$field_name]['value'] as $image_id)
        <div class="swiper-slide">
            <div class="w">
                @php $media = Media::find($image_id); @endphp
                <img src="{{ sn_img($media, 1000)['url'] }}" alt="{{ $media->metas['title'] ?? 'KMM Image Title' }}">
            </div>
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
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js" integrity="sha512-Ysw1DcK1P+uYLqprEAzNQJP+J4hTx4t/3X2nbVwszao8wD+9afLjBQYjz7Uk4ADP+Er++mJoScI42ueGtQOzEA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css" integrity="sha512-rd0qOHVMOcez6pLWPVFIv7EfSdGKLt+eafXh4RO/12Fgr41hDQxfGvoi1Vy55QIVcQEujUE1LQrATCLl2Fs+ag==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script>

    window['init'] = function() {

        /* convert section js string to object */


        let swipers = document.querySelectorAll('.swiper');
        if(swipers){
            for (let s = 0; s < swipers.length; s++) {
                let swiperConfig = sncms_fe.sectionJSO(swipers[s]);
                console.log('swiperConfig: ', swiperConfig);



            }
        }

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
        new Swiper('.swiper', swiperConfigs[c]);    }


    document.addEventListener('DOMContentLoaded', function () { init(); });


</script>
