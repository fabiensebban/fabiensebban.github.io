//global variables
var customizedColors;
var customizedFonts;
var myPicker;
var template = "temp1";
var saveStatus = [];
var isSaved = true;
var noticeStrFinal = "";
var vizData = {};	// Clone from original
//var vizData = vizOptionsRaw || {};	// Clone from original
var currentUsername = "";
var backgroundImage = "";
// Set swatches
var swatches = { 
	"CMYK" : ["#fef200", "#fff", "#000", "#ed008c", "#00adef", "#BBCB5F", "#fef200"],
	"Lola" : ["#007EFF","#FFFFFF","#313843","#DD0083","#313843","#C1B79F","#F9E5E4"],
	"Symphony" : ["#fff", "#CFBE27", "#3B2D38", "#CFBE27", "#F27435", "#F02475", "#BCBDAC"],
	"Grasshopper" : ["#ffffff", "#ffffff", "#B0C087", "#FAAF40", "#775961", "#559FC7", "#000"],
	"Tango" : ["#009989", "#CE1836", "#F9F3DB", "#009989", "#A3A948", "#EDB92E", "#F9F3DB"],
	"Honeybear" : ["#665C49", "#FFC7C7", "#A69785", "#FFC7C7", "#665C49", "#A69785", "#B8FAFF"],
	
};
//load typekit
try { Typekit.load(); } catch (e) { }

/*"user_info": {
        "first_name": "", 
        "last_name": "", 
        "location": null, 
        "summary": null, 
        "title": null, 
        "username": "test3"
*/

function bindTips() {

	drawTip("#editProfile", "Edit your profile", "top center", "bottom center", 'mouseenter', 'mouseleave unfocus click', 'ui-dark', false, false, '#tip_profile', true);
	drawTip("#theme-btn", "Change your theme", "top center", "bottom center", 'mouseenter', 'mouseleave unfocus click', 'ui-dark', false, false, '#tip_themes', true);
	drawTip("#cust-btn", "Personalize your infographic", "top center", "bottom center", 'mouseenter', 'mouseleave unfocus click', 'ui-dark', false, false, '#tip_background, #tip_fonts, #tip_colors', true);
	
	drawTip(".nav-share", "Share your viz when you are happy with it!", "top center", "bottom center", 'mouseenter', 'mouseleave unfocus click', 'ui-dark', false, false, '#tip_share', true);


	$('#tip_profile').click(function (e) {
		$('#editProfile').qtip('hide');
		$('#profile-btn').trigger('click');
		$('#editProfile').addClass('active');
		$("#dialog_profile").dialog("open");
	});
	
	$('#tip_themes').click(function (e) {
		$('#theme-btn').qtip('hide');
		$('#theme-btn').trigger('click');
	});
	
	$('#tip_colors, #tip_fonts, #tip_background').click(function (e) {
		$('#bg-btn').qtip('hide');
		$('#cust-btn').trigger('click');
	});
	
	$('#tip_share').click(function (e) {
		$('.nav-share').qtip('hide');
		$('.nav-share').trigger('click');
	});
}

function getURLParameter(name) {
    return decodeURI(
        (new RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search) || [null,null])[1]
    );
}

