

chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
        
        //catching all divs that contains a anchor and title for the news
        var html = document.getElementsByClassName("_evt");
        var news = [];

        for (var i=0; i < html.length; i++){
            if (html[i].nodeName === 'DIV'){
                if (html[i].childNodes[0].nodeName === 'A'){

                    news.push({
                        title: html[i].childNodes[0].childNodes[0].nodeValue.trim(),
                        link: html[i].childNodes[0].href,
                    });
                }
            }
            
        }
        console.log(news);
        if (request.method === "getDOM")
            sendResponse(news);
    }
  );