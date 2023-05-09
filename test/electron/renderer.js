/** @type {import('steamworks.js')} */
const steamworks = require('steamworks.js')
const client = steamworks.init(2191600)
console.log(client);//vla

client.auth.getSessionTicket().then(response => {
    const localplayer = client.localplayer
    const ticket = response.getBytes().toString('hex')
    client.achievement.activate('GAME OPEN')
    const game_url = "http://steam.vgonzales.hh/index.php?"
        + "steam=true"
        + "&steam_settings[nickname]=" + localplayer.getName()
        + "&steam_settings[steam_id]=" + localplayer.getSteamId().steamId64.toString()
        + "&steam_settings[ticket]=" + ticket
        + "&steam_settings[country]="+localplayer.getIpCountry()
    initGame(game_url)
});
function initGame(url) {
    const iframe = document.getElementById('game_frame');
    iframe.setAttribute('src', url);
}

let canva1_left = 0;
let canva2_right = -1;
function refresh() {
    const width = document.body.clientWidth;
    if(canva2_right==-1) {
        canva2_right = width
    }
    const canva1 = document.getElementById('top-left')
    const canva2 = document.getElementById('bottom-right')
    if(!canva1) return;
    canva1_left += 1;
    if(canva1_left>=width)
        canva1_left=0;
    canva1.style.left = canva1_left+'px';

    canva2_right += 1;
    if(canva2_right>=width)
        canva2_right = 0
    canva2.style.right = canva2_right+'px';
    requestAnimationFrame(refresh)
}
document.addEventListener("readystatechange", (event) => {
    refresh()
});