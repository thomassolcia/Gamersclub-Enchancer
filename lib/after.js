var notify = false;

function returnLobby() {
    //script
    chrome.storage.sync.get([`enable_returnLobby`], (response) => {
        if (!response.enable_returnLobby) {
            return
        } else {
            notify = true;
            Swal.fire(
                'Redirecionando!',
                'Você será redirecionado ao lobby em instantes...',
                'success'
            );
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