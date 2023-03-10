var r = 0;
var autoSite;
var DEBUG = 1;

var parser = new DOMParser();
var page = document.querySelector("body > div");
var messager;
const button = document.createElement("a");

var init = () => {
    if(DEBUG >= 1) console.log("init() is run");
    button.setAttribute("isRun", 0);
    button.className = "btn btn-primary";
    button.innerText = "自動報名";
    button.addEventListener("click", () => {
        // buttonSwitch();
        setRunner(button.getAttribute("isRun") == 0 ? 1 : 0);
    });
    // document.querySelector("body > div > form > table:nth-child(9) > tbody > tr.info > td:nth-child(3)").className = "text-center";
    var buttonParents = document.querySelector("body > div > form > table:nth-child(9) > tbody > tr.info > td:nth-child(3) > center");
    buttonParents.className = "btn-group";
    buttonParents.appendChild(button);

    let message = document.createElement("div");
    message.setAttribute("id", "messager");
    page.insertBefore(message, page.firstChild);
    messager = document.querySelector("#messager");
}

var setRunner = (isRun) => {
    if(DEBUG >= 1) console.log(`setRunner(${isRun}) is run`);
    if(isRun == 1){
        button.className = "btn btn-danger";
        button.innerText = "暫停";
        Autofull_init();
        button.setAttribute("isRun", 1);
    }else{
        button.className = "btn btn-primary";
        button.innerText = "自動報名";
        clearInterval(autoSite);
        button.setAttribute("isRun", 0);
    }
}

// var buttonSwitch = () => {
//     if(DEBUG >= 1) console.log(`buttonSwitch(${button.getAttribute("isRun")}) is run`);
//     if(button.getAttribute("isRun") == 0){
//         button.className = "btn btn-danger";
//         button.innerText = "暫停";
//         Autofull_init();
//         button.setAttribute("isRun", 1);
//     }else{
//         button.className = "btn btn-primary";
//         button.innerText = "自動報名";
//         clearInterval(autoSite);
//         button.setAttribute("isRun", 0);
//     }
// }

var Autofull_init = () => {
    if(DEBUG >= 1) console.log("Autofull_init() is run")
    r = 0;
    autoSite = setInterval(() => {Autofull_run()}, 1000);
    console.log("autoSite", autoSite)
}

var Autofull_run = () => {
    var yourSchoolID = document.querySelector("body > div.container-fluid > form > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(1) > center > select").value
    var yourDepartment = document.querySelector("body > div.container-fluid > form > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2) > center > input").value
    var yourGrade = document.querySelector("body > div.container-fluid > form > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(3) > center > select").value
    var yourSite = document.querySelector("body > div.container-fluid > form > table:nth-child(9) > tbody > tr.info > td:nth-child(2) > center > select").value
    
    fetch("/cpe/newest", {
        method: "POST",
        body: `isSend=yes&mySchoolID=${encodeURI(yourSchoolID)}&myDepartment=${encodeURI(yourDepartment)}&myGrade=${encodeURI(yourGrade)}&optionsRadios1=1&site=${encodeURI(yourSite)}&yesExam=%E5%A0%B1%E5%90%8D`,
        headers: {
        "Content-type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        response.text().then((html) => {
            var responseHTML = parser.parseFromString(html, "text/html");
            responseMessage = responseHTML.querySelector("body > div > div.alert.alert-error");
            if(responseMessage.innerText.slice(0, 4) !== "報名失敗"){
                console.log("可能報名成功了，請自行確認", "stop running!");
                setRunner(0);
            };
            // console.log("[DEBUG]", responseMessage.innerText.slice(0, 4));
            if(r%5==0){
                // document.body.innerHTML = html
                messager.innerHTML = `<span class="label label-info">[Auto-Fill] ${r}</span>` + responseMessage.innerHTML;
            }
            r+=1;
        });
    });
    
}

// document.addEventListener("DOMContentLoaded", function() {
//     console.log("DOM fully loaded!"); // 在網頁DOM元素解析完成後執行的代碼
    
// });
console.log("content.js is run")
init();
// var autoSite = setInterval(() => {AutoExam(yourSite)}, 1000);
// console.log(autoSite, "is run")