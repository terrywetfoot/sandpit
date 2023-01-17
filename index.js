
//function to generate the owl string
function generateOwl(doc) {
  let owl = '';

  //HELPER 1
  //function to generate tag name and attributes
  function generateTagAttr(element) {
    console.log(element)
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
    let text = element.textContent.trim();
    owl += " '" + text + "' " ;
  }
  //HELPER 3
  //function to generate the closing tag
  function generateClosingTag() {
      owl += `) \r `;
  }
  ////////////////////////////////////////////////////////////////

  //The main function 
  function metamorphose(element) {

    if (element instanceof Element){
      generateTagAttr(element);

      //inner loop for child nodes
      for (const child of element.childNodes) {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== "") {
          generateText(child);
        }
        metamorphose(child)
      }

      generateClosingTag(element);
    }

  }//end of metamorphose function

  //WHERE THE THING ACTUALLY STARTS ////////////////////////
  for (const child of doc.childNodes) {
    metamorphose(child)
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