//Executes on document ready
$(document).ready(function () {

	bindTips();
	
    if (getURLParameter('reason') !== 'null') {
        $.jnotify("LinkedIn error : " + getURLParameter('reason'), "warning", true);
    }

    if ($.getUrlVar() === "access_token_error") {
        $.jnotify("LinkedIn access token error. Please try again.", "warning", true);
    }

    if ($.getUrlVar() === "linkedin_user_exists"){
        $.jnotify("The LinkedIn user you tried to import from already exists in the system. Please try a different LinkedIn account.", "warning", true);
    };
	
    if ($.getUrlVar() === "linkedin_permission"){
        $.jnotify("LinkedIn integration failed. Please try again.", "warning", true);
    };
	
    $("#Photo_Gallery").dialog({
        autoOpen: false,
        modal: true,
        minWidth: 600,
        minHeight: 470,
        maxWidth: 600,
        maxHeight: 470,
        draggable: false
    });

    $("#Display_Links").dialog({
        autoOpen: false,
        modal: true,
        minWidth: 600,
        minHeight: 470,
        maxWidth: 600,
        maxHeight: 470,
        draggable: false
    });
	
    $("#customize-bar input:not([type='file'], .ui-widget)").change(function () {
        isSaved = false;
        $("#customize-save").css('background', '#EA088C');
        drawSaveTip($("a#save_btn"), "Would you like to save your changes?", "top center", "bottom center");
    });

    //change tabs
    $(".tab-content").hide(); //Hide all content
	$("#cust-profile").show();

    var closeCustomize = function () {
        $('#customize-bar').hide("slide", { direction: "left" }, 1000);
        $('#customize-save').hide("slide", { direction: "left" }, 1000);
        $('#wrapper').animate({ "left": "0px" }, 1000, function () {
            $('#customize-bar-out').show("slide", { direction: "left" }, 250);
        });
    };
    var openCustomize = function () {	// Globalized it just for the timeout
        $('#customize-bar-out').hide("slide", { direction: "left" }, 250);
        $('#customize-bar').show("slide", { direction: "left" }, 1000);
        $('#customize-save').show("slide", { direction: "left" }, 1000);
        $('#wrapper').animate({ "left": "318px" }, 1000);
    };
    $("#handlebar").click(closeCustomize);
    ($("#customize-bar-out") || $("#handlebar-out")).click(openCustomize);

    // Default view
    if (isOwnViz) {
        $('#customize-bar-out').show();
        setTimeout(openCustomize, 1500);
    }

    //switch between customization nav tabs
    $("ul.tabs li").click(function () {

        $("a", "ul.tabs li").removeClass("active");
        $("a", this).addClass("active");
        $(".tab-content").hide();

        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();

        if (!isSaved) {
            drawSaveTip($("a#save_btn"), "Don't forget to apply your changes!", "top center", "bottom center");
        }
        return false;
    });
	
	/*$('#cust-submenu').bind({
		click: function() {
			$("nav", this).css('opacity',"0.2");
		},
		mouseenter: function() {
			$("nav", this).css('opacity',"1");
		},
		mouseout: function() {
			$("nav", this).css('opacity',"0.2");
		}
	});*/

    //paging for themes
	$("a#prevPage").hide();
    drawTooltip($('#nextpage'), "more themes to choose from");

    $('#prevPage').click(function (e) {
        e.preventDefault();
        var current = $(this).parent().next().children(".current");

        if (current.prev().length != 0) {
            $("a#nextPage").show();
            current.removeClass("current");
            current.hide();
            current.prev().addClass("current");
            current.prev().show();
            if (current.prev().prev().length == 0) {
                $("a#prevPage").hide();
            }
        } else {
            $("a#prevPage").hide();
        }
    });

    $('#nextPage').click(function (e) {
        e.preventDefault();
        var current = $(this).parent().prev().children(".current");

        if (current.next().length != 0) {
            $("a#prevPage").show();
            current.removeClass("current");
            current.hide();
            current.next().addClass("current");
            current.next().show();
            if (current.next().next().length == 0) {
                $("a#nextPage").hide();
            }
        } else {
            $("a#nextPage").hide();
        }
    });
	
	//tracking
	$('#want_portfolio').click(function (e) {
		e.preventDefault();
		track('portfolio', 'name');
		$('#want_portfolio_msg').html("<p class='small'>Thanks for your interest, we'll let you soon know when this feature is available.</p>");
		$(this).removeClass('pink');
		$(this).addClass('grey');
		$(this).html("Coming Soon");
	});
	
	$('#want_print').click(function (e) {
		e.preventDefault();
		track('print', 'name');
		$('#want_print_msg').html("<p class='small'>Thanks for your interest, we'll let you know when this feature is available.</p>");
		$(this).removeClass('pink');
		$(this).addClass('grey');
		$(this).html("Coming Soon");
	});

    //background settings and bind
    $('#cbxTiled').click(function () {
        $('#wrapper').css('background-repeat', this.checked ? 'repeat' : 'no-repeat');
    });
    $('#removeImage').click(function () {
        removeBackground();
    });
    $('#uploadImage').ajaxForm({
        dataType: 'json',
        success: function (responseJson) {
            //alert(JSON.stringify(responseJson));
            if (responseJson && responseJson.status === "Success" && responseJson.path) {
                //alert(responseJson.path);
                var currentDate = new Date();
                backgroundImage = responseJson.path;
                //query string is added to force load image as its cached
                changeBackground(responseJson.path + "?d=" + currentDate.getTime(), $("#cbxTiled").is(':checked'));
                $("#customize-save").css('background', '#EA088C');
                drawSaveTip($("a#save_btn"), "Would you like to save your changes?", "top center", "bottom center");
                isSaved = false;
            }
        }
    });
    $('#color_bg').change(function () {
        var selectedColor = $(this).val();
        $('#wrapper').css('background-color', "#" + selectedColor);
    });
    
    if (vizOptions.options.background) {
        var path;
        var color;
        var tiled = false;
        if (vizOptions.options.background.path) {
            path = vizOptions.options.background.path;
            backgroundImage = path;
        }
        if (vizOptions.options.background.color) {
            var element = document.getElementById('color_bg');
            color = vizOptions.options.background.color;
            $('#wrapper').css('background-color', color);
            if (element) {
                var myPicker = new jscolor.color(document.getElementById('color_bg'), {});
                myPicker.fromString(color);
            }
        }       
        tiled=vizOptions.options.background.isTiled;
        $('#cbxTiled').prop("checked", tiled);        
        if (path) {
            changeBackground(path, tiled);
        }
    }
    else{
         $('#cbxTiled').attr('checked', true);
    }
    //Default tiled
//    if (!vizOptions.options.background || vizOptions.options.background.isTiled==null || typeof(vizOptions.options.background.isTiled) == "undefined") 
//         $('#cbxTiled').attr('checked', true);

    //Opens all external links in new window
    $("a[href*=http]").each(function () {
        if (this.href.indexOf(location.hostname) === -1) {
            $(this).click(function () { window.open(this.href); return false; });
        }
    });

    if (vizOptions && vizOptions.options && vizOptions.options.template) {
        template = vizOptions.options.template.toString();
    }

    $(".closeBtn").click(function () {
        if ($(this).hasClass("sharing")) {
            $("#sharing").fadeOut(500);
        } else if ($(this).hasClass("customize")) {
            $("#customize").fadeOut(500);
        } else {
            $("#premium").fadeOut(500);
        }
    });

    // Sections
    {
        // Defaults
        if (vizOptions && vizOptions.options && vizOptions.options.sections) {
            customizedSections = vizOptions.options.sections;
        } else {
            customizedSections = { "skills": true, "recommendations": true, "languages": true, "interests": true,"myStats":true,"awards":true };
        }
        // Skills checkbox and bind
        var skills = $("#section-skills");
        skills.prop("checked", customizedSections.skills);
        skills.click(function () {
            var isSkillsEnabled = $("#section-skills").prop("checked");
            customizedSections.skills = isSkillsEnabled;
            generateViz();
        });
        // Interests checkbox and bind
        var skills = $("#section-interests");
        skills.prop("checked", customizedSections.interests);
        skills.click(function () {
            var isInterestEnabled = $("#section-interests").prop("checked");
            customizedSections.interests = isInterestEnabled;
            generateViz();
        });
        // Recommendations checkbox and bind
        var rec = $("#section-recommendation");
        rec.prop("checked", customizedSections.recommendations);
        rec.click(function () {
            var isRecEnabled = $("#section-recommendation").prop("checked");
            customizedSections.recommendations = isRecEnabled;
            generateViz();
        });
        // Languages checkbox and bind
        var lang = $("#section-languages");
        lang.prop("checked", customizedSections.languages);
        lang.click(function () {
            var isLanguageEnabled = $("#section-languages").prop("checked");
            customizedSections.languages = isLanguageEnabled;
            generateViz();
        });
         // MyStats checkbox and bind
        var stat = $("#section-mystats");
        stat.prop("checked", customizedSections.myStats);
        stat.click(function () {
           customizedSections.myStats= $("#section-mystats").prop("checked");           
            generateViz();
        });
         // Languages checkbox and bind
        var award = $("#section-awards");
        award.prop("checked", customizedSections.awards);
        award.click(function () {
            customizedSections.awards  = $("#section-awards").prop("checked");            
            generateViz();
        });

    }
	
	//populate swatches
	$.each(swatches, function(swatchName, swatchColors) {
		
		//append the span
		$('#color-theme-container').append('<span class="color-theme-item" title="' + swatchName + '"><table class="swatch-table"><tr><td><p>' + swatchName + '</p></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table></span>');
		
		var $swatchArea = $('#color-theme-container span').last();
		
		// fill swatches
		$swatchArea.find('td').each(function(i, elm) {
			$(this).css("background-color", swatchColors[i]);
		});
		
		// populate selectors
		$('#color-theme-picker').append('<option class="color-theme-option" value="' + swatchName + '"><span>'+ swatchName +'</span></option>');
	});
	
	// change swatches via table display
	$('.color-theme-item').click(function () {
		customizedColors = swatches[$(this).attr("title")];
		updateColorSelection(customizedColors);
		generateViz();
	});
	
	// change swatches via dropdown
	$('#color-theme-picker').change(function() {
		customizedColors = swatches[$(this).val()];
		updateColorSelection(customizedColors);
		generateViz();
	});
	

    //color changes
    if (vizOptions && vizOptions.options && vizOptions.options.colours) {
        customizedColors = vizOptions.options.colours;
    } else {
        customizedColors = executeFunctionByName(template + ".getDefaultColors", window);
    }

    $('.color').change(function () {
        var selectedColor = $(this).val();
        if (selectedColor) {
            var colorIndex = parseInt(this.id.charAt(this.id.length - 1), 10);
            if (customizedColors) {
                customizedColors[colorIndex] = "#" + selectedColor;
                generateViz();

                setUserContactInfo();
            }
        }
    });
	
	// bind mouseover effects
	
	$('.page li, .swatch-table').mouseenter(function (e) {
        $(this).find('p').fadeIn(200);
    });
	
	$('.page li, .swatch-table').mouseleave(function (e) {
            $(this).find('p').fadeOut(200);
        });

    // Font
    if (vizOptions && vizOptions.options && vizOptions.options.fonts) {
        customizedFonts = vizOptions.options.fonts;
    } else {
        customizedFonts = executeFunctionByName(template + ".getDefaultFonts", window);
    }
    // Makes font selection into a menu
    var onFontDrawerClick = function (e) {
        e.preventDefault();
        var current = $(this).parent().next();
        current.find("ul").slideToggle();
        current.siblings("dd").each(function () {
            $(this).find("ul").hide();
            if ($(this).prev().find("a").hasClass('selectorup')) {
                $(this).prev().find("a").removeClass('selectorup');
                $(this).prev().find("a").addClass('selectordown');
            }
        });
        $(this).toggleClass('selectorup');
        $(this).toggleClass('selectordown');
    };
    $(".dropdown dt a").click(onFontDrawerClick);
    $(".fontSelection").click(onFontDrawerClick);

    // Font selection bind
    updateFontSelection(customizedFonts);
    $("ul.fontselector li").click(function (e) {
        e.preventDefault();

        if ($(this).parent("#ulname").length) {
            customizedFonts[0] = $(this).find("a").attr("value");

        } else if ($(this).parent("#ultitles").length) {
            customizedFonts[1] = $(this).find("a").attr("value");

        } else if ($(this).parent("#ullabels").length) {
            customizedFonts[2] = $(this).find("a").attr("value");

        }
        updateFontSelection(customizedFonts);
        $(this).parent().slideToggle();
        $("#customize-save").css('background', '#EA088C');
        drawSaveTip($("a#save_btn"), "Would you like to save your changes?", "top center", "bottom center");
        isSaved = false;
        generateViz();

        $("#linkMe").css("font-family", customizedFonts[1]);
    });


    // TODO: Display these prompt again
    if (isSignedIn && isOwnViz) {
        var noticeStr = "";

        if (vizDataRaw.counts && vizDataRaw.counts.months_total_work <= 0) {
            noticeStr += "<a class=\"linkedinExt\" href=\"http://www.linkedin.com/profile/edit-skills\" target=\"_blank\">Work Experience</a> ";
        }
        if (vizDataRaw.counts && vizDataRaw.counts.months_total_education <= 0) {
            noticeStr += "<a class=\"linkedinExt\" href=\"http://www.linkedin.com/profile/edit-education\" target=\"_blank\">Work Experience</a> ";
        }
        if (vizDataRaw.skills && vizDataRaw.skills.length === 0) {
            noticeStr += "<a class=\"linkedinExt\" href=\"http://www.linkedin.com/profile/edit-skills\" target=\"_blank\">Skills</a> ";
        }
        /*if (noticeStr) {
        noticeStrFinal = "<span id=\"updateLN\"><p><b>Tip:</b> Your infographic can look better if you update the in the following sections of your Linkedin profile: " + noticeStr + "</p><br/><p>Don't forget to hit resync after you're done.</p></span>";
        //$("#cust-profile").append(noticeStrFinal);
        }*/
    }
	
	if (vizOptions) {
		if (!vizOptions.has_email && isSignedIn && isOwnViz) {
			//console.log("has no email");
            showEmail(); // DEBUG
        }
		
		//!vizOptions.has_email

        if (!vizOptions.isActivated) {
            var emailStr = vizOptions.firstName + ", please check your email to activate your account. <a href=\"#\">Resend email</a>";
            //TODO:need backend code to send email. activate when ready	
            //$.jnotify(emailStr, "warning",true);						
        }
		
		setDialogs();
		setUsernameLogic();
		setEmailLogic();
		generateViz();
        setUserContactInfo();
    }
    
    setDefaultSettings();
   
});

