<?php

namespace App\Libraries;

class Crawler
{
    protected $url = "";
    protected $body = "";

    public function __construct($url = '')
    {
        // echo ("Crawler Loaded");

        if (!empty($url)) {
            $this->url = $url;
            $this->body = $this->run_curl($url);
        }
    }


    /**
     * run_curl
     *
     * @param  string $num
     * @param  array $data data to send
     * @param  string $type ["get", "post"]
     * @param  array $header http header, nullable
     * @return string result of curl
     */
    public function run_curl($url, $data = [], $type = "get", $header = [])
    {
        $type = strtolower($type);
        $data_string = http_build_query($data);

        if ($type == "get") {
            $url = implode("?", array_merge(explode("?", $url), [$data_string]));
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);

        if (preg_match('#^https:#', $url)) {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_SSLVERSION, 1);
        }

        curl_setopt($ch, CURLOPT_HEADER, 0);
        if (!empty($header)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        }

        if ($type == "post") {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        } else {
            curl_setopt($ch, CURLOPT_POST, 0);
        }

        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($ch);
        curl_close($ch);

        return $result;
    }


    public function get_body()
    {
        return $this->body;
    }


    public function get_processed_body($type = 0)
    {
        $body = $this->body;

        if ($type == 0 || empty($type))
            $body = strip_tags($body);  // 예외상황에 대한 처리가 필요. <안녕하세요> -> 이 코드로는 제거되므로 추후 수정 필요함.

        return preg_replace('/([^a-zA-Z0-9]+)/', '', $body);
    }

    public function get_sorted_bodystring($type = 0)
    {
        $body = $this->get_processed_body($type);
        $chars = [];

        foreach (str_split($body) as $char) {
            if (array_key_exists($char, $chars)) {
                $chars[$char] += 1;
                continue;
            }

            $chars[$char] = 1;
        }

        ksort($chars);

        return $chars;

    }
    
}