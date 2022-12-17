window.addEventListener("DOMContentLoaded", function() {
    
    var newsListUl = document.getElementById("newsList");
    var btnCopy = document.getElementById("btnCopy");
    var btnShare = document.getElementById("btnShare");
    var title = document.getElementById("title");
    var contentSection = document.getElementById("content");
    var newsString = '';


    //Query active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //check if active tab is the page to be scrapped 
      if(tabs[0].url === "https://g1.globo.com/"){
          //checking if page is loaded
          if (tabs[0].status === 'complete'){
            getContent(tabs[0]);
          } else { //if not loaded yet, add a listener to run when the page is ready
            title.innerHTML = "Aguarde a página carregar...";
            contentSection.hidden = true;
            chrome.tabs.onUpdated.addListener(function(tabId){
              //checking if the page that was just loaded and triggered the event is the our guy
              if (tabId === tabs[0].id){
                title.innerHTML = "Principais Notícias";
                contentSection.hidden = false;
                getContent(tabs[0]);
              }
            });
          }
        
        //Adding a link to the page in case the active tab not be  
        } else{
          title.innerHTML = "Acesse o <a href='https://g1.globo.com/' target='_blank'>g1.com</a> para utilizar a extensão.";
          contentSection.hidden = true;
          
        }

    }); 

    //Function that send message to the content script and get the DOM
    function getContent(tab){
      chrome.tabs.sendMessage(tab.id, {method: "getDOM"}, function(response) {
        
        if (response){
          
          response.map(newsItem => {
            newsListUl.innerHTML += `<li><a href=${newsItem.link} target="_blank">${newsItem.title}</a></li>`;

            newsString += `*${newsItem.title}*\n ${newsItem.link} \n\n`;
            
          });
        }else{
          title.innerHTML = "Não foi possível capturar as notícias. Recarregue a página e tente novamente.";
          contentSection.hidden = true;
        }

      });
    }
  

    btnCopy.addEventListener("click", function() {

      
      if (newsString !== ""){
        navigator.clipboard.writeText(newsString)
          .then(() => {
            // Exibe uma mensagem de sucesso
            alert('Notícias copiadas com sucesso!');
          })
          .catch(err => {
            // Exibe uma mensagem de erro
            alert('Erro ao copiar o texto: ' + err);
          });
      }
      
    });

    btnShare.addEventListener("click", function() {
      
      
      if (newsString !== ""){
        window.open(`https://api.whatsapp.com/send?text=${encodeURI(newsString)}`, '_blank');
      }else{
        alert('Não há notícias para compartilhar!');
      }

      
    });
        
    
});