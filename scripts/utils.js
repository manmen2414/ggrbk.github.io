let isDark = !window.matchMedia("(prefers-color-scheme: dark)").matches;
let doOpenNewTab = true;
const COLORS = {
    bodybg: ["#fff", "#444"],
    bodyfg: ["#000", "#fff"],
    linkfg: ["#00f", "#aaf"],
    inputbg: ["#eee", "#666"],
    inputline: ["#000", "#fff"],
    buttonbg: ["#eee", "#666"],
    buttonDisabledfg: ["#666", "#999"],
    buttonfg: ["#000", "#fff"],
    github: ["/assets/github-mark.svg", "/assets/github-mark-white.svg"]
}
const moveToHome = () => {
    location.href = location.origin;
}
const changeColor = (changeBg) => {
    isDark = !isDark;
    const darkindex = isDark ? 1 : 0;
    document.querySelector("#theme_changer").innerHTML = isDark ? "🌟" : "🌙"
    if (changeBg) {
        const body = document.querySelector("body");
        body.style.backgroundColor = COLORS.bodybg[darkindex]
        body.style.color = COLORS.bodyfg[darkindex]
    }
    document.querySelectorAll("a:link, a:visited").forEach((e) => {
        e.style.color = COLORS.linkfg[darkindex]
    })
    document.querySelectorAll("input").forEach((e) => {
        e.style.backgroundColor = COLORS.inputbg[darkindex]
        e.style.borderColor = COLORS.inputline[darkindex]
        e.style.color = COLORS.bodyfg[darkindex];
    })
    document.querySelectorAll("button").forEach((e) => {
        e.style.backgroundColor = COLORS.buttonbg[darkindex]
        e.style.color = COLORS.buttonfg[darkindex]
    })
    document.querySelectorAll(".transparent").forEach((e) => {
        e.style.backgroundColor = COLORS.bodybg[darkindex]
    })
    document.querySelectorAll("button:disabled").forEach((e) => {
        e.style.color = COLORS.buttonDisabledfg[darkindex]
    })
    document.querySelector("#github").src = COLORS.github[darkindex];
}
const changeOpenMode = () => {
    doOpenNewTab = !doOpenNewTab;
    document.querySelectorAll("li > a").forEach(e => {
        e.target = doOpenNewTab ? "_blank" : "_self";
    })
    document.querySelector("#open_mode").innerHTML = doOpenNewTab ? "モード：新規タブで開く" : "モード：そのまま開く"
}
const showRandomHint = () => {

};