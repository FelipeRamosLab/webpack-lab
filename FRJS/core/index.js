// Configurations
import FRJSConfig from '../../FRJS-config.json';

export async function loadComponents(htmlString = ''){
    const $html = $(htmlString);
    const $components = $html.find('component');

    if($components.length){
        for(let  i = 0; i < $components.length; i++){
            if (!$components[i].getAttribute('template')) throw new Error(`The template wasn't provided!`);
    
            const component = $components[i];
            const path = component.getAttribute('template');
    
            const compHtmlLoaded = await import(`../../${FRJSConfig.paths.templates}/${path}.html`);
            const compHtmlString = compHtmlLoaded.default;
            const checkInsideComponents = await loadComponents(
                renderingSpecialTag('div', $components, compHtmlString).prop('outerHTML')
            );

            component.outerHTML = checkInsideComponents[0].outerHTML;
        }
    }
    return $html;
}

export function renderingSpecialTag(newTagName, $node, newHtmlString){
    if(!$node.length) throw new Error(`The parameter $Node is empty`);
    let $newNode = $(`<${newTagName}></${newTagName}>`);
    
    for(let i = 0; i < $node.prop('attributes').length; i++){
        $newNode.attr($node[0].attributes[i].name, $node[0].attributes[i].value);
    }

    $newNode.html(newHtmlString);
    return $newNode;
}