function initWizard() {
	// Customize tooltip
	drawWizardTip($("#handlebar"), "Customize your viz here. You can minimize this tab when you are done.", "left center", "right center", "");
	// Share tooltip
	drawWizardTip($(".nav-share"), "Share your viz when you are happy with it!", "top center", "bottom center", "");
	// Save tooltip
	drawWizardTip($("#custom-save"), "Don't forget to save your changes.", "bottom center", "top center", "");
};

function showEmail(isInstant) {
	if (!isInstant) {
		$('#modal-glass').fadeIn();
		$('#modal-box').fadeIn();
	} else {
		$('#modal-glass').fadeIn();
		$('#modal-box').fadeIn();
	}
}

function hideModal(newUsername) {
	//console.log("hiding modal, new username set to " + newUsername);
	$("#modal-glass, #modal-box").hide('slow', function() {
		if ( !$.browser.mozilla || ($.browser.mozilla && $.browser.version >= "2.0.1") ) {
			//console.log("New browser");
			//parent.location.hash = newUsername; // DEBUG
			location.pathname = "/myviz";
		} else {
			//console.log("Browser version " + $.browser.version);
		}
	});
	$("#profile_email, #profile_username").qtip('hide');
	// Update viz
	
	//setTimeout(function() {location.pathname = newUsername}, 1000);
}

