<?php
    $consumer_key= 'qLiTxpzhHNiI1BjJU5xgbPvG1';
    $consumer_secret = 's7lDfWj3gBO5v6j8eVpDScr7UrqZCVbLAaxjbGrZanlP7TCCTm';
    $screen_name = '???';
    
    function requestString( $op ){
       $headers = array();

       // custom headers?    
       if( is_array($op['headers'])){
          foreach ( $op['headers'] as &$value) $headers[ count($headers) ] = $value;
       };

       $ch = curl_init();

       // post?
       if( !empty($op['post']) ){
          $headers[ count($headers) ] = 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8';
          $headers[ count($headers) ] = 'Content-Length: '.(strlen( $op['post'] ));
          curl_setopt($ch, CURLOPT_POST, 1); 
          curl_setopt($ch, CURLOPT_POSTFIELDS, $op['post']); // post vars
       };

       curl_setopt($ch, CURLOPT_URL, $op['url']); // request URL
       curl_setopt($ch, CURLOPT_HTTPHEADER, $op['headers']); // custom headers
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
       curl_setopt($ch, CURLOPT_HEADER, 0); 
       curl_setopt($ch, CURLOPT_ENCODING, 'gzip'); // accept gzip to speedup request

       // if you are testing this script locally on windows server, you might need to set CURLOPT_SSL_VERIFYPEER to 'false' to skip errors with SSL verification
       curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true ); // verifying the peer's certificate

       $result = curl_exec ($ch); // execute 
       curl_close($ch); 

       return $result;
    }
    
    function get_bearer_token(){
       global $bearer_token, $consumer_key, $consumer_secret;

       $token_cred = urlencode($consumer_key).':'.urlencode($consumer_secret);
       $base64_token_cred = base64_encode($token_cred);

       $result = requestString( array(
                      'url' => 'https://api.twitter.com/oauth2/token'
                      ,'post' => 'grant_type=client_credentials'
                      ,'headers' => array('Authorization: Basic '. $base64_token_cred)
                      ) );
       $json = json_decode($result);

       $bearer_token = $json->{'access_token'};
    }
?>
