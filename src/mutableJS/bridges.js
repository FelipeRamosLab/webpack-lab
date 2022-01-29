export default {
    counterEX1: (input, core)=>{
        return input
    },
    increaseEX1: (_, core)=>{
        var current = core.get('counterEX1').value;
        core.update('counterEX1', current+1);
    },
    decreaseEX1: (_, core)=>{
        var current = core.get('counterEX1').value;
        core.update('counterEX1', current-1);
    },
    calculateEX2: (_, core)=>{
        let result = 0;

        switch(core.get('operationEX2').value){
            case '+':{
                result = core.get('firstNumberEX2').value + core.get('secondNumberEX2').value;
                break;
            }
            case '-': {
                result = core.get('firstNumberEX2').value - core.get('secondNumberEX2').value;
                break;
            }
            case '*':{
                result = core.get('firstNumberEX2').value * core.get('secondNumberEX2').value;
                break;
            }
            case '/':{
                result = core.get('firstNumberEX2').value / core.get('secondNumberEX2').value;
                break;
            }
        }
        return result
    },
    resultEX2: (_, internal)=>{
        const operator = internal.get('operationEX2').value;

        if(operator === '+') return `<b style="color: #D7dda7;">The sum is:</b> ${internal.runBridge('calculateEX2')}.`;
        if(operator === '-') return `<b style="color: #D7dda7;">The subtraction is:</b> ${internal.runBridge('calculateEX2')}.`;
        if(operator === '*') return `<b style="color: #D7dda7;">The multiplication is:</b> ${internal.runBridge('calculateEX2')}.`;
        if(operator === '/') return `<b style="color: #D7dda7;">The division is:</b> ${internal.runBridge('calculateEX2')}.`;
    }
}
