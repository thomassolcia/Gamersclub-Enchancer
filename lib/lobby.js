let intervaloCriarLobby = null;
let lobbyCriada = false;

function criarLobby() {
    chrome.storage.sync.get([`enable_criarLobby`], (response) => {
        if (!response.enable_criarLobby) {
            return
        } else {
            $('#lobbyContent > div.row.lobby-rooms-content > div > div > div:nth-child(3)').html('<button id="criarLobby" class="button">Criar Lobby</button>');
            $('#lobbyContent > div.row.lobby-rooms-content > div > div > div:nth-child(3)').append('<span style="color:#ffff89;font-size:12px;font-weight:200;line-height:16px;text-transform:uppercase;">OBS¹. Necessário Anti-Cheat e Jogo Aberto.</span>');
            $('#lobbyContent > div.row.lobby-rooms-content > div > div > div:nth-child(3)').append('<span style="color:#ffff89;font-size:12px;font-weight:200;line-height:16px;text-transform:uppercase;">OBS². Limite de 50 salas (FREE) e 400 (PREMIUM).</span>');
            document.getElementById("criarLobby").addEventListener("click", function() {
                lobbyCriada = false;
                intervaloCriarLobby = intervaloLobby();
                cancelarCriarLobby();
            });
        }
    });
}

function cancelarCriarLobby() {
    chrome.storage.sync.get([`enable_criarLobby`], (response) => {
        if (!response.enable_criarLobby) {
            return
        } else {
            $('#lobbyContent > div.row.lobby-rooms-content > div > div > div:nth-child(3)').html('<div style="text-align: center;" font-weight=600;><span style="color:hsla(0,0%,100%,.8);font-size:12px;font-weight:200;line-height:16px;text-transform:uppercase;">O LOBBY SERÁ CRIADO QUANDO HOUVER VAGAS.</span></div>');
            $('#lobbyContent > div.row.lobby-rooms-content > div > div > div:nth-child(3)').append('<div style="text-align: center;" font-weight=600;><span style="color:hsla(0,0%,100%,.8);font-size:12px;font-weight:200;line-height:16px;text-transform:uppercase;">AGUARDE...</span></div>');
            $('#lobbyContent > div.row.lobby-rooms-content > div > div > div:nth-child(3)').append('<button id="cancelarCriacaoLobbyBtn" class="button" style="background-color=#B60000" type="button">Cancelar</button>');
            document.getElementById("cancelarCriacaoLobbyBtn").addEventListener("click", function() {
                clearInterval(intervaloCriarLobby);
                criarLobby();
            });
        }
    });
}

function intervaloLobby() {
    return setInterval(() => {
        if (!lobbyCriada || $('.sidebar-titulo.sidebar-sala-titulo').text().length) {
            const lobbies = $("span.Tag__tagLabel.Tag__tagLabel--success").text().split('/');
            const limiteLobby = $('.Cta.Topbar').text() ? 50 : 400;
            if (lobbies[1] < limiteLobby) {
                $('button.WasdButton.WasdButton--success.WasdButton--lg.LobbyHeaderButton').click()

                const alertaAc = $(".noty_bar.noty_type__info.noty_theme__mint.noty_close_with_click.noty_has_timeout.noty_close_with_button:contains('Você precisa estar com o jogo')");
                if (alertaAc.length) {
                    clearInterval(intervaloCriarLobby);
                    criarLobby();
                    return;
                }
                const botaoCriarSala = $(".WasdButton.WasdButton--success.WasdButton--lg.CreateLobbyModalFooterButton.CreateLobbyModalFooterButton--create");
                if (botaoCriarSala && botaoCriarSala.text() === "Criar Sala") {
                    setTimeout(() => {
                        $(".CheckboxContainer__input").click();
                        botaoCriarSala.click();
                        const alertaLimite = $(".noty_bar.noty_type__info.noty_theme__mint.noty_close_with_click.noty_has_timeout.noty_close_with_button:contains('lobbies_limit_reached×')")
                        if (alertaLimite.length) {
                            return;
                        }
                        lobbyCriada = true;
                        criarLobby();
                        clearInterval(intervaloCriarLobby);
                    }, 500);
                }
            }
        } else {
            criarLobby();
            clearInterval(intervaloCriarLobby);
        }
    }, 500)
}

