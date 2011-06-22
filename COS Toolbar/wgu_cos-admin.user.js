// ==UserScript==
// @name           WGU_COS
// @description    Adds functionality to WGU's cos.wgu.edu
// @author         Kurt Madsen
// @include        http://cos.wgu.edu/student/course/*
// @include      http://wsd1.wgu.edu/student/course/*
// @include      http://wsdi1.wgu.edu/student/course/*
// @include        http://cos.wgu.edu/cos.html?courseId=*
// @include        http://cosauth.wgu.edu/student/course/*
// @version        0.8.5
// ==/UserScript==

function mentoctopus() {
    var course_id = document.URL.match(/[0-9]{5}/);

    //----------
    newStyle = '<link rel="shortcut icon" href="https://web5.wgu.edu/aap/content/logo_favicon.ico" type="image/x-icon" />';
    newStyle += '<link rel="stylesheet" href="https://web5.wgu.edu/aap/content/cos_userscript.css">';
    $("head").append(newStyle);

    //----------
    var cos_main = "http://cos.wgu.edu/";
    var cos_pdf = "http://cospdf.wgu.edu/cos/cospdf.php?id=" + course_id;
    var cos_pdf2 = "http://cosauth.wgu.edu/student/course/" + course_id + ".pdf";
    var cos_html = "http://cospdf.wgu.edu/cos/cospdf.php?id=" + course_id + "&forcehtml";
    var cos_student = "http://cos.wgu.edu/student/course/" + course_id;
    var cos_student2 = "http://cos.wgu.edu/cos.html?courseId=" + course_id;
    var cosauth_student = "http://cosauth.wgu.edu/student/course/" + course_id;
    var cosauth_admin = "http://cosauth.wgu.edu/courses/show/" + course_id;
    var cos_updates = "https://sites.google.com/a/wgu.edu/coshistory/allcourses/" + course_id;
    var cos_quickRef = "https://sites.google.com/a/wgu.edu/coshistory/allcourses/" + course_id + "/quick-reference";

    list_main = '<a href="' + cos_main + '" id=cos_main class="left i2Style" target="_blank"><span class="icon home"></span>COS Home</a>';
    list_html = '<a href="' + cos_html + '" id=cos_html class="i2Style" target="_blank"><span class="icon window"></span>HTML</a>';
    list_pdf2 = '<a href="' + cos_pdf2 + '" id=cos_pdf2 class="i2Style" target="_blank"><span class="icon document"></span>PDF</a>';
    list_student2 = '<a href="' + cos_student2 + '" id=cos_student class="i2Style" target="_blank"><span class="icon article"></span>Student</a>';
    list_admin = '<a href="' + cosauth_admin + '" id=cosauth_admin class="i2Style" target="_blank"><span class="icon pen"></span>Edit (cosauth)</a>';
    list_updates = '<a href="' + cos_updates + '" id=cos_updates class="i2Style" target="_blank"><span class="icon"></span>Course History</a>';
    list_quickRef = '<a href="' + cos_quickRef + '" id=cos_quickRef class="i2Style" target="_blank"><span class="icon"></span>Quick Ref</a>';
    list_source = '<a href="http://cl.ly/1a023g1N1Y39050h2Z47" id=github class="i2Style" target="_blank"><span class="icon cog"></span></a>';

    list = '<div id="cos_links_wrapper">';
    list += list_main;
    list += list_html;
    list += list_pdf2;
    list += list_student2;
    list += list_admin;
    list += list_updates;
    list += list_quickRef;
    list += list_source;
    list += '</div>';

    $("body").append(list);



    //-—---------

    function formattt() {
        var feeter = $("table#mainContainerH+div"); //for the regular COS pages
        feeter.attr({
            id: 'footer'
        }); //add the "footer" id to the footer
        var feet = $("div#footer");

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