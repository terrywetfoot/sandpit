
//Regex method
function convertToOwl(input) {
    return input
        //Carriage return and tab after each closing tag with > converted to )
        .replaceAll(/<\/(.*?)>/g, ")")
        //Wraps the contents of p/h tags in quotes
        .replaceAll(/<p>(.*?)\)/g, '(:p "$1")') // p
        .replaceAll(/<h(.*?)>(.*?)\)/g, '(:h$1 "$2")') // h
        //</br> converted to (:br)
        .replaceAll(/<br\/>/g, "(:br)")
        //Converts <html> tag to owl (:html)
        .replaceAll(/</g, "(:")
        .replaceAll(/>/g, "\t")
        .replaceAll(/=/g, ": ")
}

//DOMParser method
function generateOwl(doc) {
    let owl = "";
    //Iterate through each node and append each to the owl string
    doc.forEach(node => {
            let tag = node.tagName.toLowerCase();
            let attributes = node.getAttributeNames();

            owl += `(:${tag}` 

            attributes.forEach(attribute => {
                owl += ` ${attribute}: "${node.getAttribute(attribute)}"`
        })

        //if the node has text content and no children, add the text content to the owl string
        //prevents text being added to <html> <head> etc
        if (node.textContent && !node.children.length) {
                owl += ' "' + node.textContent + '"';
        }
        owl += ")\r\t"
    })

    return owl;
}


//-----------------

//Convert button
$("#convert-button").on("click", function() { 
    let input = $("#user-input").val().trim();
    let parser = new DOMParser();
    let doc = parser.parseFromString(input, "text/html").querySelectorAll("*");

    let owlA = convertToOwl(input);
    let owlB = generateOwl(doc);

    $("#result-text").empty();
    $("#result-text").append("Regex Method:\r" + '<xmp>' + owlA + '</xmp>');
    $("#result-text").append("DOMParser Method:\r" + '<xmp>' + owlB + '</xmp>');

});
