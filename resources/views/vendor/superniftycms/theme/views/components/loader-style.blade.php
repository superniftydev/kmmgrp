<style>

    :root {
        --color-loader-background: #06307D;
        --color-loader-foreground: var(--color-white);
    }

    html { background-color: var(--color-loader-background); }

    #view-loader
    {
        position: fixed;
        inset: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity 2s ease-in-out;
        z-index: 99999999999999;
        background-color: var(--color-loader-background);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #view-loader.loading { opacity: 1; }
    #view-loader .loader.dots,
    #view-loader .loader.dots:before,
    #view-loader .loader.dots:after
    {
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        animation-fill-mode: both;
        animation: snFaderDots 1.8s infinite ease-in-out;
    }

    #view-loader .loader.dots {
        color: var(--color-loader-foreground);
        font-size: 7px;
        position: relative;
        text-indent: -9999em;
        transform: translateZ(0);
        animation-delay: -0.16s;
    }

    #view-loader .loader.dots:before,
    #view-loader .loader.dots:after
    {
        content: '';
        position: absolute;
        top: 0;
    }

    #view-loader .loader.dots:before
    {
        left: -3.5em;
        animation-delay: -0.32s;
    }

    #view-loader .loader.dots:after
    {
        left: 3.5em;
    }

    @keyframes snFaderDots
    {
        0%, 80%, 100% { box-shadow: 0 2.5em 0 -1.3em }
        40% { box-shadow: 0 2.5em 0 0 }
    }

</style>
