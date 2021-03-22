function legenda() {
    chrome.storage.sync.get([`enable_verifica`], (response) => {
        if (!response.enable_verifica) {
            return
        } else {
            $('.column.header-title-page.title-page-with-ads').append('<div class="row"><p style="height:10px; width:10px; float:right; background-color:rgba(49, 199, 41, 0.25); margin-left:15px; padding:12px;"></p><p style="margin-left:10px">Sem Jogadores Banidos</p></div>')
            $('.column.header-title-page.title-page-with-ads').append('<br>')
            $('.column.header-title-page.title-page-with-ads').append('<div class="row"><p style="height:10px; width:10px; float:right; background-color:rgba(220, 20, 0, 0.25); margin-left:15px; padding:12px;"></p><p style="margin-left:10px">Possui Jogadores Banidos</p></div>')
        }
    })
}

function verificarPartidas() {
    chrome.storage.sync.get([`enable_verifica`], (response) => {
        if (!response.enable_verifica) {
            return
        } else {
            setInterval(function() {
                const GC_API_URL = '';
                const SELETOR_LINK_PARTIDAS = 'a:contains("Ver partida")'

                const buscaLinksDasPartidas = () => {
                    let partidas = [];
                    $(SELETOR_LINK_PARTIDAS).each(function() {
                        partidas.push(this.href);
                    });
                    return partidas;
                }

                const verificarBans = async(partida, matchColumn) => {
                    try {
                        const resposta = await fetch(partida + '/1');
                        const dadosPartida = await resposta.json();
                        const temBanidos = dadosPartida.jogos.players.team_a.some(jogador => jogador.player.banned) || dadosPartida.jogos.players.team_b.some(jogador => jogador.player.banned);
                        if (temBanidos) {
                            matchColumn.style.background = 'rgba(220, 20, 0, 0.25)'
                        } else {
                            matchColumn.style.background = 'rgba(49, 199, 41, 0.25)'
                        }
                    } catch (e) {
                        return verificarBans(partida, matchColumn);
                    }
                }

                const initVerificarBans = async() => {
                    const partidas = buscaLinksDasPartidas();
                    const matchColumns = $('span.versus').parent().parent();
                    const promises = partidas.map((partida, index) => verificarBans(partida, matchColumns[index]));
                    await Promise.all(promises);
                }

                (async() => {
                    $('body').on('DOMNodeInserted', '#myMatchesPagination', async function() {
                        await new Promise(r => setTimeout(r, 1000));
                        initVerificarBans();
                    });
                    initVerificarBans();
                })();
            }, 500);
        }
    });
}

function enableExtension() {
    chrome.storage.sync.get([`enable_extension`], (response) => {
        if (!response.enable_extension) {
            return console.log('A extensão está desativada!')
        } else {
            verificarPartidas();
            legenda();
        }
    });
}

enableExtension();