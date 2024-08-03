<?php


use Illuminate\Support\Carbon;
use Supernifty\CMS\Models\Media;


if(isset($topic->metas) && is_array($topic->metas['title'])){

    $metas = $topic->metas;
    isset($metas['title']['value']) ? $metas['title'] = $metas['title']['value'] : $metas['title'] = $topic->title;
    isset($metas['description']['value']) ? $metas['description'] = $metas['description']['value'] : $metas['description'] = '';
    isset($metas['tags']['value']) ? $metas['tags'] = $metas['tags']['value'] : $metas['tags'] = [];
    isset($metas['categories']['value']) ? $metas['categories'] = $metas['categories']['value'] : $metas['categories'] = [];
    isset($metas['author']['value']) ? $metas['author'] = $metas['author']['value'] : $metas['author'] = '';

    isset($metas['focus-keyphrase']['value']) ? $metas['keyphrase'] = $metas['focus-keyphrase']['value'] : $metas['keyphrase'] = '';
    unset($metas['focus-keyphrase']);

    isset($metas['og-image']['value'][0]) ? $metas['featured_media_id'] = $metas['og-image']['value'][0] : $metas['featured_media_id'] = '';
    unset($metas['og-image']);

    unset($metas['sn_fso']);



    $topic->metas = $metas;


}


# print "<br><br><hr><pre>";
# print_r($topic->metas);
# exit;

$date = Carbon::now()->toDateTimeString();


?>
<div id="metasW">

    <div class="txt">

        <div class="primary">
            <div class="mfw" data-label="Meta Title">
                <input type="text" id="metas_title" placeholder="Meta Title" value="{{ $topic->metas['title'] ?? '' }}">
            </div>
            <div class="mfw" data-label="Meta Description">
                <textarea id="metas_description" placeholder="Meta Description">{{ $topic->metas['description'] ?? '' }}</textarea>
            </div>
            <div class="mfw" data-label="Primary Keyphrase">
                <input type="text" id="metas_keyphrase" placeholder="The primary phrase the page should rank for in search engines" value="{{ $topic->metas['keyphrase'] ?? '' }}">
            </div>
            <div class="mfw" data-label="Meta Keywords">
                <input type="text" id="metas_keywords" placeholder="Meta Keywords" value="{{ $topic->metas['keywords'] ?? '' }}">
            </div>
            <div class="mfw" data-label="Author">
                <input type="text" id="metas_author" placeholder="Meta Author" value="{{ $topic->metas['author'] ?? '' }}">
            </div>

            <div class="mfow">
                <?php
                $published = isset($topic->metas['publish_date']) ? Carbon::parse($topic->metas['publish_date'])->toDateTimeLocalString() : Carbon::now()->toDateTimeLocalString();
                $modified = isset($topic->metas['last_modified']) ? Carbon::parse($topic->metas['last_modified'])->toDateTimeLocalString() : Carbon::now()->toDateTimeLocalString();
                $remove = isset($topic->metas['remove']) ? Carbon::parse($topic->metas['remove'])->timezone(config('app.timezone'))->toDateTimeLocalString() :Carbon::now()->timezone(config('app.timezone'))->addYears(100)->toDateTimeLocalString();
                ?>

                <div class="mfw date" data-label="Publish/Published" data-date="{{ $published }}">
                    <input type="datetime-local" id="metas_publish_date" value="{{ $published }}">
                </div>
                <div class="mfw date" data-label="Modified" data-date="{{ $modified }}">
                    <input type="datetime-local" id="metas_last_modified" value="{{ $modified }}">
                </div>
                <div class="mfw date" data-label="Remove" data-date="{{ $remove }}">
                    <input type="datetime-local" id="metas_remove" value="{{ $remove }}">
                </div>
            </div>
            <div class="mfw" data-label="Categories">
                <ul id="metas_categories">
                    @foreach(config('superniftycms.categories') as $category)
                        <li @if(in_array($category, $topic->metas['categories'])) class="active" @endif>{{ $category }}</li>
                    @endforeach
                </ul>
            </div>
            <div class="mfw" data-label="Tags">
                <ul id="metas_tags">
                    @foreach(config('superniftycms.tags') as $tag)
                        <li @if(in_array($tag, $topic->metas['tags'])) class="active" @endif>{{ $tag }}</li>
                    @endforeach
                </ul>
            </div>

            <div class="mfw" data-label="Robots">
                <input type="text" id="metas_robots" placeholder="page-specific indexing instructions for robots"
                       value="{{ $topic->metas['robots'] ?? '' }}">
            </div>
            <div class="mfw" data-label="Googlebot">
                <input type="text" id="metas_googlebot" placeholder="page-specific indexing instructions for googlebot"
                       value="{{ $topic->metas['googlebot'] ?? '' }}">
            </div>
        </div>
    </div>

    <div class="img">

        <div
            id="featured_media_id"
            class="sncms-dropper"
            data-accepted="image/jpeg|image/png|image/gif"
            data-featured_media_id="{{ $topic->metas['featured_media_id'] ?? 'new' }}"
        >
        <img src="{{ sn_featured_img($topic->metas['featured_media_id'] ?? '') }}" alt="Featured Image">
        <div id="progressBarW">
            <div id="progressBar"></div>
        </div>
    </div>
        <h5>Featured Image</h5>
        <p>JPG, PNG or GIF images dropped above will be cropped and resized to {{ config('superniftycms.uploads.images.featured.dimensions') }} pixels.</p>

        <h5>Custom Bot Instruction</h5>
        <p>Enter any of the following values (comma-separated) into the ROBOTS and GOOGLEBOT fields to provide granular instructions to search engines for this specific page:</p>
        <ul>
            <li>all (no restrictions - default)</li>
            <li>noindex</li>
            <li>nofollow</li>
            <li>noarchive</li>
            <li>nositelinkssearchbox</li>
            <li>nosnippet</li>
            <li>indexifembedded</li>
            <li>max-snippet:[number]</li>
            <li>max-image-preview:[setting]</li>
            <li>max-video-preview:[setting]</li>
            <li>notranslate</li>
            <li>noimageindex</li>
            <li>unavailable_after: {{ Carbon::now()->timezone(config('app.timezone'))->addYear()->format('Y-m-d H:i:s') }}</li>
        </ul>
        <p><a href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag" target="google_meta_tag_specs">Google Meta Tag Specs</a></p>



</div>

</div>




