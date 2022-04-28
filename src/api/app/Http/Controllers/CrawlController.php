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
        $type = $request->type;

        $crawler = new Crawler($url);

        return json_encode([
            'url' => $url,
            'body' => $crawler->get_processed_body($type),
            'counted' => $crawler->get_sorted_bodystring($type)
        ]);
    }
}
