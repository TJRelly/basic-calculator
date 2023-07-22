class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ""
    this.previousOperandTextElement.innerText = ""
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return
    this.currentOperand += number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return
    if (this.previousOperand !== "") {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ""
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    console.log(prev)
    const current = parseFloat(this.currentOperand)
    console.log(current)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "×":
        computation = prev * current
        break
      case "÷":
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ""
    this.previousOperandTextElement.innerText =""
    console.log(this)
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    )

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } 
  }
}

// Buttons
const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const clearButton = document.querySelector("[data-clear]")
// Text Elements
const previousOperandTextElement = document.querySelector("[data-prev-operand]")
const currentOperandTextElement = document.querySelector("[data-curr-operand]")

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
)

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener("click", () => {
  calculator.compute()
  calculator.updateDisplay()
})

clearButton.addEventListener("click", () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener("click", () => {
  calculator.delete()
  calculator.updateDisplay()
})
