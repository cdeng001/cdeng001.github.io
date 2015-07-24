$(document).ready(function(){
    //attach a jQuery live event to the button
    $('#test1_button').live('click', function(){
		var url = '/twitter-proxy.php?url='+encodeURIComponent('statuses/user_timeline.json?screen_name=CalvinDeng0&count=2');
        $.getJSON(url, function(data) {
            alert(data); //uncomment this for debug
            //alert (data.item1+" "+data.item2+" "+data.item3); //further debug
            $('#test1').html("<p>hello world</p>");
        });
    });
});
