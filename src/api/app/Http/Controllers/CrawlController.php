<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Libraries\Crawler;
use Illuminate\Http\Request;

class CrawlController extends BaseController
{
    public function __construct()
    {
        // parent::__construct();
    }
    
    
    public function crawl_url(Request $request) 
    {
        $url = $request->url;
        

        return json_encode([
            'url' => $url
        ]);
    }
}
