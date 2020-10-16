<br />
<b>Fatal error</b>:  Uncaught GuzzleHttp\Exception\ClientException: Client error: `GET https://invstars-6ce98.firebaseio.com/messages1/1_2?orderBy=%22timestamp%22&amp;startAt=1560334029035` resulted in a `400 Bad Request` response:
{
  &quot;error&quot; : &quot;Index not defined, add \&quot;.indexOn\&quot;: \&quot;timestamp\&quot;, for path \&quot;/messages1/1_2\&quot;, to the rules&quot;
}

 in /var/www/Newweb.com/vendornew/guzzlehttp/guzzle/src/Exception/RequestException.php:113
Stack trace:
#0 /var/www/Newweb.com/vendornew/guzzlehttp/guzzle/src/Middleware.php(66): GuzzleHttp\Exception\RequestException::create(Object(GuzzleHttp\Psr7\Request), Object(GuzzleHttp\Psr7\Response))
#1 /var/www/Newweb.com/vendornew/guzzlehttp/promises/src/Promise.php(203): GuzzleHttp\Middleware::GuzzleHttp\{closure}(Object(GuzzleHttp\Psr7\Response))
#2 /var/www/Newweb.com/vendornew/guzzlehttp/promises/src/Promise.php(156): GuzzleHttp\Promise\Promise::callHandler(1, Object(GuzzleHttp\Psr7\Response), Array)
#3 /var/www/Newweb.com/vendornew/guzzlehttp/promises/src/TaskQueue.php(47): GuzzleHttp\Promise\Promi in <b>/var/www/Newweb.com/vendornew/kreait/firebase-php/src/Firebase/Exception/QueryException.php</b> on line <b>28</b><br />
