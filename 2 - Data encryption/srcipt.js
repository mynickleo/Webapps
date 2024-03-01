const numberP = document.getElementById("numberP")
const moduleG = document.getElementById("moduleG")

const containerFirst = document.getElementById("first")
const privateKeyFirst = document.getElementById("privateFirst")
const publicKeyFirst = document.getElementById("publicFirst")
const messageFirst = document.getElementById("messageFirst")
const keyButtonFirst = document.getElementById("keyBtnFirst")
const sendMessageFirst = document.getElementById("buttonFirst")

const containerSecond = document.getElementById("second")
const privateKeySecond = document.getElementById("privateSecond")
const publicKeySecond = document.getElementById("publicSecond")
const messageSecond = document.getElementById("messageSecond")
const keyButtonSecond = document.getElementById("keyBtnSecond")
const sendMessageSecond = document.getElementById("buttonSecond")

const calculateKey = (privateKeyInput) => {
    return Math.round(Math.pow(moduleG.value, privateKeyInput.value) % numberP.value)
}

keyButtonFirst.addEventListener("click", () => {
    publicKeyFirst.value = calculateKey(privateKeyFirst)
})
keyButtonSecond.addEventListener("click", () => {
    publicKeySecond.value = calculateKey(privateKeySecond)
})

const createSessionKey = (publickKey, privateKey) => {
    return Math.round(Math.pow(publickKey, privateKey) % numberP.value)
}

const caesarCipher = (message, shift) => {
    // Преобразование строки в массив символов
    const chars = message.split('');

    // Шифрование каждого символа
    const encryptedChars = chars.map(char => {
        // Получение кода символа
        const code = char.charCodeAt(0);

        // Проверка, является ли символ буквой (латинской)
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            // Определение верхнего или нижнего регистра
            const isUpperCase = (code >= 65 && code <= 90);

            // Применение сдвига с учетом регистра
            let shiftedCode = code + shift;
            if ((isUpperCase && shiftedCode > 90) || (!isUpperCase && shiftedCode > 122)) {
                shiftedCode -= 26; // Переход к началу алфавита, если выход за его пределы
            } else if ((isUpperCase && shiftedCode < 65) || (!isUpperCase && shiftedCode < 97)) {
                shiftedCode += 26; // Переход к концу алфавита, если выход за его пределы
            }

            // Преобразование кода символа обратно в символ
            return String.fromCharCode(shiftedCode);
        } else {
            // Если символ не буква, оставляем его без изменений
            return char;
        }
    });

    // Объединение зашифрованных символов обратно в строку
    const encryptedMessage = encryptedChars.join('');
    return encryptedMessage;
}

const caesarDecipher = (encryptedMessage, shift) => {
    // Применяем обратный сдвиг к каждому символу
    return caesarCipher(encryptedMessage, -shift);
}

const createMessage = (userId) => {
    if(publicKeyFirst.value == "" || publicKeySecond == "") return
    const sessionKeyFirst = createSessionKey(publicKeySecond.value, privateKeyFirst.value)
    const sessionKeySecond = createSessionKey(publicKeyFirst.value, privateKeySecond.value)
    if(sessionKeyFirst != sessionKeySecond) return

    alert("Сессионный ключ: " + sessionKeyFirst)
    if(userId == 1){
        if(messageFirst.value == "") return
        const message = document.createElement("div")
        message.classList.add("message")

        const messageCipher = caesarCipher(messageFirst.value, sessionKeyFirst)
        message.innerHTML = "<span>Новое сообщение</span>" + "<p>" + messageCipher + "</p>"
        containerFirst.appendChild(message)

        const message_N = document.createElement("div")
        message_N.classList.add("message")
        const messageDecipher = caesarDecipher(messageCipher, sessionKeySecond)
        message_N.innerHTML = "<span>Новое сообщение</span>" + "<p>" + messageDecipher + "</p>"
        containerSecond.appendChild(message_N)
    }
    if(userId == 2){
        if(messageSecond.value == "") return
        const message = document.createElement("div")
        message.classList.add("message")

        const messageCipher = caesarCipher(messageSecond.value, sessionKeySecond)
        message.innerHTML = "<span>Новое сообщение</span>" + "<p>" + messageCipher + "</p>"
        containerSecond.appendChild(message)

        const message_ = document.createElement("div")
        message_.classList.add("message")
        const messageDecipher = caesarDecipher(messageCipher, sessionKeyFirst)
        message_.innerHTML = "<span>Новое сообщение</span>" + "<p>" + messageDecipher + "</p>"
        containerFirst.appendChild(message_)
    }
}

sendMessageFirst.addEventListener("click", () => {createMessage(1)})
sendMessageSecond.addEventListener("click", () => {createMessage(2)})