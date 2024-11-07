
const encodeHTMLChars = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
const getInputValue = (id) => document.getElementById(id).value;
const jsonParseable = (str) => {
    try {
        JSON.parse(str)
        return true;
    } catch (ex) {
        return false;
    }
}
const getCookie = () => {
    const keyValuePairs = document.cookie.split("; ");
    const associativeArray = {};
    keyValuePairs.forEach(pair => {
        const keyAndValue = pair.split("=");
        const decodedValue = decodeURIComponent(keyAndValue[1]);
        if (!!keyAndValue[0] && jsonParseable(decodedValue)) {
            associativeArray[keyAndValue[0]] = JSON.parse(decodedValue);
        }
    });
    return associativeArray;
}
const LoadCookie = () => {
    const cookie = Object.entries(getCookie());
    cookie.forEach((pair) => {
        const li = document.createElement("li");
        const url = document.createElement("a");
        url.href = pair[1][0];
        url.target = "_blank";
        url.innerHTML = encodeHTMLChars(pair[0]);
        li.insertAdjacentElement("beforeend", url)
        document.querySelector("#engines").insertAdjacentElement("beforeend", li)
        searchTexts[pair[0]] = pair[1][1];
    })
    ggr();
}
const showAddEngineForm = () => {
    const formStyle = document.querySelector("#addengine_form").style;
    formStyle.display = formStyle.display === "none" ? "unset" : "none"
}
const showAddEngineFormURL = () => {
    const showDiv = document.querySelector("#addengine_show");
    const url = getInputValue("addengine_url");
    const searchurl = getInputValue("addengine_searchurl");
    showDiv.innerHTML =
        encodeHTMLChars(`検索時のURL: ` + url + searchurl + `ググれボケ`);
    document.querySelector("#addengine_add").disabled = !url || !searchurl;
}
const addEngine = () => {
    const name = getInputValue("addengine_name");
    const url = getInputValue("addengine_url");
    const searchurl = getInputValue("addengine_searchurl");
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify([url, searchurl]))}; SameSite=None`;
    const button = document.querySelector("#addengine_add");
    button.textContent = "Added!"
    location.reload();
}