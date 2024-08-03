<div id="sncms_fe_admin"
     data-csrf_token="{{ csrf_token() }}"
     data-cms_url="{{ config('superniftycms.urls.cms', 'cms') }}"
     data-css_prefix="{{ config('superniftycms.styles.prefix', 'sn') }}"
     data-topic_id="{{ $topic->id ?? '' }}"
>
    <div id="sncms_cm_bcs" class="sncms_cm">
        <div class="sncms_cm_header">
            <i class="sncms_cm_h"></i>
            <i class="sncms_cm_x"></i>
        </div>
        <div class="sncms_cm_body">
            <div class="sncms_cm_blade"><i></i><select data-attribute="blade"></select></div>
            <div class="sncms_cm_cssjs">
                <div class="sncms_cm_css">
                    @foreach(config('superniftycms.styles.values') as $attribute => $settings)
                    <label>{{ $settings['label'] }}</label>
                    <select name="{{ $attribute }}">
                        @foreach($settings['values'] as $value => $label)
                        <option value="{{ config('superniftycms.styles.prefix', 'sn') }}-{{ $attribute }}-{{ $value }}">{{ $label }}</option>
                        @endforeach
                    </select>
                    @endforeach
                </div>
                <div class="sncms_cm_js"></div>
            </div>
        </div>
        <div class="sncms_cm_footer">
            <i data-link="sncms_dashboard"></i>
            <i data-link="sncms_edit_topic"></i>
        </div>
    </div>
</div>
