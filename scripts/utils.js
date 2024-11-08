let isDark = !window.matchMedia("(prefers-color-scheme: dark)").matches;
const COLORS = {
    bodybg: ["#fff", "#444"],
    bodyfg: ["#000", "#fff"],
    linkfg: ["#00f","#aaf"],
    inputbg: ["#eee","#666"],
    inputline:["#000","#fff"],
    buttonbg:["#eee","#666"],
    buttonDisabledfg:["#666","#999"],
    buttonfg:["#000","#fff"],
    github:["/assets/github-mark.svg","/assets/github-mark-white.svg"]
}
const moveToHome = () => {
    location.href = location.origin;
}
const changeColor = () => {
    const body = document.querySelector("body");
    isDark = !isDark;
    document.querySelector("#theme_changer").innerHTML = isDark ? "🌟" : "🌙"
    const darkindex = isDark ? 1 : 0;
    body.style.backgroundColor = COLORS.bodybg[darkindex]
    body.style.color = COLORS.bodyfg[darkindex]
    document.querySelectorAll("a:link, a:visited").forEach((e)=>{
        e.style.color = COLORS.linkfg[darkindex]
    })
    document.querySelectorAll("input").forEach((e)=>{
        e.style.backgroundColor = COLORS.inputbg[darkindex]
        e.style.borderColor = COLORS.inputline[darkindex]
        e.style.color=COLORS.bodyfg[darkindex];
    })
    document.querySelectorAll("button").forEach((e)=>{
        e.style.backgroundColor = COLORS.buttonbg[darkindex]
        e.style.color = COLORS.buttonfg[darkindex]
    })
    document.querySelectorAll("button:disabled").forEach((e)=>{
        e.style.color = COLORS.buttonDisabledfg[darkindex]
    })
    document.querySelector("#github").src = COLORS.github[darkindex];
}