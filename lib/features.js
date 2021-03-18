const config = {
    "notification_delay": 5000,
    "enhancer_delay": 500,
    "max_count_lobby": 150,
    "create_lobby_delay": 500,
    "click_auto_agree_delay": 50
};

const mapsVetos = {
    "de_dust2": false,
    "de_nuke": false,
    "de_train": false,
    "de_mirage": false,
    "de_overpass": false,
    "de_inferno": false,
    "de_vertigo": false,
    "de_cbble_classic": false,
};

function bloquearPropaganda() {
    chrome.storage.sync.get([`enable_ads`], (response) => {
        if (!response.enable_ads) {
            return
        } else {
            //SCRIPT
            $('.lobby-header-ads').hide();
            $('.advertisement-lobby-side-left').hide();
            $('.advertisement-lobby-side').hide();
            $('.missionsAdsWideWrapper').hide();
            $('.SideAdvertisement.SideAdvertisement--left').hide();
            $('.SideAdvertisement.SideAdvertisement--right').hide();
            $('.GoogleActiveViewInnerContainer').hide();
            $('.small-banner.banner-patrocinador').hide();
            $('.home-banner-full.home-banner-full--above.row').hide();
            $('.tournament-banner-full.row').hide();
            $('.AdvertisementHtml').hide();
            $('.title-ads').hide();
            $('.adsbygoogle').hide();
            $('.ns-qryqn-l-banner2.ns-qryqn-v-0').hide();
            $('.ns-z48dh-e-1.row-container').hide();
            $('.ns-g7ebu-e-0.x-layout.throne.GoogleActiveViewElement').hide();

            function onYouTubeIframeAPIReady() {
                player = new YT.Player('gameModalMerchandiseVideo', {
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            }

            function onPlayerReady() {
                player.playVideo();
                player.mute();
                player.stopVideo();
            }

            //NOTIFICATION
            chrome.storage.sync.get([`enable_notification`], (response) => {
                if (!response.enable_notification) {
                    return console.log('As notificações estão desativadas!')
                } else {
                    chrome.storage.sync.get([`notification_enableAds`], (response) => {
                        if (!response.notification_enableAds) {
                            return console.log('As notificações estão desativadas!')
                        } else {
                            //FREE
                            $('.MainHeader.MainHeader--free').append(`<div id="notifyEnableAds"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold"> AD? HOJE NÃO!</strong> Chega daquelas propagandas chatas por aqui!</div></div>`);
                            setTimeout(() => {
                                var chat = document.getElementById('notifyEnableAds');
                                $(chat).hide();
                            }, config.notification_delay)

                            //PREMIUM AND PLUS
                            $('.MainHeader').append(`<div id="notifyEnableAdsPP"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold"> AD? HOJE NÃO!</strong> Chega daquelas propagandas chatas por aqui!</div></div>`);
                            setTimeout(() => {
                                var chat = document.getElementById('notifyEnableAdsPP');
                                $(chat).hide();
                            }, config.notification_delay)
                        }
                    });
                }
            });
        }
    });
}

function calculaPontos() {
    chrome.storage.sync.get([`enable_calcula`], (response) => {
        if (!response.enable_calcula) {
            return
        } else {
            //SCRIPT
            setTimeout(() => {
                function sampleFunction() {
                    if ($('#GamersClubStatsBox').is(":visible")) {
                        const minPontos = $('.StatsBoxProgressBar__minRating').text();
                        const maxPontos = $('.StatsBoxProgressBar__maxRating').text();
                        const atualPontos = $('.StatsBoxRating__Score').text();
                        const pontosSubir = maxPontos - atualPontos;
                        const pontosCair = minPontos - atualPontos;
                        $('.MainHeader__itemLabel').append(`<span style="font-size:10px">ﾠ(${pontosCair}↓ +${pontosSubir}↑)</span>`);
                        $('.StatsBoxRating__Header').append(`<span style="font-size:10px">\n(${pontosCair}↓ +${pontosSubir}↑)</span>`);

                        //NOTIFICATION
                        chrome.storage.sync.get([`enable_notification`], (response) => {
                            if (!response.enable_notification) {
                                return console.log('As notificações estão desativadas!')
                            } else {
                                chrome.storage.sync.get([`notification_calculaPontos`], (response) => {
                                    if (!response.notification_calculaPontos) {
                                        return
                                    } else {
                                        //FREE
                                        $('.MainHeader.MainHeader--free').append(`<div id="notifyCalcula"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold"> MUITO BEM!</strong> Seus pontos já foram calculados!</div></div>`);
                                        setTimeout(() => {
                                            var chat = document.getElementById('notifyCalcula');
                                            $(chat).hide();
                                        }, config.notification_delay)

                                        //PREMIUM AND PLUS
                                        $('.MainHeader').append(`<div id="notifyCalculaPP"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold"> MUITO BEM!</strong> Seus pontos já foram calculados!</div></div>`);
                                        setTimeout(() => {
                                            var chat = document.getElementById('notifyCalculaPP');
                                            $(chat).hide();
                                        }, config.notification_delay)
                                    }
                                });
                            }
                        });
                    }
                }
                sampleFunction();
            }, 3000)
        }
    });
}

function removeChatList() {
    chrome.storage.sync.get([`enable_chatList`], (response) => {
        if (!response.enable_chatList) {
            return
        } else {
            //SCRIPT
            $('.gcf-sidebar').first().hide();

            //NOTIFICATION
            chrome.storage.sync.get([`enable_notification`], (response) => {
                if (!response.enable_notification) {
                    return console.log('As notificações estão desativadas!')
                } else {
                    chrome.storage.sync.get([`notification_removeChatList`], (response) => {
                        if (!response.notification_removeChatList) {
                            return
                        } else {
                            //FREE
                            $('.MainHeader.MainHeader--free').append(`<div id="notifyChat"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold"> CHEGA DE MENSAGENS!</strong> Agora você não verá mais os chats nem os pedidos de amizade que te mandarem!</div></div>`);
                            setTimeout(() => {
                                var chat = document.getElementById('notifyChat');
                                $(chat).hide();
                            }, config.notification_delay)

                            //PREMIUM AND PLUS
                            $('.MainHeader').append(`<div id="notifyChatPP"; class="col-sm-12"><div style="border-radius:5px; margin:5px; padding:5px; border: 1px solid #839800; background-color: rgba(7, 149, 66, 0.12156862745098039); box-shadow: 0px 0px 2px #259c08; color: white;"><i class="start-icon far fa-check-circle faa-tada animated"></i><strong class="font__weight-semibold"> CHEGA DE MENSAGENS!</strong> Agora você não verá mais os chats nem os pedidos de amizade que te mandarem!</div></div>`);
                            setTimeout(() => {
                                var chat = document.getElementById('notifyChatPP');
                                $(chat).hide();
                            }, config.notification_delay)
                        }
                    });
                }
            });
        }
    });
}

function features() {
    calculaPontos();
    bloquearPropaganda();
    removeChatList();
}

function enableExtension() {
    chrome.storage.sync.get([`enable_extension`], (response) => {
        if (!response.enable_extension) {
            return console.log('A extensão está desativada!')
        } else {
            features();
        }
    });
}

enableExtension();