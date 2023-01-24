
//function to generate the owl string
function generateOwl(doc) {
  let owl = '';
  //HELPER 1
  //function to generate tag name and attributes
  function generateTagAttr(element) {
    let tag = element.tagName.toLowerCase();
    let attributes = element.getAttributeNames();
    owl += `(:${tag} `;
    for (const attribute of attributes) {
        owl += `${attribute}: "${element.getAttribute(attribute)}" `;
    }
  }
  //HELPER 2
  //function to generate text content of the element
  function generateText(element) {
    let text = element.textContent;
    owl += "'" + text + "'" ;
  }
  //HELPER 3
  //function to generate the closing tag
  function generateClosingTag() {
      owl += `)`;
  }
  //HELPER 4
  //function to generate the tab forward 
  function generateTabForward(indentLevel) {
    for (let i = 0; i < indentLevel; i++) {
    owl += `  `;
    }
  }
  //HELPER 5
  //function to generate the return
  function generateReturn() {
    owl += `\r`;
  }
  //HELPER 6
  //function to check if the element is an empty non Void element
  function isEmptyNotVoid(element) {
    const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    return element.childNodes.length === 0 && !voidElements.includes(element.tagName.toLowerCase());
  }
  //HELPER 7
  //function to check if the element is a text node
  function isTextNode(element) {
    return element.nodeType === Node.TEXT_NODE && element.textContent.trim() !== '';
  }
  //The main function 
  function metamorphose(element, indentLevel) {

    if (element instanceof Element){
      generateReturn();
      generateTabForward(indentLevel);
      generateTagAttr(element)

      //if empty non void element, generate the empty quote
      if (isEmptyNotVoid(element)) {
        generateText(element);
      }
      //inner loop for child nodes
      for (const child of element.childNodes) {
        //Children indent one level deeper   
        indentLevel += 1;
        if (isTextNode(child)) {
          generateText(child);
        } 
        metamorphose(child, indentLevel);
        //Bring back the indent level so we don't end up with a right angle triangle thing
        //and instead have some sort of toblerone that's been nibbled on a bit
        indentLevel -= 1;
      }
    generateClosingTag(element);   
  }
  }//end of metamorphose function
  //WHERE THE THING ACTUALLY STARTS ////////////////////////
  indentLevel = 0;
  for (const child of doc.childNodes) {
    metamorphose(child, indentLevel)
  }
return owl ;
}



// Convert button
$("#convert-button").on("click", function() { 
    const input = $("#user-input").val().trim();
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/html");
  
    let owl = generateOwl(doc);

    $("#result-text").empty();
    $("#result-text").append("DOMParser Method:\r" + '<xmp>' + owl + '</xmp>');
});
