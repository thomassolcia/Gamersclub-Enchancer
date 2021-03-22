var currentLocation = window.location;
console.log(currentLocation)
if (currentLocation == 'https://gamersclub.com.br/') {
    chrome.storage.sync.get([`enable_extension`], (response) => {
        if (!response.enable_extension) {
            Swal.fire({
                title: 'Desativada!',
                text: 'A extensão não está ativa.',
                footer: 'Para ativar habilite a opção "Geral -> Habilitar"',
                icon: 'error',
            });
        } else {
            Swal.fire(
                'Ativada!',
                'A extensão está funcionando!',
                'success'
            );
        }
    })
}

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
        }
    });
}

function calculaPontos() {
    chrome.storage.sync.get([`enable_calcula`], (response) => {
        if (!response.enable_calcula) {
            return
        } else {
            setTimeout(() => {
                function sampleFunction() {
                    if ($('#GamersClubStatsBox').is(":visible")) {
                        const minPontos = $('.StatsBoxProgressBar__minRating').text();
                        const maxPontos = $('.StatsBoxProgressBar__maxRating').text();
                        const atualPontos = $('.StatsBoxRating__Score').text();
                        const pontosSubir = maxPontos - atualPontos;
                        const pontosCair = minPontos - atualPontos;
                        $('.MainHeader__itemLabel').append(`<span style="font-size:10px">(${pontosCair}↓ +${pontosSubir}↑)</span>`);
                        $('.StatsBoxRating__Header').append(`<span style="font-size:10px">\n(${pontosCair}↓ +${pontosSubir}↑)</span>`);
                    }
                }
                sampleFunction();
            }, 5000)
        }
    });
}

function removeChatList() {
    chrome.storage.sync.get([`enable_chatList`], (response) => {
        if (!response.enable_chatList) {
            return
        } else {
            $('.gcf-sidebar').first().hide();
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