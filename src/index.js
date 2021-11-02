import $ from 'jquery';

// Styles
import './styles/global.scss';

import Home from './pages/home.html';

// Declare JQuery as global
window.$ = $;

function Main(){
    const $FRJS = $('<div id="__FRJS"></div>');
    const HomePage = $(Home);

    $FRJS.empty();
    $FRJS.append(HomePage);

    return $FRJS;
}

$('body').append(Main());
