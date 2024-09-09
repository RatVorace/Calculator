class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.clearAll();
    }

    clearAll() {
        this.previousResult = '';
        this.currentResult = '';
        this.operation = undefined;
    }

    clearOne() {
        if (isNaN(this.currentResult.toString().substring(this.currentResult.length - 1))) {
            this.operation = undefined;
        }
        this.currentResult = this.currentResult.toString().slice(0, -1);
    }

    addNumber(number) {
        if (!(number == '.' && this.currentResult.toString().substring(this.currentResult.length - 1) == '.')) {
            this.currentResult += number;
        }
    }

    chooseOperation(operation) {
        if (this.previousResult != '' && this.currentResult == '') {
            this.currentResult += operation;
            this.operation = operation;
        } else if (this.currentResult != '') {
            this.previousResult = this.currentResult;
            this.operation = operation
            this.currentResult = operation;
        }
    }

    compute() {
        if (isNaN(this.previousResult.toString().substring(this.previousResult.length - 1))) {
            this.previousResult = this.previousResult.slice(0, -1);
        } else if (isNaN(this.currentResult.toString().substring(0))) {
            this.currentResult = this.currentResult.toString().slice(1);
        }
        const numPrevious = Number(this.previousResult);
        const numCurrent = Number(this.currentResult);
        switch (this.operation) {
            case '+':
                this.currentResult = numPrevious + numCurrent;
                break
            case '-':
                this.currentResult = numPrevious - numCurrent;
                break
            case '*':
                this.currentResult = numPrevious * numCurrent;
                break
            case '/':
                this.currentResult = numPrevious / numCurrent;
                break
            case undefined:
                this.currentResult = numCurrent;
                break
        }
        this.previousResult = '';
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    
      update() {
        this.current.innerText =
          this.getDisplayNumber(this.currentResult)
        if (this.operation != null) {
          this.previous.innerText =
            `${this.getDisplayNumber(this.previousResult)} ${this.operation}`
        } else {
          this.previous.innerText = ''
        }
      }
}

const number = document.querySelectorAll('[number]');
const operation = document.querySelectorAll('[operation]');
const allClear = document.querySelector('[all-clear]');
const clear = document.querySelector('[delete]');
const previous = document.querySelector('[previous]');
const current = document.querySelector('[current]');
const equal = document.querySelector('[equal]');
const calculator = new Calculator(previous, current);

number.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.update();
    });
});

operation.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.update();
    })
})

allClear.addEventListener('click', () => {
    calculator.clearAll();
    calculator.update();
})

clear.addEventListener('click', () => {
    calculator.clearOne();
    calculator.update();
})

equal.addEventListener('click', () => {
    calculator.compute();
    calculator.update();
})