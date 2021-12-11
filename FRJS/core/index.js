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
            
            try {
                const compHtmlLoaded = await import(`../../${FRJSConfig.paths.templates}/${path}.html`);
                const compHtmlString = compHtmlLoaded.default;

                // Checking if the component loaded have another components inside
                const checkInsideComponents = await loadComponents(
                    convertComponent('div', $(component), compHtmlString).prop('outerHTML')
                );

                component.outerHTML = checkInsideComponents[0].outerHTML;
            } catch(err){
                console.error(`An error occured on the component loading in the path "${path}"!`);
            }
        }
    }
    return $html;
}

export function convertComponent(newTagName, node, newHtmlString){
    if(!node.length) throw new Error(`The parameter node is empty!`);
    let $newNode = $(`<${newTagName}></${newTagName}>`);
    
    for(let i = 0; i < node.prop('attributes').length; i++){
        $newNode.attr(node[0].attributes[i].name, node[0].attributes[i].value);
    }
    $newNode.html(newHtmlString);

    let children = $($newNode).find('children');
    for(let i = 0; i < children.length; i++){
        children[i].outerHTML = node[0].innerHTML;
    }

    return $newNode;
}
