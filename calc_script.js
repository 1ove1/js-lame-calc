let input = document.getElementById("input_block");
let output = document.getElementById("output_block");
let actualCountSymbols = 0;
let regExpr = /^(\d+[+\-*\/])+\d+$/

console.log('start///');

function pressButton(char){
    if (char === '⇷'){
        input.value = input.value.substr(0, input.value.length - 1);
        --actualCountSymbols;
    } else if (actualCountSymbols !== 15){
        input.value += char;
        ++actualCountSymbols;
    }
}

function calculate() {
    if (!regExpr.test(input.value)){
        output.value = 'ERROR';
        return;
    }

    let text = input.value.split("");
    let mode = '';
    let dfltValue = 0;
    let expr = [0];
    let foo = (operator, num) =>{
        const last = expr.length - 1;
        switch (operator){
            case '-':
                expr[last] = expr[last] * 10 - num; break;
            case '*':
                expr[last] = (expr[last] === dfltValue) ? dfltValue * num:
                    expr[last] * 10 + dfltValue * num;
                break;
            case '/':
                expr[last] = (expr[last] === dfltValue) ? dfltValue / num:
                    dfltValue / ((dfltValue / expr[last]) * 10 + num);
                break;
            default: expr[last] = expr[last] * 10 + num; break;
        }
    }

    console.log(text);
    text.forEach((char) => {
            switch (char) {
                case '+':
                case '-':
                    mode = char;
                    expr.push(0);
                    break;
                case '*':
                case '/':
                    mode = char;
                    dfltValue = expr[expr.length - 1];
                    break;
                default:
                    foo(mode, parseInt(char));
                    break;
            }
        }
    );
    console.log(expr);

    output.value = '=' + expr.reduce((a, b) => a + b);
}