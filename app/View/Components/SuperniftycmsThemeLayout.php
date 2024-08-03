<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class SuperniftycmsThemeLayout extends Component
{
    public function render(): View
    {
        return view('vendor.superniftycms.theme.views.layouts.theme');
    }
}
