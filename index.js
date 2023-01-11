function generateOwl(doc) {
    let owl = '';

    function metamorphose(element) {
        let tag = element.tagName.toLowerCase();
        let attributes = element.getAttributeNames();

        owl += `(:${tag} `;

        for (const attribute of attributes) {
            owl += `${attribute}: "${element.getAttribute(attribute)}" `;
        }

        // If the node has text content and no children, add the text content to the owl string
        // The No Children check prevents text being added to ancestors
        if (element.textContent && !element.children.length) {
            owl += ' "' + element.textContent + '" ';
        }
        
        //Recursive loop for every child element of current element
        for (const child of element.children) {
            metamorphose(child)
        }

        owl += ') \r'    
        }

    // Where the metamorphosis starts    
    for (const child of doc.children) {
        metamorphose(child)
        
    }
    return owl
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
