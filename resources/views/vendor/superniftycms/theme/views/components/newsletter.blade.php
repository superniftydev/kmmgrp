@if(!isset($_COOKIE[sn_config('newsletter.cookie_name')]))
    <form id="newsletterSignupForm" method="post" data-displaydelay="12000">
        <i class="x"></i>
        @csrf
        <input type="hidden" name="newsletter_signup_actioned" value="subscribed">
        <div class="intro">
            <h2>Subscribe to marc's newsletter</h2>
            <div class="w">
                <input type="email" name="email" placeholder="name@domain.com">
                <button type="submit">Subscribe</button>
            </div>
        </div>
        <div class="working">
            <div class="dots"></div>
        </div>
        <div class="success">
            <div class="w">
                <h2>Thanks for signing up!</h2>
                <p>Your support is really appreciated.</p>
            </div>
            <button type="button" class="x">OK</button>
        </div>
        <div class="error">
            <div class="w">
                <h2>Oops! That's an Error.</h2>
                <p>Sorry. We'll look into it.</p>
            </div>
            <button type="button" class="x">OK</button>
        </div>
    </form>
@endif


