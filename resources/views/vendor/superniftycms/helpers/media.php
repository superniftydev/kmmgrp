<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Supernifty\CMS\Facades\Helpers;
use Supernifty\CMS\Models\Media;

if(!function_exists('sn_handle_error')) {
    function sn_handle_error($error = 404)
    {
        $messages = [
            400 => "400 | Bad Request",
            401 => "401 | Not Authorized",
            402 => "402 | Payment Required",
            403 => "403 | Forbidden",
            404 => "404 | Not Found",
            405 => "405 | Not Permitted",
        ];
        print "<html><title>{$messages[$error]}</title><body><div style=\"position:fixed;inset:0;display:flex;justify-content:center;align-items:center;text-align:center;font-family:monospace;background-color:#232527;color:#fff;pointer-events:none;user-select:none;\">";
        print "<p style=\"font-size:14px;background-color:rgba(255,255,255,.05);padding:22px 44px;border-radius:3px;\">{$messages[$error]}</p>";
        print "</div></body></html>";
        exit;
    }
}

if(!function_exists('sn_img')) {
    function sn_img($m, $size = false)
    {
        if(isset($m->id)) $media = $m;
        elseif(Str::isUuid($m)) $media = Media::find($m);
        if(!isset($media->id)) return null;
        if(!$size) $size = config('superniftycms.uploads.images.default_width');
        isset($media->id) ? $url = Helpers::media_upload_url($media, $size) : $url = null;
        isset($media->metas) && isset($media->metas['title']) ? $alt = $media->metas['title'] : $alt = null;
        return [ 'url' => $url, 'alt' => $alt ];
    }
}

if(!function_exists('sn_featured_img')) {
    function sn_featured_img($featured_media_id)
    {
        if(Str::isUuid($featured_media_id)) $media = Media::find($featured_media_id);
        if(!isset($media->id)) return secure_asset('build/static/img/defaults/featured-image.png');
        return secure_asset('media/'.$media->id.'/original.'.$media->type);
    }
}


if(!function_exists('get_media_blades')) {
    function get_media_blades()
    {
        $full_path_to_media_blades = base_path(config("superniftycms.uploads.blades.path"));
        if(is_dir($full_path_to_media_blades)) {
            $blade_files = File::files($full_path_to_media_blades);
            foreach($blade_files as $blade) {
                $clean = str_replace(config("superniftycms.uploads.blades.path"), '', pathinfo($blade)['basename'])."\n";
                $clean = str_replace(".blade.php", '', trim($clean));
                $blades[$clean] = $clean;
            }
            return $blades;
        }

    }
}