function autoPreReady() {
    chrome.storage.sync.get([`enable_preready`], (response) => {
        if (!response.enable_preready) {
            return
        } else {
            let preReadyObserver = new MutationObserver((mutations) => {
                $.each(mutations, (i, mutation) => {
                    var addedNodes = $(mutation.addedNodes);
                    let selector = '#setPlayerReady';
                    var preReadyButton = addedNodes.find(selector).addBack(selector);
                    if (preReadyButton.length) {
                        preReadyButton[0].click();
                        chrome.storage.sync.get([`enable_notification`], (response) => {
                            if (!response.enable_notification) {
                                console.log('Notificações desativadas.')
                            } else {
                                chrome.storage.sync.get([`notification_preready`], (response) => {
                                    if (!response.notification_preready) {
                                        console.log('Notificações desativadas para preReady.')
                                    } else {
                                        Swal.fire({
                                            title: 'Pré-Ready',
                                            icon: 'success',
                                            timer: 1000,
                                            showConfirmButton: false,
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
            preReadyObserver.observe($('#rankedModals').get(0), { childList: true, subtree: true })
        }
    });
}

function autoReady() {
    chrome.storage.sync.get([`enable_ready`], (response) => {
        if (!response.enable_ready) {
            return
        } else {
            let readyObserver = new MutationObserver((mutations) => {
                $.each(mutations, (i, mutation) => {
                    var addedNodes = $(mutation.addedNodes);
                    let selector = '#gameModalReadyBtn > button';
                    var readyButton = addedNodes.find(selector).addBack(selector);
                    if (readyButton.length) {
                        readyButton[0].click();
                    }
                });
            });
            readyObserver.observe($('#rankedModals').get(0), { childList: true, subtree: true })

            function notifyReady() {
                if ($('.game-modal-map.game-modal-map-unvotable.game-modal-map-chosen').is(':visible')) {
                    setTimeout(() => {
                        chrome.storage.sync.get([`enable_notification`], (response) => {
                            if (!response.enable_notification) {
                                console.log('Notificações desativadas.')
                            } else {
                                chrome.storage.sync.get([`notification_ready`], (response) => {
                                    if (!response.notification_ready) {
                                        console.log('Notificações desativadas para ready.')
                                    } else {
                                        Swal.fire(
                                            'Ready',
                                            'Só entrar e dar bala!',
                                            'success'
                                        );
                                    }
                                });
                            }
                        });
                    }, 500)
                } else {
                    setTimeout(() => {
                        notifyReady();
                    }, 1000)
                }
            }
            notifyReady();
        }
    });
}

function copiarIP() {
    chrome.storage.sync.get(['enable_copyip'], (response) => {
        if (!response.enable_copyip) {
            return
        } else {
            setInterval(function() {
                const buttonCopia = document.getElementById('gameModalCopyServer');
                if (buttonCopia && buttonCopia.textContent === 'Copiar IP') {
                    buttonCopia.click();
                }
            }, 500);
            notifyIP()

            function notifyIP() {
                if ($('.game-modal-command-input').is(':visible')) {
                    setTimeout(() => {
                        chrome.storage.sync.get([`enable_notification`], (response) => {
                            if (!response.enable_notification) {
                                console.log('Notificações desativadas.')
                            } else {
                                chrome.storage.sync.get([`notification_copyip`], (response) => {
                                    if (!response.notification_copyip) {
                                        console.log('Notificações desativadas para ready.')
                                    } else {
                                        Swal.fire(
                                            'IP Copiado',
                                            'Só entrar e dar bala!',
                                            'success'
                                        );
                                    }
                                });
                            }
                        });
                    }, 500)
                } else {
                    setTimeout(() => {
                        notifyIP();
                    }, 1000)
                }
            }
        }
    });
}

function fixaLobby() {
    chrome.storage.sync.get([`enable_fixa`], (response) => {
        if (!response.enable_fixa) {
            return
        } else {
            let observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (!mutation.addedNodes) return;

                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        let node = mutation.addedNodes[i];
                        if (typeof node.id != 'undefined') {
                            if (node.id.includes('SidebarSala')) {
                                $(node).css({
                                    position: 'fixed',
                                    top: '10%',
                                    bottom: 'auto',
                                });
                            }
                            if (node.className.includes('sidebar-desafios sidebar-content')) {
                                $(node).css({
                                    position: 'fixed',
                                    top: '10%',
                                    right: '72px',
                                    bottom: 'auto',
                                });
                            }
                        }
                    }
                });
            });

            observer.observe($('#lobbyContent').get(0), {
                childList: true,
                subtree: true,
                attributes: false,
                characterData: false,
            });
        }
    });
}

function desafioNotify() {
    chrome.storage.sync.get([`enable_desafioNotify`], (response) => {
        if (!response.enable_desafioNotify) {
            return
        } else {
            setTimeout(() => {
                if ($('.noty_body').is(':visible')) {
                    $('.noty_body').hide();
                    $('.noty_layout__topRight').hide();
                    $('.noty_bar.noty_type__info noty_theme__mint noty_close_with_click.noty_has_timeout.noty_close_with_button').hide();
                    $('.noty_bar').hide();
                    desafioNotify();
                } else {
                    return desafioNotify();
                }
            }, 1000)
        }
    });
}

function termosRanked() {
    chrome.storage.sync.get([`enable_termosRanked`], (response) => {
        if (!response.enable_termosRanked) {
            return
        } else {
            let termosRankedObserver = new MutationObserver((mutations) => {
                $.each(mutations, (i, mutation) => {
                    const addedNodes = $(mutation.addedNodes);
                    let selector = '.ranked-modal-agree.container-fluid > a';
                    const concordarButton = addedNodes.find(selector).addBack(selector);
                    if (concordarButton.length) {
                        concordarButton[0].click();
                    }
                });
            });
            termosRankedObserver.observe($('#rankedModals').get(0), {
                childList: true,
                subtree: true,
            });
        }
    });
}

function featuresLobby() {
    autoPreReady();
    autoReady();
    copiarIP();
    criarLobby();
    fixaLobby();
    desafioNotify();
    termosRanked();
}

function enableLobby() {
    chrome.storage.sync.get([`enable_extension`], (response) => {
        if (!response.enable_extension) {
            return console.log('A extensão está desativada!')
        } else {
            featuresLobby();
        }
    });
}

enableLobby();