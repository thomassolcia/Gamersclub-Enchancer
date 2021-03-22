function historicoProfile() {
    chrome.storage.sync.get([`enable_porcentagem`], (response) => {
        if (!response.enable_porcentagem) {
            return
        } else {
            const SELETOR_HISTORICO = 'h3:contains("Histórico")';

            //Painel LOBBY
            let totalVitorias0 = 0;
            let totalDerrotas0 = 0;
            $("span:contains('Vitórias')").each(function(i, el) {
                if (i === 0) {
                    totalVitorias0 += parseInt($(this).html().replace(' Vitórias', ''));
                }
            });
            $("span:contains('Derrotas')").each(function(i, el) {
                if (i === 0) {
                    totalDerrotas0 += parseInt($(this).html().replace(' Derrotas', ''));
                }
            });
            const winRatio0 = ((totalVitorias0 / (totalVitorias0 + totalDerrotas0)) * 100).toFixed(2);
            if ($('.gc-card-history-item.gc-card-history-item-lobby.is-inactive').is(':visible')) {
                $('.gc-card-history-item.gc-card-history-item-lobby.is-inactive').html("<div class='gc-card-history-item.gc-card-history-item-lobby'><div class='gc-card-history-icon'><img src='/assets/images/ranked/ranked-lobby-icon@2x.svg' height='32' alt=''></div><h5 class='gc-card-history-subtitle'>Ranked</h5><h4 class='gc-card-history-title'>Lobby</h4><div class='gc-card-history-content'><p class='gc-card-history-text'>0 <span>Partidas</span></p><p class='gc-card-history-detail'><span>0 Vitórias</span> <span>0 Derrotas</span> </p></div><hr><p class='gc-card-history-text'>--.--% Win Rate</p>")
            } else {
                $('.gc-card-history-item.gc-card-history-item-lobby').append(`<hr><p class="gc-card-history-text">${winRatio0}% Win Rate</p>`)
            }

            //Painel OPEN
            let totalVitorias1 = 0;
            let totalDerrotas1 = 0;
            $("span:contains('Vitórias')").each(function(i, el) {
                if (i === 1) {
                    totalVitorias1 += parseInt($(this).html().replace(' Vitórias', ''));
                }
            });
            $("span:contains('Derrotas')").each(function(i, el) {
                if (i === 1) {
                    totalDerrotas1 += parseInt($(this).html().replace(' Derrotas', ''));
                }
            });
            const winRatio1 = ((totalVitorias1 / (totalVitorias1 + totalDerrotas1)) * 100).toFixed(2);
            if ($('.gc-card-history-item.gc-card-history-item-open.is-inactive').is(':visible')) {
                $('.gc-card-history-item.gc-card-history-item-open.is-inactive').html("<div class='gc-card-history-item.gc-card-history-item-open'><div class='gc-card-history-icon'><img src='/assets/images/ranked/ranked-open-icon@2x.svg' height='32' alt=''></div><h5 class='gc-card-history-subtitle'>Ranked</h5><h4 class='gc-card-history-title'>Open</h4><div class='gc-card-history-content'><p class='gc-card-history-text'>0 <span>Partidas</span></p><p class='gc-card-history-detail'><span>0 Vitórias</span> <span>0 Derrotas</span> </p></div><hr><p class='gc-card-history-text'>--.--% Win Rate</p>")
            } else {
                $('.gc-card-history-item.gc-card-history-item-open').append(`<hr><p class="gc-card-history-text">${winRatio1}% Win Rate</p>`)
            }

            //Painel CHALLENGE
            let totalVitorias2 = 0;
            let totalDerrotas2 = 0;
            $("span:contains('Vitórias')").each(function(i, el) {
                if (i === 2) {
                    totalVitorias2 += parseInt($(this).html().replace(' Vitórias', ''));
                }
            });
            $("span:contains('Derrotas')").each(function(i, el) {
                if (i === 2) {
                    totalDerrotas2 += parseInt($(this).html().replace(' Derrotas', ''));
                }
            });
            const winRatio2 = ((totalVitorias2 / (totalVitorias2 + totalDerrotas2)) * 100).toFixed(2);
            if ($('.gc-card-history-item.gc-card-history-item-challenge.is-inactive').is(':visible')) {
                $('.gc-card-history-item.gc-card-history-item-challenge.is-inactive').html("<div class='gc-card-history-item.gc-card-history-item-challenge'><div class='gc-card-history-icon'><img src='/assets/images/ranked/ranked-challenge-icon@2x.svg' height='32' alt=''></div><h5 class='gc-card-history-subtitle'>Ranked</h5><h4 class='gc-card-history-title'>Challenge</h4><div class='gc-card-history-content'><p class='gc-card-history-text'>0 <span>Partidas</span></p><p class='gc-card-history-detail'><span>0 Vitórias</span> <span>0 Derrotas</span> </p></div><hr><p class='gc-card-history-text'>--.--% Win Rate</p>")
            } else {
                $('.gc-card-history-item.gc-card-history-item-challenge').append(`<hr><p class="gc-card-history-text">${winRatio2}% Win Rate</p>`)
            }

            //Painel QUALIFY
            let totalVitorias3 = 0;
            let totalDerrotas3 = 0;
            $("span:contains('Vitórias')").each(function(i, el) {
                if (i === 3) {
                    totalVitorias3 += parseInt($(this).html().replace(' Vitórias', ''));
                }
            });
            $("span:contains('Derrotas')").each(function(i, el) {
                if (i === 3) {
                    totalDerrotas3 += parseInt($(this).html().replace(' Derrotas', ''));
                }
            });
            const winRatio3 = ((totalVitorias3 / (totalVitorias3 + totalDerrotas3)) * 100).toFixed(2);
            if ($('.gc-card-history-item.gc-card-history-item-qualify.is-inactive').is(':visible')) {
                $('.gc-card-history-item.gc-card-history-item-qualify.is-inactive').html("<div class='gc-card-history-item.gc-card-history-item-qualify'><div class='gc-card-history-icon'><img src='/assets/images/ranked/ranked-qualify-icon@2x.svg' height='32' alt=''></div><h5 class='gc-card-history-subtitle'>Ranked</h5><h4 class='gc-card-history-title'>Qualify</h4><div class='gc-card-history-content'><p class='gc-card-history-text'>0 <span>Partidas</span></p><p class='gc-card-history-detail'><span>0 Vitórias</span> <span>0 Derrotas</span> </p></div><hr><p class='gc-card-history-text'>--.--% Win Rate</p>")
            } else {
                $('.gc-card-history-item.gc-card-history-item-qualify').append(`<hr><p class="gc-card-history-text">${winRatio3}% Win Rate</p>`)
            }

            //Painel PRO
            let totalVitorias4 = 0;
            let totalDerrotas4 = 0;
            $("span:contains('Vitórias')").each(function(i, el) {
                if (i === 4) {
                    totalVitorias4 += parseInt($(this).html().replace(' Vitórias', ''));
                }
            });
            $("span:contains('Derrotas')").each(function(i, el) {
                if (i === 4) {
                    totalDerrotas4 += parseInt($(this).html().replace(' Derrotas', ''));
                }
            });
            const winRatio4 = ((totalVitorias4 / (totalVitorias4 + totalDerrotas4)) * 100).toFixed(2);
            teste = $('.gc-card-history-text').eq(8).text();
            if (teste === '0 Partidas') {
                $('.gc-card-history-item.gc-card-history-item-pro').replaceWith("<div class='gc-card-history-item gc-card-history-item-pro is-inactive'><div class='gc-card-history-icon'><img src='/assets/images/ranked/ranked-pro-icon@2x.svg' height='32' alt=''></div><h5 class='gc-card-history-subtitle'>Ranked</h5><h4 class='gc-card-history-title'>Pro</h4><div class='gc-card-history-content'><p class='gc-card-history-text'>0 <span>Partidas</span></p><p class='gc-card-history-detail'><span>0 Vitórias</span> <span>0 Derrotas</span> </p></div><hr><p class='gc-card-history-text'>--.--% Win Rate</p>")
            } else {
                $('.gc-card-history-item.gc-card-history-item-pro').append(`<hr><p class="gc-card-history-text">${winRatio4}% Win Rate</p>`)
            }

            //Painel GERAL
            let totalVitorias = 0;
            let totalDerrotas = 0;
            $("span:contains('Vitórias')").each(function(i) {
                totalVitorias += parseInt($(this).html().replace(' Vitórias', ''));
            });
            $("span:contains('Derrotas')").each(function(i) {
                totalDerrotas += parseInt($(this).html().replace(' Derrotas', ''));
            });
            const winRatio = ((totalVitorias / (totalVitorias + totalDerrotas)) * 100).toFixed(2);
            const titleHistorico = $(SELETOR_HISTORICO)[0];
            titleHistorico.innerHTML += ` GERAL - ${totalVitorias} Vitórias/${totalDerrotas} Derrotas (${winRatio}% Win Rate)`;
        }
    });
}

function enableProfile() {
    chrome.storage.sync.get([`enable_extension`], (response) => {
        if (!response.enable_extension) {
            return console.log('A extensão está desativada!')
        } else {
            historicoProfile();
        }
    });
}

enableProfile();