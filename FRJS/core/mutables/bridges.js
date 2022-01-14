export default {
    counterEX1: (input, core)=>{
        return input
    },
    increaseEX1: (input, core)=>{
        var current = core.get('counterEX1');
        core.update('counterEX1', current+1);
    },
    decreaseEX1: (input, core)=>{
        var current = core.get('counterEX1');
        core.update('counterEX1', current-1);
    },
    calculateEX2: (input, core)=>{
        let result = 0;

        switch(core.get('operationEX2')){
            case '+':{
                result = core.get('firstNumberEX2') + core.get('secondNumberEX2');
                break;
            }
            case '-': {
                result = core.get('firstNumberEX2') - core.get('secondNumberEX2');
                break;
            }
            case '*':{
                result = core.get('firstNumberEX2') * core.get('secondNumberEX2');
                break;
            }
            case '/':{
                result = core.get('firstNumberEX2') / core.get('secondNumberEX2');
                break;
            }
        }
        // core.update('resultEX2', result);
        return result
    },
}
