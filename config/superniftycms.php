<?php

return [

    "brand" => "KMM Group LTD",
    "url" => "https://kmmgrp.com",
    "domain" => "kmmgrp.com",

    'urls' => [
        'cms' => 'cms', # absolute url to access the cms
        'home' => 'welcome', # website public homepage url
        'error' => 'oops', # website error url
        'reserved' => 'build|assets|media|js', # urls the cms should ignore
    ],

    'paths' => [
        'blades' => [
            'admin' => 'resources/views/vendor/superniftycms/admin/views', # from base_path()
            'theme' => 'resources/views/vendor/superniftycms/theme/views', # from base_path()
        ]
    ],

    'access' => [

        # who has access to the cms
        'cms' => [

            'policy' => 'auth', # ( *|auth|custom ) '*' = everyone | 'auth' = Auth::user()

            # ...or set policy to 'custom' and adjust below for granular access control
            'model' => 'user',  # model to reference for access challenge
            'column' => 'role',  # model column to reference for access challenge
            'value' => 'editor' # model column value required for access
            # if($user->role === 'editor'){ /* this user may access the cms */ }

        ],

        'topics' => [
            'published' => 'live', # $topic->status that indicates the topic is publicly viewable
        ]

    ],

    "users" => [
        "defaultAuthor" => "Amy Rodgers",
    ],

    'topics' => [

        [
            'functionality' => 'posts',
            'blades' => [],
            'url' => 'blog',
            'label' => 'Blog Post',
            'plural' => 'Blog Posts',
            'description' => 'Posts Description',
            'group' => 1
        ],
        [
            'functionality' => 'pages',
            'blades' => [],
            'url' => '',
            'label' => 'Page',
            'plural' => 'Pages',
            'description' => 'Pages Description',
            'group' => 1
        ],
        [
            'functionality' => 'team',
            'blades' => [],
            'url' => 'team',
            'label' => 'Team Member',
            'plural' => 'Team',
            'description' => 'Team Description',
            'group' => 2
        ],
        [
            'functionality' => 'products',
            'blades' => [],
            'url' => 'products',
            'label' => 'Product',
            'plural' => 'Products',
            'description' => 'Products Description',
            'group' => 2
        ],
        [
            'functionality' => 'machines',
            'blades' => [],
            'url' => 'machines',
            'label' => 'Machine',
            'plural' => 'Machines',
            'description' => 'Machines Description',
            'group' => 2
        ],
        [
            'functionality' => 'forms',
            'blades' => [],
            'url' => null,
            'label' => 'Form',
            'plural' => 'Forms',
            'description' => 'Forms Description',
            'group' => 3
        ],
        [
            'functionality' => 'components',
            'blades' => [],
            'url' => null,
            'label' => 'Component',
            'plural' => 'Components',
            'description' => 'Components Description',
            'group' => 3
        ],
        [
            'functionality' => 'redirects',
            'blades' => [],
            'url' => null,
            'label' => 'Redirect',
            'plural' => 'Redirects',
            'description' => 'Create Redirects',
            'group' => 3
        ],

    ],


    "tags" => [
        "industry news",
        "manufacturing trends",
        "market analysis",
        "cnc machining",
        "edm",
        "milling",
        "turning",
        "cleanroom",
        "iso14644",
        "medtech manufacturing",
        "inspection techniques",
        "metrology",
        "quality assurance",
        "business growth",
        "leadership",
        "company culture",
        "grinding tutorials",
        "industry webinars",
        "technical guides",
        "grinding techniques",
        "manufacturing",
        "medical technology",
        "precision grinding",
        "surface finish",
        "supply chain",
        "vascular",
        "guidewires",
        "corewires",
        "aerospace manufacturing",
        "project management",
        "r&d",
        "cnc grinding",
        "machining",
        "defense manufacturing",
        "machining tutorials",
        "component manufacturing",
        "customer process",
        "project scope",
        "ultra-precision",
        "high-tech",
        "high-precision manufacturing",
        "micron-level accuracy",
        "race engines",
        "application examples",
        "centerless grinding",
        "client success stories",
        "project case studies",
        "additive manufacturing",
    ],

    "categories" => [
        "educational resources",
        "employee spotlights",
        "company culture",
        "company news",
        "industry insights",
        "case studies",
        "manufacturing processes",
        "grinding technologies",
        "quality control",
        "ultra-precision machining",
    ],


    # html tags users may apply via the cms editor
    "htmltags" => ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote' ],

    # css style classes users may apply via the cms front-end tools
    'styles' => [
        "prefix" => "kmm",
        "values" => [
            "width" => [
                "label" => "Width",
                "values" => [
                    "--" => "Default",
                    "boxed" => "Boxed",
                    "full" => "Full"
                ]
            ],
            "height" => [
                "label" => "Height",
                "values" => [
                    "--" => "Default",
                    0 => 0,
                    100 => 100,
                    200 => 200,
                    300 => 300,
                    400 => 400,
                    500 => 500,
                    600 => 600,
                    700 => 700,
                    800 => 800,
                    900 => 900,
                    "fs" => "Fullscreen",
                ],
            ],
            "font-family" => [
                "label" => "Fonts",
                "values" => [
                    "--" => "Default",
                    "light" => "Light",
                    "bold" => "Bold",
                    "news" => "News",
                    "techno" => "Techno",
                ]
            ],
            "font-size" => [
                "label" => "Text Size",
                "values" => [
                    "--" => "Default",
                    "2xs" => "2XS",
                    "xs" => "XS",
                    "sm" => "SM",
                    "xl" => "XL",
                    "2xl" => "2XL",
                    "3xl" => "3XL",
                    "4xl" => "4XL",
                    "5xl" => "5XL"
                ]
            ],
            "padding" => [
                "label" => "Padding",
                "values" => [
                    "--" => "Default",
                    "xs" => "XS",
                    "sm" => "SM",
                    "xl" => "XL",
                    "2xl" => "2XL",
                    "3xl" => "3XL",
                    "4xl" => "4XL",
                    "5xl" => "5XL"
                ]
            ],
            "colors" => [
                "label" => "Palette",
                "values" => [
                    "--" => "Default",
                    "bright" => "Bright",
                    "bold" => "Bold",
                    "dusk" => "Dusk",
                    "midnight" => "Midnight",
                    "boom" => "Boom",
                ]
            ]
        ]
    ],

    "blades" => [

        "media" => [

            "images" => [
                "label" => "Layout",
                "values" => [
                    "slides" => [
                        "label" => "Slides",
                        "s" => [
                            "loop" => "checkbox|n",
                            "delay" => "text|5000",
                            "transition" => "select|fade,slide",
                        ],
                        "css" => [ "fullscreen", "fullwidth", "dots", "squares", "slashes" ]
                    ],
                    "dots" => [
                        "label" => "Dots",
                        "s" => [],
                        "css" => [],
                    ],
                    "grid" => [
                        "label" => "Grid",
                        "s" => [],
                        "css" => [],
                    ],
                    "slashes" => [
                        "label" => "Slashes",
                        "s" => [],
                        "css" => [],
                    ],

                ],

            ]

        ]

    ],


    'uploads' => [

        'disk' => 'public',
        'storage_directory' => 'media', # 'media' --> 'storage/public/media' (assuming filesystems.disks.public === storage_path('app/public'))
        'public_directory' => 'media', # 'media' --> 'https://example.com/storage/media' (assuming filesystems.disks.url === env('APP_URL').'/storage')
        "maxfilesize" => 100, # MB
        "accepted" => [

            "images" => [
                "GIF" => "image/gif", # .gif
                "JPG" => "image/jpeg", #.jpg, .jpeg
                "PNG" => "image/png", # .png
                "SVG" => "image/svg+xml", # .svg [ https://www.opswat.com/blog/svg-unveiled-understanding-xxe-vulnerabilities-and-defending-your-codebase ]

                # imagemagick driver required for below
                # "HEIC" => "image/heic", # .heic
                # "HEIF" => "image/heif", # .heif
                # "WEBP" => "image/webp", # .webp
            ],

            "documents" => [
                "PDF" => "application/pdf", # .pdf
                "DOC" => "application/msword", # .doc
                "DOCX" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document", # .docx
                "PPT" => "application/vnd.ms-powerpoint", # .ppt
                "PPTX" => "application/vnd.openxmlformats-officedocument.presentationml.presentation", # .pptx
                "TXT" => "text/plain", # .txt
                "VTT" => "text/vtt", # .vtt
                "XLSX" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", # .xlsx
                "XLS" => "application/vnd.ms-excel", # .xls
            ],

            "videos" => [
                "MP4" => "video/mp4",
                # "AVI" => "video/x-msvideo", # .avi
                # "3GP" => "video/3gpp", # .3gp
                # "WMV" => "video/x-ms-wmv", # .wmv
                # "MOV" => "video/quicktime", # .mov
                # "OGG" => "video/ogg", # .ogg
                # "TS" => "video/MP2T", # .ts
                # "WEBM" => "video/webm", # .webm
                # "AUDIO" => "audio/*", # .audio
            ],

            "models" => [
                "GLB" => "model/*", # .glb, etc...
            ],

            "youtube" => [
                "YOUTUBE" => "youtube"
            ],

            "vimeo" => [
                "VIMEO" => "vimeo"
            ],

        ],

        "images" => [

            "process" => [ "gif", "jpeg", "jpg", "png" ],
            "default_width" => 750,
            "thumb_width" => 250,
            "fpo" => "https://picsum.photos/500",
            "featured" => [
                "dimensions" => "1200x630", # 1.91:1 aspect ratio, minimum resolution 1200x630
                "default-path" => "build/static/img/defaults/featured-image.png"
            ],
        ],

        "videos" => [
            "process" => ["mp4"], # ["mkv", "mp4", "mov", "asf", "ogg", "webm"]
            "width" => 1920,
            "height" => 1080,
            "poster_width" => 1920,
            "ffmpeg" => [
                "timeout" => 3600,
                "threads" => 12
            ],

        ],

        "metas" => [

            "title" => [
                "type" => "text",
                "format" => "text",
                "maxlength" => "250"
            ],

            "description" => [
                "type" => "text",
                "format" => "text",
                "maxlength" => "1500"
            ],

            "tags" => [
                "type" => "text",
                "format" => "text",
                "maxlength" => "500"
            ],

            "notes" => [
                "type" => "text",
                "format" => "text",
                "maxlength" => "750"
            ],

        ],

        "labels" => [
            "label" => "Media",
            "help" => "Drop files here to upload",
        ]

    ],

    "ui" => [

        "time_format" => 'Y/m/d H:i:s',

        "defaults" => [
            "topics" => [
                "type" => "posts",
                "title" => "Untitled Post",
                "status" => "draft"
            ]
        ],

        "delete" => [
            "topic" => [
                "warn" => "Delete",
                "cancel" => "No",
                "confirm" => "Yes"
            ],
        ],

        "misc" => [
            "copied" => "Copied!"
        ],

    ],

    "status" => [


        /*
            Initial Review – content from the current website being reviewed for relevance and accuracy
            Content Draft – draft of new content or updated existing content based on initial review
            Internal Review – drafted content being reviewed by internal team for feedback and approval
            Ready for Revisions – ready to revise after team feedback
            Final approval – revisions are ready for final approval
            SEO Ready – optimizing content for search engines, including keyword focus & meta description
            Design Ready – content is ready for new design
            Testing – ready to test design for responsiveness, all buttons work, UX
            Adjustments – make changes based on testing
            Pre-Launch Review – ready for final review
            Go Live

        */

        "topics" => [
            "label" => "status",
            "menu_pixel_width" => "175",
            "values" => [
                "needs_copy" => [
                    "label" => "Needs Copy",
                    "text" => "#e9d5ff", # slate
                    "background" => "#9333ea",
                ],
                "development" => [
                    "label" => "In Development",
                    "text" => "#c7d2fe", # indigo
                    "background" => "#4f46e5",
                ],
                "draft" => [
                    "label" => "Draft",
                    "text" => "#e5e7eb", # gray
                    "background" => "#6b7280",
                ],
                "updated" => [
                    "label" => "Updated",
                    "text" => "#a5f3fc", # cyan
                    "background" => "#06b6d4",
                ],
                "review" => [
                    "label" => "Please Review",
                    "text" => "#99f6e4", # teal
                    "background" => "#0d9488",
                ],
                "feedback" => [
                    "label" => "Has Feedback",
                    "text" => "#fbcfe8", # pink
                    "background" => "#db2777",
                ],
                "copy_approved" => [
                    "label" => "Copy Approved",
                    "text" => "#d9f99d", # lime
                    "background" => "#65a30d",
                ],
                "layout_approved" => [
                    "label" => "Page Approved",
                    "text" => "#bbf7d0", # green
                    "background" => "#16a34a",
                ],
                "offline" => [
                    "label" => "Offline",
                    "text" => "#fff",
                    "background" => "#9ca3af",
                ],
                "live" => [  # $topic->status that indicates the topic is publicly viewable
                    "label" => "Live",
                    "text" => "#fff",
                    "background" => "#22c55e",
                ]
            ],

            "slugs" => [
                "last_updated_at" => "Updated ",
                "last_updated_by" => "by"
            ]

        ],

    ],

    'social' => [
        "linkedin" => "https://www.linkedin.com/company/kmm-group",
        "facebook" => "https://www.facebook.com/KMMgrp/",
    ],

    # https://developers.google.com/search/docs/appearance/structured-data/local-business
    # https://schema.org/LocalBusiness to add additional parameters
    'schema' => [
        "@context" => "https://schema.org",
        "@type" => "LocalBusiness",
        "image" => [
        ],
        "name" => "KMM Group LTD",
        "address" => [
            "@type" => "PostalAddress",
            "streetAddress" => "2200 Byberry Road",
            "addressLocality" => "Hatboro",
            "addressRegion" => "PA",
            "postalCode" => "19040",
            "addressCountry" => "US",
        ],
        "geo" => [
            "@type" => "GeoCoordinates",
            "latitude" => 40.1613455,
            "longitude" => -75.0814859,
        ],
        "url" => "https://kmmgrp.com",
        "telephone" => "+18884995657",
        "openingHoursSpecification" => [
            [
                "@type" => "OpeningHoursSpecification",
                "dayOfWeek" => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens" => "09:30",
                "closes" => "17:00",
            ],
        ],
        "sameAs" => [
            "linkedin" => "https://www.linkedin.com/company/kmm-group",
            "facebook" => "https://www.facebook.com/KMMgrp/",
        ]
    ],


    "seo" => [
        #  https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
        "robots" => "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        "googlebot" => "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        "googleSiteVerification" => "general",
    ],


    "vendor" => [
        "tinymce-license-key" => "gpl", # https://www.tiny.cloud/docs/tinymce/latest/license-key

        "apple" => [
            'webAppCapable' => 'yes',
            'webAppBarColor' => '#000',
            'formatDetection' => 'telephone=no',
        ]

    ],

];
