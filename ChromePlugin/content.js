const HIGHLIGHT_CLASSNAME = 'dashboardify-highlight';

function handleElementClick(e) {
  e.stopPropagation();	//
  e.preventDefault();	//

  removeHighlight(this);

  console.log(getPathTo(this));

  var item = {};

  item.website = window.location.href;
  item.xpath = getPathTo(this);
  item.name = prompt('Please enter item name:');
  item.checkInterval = parseInt(prompt('Please enter interval in miliseconds:'));

  console.log(item);

}

function removeHighlight(el) {
  el.classList.remove(HIGHLIGHT_CLASSNAME);
  el.removeEventListener('click', handleElementClick);
  document.body.onmouseover = undefined;
}



function highlightDOMElements() {
  var prev;

  document.body.onmouseover = handler;

  function handler(event) {
    if (event.target === document.body || (prev && prev === event.target)) {
      return;
    }

    if (prev) {
      prev.removeEventListener('click', handleElementClick);

      prev.classList.toggle(HIGHLIGHT_CLASSNAME);
      prev = undefined;
    }

    if (event.target) {
      prev = event.target;
      prev.classList.toggle(HIGHLIGHT_CLASSNAME);
      prev.addEventListener('click', handleElementClick);
    }
  }
}

//Returns XPath to element
function getPathTo(element) {
    if (element.tagName == 'HTML')
        return '/HTML[1]';
    if (element===document.body)
        return '/HTML[1]/BODY[1]';

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        if (sibling===element)
            return (getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']').toLowerCase();
        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
            ix++;
    }
}