//change background
function changeBackground(backgroundurl, isTiled) {
	$('#wrapper').css('background-image', "url(" + backgroundurl + ")");
	if (isTiled) {
		$('#wrapper').css('background-repeat', 'repeat');
	}
    else
    {
        $('#wrapper').css('background-repeat', 'no-repeat');
    }
}
//generate viz
function generateViz() {
	//Clear the div
	$('#infographic').empty();
	
	//Regenerate Viz
	if (vizDataRaw.user_info && (vizDataRaw.user_info.first_name + vizDataRaw.user_info.last_name).length > 0) {
		$('#blankViz').hide();
		executeFunctionByName(template + ".generate", window);
	} else {
		$('#blankViz').show();
	}
	//$('#vizlinks').hide();
	setUserContactInfo();
}
//changes template
function templateChange(name) {
	$("#customize-save").css('background', '#EA088C');
	drawSaveTip($("a#save_btn"), "Would you like to save your changes?", "top center", "bottom center");
	isSaved = false;
	//$("#save-prompt").fadeIn();
	
	template = name;
	//Reset colors and fonts
	//customizedColors = null;
	customizedFonts = null;

	generateViz();
	setDefaultSettings();
	
}
//Saves SVG to backend
function saveSVG(status) {
	var data = $("#infographic").html();
	data = data.replace(" xlink=", " xmlns:xlink=");	// browser stripes namespace in svg so we have to re-add it
	// Allow namespace xlink
	if (data.indexOf("xmlns:xlink=\"http://www.w3.org/1999/xlink\"") === -1) {
		data = data.replace("<svg ", "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" ");
	}
	// HACK
	match = data.match(/xmlns="http:\/\/www.w3.org\/2000\/svg"/g);
	if (match.length > 1) {	// Fix in IE (duplicates namespace)
		data = data.replace("xmlns=\"http://www.w3.org/2000/svg\"", "");	// Only remove the first one
	}
	
	// HACK
	data = data.replace(" href", " xlink:href");	// Fix all images
	
	data = data.replace("<desc>Created with Rapha\u00ebl</desc>", "");	// Fix SVG image conversion
	$.ajax({
		type: 'PUT',
		url: '/user/svg',
		data: formatXml(data),
		success: function (resp) {
			//alert("Save SVG: "+JSON.stringify(resp));
			saveStatus.push(resp.status === "Success");
		}
	});   
}


function saveAll() {
	$("#customize-save").css('background', '#333');
	
	var isTiled = $("#cbxTiled").is(':checked');
	var isSkillsEnabled = $("#section-skills").prop("checked");
	var json = {
			"template": template,
			"colours": customizedColors,
			"fonts": customizedFonts,
			"sections": customizedSections,
			"background": { "path": backgroundImage, "isTiled": isTiled, "color": "#" + $('#color_bg').val() }
		};
	$.ajax({
		type: 'PUT',
		url: '/user/option',
		data: jsonSerialize(json),
        beforeSend: showLoadingImage,
		success: function (resp) {
			saveStatus.push(resp.status === "Success");
			displaySaveStatus();
			isSaved = true;
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.jnotify("Sorry there was an error while saving your changes. " + textStatus, "error", 1000);
			hideLoadingImage();
		}
	}).success(hideLoadingImage);
}
function showLoadingImage() {   
    $('#save-buttons').hide();   
    $('#customize-save').append('<div id="loading-image" style="text-align:center;"><img src="/media/img/ajax-loader.gif" alt="Loading..." /></div>');
}

function hideLoadingImage() {  

    $('#save-buttons').show();
    $('#loading-image').remove();
}
function removeBackground() {
	if (backgroundImage) {
		changeBackground("", false);
		backgroundImage = null;
	}
	//Save template options	
}

function setDefaultSettings() {		
		updateColorSelection(customizedColors);
		updateFontSelection(customizedFonts);
}

function updateColorSelection(colors) {
	if (colors) {	   
		for (var i = 0; i < colors.length; i++) {
			//$("#color_" + i).val(customizedColors[i]);
			//$("#color_" + i).color.fromString('F2C80A');
			var element = document.getElementById("color_" + i);
			if (element == null)
				continue;

			myPicker = new jscolor.color(element, {})
			myPicker.fromString(colors[i]);
			//document.getElementById('color_1').color.fromString('F2C80A');
			//$("#color_" + i).addClass("color");
		}
	}
}


function updateFontSelection(fonts) {
	if (fonts) {
		var name = $('#ulname li a[value="'+customizedFonts[0]+'"]');
		var title = $('#ultitles li a[value="'+customizedFonts[1]+'"]');
		var label = $('#ullabels li a[value="'+customizedFonts[2]+'"]');
		
		// Remove current selection
		name.parent().siblings().removeClass("currentfont");
		title.parent().siblings().removeClass("currentfont");
		label.parent().siblings().removeClass("currentfont");
		
		// Select current font
		name.parent().addClass("currentfont");
		title.parent().addClass("currentfont");
		label.parent().addClass("currentfont");
		
		$("#namePlaceholder").html(name.parent().clone(false).html());
		$("#titlePlaceholder").html(title.parent().clone(false).html());
		$("#labelPlaceholder").html(label.parent().clone(false).html());
	}
}

function saveCustomization() {
    saveAll();
    //saveUserName();
	//saveSVG();
}

function displaySaveStatus() {
	if (saveStatus && saveStatus.length == 1) {
	    if (saveStatus[0]) {
	        $("#save-msg").fadeIn().fadeOut(2000);
	        $.jnotify("Your changes have been successfully saved.", "success", 3000);
	    }
	    else {
	        $.jnotify("Sorry an error occurred while making your changes.", "error", 3000);
	    }

		saveStatus = [];
	}
}

function setUserContactInfo() {
	$("#linkMe").css("font-family", customizedFonts[1]);
	$("#linkMe").css("font-size", 35);
	$("#linkMe").css("color", customizedColors[1]);
	$("#vizlinks").css("background-color", customizedColors[2]);
	$("a.left-link").css("font-family", customizedFonts[2]);
    $("a.left-link").css("color", customizedColors[1]);
    $("a.right-link").css("font-family", customizedFonts[2]);
    $("a.right-link").css("color", customizedColors[1]);
	$("a.footer-link").css("color", customizedColors[1]);
	$("a.footer-link").css("font-family", customizedFonts[1]);
	$("#vizlinks").css("background-color", customizedColors[2]);
	setMyLinks();
}

function getUrlItem(typeId) {
    if (vizDataRaw.urls && vizDataRaw.urls.length > 0) {

        for (var i = 0; i < vizDataRaw.urls.length; i++) {
            if (vizDataRaw.urls[i].type_id == typeId) {
                return vizDataRaw.urls[i];
            }
        }
    }
    return null;

}
function getUserData() {
    $.ajax({
        type: 'GET',
        url: '/user/data',        
        success: function (resp) {
            vizDataRaw=resp;
        }
    });
}

function setMyLinks() {    
    $("#divSocialLinks").html("");
    $("#divOtherLinks").html("");
    $("#divPersonalLinks").html("");  
     if (vizDataRaw.urls && vizDataRaw.urls.length > 0) {
        var urls=clone(vizDataRaw.urls);
        //urls=urls.sort(sortLinks);
         var image;
        for (var i = 0; i < urls.length; i++) {
            image="";
            var url = urls[i].url;
            if (url && url.length>3 && url.substring(0,4) !="http") {
                url = "http://" + url;
            }
            switch(urls[i].type_id){
                case 7:
                    image="linkedin.png";
                    break;
                case 6:
                    image="twitter.png";
                    break;
                case 5:
                    image="facebook.png";
                    break;
                case 4:
                    image="rss.png";
                    break;
                case 3:
                    image="blog.png";
                    break;
                case 5:
                    image="facebook.png";
                    break;
				case 1: // personal
					image="personal.png";
					break;
				case 2: // company                   
					image="company.png";
                    break;
                case 0: // other url
                    if ($("#divOtherLinks").html().length > 0)
                        $("#divOtherLinks").append(" || ");
                    var item = '<a target="_blank" class="footer-link" href="' + url + '" style="font-family:' + customizedFonts[2] + '; color:'+ customizedColors[0] +'">' + urls[i].name + '</a>';
                    $("#divOtherLinks").append(item);
                    break;
                default:
                    break;
            }
            if (image && image.length > 0) {
                var item = '<a target="_blank" href="' + url + '"><img class="linkimg" alt="' + urls[i].name + '" title="' + urls[i].name + '"src="/media/img/socialicons/' + image + '"/></a>';
                if(urls[i].type_id == 1 || urls[i].type_id == 2)
                     $("#divPersonalLinks").append(item);
                else
                    $("#divSocialLinks").append(item);  
            }
        }
		$('#vizlinks').show();
    }
}

function sortLinks(a,b){
    return a.type_id - b.type_id;
}

// Tools like overlay, toolbar etc.

//Removes other tabs and brings in the customize panel
function customize(){
	$("#custom").show();
	$(custom).fadeTo("slow", 1)
	$("#custom").css({ top: 50 });
    $("#custom").css({ left: 500 });
	$(sharing).fadeTo("slow", 0, closeSharePanel())
}

//Removes Customize panel
function closeCustomPanel(){
	$("#custom").hide();
}

//Removes other tabs and brings in the sharing panel
function share(){
	$("#sharing").show();
	$(sharing).fadeTo("slow", 1)
	$("#sharing").css({ top: 50 });
    $("#sharing").css({ left: 500 });
	$(custom).fadeTo("slow", 0, closeCustomPanel())
}

//Makes toolbars draggable within the frame of the website
$(function dragDrop() {
		$( ".toolpanel" ).draggable({ containment: "#wrapper", scroll: true });
        $( ".toolpanel" ).draggable({ handle: '#toolnav' });
	});
	
//Switches to Templates Panel
function switchTemplates(){
	$("#customarrow").css({ left: 120 });
	$('#colors').hide();
	$('#fonts').hide();
	$('#fonts').hide();
	$('#templates').show();
}

//Switches to Colors Panel
function switchColors(){
	$("#customarrow").css({ left: 180 });
	$('#templates').hide();
	$('#fonts').hide();
	$('#colors').show();
}
//Switches to Fonts Panel
function switchFonts(){
	$("#customarrow").css({ left: 230 });
	$('#templates').hide();
	$('#colors').hide();
	$('#fonts').show();
}

/* j-notify */

function displayNotice(notice, type) {
    $.jnotify(notice, type, true);
}

function closeGallery(){
	$("#Photo_Gallery").hide();	
}

/* Profile Validation */
var phrase = {
	'username': "Username",
	'email': "Email"
};

function validateProfile(form) {
	var is_valid = true;
	if (form.email.value === "") {
		drawTip($(form.email), "<span class='tip-small'>Please enter an email.</span>", "center left", "center right", false, 'focusin', 'ui-dark', true, true);
		is_valid = false;
	}
	if (form.username.value === "") {
		drawTip($(form.username), "<span class='tip-small'>Please enter a username.</span>", "center left", "center right", false, 'focusin', 'ui-dark', true, true);
		is_valid = false;
	}
	if (is_valid) {
		if (!Viz.cache.get("profile")) {
			Viz.cache.put("profile", true, 5);	// 5 second expiry
			ajaxEmail(form);
		}
	}
	return false;
}

function ajaxEmail(form) {
	
	//console.log("submitting...");
	
	//Save email
	$.ajax({
		type: 'PUT',
		url: '/user/email',
		data: form.email.value,
		success: function (resp) {
			if (!resp) { return; }
			if (resp.code === 200) {
				//console.log("submitted email.");
				ajaxUsername(form);
			} else {
				if (window.hasOwnProperty("console")) {
					console.log("Email error: " + resp.message);
				}
				$.jnotify("Something went wrong with saving your email :( " + resp.message, "error", 3000);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			if (window.hasOwnProperty("console")) {
				console.log(jqXHR);
			}
			$.jnotify("Something went wrong with saving your email :( Server Error", "error", 3000);
		}
	});
	
	return false;
};
	
function ajaxUsername(form) {
	
	//console.log("submitting...");
	
	//Save uname
	$.ajax({
		type: 'PUT',
		url: '/user/username',
		data: form.username.value,
		success: function (resp) {
			if (!resp) { return; }
			if (resp.code === 200) {
				//console.log("submitted username.");
				hideModal(form.username.value);
				//location.pathname = form.username.value;
			} else {
				if (window.hasOwnProperty("console")) {
					console.log("Username error: " + resp.message);
				}
				$.jnotify("Something went wrong with saving your email :( " + resp.message, "error", 3000);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			if (window.hasOwnProperty("console")) {
				console.log(jqXHR);
			}
			$.jnotify("Something went wrong with saving your email :( Server Error", "error", 3000);
		}
	});
	
	return false;
};

function setUsernameLogic() {
	var element = $('#profile_username');
	var url = function (value) {
		return '/ajax/username?username=' + escape(value);
	};
	var success = function (resp, value) {
		var style = (resp && resp.code === 200) ? "color:Green" : "color:Red";
		var available = (resp && resp.code === 200) ? "available." : "not available.";
		drawTip("#profile_username", "<span class='tip-small'>http://vizualize.me/<span class='italics'>" + value + "</span> is <span style='" + style + "'>" + available + "</span></span>", "center left", "center right", 'focusin', false, 'ui-dark', true, false);
	};
	attachKeyUpAjax(element, url, success);
}

function setEmailLogic() {
	var element = $('#profile_email');
	var url = function (value) {
		return '/ajax/email?email=' + escape(value);
	};
	var success = function (resp, value) {
		var style = (resp && resp.code === 200) ? "color:Green" : "color:Red";
		var used = (resp && resp.code === 200) ? "free to use." : "taken or invalid.";
		drawTip("#profile_email", "<span class='tip-small'><span class='italics'>" + value + "</span> is <span style='" + style + "'>" + used + "</span></span>", "center left", "center right", 'focusin', false, 'ui-dark', true, false);
	};
	attachKeyUpAjax(element, url, success);
}