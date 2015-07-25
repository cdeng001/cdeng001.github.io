<?php
/**
 * The MIT License
 * Copyright (c) 2007 Andy Smith
 */
namespace Abraham\TwitterOAuth;

class Consumer
{
    /** @var string  */
    public $key = 'qLiTxpzhHNiI1BjJU5xgbPvG1';
    /** @var string  */
    public $secret = 's7lDfWj3gBO5v6j8eVpDScr7UrqZCVbLAaxjbGrZanlP7TCCTm';
    /** @var string|null  */
    public $callbackUrl = 'http://cdeng001.github.io/twitteroauth/callback.php';

    /**
     * @param string $key
     * @param string $secret
     * @param null $callbackUrl
     */
    public function __construct($key, $secret, $callbackUrl = null)
    {
        $this->key = $key;
        $this->secret = $secret;
        $this->callbackUrl = $callbackUrl;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return "Consumer[key=$this->key,secret=$this->secret]";
    }
}
