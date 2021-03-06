// ==UserScript==
// @name           COS_HTML
// @description    Reformats and regroups the different elements in the HTML version of the COS
// @author         Kurt Madsen
// @include        http://cospdf.wgu.edu/*
// @version        0.3
// ==/UserScript==

function ReForm() {
    
    //Add the WGU favicon to the page
    newStyle = '<link rel="shortcut icon" href="https://web5.wgu.edu/aap/content/logo_favicon.ico" type="image/x-icon" />';

    //Add the HTML stylesheet for this version 
    newStyle += '<link rel="stylesheet" href="https://gist.github.com/raw/0b687dccf2031a6cf03a/8fee6e702e947e528e8d311adba461496dbe4f1a/cos_html.css">';

    $("head").append(newStyle);

//----------
//Set up the page to group titles with descriptions for activities, topics, and subjects
//Adapted from: http://stackoverflow.com/questions/6099536/use-javascript-bookmarklet-to-chunk-page-content-by-headings/6103700#6103700

//[Still need to figure out how to group activities within topics, then topics within subjects]

    var parent = document.body,
        i;
    // copy into temp array, since otherwise you'll be walking
    // an array (childnodes) whose size is changing as elements 
    // get removed from it
    var tmpArray = [];
    for (i = 0; i < parent.childNodes.length; i++)
    tmpArray.push(parent.childNodes[i]);

    var tagToClassMap = {
        H1: "one",
        H2: "two",
        H4: "four"
    };
    var newArray = [],
        currElem = null;
    for (i = 0; i < tmpArray.length; i++) {
        var elem = tmpArray[i];
        var className = null;
        if (elem.tagName && (className = tagToClassMap[elem.tagName]) != null) {
            currElem = document.createElement("div");
            currElem.className = className;
            newArray.push(currElem);
            currElem.appendChild(elem);
        }
        else {
            if (currElem) currElem.appendChild(elem);
            else newArray.push(elem);
        }
    }

    parent.innerHTML = '';
    for (i = 0; i < newArray.length; i++) {
        parent.appendChild(newArray[i]);
    }

    // add this print button to the page. 
    //<div class=printit> 
    //<SCRIPT LANGUAGE="JavaScript"> if (window.print) {document.write('<form><input type=button name=print value=" Print this page " onClick="window.print()"></form>');}
    //</script> 
    //</div> 
}
ReForm();