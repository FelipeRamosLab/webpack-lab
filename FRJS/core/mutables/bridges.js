export default {
    result: (input, core)=>{
        return core.get('numOne') * core.get('numTwo');
    },
    numThree: (input, core)=>{
        return (core.get('numOne') * core.get('numTwo'));
    },
    numFour: (input, core)=>{
        return (core.get('numThree') * core.get('numTwo'));
    },
    change: (input, core)=>{
        core.update('contentWrap', $(`<span mutable="numTwo" mutable-type="number">teste</span>`));
    }
}
