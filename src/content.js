function wegMetDieNaam() {
  var elements = document.getElementsByTagName("*");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];
      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var regEx = new RegExp("lil[ \t\r\n\v\f'’`]{1,4}kleine", "igm");
        var replacedText = text.replace(regEx, "Pauperkabouter");
        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}

const targetNode = document.body;
const config = { childList: true, subtree: true };
let c = 0;
const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (c++ > 100) {
        observer.disconnect();
      }
    if (mutation.type === "childList") {
      wegMetDieNaam();
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
wegMetDieNaam();
