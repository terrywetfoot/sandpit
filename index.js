
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
    let text = element.textContent.trim();
    owl += " '" + text + "'" ;
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
  //function to check if the element is an empty div
  function isEmptyDiv(element) {
    return element.tagName === 'DIV' && element.childNodes.length === 0;
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

      //if empty div, generate the empty quote
      if (isEmptyDiv(element)) {
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







test = `<!DOCTYPE html>
                  <html>
                    <head>
                      <title>Page Title</title>
                    </head>
                    <body>
                      <div id="thedivmaster">
                        <div class="empty"></div>
                        <div></div>
                        <div id="thedivchef">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div>
                            <div>
                              <div>
                                <div>
                                  <div>
                                    <div>
                                      <div>
                                        <div>
                                          <div>  <input type="hidden" value="3" /> <p>some words that should be quite far forward? </p></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h1>This is a Heading</h1>
                      <p id="paragidentifier">This </br> is a paragraph.</p>
                      <p>This is another paragraph.</p>
                      <p>This is a paragraph with <a href="https://www.w3schools.com">a link</a>.</p>
                    </body>
                  </html>`



// Convert button
$("#convert-button").on("click", function() { 
    // const input = $("#user-input").val().trim();
    const input = test;
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/html");
  
    let owl = generateOwl(doc);

    $("#result-text").empty();
    $("#result-text").append("DOMParser Method:\r" + '<xmp>' + owl + '</xmp>');
});
