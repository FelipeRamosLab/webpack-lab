import $ from 'jquery';
import {Render} from './FRJS';

// Styles
import './styles/global.scss';

import Home from './pages/home.html';

// Declare JQuery as global
window.$ = $;


async function Main(){
    const $FRJS = $('<div id="__FRJS"></div>');
    const HomePage = await Render({stringHTML: Home});

    $FRJS.empty();
    $FRJS.html(HomePage);
    $('body').append($FRJS);
}

Main();