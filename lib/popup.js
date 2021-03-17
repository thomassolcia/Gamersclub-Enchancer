const pages = [
    "general",
    "automation",
    "visual",
    "notification",
    "about"
];

const options = [
    //Principais
    "enable_extension",
    "enable_notification",

    //Funções
    "enable_preready",
    "enable_ready",
    "enable_copyip",
    "enable_calcula",
    "enable_verifica",
    "enable_ads",
    "enable_fixa",
    "enable_returnLobby",
    "enable_criarLobby",
    "enable_chatList",

    //Notificações
    "notification_calculaPontos",
    "notification_removeChatList",
    "notification_preready",
    "notification_ready",
    "notification_copyip",
    "notification_returnLobby",
    "notification_enableFixa",
    "notification_enableAds",
    "notification_verifica"
];

function openPage(btnName) {
    if (!btnName) return false;

    let name = btnName.split("_");
    name = name[1];

    let btnElement = document.getElementById(btnName);
    let pageElement = document.getElementById(`page_${name}`);
    if (
        btnElement.classList.contains("menu-btn-selected") &&
        pageElement.classList.contains("content-active")) {
        return false;
    }

    for (let page of pages) {
        if (page != name) {
            let getElement = document.getElementById(`btn_${page}`);
            getElement.classList.remove("menu-btn-selected");
        }
    }
    btnElement.classList.add("menu-btn-selected");

    for (let page of pages) {
        if (page != name) {
            let getElement = document.getElementById(`page_${page}`);
            getElement.classList.remove("content-active");
        }
    }
    pageElement.classList.add("content-active");
}

function menuListener() {
    for (let page of pages) {
        document.getElementById(`btn_${page}`).addEventListener('click', () => {
            openPage(`btn_${page}`)
        });
    }
}

function updateOptions() {
    chrome.storage.sync.get(null, (response) => {
        if (!response) return false;
        for (let option of options) {
            document.getElementById(`chk_${option}`).checked = response[`${option}`];
        }
    });
}

function saveChanges() {
    for (let option of options) {
        document.getElementById(`chk_${option}`).addEventListener('change', () => {
            if (!option) return false;
            let checked = document.getElementById(`chk_${option}`).checked;
            chrome.storage.sync.set({
                [option]: checked
            }, () => {});
        });
    }
}

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        menuListener();
        updateOptions();
        saveChanges();
    });
}

main();