import $ from 'jquery';
import FRJSAppCore from './FRJS';
import MutableJS from './mutable-js';
import bridges from './FRJS/core/mutableJS/bridges';

// Styles
import './src/styles/global.scss';

// Initialize JQuery as global variable in the browser
window.$ = $;

window.FRJSApp = new FRJSAppCore({
    pages: [{ 
        name: 'home', 
        title: 'FRJS Lab', 
        description: 'This is the first tests in my new framework!',
        template: 'home'
    }]
});

(async()=>{
    await window.FRJSApp.RenderPage('home');
    new MutableJS({ 
        name: 'mutableJS', 
        bridges,
        store: [
            {
                name: 'result',
                type: 'number',
                value: 50
            }
        ]
    });
})();
