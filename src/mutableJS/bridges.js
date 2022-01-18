export default {
    counterEX1: (input, core)=>{
        return input
    },
    increaseEX1: (_, core)=>{
        var current = core.get('counterEX1');
        core.update('counterEX1', current+1);
    },
    decreaseEX1: (_, core)=>{
        var current = core.get('counterEX1');
        core.update('counterEX1', current-1);
    },
    calculateEX2: (_, core)=>{
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
        return result
    },
    resultEX2: (_, internal)=>{
        return `The operator used is "${internal.get('operationEX2')}" and the result is ${internal.runBridge('calculateEX2')}.`;
    }
}
