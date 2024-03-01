const inputCard = document.getElementById("inputCard")
const buttonSubmit = document.getElementById("button")

const luhnAlgorithm = (cardNumber) => {
    const digits = cardNumber.toString().replaceAll(/\s/g,'').split('').map(Number)

    for(let i = 0; i < digits.length; i += 2){
        let digit = digits[i] * 2
        if(digit > 9) digit -= 9
        digits[i] = digit
    }

    let sum = 0
    digits.forEach(element => {
        sum += element
    });

    return sum % 10 == 0 ? true : false
}

buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault()

    alert(luhnAlgorithm(inputCard.value))
})
