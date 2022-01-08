$(function() {
  var data = [
  {
    action: 'type',
    //clear: true,
    strings: ["curl -s --header \"x-rapidapi-key: ${X_RAPIDAPI_KEY}\" https://ephemeral-proxies.p.rapidapi.com/v1/proxy | jq ."],
    output: $('.api-output').html()
    },
  {
    action: 'type',
    strings: ["curl -s --proxy l9de0.ep-proxy.net:32056 https://ifconfig.co"],
    output: '<span class="white">193.203.9.242</span><br>&nbsp;',
  },
  {
    action: 'view'
  }
];
  runScripts(data, 0);
});

function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];
    if(script.clear === true) {
      $('.history').html('');
    }
    switch(script.action) {
        case 'type':
          // cleanup for next execution
          prompt.removeData();
          $('.typed-cursor').text('');
          prompt.typed({
            strings: script.strings,
            typeSpeed: 5,
            callback: function() {
              var history = $('.history').html();
              history = history ? [history] : [];
              history.push('$ ' + prompt.text());
              if(script.output) {
                history.push(script.output);
                prompt.html('');
                $('.history').html(history.join('<br>'));
              }
              // scroll to bottom of screen
              $('section.terminal').scrollTop($('section.terminal').height());
              // Run next script
              pos++;
              if(pos < data.length) {
                setTimeout(function() {
                  runScripts(data, pos);
                }, script.postDelay || 1000);
              }
            }
          });
          break;
        case 'view':

          break;
    }
}
