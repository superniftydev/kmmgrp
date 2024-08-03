<div id="mediaModal">
    <div class="contentW">
        <div class="contentWI">
            <div class="closeModal x"></div>

            <div id="mediaW">
                <div id="mediaTSW">
                    <div id="mediaSize"></div>
                    <div id="mediaType"></div>
                </div>
                <div id="snDocumentImageViewer">
                    <img src="" alt="Image">
                    <div id="documentSummary"></div>
                </div>
                <div id="snVideoViewer"></div>
                <div id="outsideVendorVideoViewer">
                    <iframe
                        src=""
                        title=""
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
                <div id="userUploadedVideoViewer">
                    <div id="userUploadedVideoW" class="pause">
                        <video class="pp" controls playsinline poster="" preload="none">
                            <source src="" type="video/mp4" />
                            <source src="" type="video/webm" />
                            <source src="" type="video/ogg" />
                            Sorry, your browser doesn't support embedded videos
                        </video>
                    </div>
                </div>
            </div>

            <div class="fieldsW">
                <div id="outsideVendorVideoIDW" class="snfw">
                    <div class="snfwi mediacontenteditableW">
                        <label for="outsideVendorVideoID" tabindex="-1">VIDEO ID</label>
                        <div id="outsideVendorVideoID" contenteditable class="textarea media-input"></div>
                    </div>
                </div>
                <div class="metas">
                @foreach(config('superniftycms.uploads.metas') as $meta_field_name => $meta_field)
                    <div class="snfw meta">
                        <div id="media-{{$meta_field_name}}-snfwi" class="snfwi mediacontenteditableW" data-cc="0" data-ml="{{ $meta_field['maxlength'] ?? '500' }}">
                            <label for="media-{{$meta_field_name}}-contenteditable" tabindex="-1">{{$meta_field_name}}</label>
                            <div id="media-{{$meta_field_name}}-contenteditable" data-meta="{{ $meta_field_name }}" contenteditable class="textarea media-input" data-placeholder="" data-maxlength="{{ $meta_field['maxlength'] ?? '500' }}" data-cv=""></div>
                        </div>
                    </div>
                @endforeach
                </div>
                <button type="button" class="closeModal">Done</button>
            </div>
        </div>
    </div>
</div>



