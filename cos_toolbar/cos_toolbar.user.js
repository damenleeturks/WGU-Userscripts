// ==UserScript==
// @name           COS Toolbar
// @description    Adds the floating toolbar to WGU's courses of study
// @author         Kurt Madsen
// @include        http://cos.wgu.edu/student/course/*
// @include        http://wsd1.wgu.edu/student/course/*
// @include        http://wsdi1.wgu.edu/student/course/*
// @include        http://cos.wgu.edu/cos.html?courseId=*
// @include        http://cosauth.wgu.edu/student/course/*
// @version        0.8.6
// ==/UserScript==

function mentoctopus() {
    var course_id = document.URL.match(/[0-9]{5}/);

    //----------
    //Add the WGU favicon to the page
    newStyle = '<link rel="shortcut icon" href="https://github.com/damenleeturks/WGU-Userscripts/raw/master/images/logo_favicon.ico" type="image/x-icon" />';

    //Add the HTML stylesheet for this version 
    newStyle += '<link rel="stylesheet" href="https://github.com/damenleeturks/WGU-Userscripts/raw/master/html_styling/cos_html.css">';
    $("head").append(newStyle);

    //----------
    var cos_main 	= "http://cos.wgu.edu/";
    var cos_pdf 	= "http://cospdf.wgu.edu/cos/cospdf.php?id="	 + course_id;
    var cos_pdf2 	= "http://cosauth.wgu.edu/student/course/"	 + course_id 	+ ".pdf";
    var cos_html 	= "http://cospdf.wgu.edu/cos/cospdf.php?id="	 + course_id 	+ "&forcehtml";
    var cos_student 	= "http://cos.wgu.edu/student/course/"		 + course_id;
    var cos_student2 	= "http://cos.wgu.edu/cos.html?courseId="	 + course_id;
    var cosauth_student	= "http://cosauth.wgu.edu/student/course/"	 + course_id;
    var cosauth_edit 	= "http://cosauth.wgu.edu/courses/show/"	 + course_id;
    var cos_history 	= "https://sites.google.com/a/wgu.edu/coshistory/allcourses/"	 + course_id;
    var cos_quickRef 	= "https://sites.google.com/a/wgu.edu/coshistory/allcourses/"	 + course_id 	+ "/quick-reference";

    list_main		= '<a href="'	+ cos_main	+ '" id=cos_main class="left i2Style" target="_blank"><span class="icon home"/>COS Home</a>';
    list_html		= '<a href="'	+ cos_html	+ '" id=cos_html class="i2Style" target="_blank"><span class="icon window"></span>HTML</a>';
    list_pdf2		= '<a href="'	+ cos_pdf2	+ '" id=cos_pdf2 class="i2Style" target="_blank"><span class="icon document" alt="Alternate PDF"></span>PDF</a>';
    list_student2	= '<a href="'	+ cos_student2	+ '" id=cos_student class="i2Style" target="_blank"><span class="icon article"></span>Student</a>';
    list_edit		= '<a href="'	+ cosauth_edit	+ '" id=cosauth_edit class="i2Style" target="_blank"><span class="icon pen"></span>Edit (cosauth)</a>';
    list_history	= '<a href="'	+ cos_history	+ '" id=cos_history class="i2Style" target="_blank"><span class="icon article"></span>Course History</a>';
    list_quickRef	= '<a href="'	+ cos_quickRef	+ '" id=cos_quickRef class="i2Style" target="_blank"><span class="icon"></span>Quick Ref</a>';
    list_source		= '<a href="https://github.com/damenleeturks/WGU-Userscripts" id=github class="i2Style" target="_blank"><span class="icon cog"></span></a>';

    list = '<div id="cos_links_wrapper">';
    list += list_main;
    list += list_history;
    list += list_quickRef;
    // list += list_student2;
    list += list_html;
    list += list_pdf2;
    // list += list_edit;
    // list += list_source;
    list += '</div>';

    $("body").append(list);

    //----------

    //Highlight the version number
    function formattt() {
        var feeter = $("table#mainContainerH+div"); //Adjust for regular COS pages
        
        //Add the id "footer" to the footer
        feeter.attr({
            id: 'footer'
        });        var feet = $("div#footer");

        var new_text = feet.html().replace(/(Course Version: \d+)/, '<span id="course_ver">$1</span>');
        feet.html(new_text);
    }

    function loaded() {
        if ($("table#mainContainerH+div") !== null) {
            formattt();
        }
        else {
            window.setTimeout(loaded(), 100);
        }
    }
    window.onload = loaded();
}
mentoctopus();