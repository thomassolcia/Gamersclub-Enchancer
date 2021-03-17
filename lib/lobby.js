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
            //SCRIPT
            let preReadyObserver = new MutationObserver((mutations) => {
                $.each(mutations, (i, mutation) => {
                    var addedNodes = $(mutation.addedNodes);
                    let selector = '#setPlayerReady';
                    var preReadyButton = addedNodes.find(selector).addBack(selector);
                    if (preReadyButton.length) {
                        preReadyButton[0].click();

                        //NOTIFICATION
                        chrome.storage.sync.get([`enable_notification`], (response) => {
                            if (!response.enable_notification) {
                                return console.log('As notificações estão desativadas!')
                            } else {
                                chrome.storage.sync.get([`notification_preready`], (response) => {
                                    if (!response.notification_preready) {
                                        return
                                    } else {
                                        //FREE
                                        $('.MainHeader.MainHeader--free').append(`<div id="notifyPreReady"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold">PRÉ-READY!</strong> Já dei o pré-ready pra você, fica tranquilo!</div></div>`);
                                        setTimeout(() => {
                                            var chat = document.getElementById('notifyPreReady');
                                            $(chat).hide();
                                        }, config.notification_delay)

                                        //PREMIUM AND PLUS
                                        $('.MainHeader').append(`<div id="notifyPreReadyPP"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold">PRÉ-READY!</strong> Já dei o pré-ready pra você, fica tranquilo!</div></div>`);
                                        setTimeout(() => {
                                            var chat = document.getElementById('notifyPreReadyPP');
                                            $(chat).hide();
                                        }, config.notification_delay)
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
            //SCRIPT
            let readyObserver = new MutationObserver((mutations) => {
                $.each(mutations, (i, mutation) => {
                    var addedNodes = $(mutation.addedNodes);
                    let selector = '#gameModalReadyBtn > button';
                    var readyButton = addedNodes.find(selector).addBack(selector);
                    if (readyButton.length) {
                        readyButton[0].click();

                        //NOTIFICATION
                        chrome.storage.sync.get([`enable_notification`], (response) => {
                            if (!response.enable_notification) {
                                return console.log('As notificações estão desativadas!')
                            } else {
                                chrome.storage.sync.get([`notification_ready`], (response) => {
                                    if (!response.notification_ready) {
                                        return
                                    } else {
                                        //FREE
                                        $('.MainHeader.MainHeader--free').append(`<div id="notifyReady"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold">READY!</strong> Pode deixar comigo que já aceitei pra você!</div></div>`);
                                        setTimeout(() => {
                                            var chat = document.getElementById('notifyReady');
                                            $(chat).hide();
                                        }, config.notification_delay)

                                        //PREMIUM AND PLUS
                                        $('.MainHeader').append(`<div id="notifyReadyPP"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold">READY!</strong> Pode deixar comigo que já aceitei pra você!</div></div>`);
                                        setTimeout(() => {
                                            var chat = document.getElementById('notifyReadyPP');
                                            $(chat).hide();
                                        }, config.notification_delay)
                                    }
                                });
                            }
                        });
                    }
                });
            });
            readyObserver.observe($('#rankedModals').get(0), { childList: true, subtree: true })
        }
    });
}

function copiarIP() {
    chrome.storage.sync.get(['enable_copyip'], (response) => {
        if (!response.enable_copyip) {
            return
        } else {
            //SCRIPT
            let copyIpObserver = new MutationObserver((mutations) => {
                $.each(mutations, (i, mutation) => {
                    var addedNodes = $(mutation.addedNodes);
                    let selector = '#gameModalCopyServer';
                    var copyIpButton = addedNodes.find(selector).addBack(selector);
                    if (copyIpButton.length) {
                        copyIpButton[0].click();

                        //NOTIFICATION
                        chrome.storage.sync.get([`enable_notification`], (response) => {
                            if (!response.enable_notification) {
                                return console.log('As notificações estão desativadas!')
                            } else {
                                chrome.storage.sync.get([`notification_copyip`], (response) => {
                                    if (!response.notification_copyip) {
                                        return
                                    } else {
                                        //FREE
                                        $('.MainHeader.MainHeader--free').append(`<div id="notifyCopyIP"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold">IP COPIADO!</strong> Só colar no console agora e ir trocar tiro. Bom jogo!</div></div>`);
                                        setTimeout(() => {
                                            var chat = document.getElementById('notifyCopyIP');
                                            $(chat).hide();
                                        }, config.notification_delay)

                                        //PREMIUM AND PLUS
                                        $('.MainHeader').append(`<div id="notifyCopyIPPP"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold">IP COPIADO!</strong> Só colar no console agora e ir trocar tiro. Bom jogo!</div></div>`);
                                        setTimeout(() => {
                                            var chat = document.getElementById('notifyCopyIPPP');
                                            $(chat).hide();
                                        }, config.notification_delay)
                                    }
                                });
                            }
                        });
                    }
                });
            });
            copyIpObserver.observe($('#rankedModals').get(0), { childList: true, subtree: true })
        }
    });
}

function fixaLobby() {
    chrome.storage.sync.get([`enable_fixa`], (response) => {
        if (!response.enable_fixa) {
            return
        } else {
            //SCRIPT
            let observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (!mutation.addedNodes) return 'aaa'

                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        let node = mutation.addedNodes[i]
                        if (typeof node.id != 'undefined') {
                            if (node.id.includes("SidebarSala")) {
                                $(node).css({ position: "fixed", top: "15%", bottom: "auto" });
                            }
                            if (node.className.includes("sidebar-desafios sidebar-content")) {
                                $(node).css({ position: 'fixed', top: '15%', right: '72px', bottom: 'auto' });

                                //NOTIFICATION
                                chrome.storage.sync.get([`enable_notification`], (response) => {
                                    if (!response.enable_notification) {
                                        return console.log('As notificações estão desativadas!')
                                    } else {
                                        chrome.storage.sync.get([`notification_enableAds`], (response) => {
                                            if (!response.notification_enableAds) {
                                                return
                                            } else {
                                                //FREE
                                                $('.MainHeader.MainHeader--free').append(`<div id="notifyFixa"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold">LOBBY FIXADO!</strong> Chega de bugs na hora de desafiar outros times!</div></div>`);
                                                setTimeout(() => {
                                                    var chat = document.getElementById('notifyFixa');
                                                    $(chat).hide();
                                                }, config.notification_delay)

                                                //PREMIUM AND PLUS
                                                $('.MainHeader.MainHeader--free').append(`<div id="notifyFixaPP"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold">LOBBY FIXADO!</strong> Chega de bugs na hora de desafiar outros times!</div></div>`);
                                                setTimeout(() => {
                                                    var chat = document.getElementById('notifyFixaPP');
                                                    $(chat).hide();
                                                }, config.notification_delay)
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                })
            });
            observer.observe($('#lobbyContent').get(0), { childList: true, subtree: true, attributes: false, characterData: false })
        }
    });
}

function featuresLobby() {
    autoPreReady();
    autoReady();
    copiarIP();
    criarLobby();
    fixaLobby();
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