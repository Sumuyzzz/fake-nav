const navData = localStorage.getItem("navData")
const navObject = JSON.parse(navData)
let dataArray = navObject || [
    "angular.io",
    "bilibili.com",
    "css-tricks.com",
    "developer.mozilla.org",
    "es6.ruanyifeng.com",

]
window.onbeforeunload = () => {
    localStorage.setItem("navData", JSON.stringify(dataArray))
}

const navBar = document.getElementsByClassName("main-nav")[0]
const moduleNode = document.getElementsByClassName("module")[0]
const urlInput = moduleNode.getElementsByClassName("dialog-input")[0]

let selectedIndex = -1

const render = () => {
    navBar.innerHTML = ``
    let html = ` `
    dataArray.forEach((item, index) => {
        html += `
            <dl class="fl" data-index=${index}>
            <dt>${item[0]}</dt>
            <dd>${item}</dd>
            <dd>
            <svg t="1622715254222" class="main-nav-more" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7052" width="20" height="20"><path d="M382.2 165.7H217.4c-47.5 0-86.2 38.7-86.2 86.2v164.8c0 47.5 38.7 86.2 86.2 86.2h164.8c47.5 0 86.2-38.7 86.2-86.2V251.9c0.1-47.6-38.6-86.2-86.2-86.2z m-9.9 241.1h-145v-145h145v145zM382.2 557.6H217.4c-47.5 0-86.2 38.7-86.2 86.2v164.8c0 47.5 38.7 86.2 86.2 86.2h164.8c47.5 0 86.2-38.7 86.2-86.2V643.8c0.1-47.5-38.6-86.2-86.2-86.2z m-9.9 241.1h-145v-145h145v145zM871.6 273.3L755.1 156.8c-16.3-16.3-37.9-25.3-61-25.3-23 0-44.7 9-61 25.3L516.6 273.3c-33.6 33.6-33.6 88.3 0 121.9l116.6 116.5c16.3 16.3 37.9 25.3 61 25.3 23 0 44.7-9 61-25.3l116.6-116.6c33.4-33.4 33.4-88.1-0.2-121.8zM694.1 436.8L591.6 334.3l102.5-102.5 102.5 102.5-102.5 102.5zM776.5 557.6H611.7c-47.5 0-86.2 38.7-86.2 86.2v164.8c0 47.5 38.7 86.2 86.2 86.2h164.8c47.5 0 86.2-38.7 86.2-86.2V643.8c0-47.5-38.7-86.2-86.2-86.2z m-9.9 241.1h-145v-145h145v145z" p-id="7053"></path></svg>
            </dd>
            </dl>
           
        `
    })
    navBar.innerHTML = html
    navBar.onclick = function (e) {
        let {
            target
        } = e
        while (target !== navBar) {
            if (target.nodeName === "DL") {
                location = `https://${dataArray[target.dataset.index]}`
                break
            }

            target = target.parentNode
        }
    }
    const navMores = document.getElementsByClassName("main-nav-more")
    Array.from(navMores).forEach((item, index) => {
        item.onclick = (e) => {
            moduleNode.style.display = "block"
            selectedIndex = index
            urlInput.value = dataArray[index]
            e.stopPropagation()
        }
    })
}
render()

const deleteButton = document.getElementsByClassName("button_delete")[0]
const addButton = document.getElementsByClassName('main-add')[0]
moduleNode.onclick = (e) => {
    const {
        target
    } = e
    const {
        classList
    } = target
    if (target.nodeName !== "BUTTON") {
        return
    }
    if (classList.contains("button_delete")) {
        dataArray.splice(selectedIndex, 1)
        render()
    } else if (classList.contains("button_cancel")) {} else if (classList.contains("button_done")) {
        const {
            value
        } = urlInput
        if (!testUrl(value)) {
            return
        }
        if (selectedIndex === -1) {
            dataArray.push(simplifyUrl(value))
        } else {
            dataArray[selectedIndex] = simplifyUrl(value)
        }
        render()
    }
    initModule(e)
}

addButton.onclick = () => {
    deleteButton.style.display = "none"
    selectedIndex = -1
    moduleNode.style.display = "block"
}

function initModule(e) {
    e.currentTarget.style.display = "none"
    urlInput.value = ""
    deleteButton.style.display = "inline-block"
}

function testUrl(url) {
    if (/(https?:)?(\/\/)?(www.)?([^\/]+)(\/.*)?/.test(url)) {
        return true
    }
}

function simplifyUrl(url) {
    return /(https?:)?(\/\/)?(www.)?([^\/]+)(\/.*)?/.exec(url)[4]
}