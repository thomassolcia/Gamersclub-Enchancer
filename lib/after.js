var notify = false;

function returnLobby() {
    //script
    chrome.storage.sync.get([`enable_returnLobby`], (response) => {
        if (!response.enable_returnLobby) {
            return
        } else {
            notify = true;
            //notification
            chrome.storage.sync.get([`enable_notification`], (response) => {
                if (!response.enable_notification) {
                    return console.log('As notificações estão desativadas!')
                } else {
                    chrome.storage.sync.get([`notification_returnLobby`], (response) => {
                        if (!response.notification_returnLobby) {
                            return
                        } else {
                            $('.MainHeader.MainHeader--free').append(`<div id="notifyReturnLobby"; class="col-sm-12">
                                        <div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;">
                                          <i class="start-icon far fa-check-circle faa-tada animated"></i>
                                          <strong class="font__weight-semibold"> REDIRECIONANDO AO LOBBY!</strong> Bora pra próxima!
                                        </div>
                                      </div>`);
                            setTimeout(() => {
                                var chat = document.getElementById('notifyReturnLobby');
                                $(chat).hide();
                            }, config.notification_delay)
                        }
                    });
                }
            });
            setTimeout(() => {
                window.location.href = "https://gamersclub.com.br/lobby";
            }, 3000);
        }
    });
}

function enableExtension() {
    chrome.storage.sync.get([`enable_extension`], (response) => {
        if (!response.enable_extension) {
            return console.log('A extensão está desativada!')
        } else {
            returnLobby();
        }
    });
}

enableExtension();