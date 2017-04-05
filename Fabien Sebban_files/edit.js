////////////Global Variables/////

var globalListTextSize = 40;

var dialogs = {
	
}

/////////////ON LOAD/////////////
$(document).ready(function () {
    $("#ul-Recommendations").sortable();
    $("#ul-Recommendations").disableSelection();
    $("#divLabel").hide();
    $("#divStat").hide();
    $("#divUnit").hide();
    setDialogs();
	if (!vizDataRaw.user_info.first_name || !vizDataRaw.user_info.last_name || !vizDataRaw.user_info.title) {
		
		// TODO: Disable checkboxes
		$("#edit-content-nav > li:not(#editProfile)").css("color","#bbb");
		
	} else {
		$("#editProfile").qtip('hide');
		bindAllDialogs();
		
	};
    //link category
    $('#uCategory').change(function () {
        var category = $('select#uCategory option:selected').val();
        if (category && category == 0) {
            $("#divName").show('slow');
        }
        else {
            $("#divName").hide();
        }
    });
    //my stats category
    $('#mCategory').change(function () {
        var category = $('select#mCategory option:selected').val();
        if (category && category.length > 0) {
            if (category == 0) {
                $("#divLabel").show();
                $("#divStat").show();
                $("#divUnit").show();

            }
            else if (category == 1) {
                $("#divLabel").hide();
                //$("#divStat").show();
                $("#divStat").hide();
                $("#divUnit").hide();
            }
            else {
                $("#divLabel").hide();
                $("#divStat").hide();
                $("#divUnit").hide();
            }
        }
        else {
            $("#divLabel").hide();
            $("#divStat").hide();
            $("#divUnit").hide();
        }
    });

    //is current for positions

    var isCurrent = $("input#wIsCurrent");
    isCurrent.click(function () {
        var isCurrentChecked = $("input#wIsCurrent").prop("checked");
        if (isCurrentChecked) {
            removeWorkEndDate();
        }
        else {
            addWorkEndDate();
        }
    });
    //Bind lists
    bindLists();
    setUserNameLogic();
    //Hide create new item field
    hideCreateForm();
    // Add new item
    setAddNewItems();
    // On cancel handler
    setCancelActions();
    //set validations
    setValidations();
    //load years
    for (var i = new Date().getFullYear(); i >= 1950; i--) {
        $('#wStartYear').append($('<option />').val(i).html(i));
        $('#wEndYear').append($('<option />').val(i).html(i));
        $('#eStartYear').append($('<option />').val(i).html(i));
        $('#mYear').append($('<option />').val(i).html(i));
    }
    //Extra years for educatione end
    var endYear = new Date().getFullYear() + 10;
    for (var i = endYear; i >= 1950; i--) {
        $('#eEndYear').append($('<option />').val(i).html(i));
    }
});

function setAddNewItems() {
    $("a#addNewWork").click(function () {
        $('div#newWork').show('slow');
        resetWork();
        setAddNewButton("#wSave");  
    });
    $("a#addNewEdu").click(function () {
        $('div#newEdu').show('slow');
        resetEducation();
        setAddNewButton("#eSave");  
    });
    $("a#addNewSkill").click(function () {
        $('div#newSkill').show('slow');
        resetSkills();
        setAddNewButton("#sSave");  
    });
    $("a#addNewLanguage").click(function () {
        $('div#newLanguage').show('slow');
        resetLanguage();
        setAddNewButton("#lSave");  
    });
    $("a#addNewInterest").click(function () {
        $('div#newInterest').show('slow');
        resetInterest();
        setAddNewButton("#iSave");  
    });
    $("a#addNewLink").click(function () {
        $('div#newLink').show('slow');
        resetLink();
        setAddNewButton("#uSave");  
    });
    $("a#addNewStat").click(function () {
        $('div#newStat').show('slow');
        resetStat();
        setAddNewButton("#mSave");  
        $("#divLabel").hide();
        $("#divStat").hide();
        $("#divUnit").hide();
    });
    $("a#addNewAward").click(function () {
        $('div#newAward').show('slow');
        resetAward();
        setAddNewButton("#aSave");       
    });

}
function setAddNewButton(id) {
    $(id).attr('value', "");
    $(id+" > span").text("Add");
    $(id).removeClass("edit-save");
    $(id).addClass("edit-add");
}
function setCancelActions() {
    $("a#wCancel").click(function () {
        $('div#newWork').hide();
        resetWork();
    });
    $("a#eCancel").click(function () {
        $('div#newEdu').hide();
        resetEducation();
    });
    $("a#sCancel").click(function () {
        $('div#newSkill').hide();
        resetSkills();
    });
    $("a#lCancel").click(function () {
        $('div#newLanguage').hide();
        resetLanguage();
    });
    $("a#iCancel").click(function () {
        $('div#newInterest').hide();
        resetInterest();
    });
    $("a#pCancel").click(function () {
        bindProfile();
        $('#dialog_profile').dialog('close');
    });
    $("a#uCancel").click(function () {
        $('div#newLink').hide();
        resetLink();
    });
    $("a#aCancel").click(function () {
        resetAward();
    });
    $("a#rCancel").click(function () {
        bindRecommendations();
        $('#dialog_Recommendations').dialog('close');
    });
    $("a#mCancel").click(function () {
        $('div#newStat').hide();
        resetStat();
    });
    $("a#aCancel").click(function () {
        $('div#newAward').hide();
        resetAward();
    });

}
function setValidations() {
    $.validator.addMethod("dateRange", function () {
        var sMonth = $('select#wStartMonth option:selected').val();
        var sYear = $('select#wStartYear option:selected').val();
        var eMonth = $('select#wEndMonth option:selected').val();
        var eYear = $('select#wEndYear option:selected').val();
        var sDate = new Date(eYear, eMonth - 1, 1);
        var eDate = new Date(sYear, sMonth - 1, 1);
        return (sDate > eDate);
    }, "Start Date cannot be greater than the End Date.");
    $.validator.addMethod("dateRangeEdu", function () {
        var sMonth = $('select#eStartMonth option:selected').val();
        var sYear = $('select#eStartYear option:selected').val();
        var eMonth = $('select#eEndMonth option:selected').val();
        var eYear = $('select#eEndYear option:selected').val();
        var sDate = new Date(eYear, eMonth - 1, 1);
        var eDate = new Date(sYear, sMonth - 1, 1);
        return (sDate > eDate);
    }, "Start Date cannot be greater than the End Date.");
    $.validator.addMethod("requiredUrlName", function () {
        var category = $('select#uCategory option:selected').val();
        if (category && category == 0) {
            var name = $("input#uName").val();
            if (name && name.length > 0)
                return true;
            else
                return false;
        }
        return true;
    }, "The field is required.");
    $.validator.addMethod("requiredStatLabel", function () {
        var category = $('select#mCategory option:selected').val();
        if (category && category == 0) {
            var name = $("input#mLabel").val();
            if (name && name.length > 0)
                return true;
            else
                return false;
        }
        return true;
    }, "The field is required.");
    $.validator.addMethod("requiredStat", function () {
        var category = $('select#mCategory option:selected').val();
        if (category && (category == 0)) {
            var stat = $("input#mStat").val();
            if (stat && stat.length > 0)
                return true;
            else
                return false;
        }
        return true;
    }, "The field is required.");
    $("#workForm").validate();
    $("#educationForm").validate();
    $("#skillsForm").validate();
    $("#languagesForm").validate();
    $("#interestsForm").validate();
    $("#profileForm").validate();
    $("#linksForm").validate();
    $("#awardsForm").validate();
    $("#statsForm").validate();

}
function hideCreateForm() {
    hideNewWork();
    hideNewEdu();
    hideNewSkill();
    hideNewLanguage();
    hideNewLink();
    hideNewInterest();
    hideNewStat();
    hideNewAward();
   
}
function bindLists() {
    bindEducation();
    bindPositions();
    bindSkills();
    bindLanguages();
    bindInterests();
    bindProfile();
    bindLinks();
    bindAwards();
    bindRecommendations();
    bindStats();
}

function showDialog(elementName) {
    var mWidth;
    elementName == "dialog_Portfolio" ? mWidth = 640 : mWidth = 420;
    $("#" + elementName).dialog({
        autoOpen: false,
        modal: true,
        minWidth: mWidth,
        draggable: true
    });
}

function hideNewWork() {
    $('div#newWork').hide();
}
function hideNewEdu() {
    $('div#newEdu').hide();
}
function hideNewSkill() {
    $('div#newSkill').hide();
}
function hideNewLanguage() {
    $('div#newLanguage').hide();
}
function hideNewLink() {
    $('div#newLink').hide();
}
function hideNewInterest() {
    $('div#newInterest').hide();
}
function hideNewStat() {
    $('div#newStat').hide();
}
function hideNewAward() {
    $('div#newAward').hide();
}
///////////////////////////Recommendations///////////////////
function bindRecommendations() {
    $("ul#ul-Recommendations").empty();
    if (vizDataRaw.recommendations && vizDataRaw.recommendations.length>0) {
        $.each(vizDataRaw.recommendations, function (i, rec) {
            var displayText = rec.content.recommendationText;
            $("ul#ul-Recommendations").append('<li id=' + rec.id + ' class=""><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><span>' + trucateText(displayText, globalListTextSize) + '</span></li>');
        });
    }
}

function saveRecommendations() {
    var sortedRec = [];
    $.each($("ul#ul-Recommendations li"), function (i, rec) {
        var id = $(rec).attr('id');
        var itemIndex = findItemInArray(vizDataRaw.recommendations, id);
        if (itemIndex >= 0) {
            sortedRec.push(vizDataRaw.recommendations[itemIndex]);
        }
    });
    if (sortedRec && sortedRec.length > 0) {
        vizDataRaw.recommendations = sortedRec;
        saveChanges([generateViz, bindRecommendations], "#recSubmit");
    }
}
///////////////////////////Awards////////////////////////////

function bindAwards() {
    $("ul#ul-Awards").empty();
    if (vizDataRaw.awards) {
        $.each(vizDataRaw.awards, function (i, award) {
            var displayText = award.name;
            $("ul#ul-Awards").append('<li><span>' + trucateText(displayText, globalListTextSize) + '</span><a href="#" id=' + award.id + ' class=\'edit-delete\' onclick=deleteAward(' + award.id + ')><span>Delete</span></a><a href="#" class=\'edit-edit\' onclick=loadAward(' + award.id + ')><span>Edit</span></a></li>');
        });
       
    }
}
function addEditAward() {
    if ($("#awardsForm").valid()) {
        var id = $("#aSave").attr('value');
        if (id) {
            editAward(id);
        }
        else
            addAward();
    }
}
function addAward() {
    var awardJson = getAward();
    if (awardJson) {
        vizDataRaw.awards.push(awardJson);
        saveChanges([resetAward, generateViz, bindAwards, hideNewAward], "#awardSubmit");
    }
}
function editAward(id) {
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.awards, id);
        if (itemIndex >= 0) {
            var awardToChange = vizDataRaw.awards[itemIndex];
            var changedAward = getAward();
            awardToChange.name = changedAward.name;
            awardToChange.weight = changedAward.weight;
            if(changedAward.awarded_date)
                awardToChange.awarded_date = changedAward.awarded_date;
            awardToChange.is_bound = false;
            saveChanges([resetAward, generateViz, bindAwards, hideNewAward], "#awardSubmit");
        }
    }
}
function deleteAward(id) {

    if (confirm("Are you sure you want to delete this?")) {
        if (id) {
            var itemIndex = findItemInArray(vizDataRaw.awards, id);
            if (itemIndex >= 0) {
                vizDataRaw.awards.splice(itemIndex, 1);
                saveChanges([generateViz, bindAwards]);
            }
        }
    }
}
function getAward() {
    var awardJson = {};
    var name = $("input#aName").val();
    awardJson.name = name;
    awardJson.weight = $("select#mWeight").val();
    var year = $("select#mYear").val();
    if (year && year.length > 0) {
        awardJson.awarded_date = getUnixTimeStamp(year,1);
    }
    awardJson.is_bound = false;
    return awardJson;
}
function loadAward(id) {
    $('div#newAward').show('slow');
    var validator = $("#awardsForm").validate();
    validator.resetForm();
    $("#aSave").removeClass("edit-add");
    $("#aSave").addClass("edit-save");
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.awards, id);
        if (itemIndex >= 0) {
            var awardItem = vizDataRaw.awards[itemIndex];
            $("input#aName").val(awardItem.name);
            $("#aSave > span").text("Save");
            $("select#mWeight").val(awardItem.weight);
            var awardYear = "";
            if (awardItem.awarded_date) {
               awardYear= getDateFromString(awardItem.awarded_date).getFullYear();
            }
           $("select#mYear").val(awardYear);
            $("#aSave").attr('value', id);          

        }
    }
}
function resetAward() {
    var validator = $("#awardsForm").validate();
    validator.resetForm();
    $("input#aName").val("");
    $("select#mWeight").val("");
    $("select#mYear").val("");
    $("#aSave").attr('value', "");
}


///////////////////////////URL's/////////////////////////////
function bindLinks() {
    $("ul#ul-Links").empty();
    if (vizDataRaw.urls && vizDataRaw.urls.length>0) {
        $.each(vizDataRaw.urls, function (i, url) {
            var displayText = url.name + " : " + url.url;
            $("ul#ul-Links").append('<li><span>' + trucateText(displayText, globalListTextSize) + '</span><a href="#" id=' + url.id + ' class=\'edit-delete\' onclick=deleteLink(' + url.id + ')><span>Delete</span></a><a href="#" class=\'edit-edit\' onclick=loadLink(' + url.id + ')><span>Edit</span></a></li>');
        });
		$('#vizlinks').show();
    }
}
function addEditLink() {
    if ($("#linksForm").valid()) {
        var id = $("#uSave").attr('value');
        if (id) {
            editLink(id);
        }
        else
            addLink();
    }
}
function addLink() {
    var linkJson = getLink();
    if (linkJson) {
        vizDataRaw.urls.push(linkJson);
        saveChanges([resetLink, setMyLinks, bindLinks, hideNewLink], "#linkSubmit");
    }
}
function editLink(id) {
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.urls, id);
        if (itemIndex >= 0) {
            var linkToChange = vizDataRaw.urls[itemIndex];
            var changedLink = getLink();
            linkToChange.name = changedLink.name;
            linkToChange.url = changedLink.url;
            linkToChange.type_id = changedLink.type_id;
            linkToChange.is_bound = false;
            saveChanges([resetLink, setMyLinks, bindLinks, hideNewLink], "#linkSubmit");

        }
    }
}
function deleteLink(id) {

    if (confirm("Are you sure you want to delete this?")) {
        if (id) {
            var itemIndex = findItemInArray(vizDataRaw.urls, id);
            if (itemIndex >= 0) {
                vizDataRaw.urls.splice(itemIndex, 1);
                saveChanges([setMyLinks, bindLinks]);
            }
        }
    }
}
function getLink() {
    var linkJson = {};
    var name = $("input#uName").val();
    linkJson.url = $("input#uUrl").val();
    linkJson.type_id = $('select#uCategory option:selected').val();
    if (linkJson.type_id != 0)
        linkJson.name = $('select#uCategory option:selected').text();
    else
        linkJson.name = name;
    return linkJson;
}
function loadLink(id) {
    $('div#newLink').show('slow');
    var validator = $("#linksForm").validate();
    $("#uSave").removeClass("edit-add");
    $("#uSave").addClass("edit-save");
    validator.resetForm();
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.urls, id);
        if (itemIndex >= 0) {
            var linkItem = vizDataRaw.urls[itemIndex];

            $("input#uUrl").val(linkItem.url);
            $("select#uCategory").val(linkItem.type_id);
            if (linkItem.type_id == 0) {
                $("div#divName").show();
                $("input#uName").val(linkItem.name);
            }
            else
                $("div#divName").hide();

            $("input#uUrl").val(linkItem.url);
            $("#uSave > span").text("Save");
            $("#uSave").attr('value', id);

        }
    }
}
function resetLink() {
    var validator = $("#linksForm").validate();
    validator.resetForm();
    $("input#uName").val("");
    $("input#uUrl").val("");
    $('select#uCategory').val("");
    $("#uSave").attr('value', "");
}

////////////////////Profile////////////////////////

function bindProfile() {
    var profile = vizDataRaw.user_info;
    $("input#pTitle").val(profile.title);
    $("input#pfname").val(profile.first_name);
    $("input#plname").val(profile.last_name);
    //custom url
    if (profile.username) {
        $('#urlName').val(profile.username);
        $('#urlNameText').html(profile.username);
    }

    if (profile.location)
        $("input#pLocation").val(profile.location);
    

    $("textarea#pSummary").val(profile.summary);
}

function saveProfile() {
    if ($("#profileForm").valid()) {
        var profile = vizDataRaw.user_info;
        profile.title = $("input#pTitle").val();
        profile.first_name = $("input#pfname").val();
        profile.last_name = $("input#plname").val();
        profile.location = $("input#pLocation").val();
        profile.summary = $("textarea#pSummary").val();
        saveChanges([generateViz], "#profileSubmit");
		if($('#urlName').val() != profile.username) {
			saveUserName();
		};
		bindAllDialogs();
    }
}

function saveUserName() {
    $.ajax({
        type: 'PUT',
        url: '/user/username',
        data: $('#urlName').val(),
        success: function (resp) {
            if (resp.status === "Success") {
				currentUsername = $('#urlName').val();
				//TODO: update urls on share
				location.pathname = "/myviz";
            }
            else {
                $.jnotify("Sorry there was an error while saving your customized url. " + resp.message, "error", 1000);
            }
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.jnotify("Sorry there was an error while saving your customized url. " + textStatus, "error", 1000);
		}
    });
}

/////////////////////Work//////////////////////////////
function addEditWork() {
    if ($("#workForm").valid()) {
        var id = $("#wSave").attr('value');
        if (id) {
            editWork(id);
        }
        else
            addWork();
    }
}
function addWork() {
    var workJson = getWork();
    if (workJson) {
        vizDataRaw.timeline_work.push(workJson);
        vizDataRaw.timeline_work.sort(compare);
        vizDataRaw.timeline_work.reverse();
        saveChanges([generateViz, resetWork, bindPositions, hideNewWork], "#workSubmit");
    }
}

function editWork(id) {
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.timeline_work, id);
        if (itemIndex >= 0) {
            var workToChange = vizDataRaw.timeline_work[itemIndex];
            var changedWork = getWork();
            workToChange.company = changedWork.company;
            workToChange.position = changedWork.position;
            workToChange.start_date = changedWork.start_date;
            workToChange.end_date = changedWork.end_date;
            workToChange.summary = changedWork.summary;
            workToChange.is_current = changedWork.is_current;
            workToChange.location = changedWork.location;
            workToChange.is_bound = false;
            saveChanges([generateViz, resetWork, bindPositions, hideNewWork], "#workSubmit");
        }
    }
}
function deleteWork(id) {

    if (confirm("Are you sure you want to delete this?")) {
        if (id) {
            var itemIndex = findItemInArray(vizDataRaw.timeline_work, id);
            if (itemIndex >= 0) {
                vizDataRaw.timeline_work.splice(itemIndex, 1);
                saveChanges([generateViz, bindPositions]);
            }
        }
    }
}
function getWork() {
    var workJson = {};
    var title = $("input#wTitle").val();
    var company = $("input#wCompany").val();
    var location = $("input#wLocation").val();
    var sMonth = $('select#wStartMonth option:selected').val();
    var sYear = $('select#wStartYear option:selected').val();
    var eMonth = $('select#wEndMonth option:selected').val();
    var eYear = $('select#wEndYear option:selected').val();
    var summary = $("textarea#wSummary").val();
    workJson.company = company;
    workJson.position = title;
    workJson.start_date = getUnixTimeStamp(sYear, sMonth);
    if ($("input#wIsCurrent").prop("checked")) {
        workJson.end_date = null;
        workJson.is_current = true;
    }
    else {
        var day = daysInMonth(eMonth - 1, eYear);
        workJson.end_date = getUnixTimeStamp(eYear, eMonth, day);
        workJson.is_current = false;
    }
    workJson.summary = summary;
    workJson.location = location;

    return workJson;
}
function loadWork(id) {
    $('div#newWork').show('slow');
    var validator = $("#workForm").validate();
    validator.resetForm();
    $("#wSave").removeClass("edit-add");
    $("#wSave").addClass("edit-save");
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.timeline_work, id);
        if (itemIndex >= 0) {
            var workItem = vizDataRaw.timeline_work[itemIndex];
            $("input#wTitle").val(workItem.position);
            $("input#wCompany").val(workItem.company);
            $("input#wLocation").val(workItem.location);
            $('select#wStartYear').val(getDateFromString(workItem.start_date).getFullYear());
            $('select#wStartMonth').val(getDateFromString(workItem.start_date).getMonth() + 1);

            var isCurrent = $("#wIsCurrent");
            isCurrent.prop("checked", workItem.is_current);
            if (workItem.is_current) {
                removeWorkEndDate();
            }
            else {
                removeWorkEndDate();
                addWorkEndDate();
                $('select#wEndYear').val(getDateFromString(workItem.end_date).getFullYear());
                $('select#wEndMonth').val(getDateFromString(workItem.end_date).getMonth() + 1);
            }
            $("textarea#wSummary").val(workItem.summary);
            $("#wSave > span").text("Save");
            $("#wSave").attr("value", id);
        }
    }
}
function resetWork() {
    var validator = $("#workForm").validate();
    validator.resetForm();
    $("input#wTitle").val("");
    $("input#wCompany").val("");
    $('select#wStartYear').val("");
    $('select#wStartMonth').val("");
    $('select#wEndYear').val("");
    $('select#wEndMonth').val("");
    $("input#wLocation").val("");
    $("textarea#wSummary").val("");
    //$("#wSave > span").text("Save");
    $("#wSave").attr('value', "");
    var isCurrent = $("#wIsCurrent");
    isCurrent.prop("checked", false);
    removeWorkEndDate();
    addWorkEndDate();
}

function bindPositions() {
    $("ul#ul-work").empty();
    if (vizDataRaw.timeline_work && vizDataRaw.timeline_work.length > 0) {
        $.each(vizDataRaw.timeline_work, function (i, work) {
            var displayText = work.position + " @ " + work.company;
            $("ul#ul-work").append('<li><span>' + trucateText(displayText, globalListTextSize) + '</span><a href="#" id=' + work.id + ' class=\'edit-delete\' onclick=deleteWork(' + work.id + ')><span>Delete</span></a><a href="#" class=\'edit-edit\' onclick=loadWork(' + work.id + ')><span>Edit</span></a></li>');
        });
    }

}
function addWorkEndDate() {
    $("select#wEndMonth").addClass("required");
    $("select#wEndYear").addClass("required");
    $("select#wEndYear").addClass("dateRange");
    $("div#wDivEndMonth").show();
    $("div#wDivEndYear").show();

}
function removeWorkEndDate() {
    $("select#wEndMonth").removeClass("required");
    $("select#wEndYear").removeClass("required");
    $("select#wEndYear").removeClass("dateRange");
    $("div#wDivEndMonth").hide();
    $("div#wDivEndYear").hide();
}

///////////////////////Education////////////////////////////
function addEditEducation() {
    if ($("#educationForm").valid()) {
        var id = $("#eSave").attr('value');
        if (id) {
            editEducation(id);
        }
        else
            addEducation();
    }
}
function addEducation() {
    var eduJson = getEducation();
    if (eduJson) {
        vizDataRaw.timeline_education.push(eduJson);
        vizDataRaw.timeline_education.sort(compare);
        vizDataRaw.timeline_education.reverse();
        saveChanges([resetEducation, generateViz, bindEducation, hideNewEdu], "#educationSubmit");
    }
}
function editEducation(id) {
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.timeline_education, id);
        if (itemIndex >= 0) {
            var eduToChange = vizDataRaw.timeline_education[itemIndex];
            var changedEdu = getEducation();
            eduToChange.degree = changedEdu.degree;
            eduToChange.discipline = changedEdu.discipline;
            eduToChange.school = changedEdu.school;
            eduToChange.start_date = changedEdu.start_date;
            eduToChange.end_date = changedEdu.end_date;
            eduToChange.activities = changedEdu.activities;
            eduToChange.is_current = changedEdu.is_current;
            eduToChange.location = changedEdu.location;
            eduToChange.is_bound = false;
            saveChanges([resetEducation, generateViz, bindEducation, hideNewEdu], "#educationSubmit");

        }
    }
}
function deleteEducation(id) {

    if (confirm("Are you sure you want to delete this?")) {
        if (id) {
            var itemIndex = findItemInArray(vizDataRaw.timeline_education, id);
            if (itemIndex >= 0) {
                vizDataRaw.timeline_education.splice(itemIndex, 1);
                saveChanges([generateViz, bindEducation]);
            }
        }
    }
}
function getEducation() {
    var eduJson = {};
    var school = $("input#eSchool").val();
    var degree = $("input#eDegree").val();
    var program = $("input#eProgram").val();
    var location = $("input#eLocation").val();
    var sMonth = $('select#eStartMonth option:selected').val();
    var sYear = $('select#eStartYear option:selected').val();
    var eMonth = $('select#eEndMonth option:selected').val();
    var eYear = $('select#eEndYear option:selected').val();
    var activities = $("textarea#eSummary").val();
    eduJson.school = school;
    eduJson.degree = degree;
    eduJson.discipline = program;
    eduJson.start_date = getUnixTimeStamp(sYear, sMonth);
    var day = daysInMonth(eMonth - 1, eYear);
    eduJson.end_date = getUnixTimeStamp(eYear, eMonth, day);
    eduJson.activities = activities;
    eduJson.location = location;
    eduJson.is_current = false;
    return eduJson;
}
function loadEducation(id) {
    $('div#newEdu').show('slow');
    var validator = $("#educationForm").validate();
    validator.resetForm();
    $("#eSave").removeClass("edit-add");
    $("#eSave").addClass("edit-save");
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.timeline_education, id);
        if (itemIndex >= 0) {
            var eduItem = vizDataRaw.timeline_education[itemIndex];
            $("input#eSchool").val(eduItem.school);
            $("input#eDegree").val(eduItem.degree);
            $("input#eProgram").val(eduItem.discipline);
            $("input#eLocation").val(eduItem.location);
            $('select#eStartYear').val(getDateFromString(eduItem.start_date).getFullYear());
            $('select#eStartMonth').val(getDateFromString(eduItem.start_date).getMonth() + 1);
            $('select#eEndYear').val(getDateFromString(eduItem.end_date).getFullYear());
            $('select#eEndMonth').val(getDateFromString(eduItem.end_date).getMonth() + 1);
            $("textarea#eSummary").val(eduItem.activities);
            $("#eSave > span").text("Save");
            $("#eSave").attr('value', id);
        }
    }
}
function resetEducation() {
    var validator = $("#educationForm").validate();
    validator.resetForm();
    $("input#eSchool").val("");
    $("input#eDegree").val("");
    $("input#eProgram").val("");
    $("input#eLocation").val("");
    $('select#eStartYear').val("");
    $('select#eStartMonth').val("");
    $('select#eEndYear').val("");
    $('select#eEndMonth').val("");
    $("textarea#eSummary").val("");
    //$("#wSave > span").text("Save");
    $("#eSave").attr('value', "");
}

function bindEducation() {
    $("ul#ul-Education").empty();
    if (vizDataRaw.timeline_education && vizDataRaw.timeline_education.length > 0) {
        $.each(vizDataRaw.timeline_education, function (i, edu) {
            var displayText = "";
            if (edu.degree)
                displayText = displayText + edu.degree + " : ";
            displayText = displayText + edu.school;
            $("ul#ul-Education").append('<li><span>' + trucateText(displayText, globalListTextSize) + '</span><a href="#" id=' + edu.id + ' class=\'edit-delete\' onclick=deleteEducation(' + edu.id + ')><span>Delete</span></a><a href="#" class=\'edit-edit\' onclick=loadEducation(' + edu.id + ')><span>Edit</span></a></li>');
        });
    }
}
//////////////////////Skills//////////////////////////

function addEditSkill() {
    if ($("#skillsForm").valid()) {
        var id = $("#sSave").attr('value');
        if (id) {
            editSkill(id);
        }
        else
            addSkill();
    }
}
function addSkill() {
    var skillJson = getSkill();
    if (skillJson) {
        vizDataRaw.skills.push(skillJson);
        saveChanges([resetSkills, generateViz, bindSkills, hideNewSkill], "#skillSubmit");
    }
}
function editSkill(id) {
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.skills, id);
        if (itemIndex >= 0) {
            var skillToChange = vizDataRaw.skills[itemIndex];
            var changedSkill = getSkill();
            skillToChange.name = changedSkill.name;
            skillToChange.years = changedSkill.years;
            skillToChange.proficiency_id = changedSkill.proficiency_id;
            skillToChange.is_bound = false;
            $("#sSave").attr("value", id);
            $("#sSave > span").text("Save");
            saveChanges([resetSkills, generateViz, bindSkills, hideNewSkill], "#skillSubmit");
        }
    }
}
function deleteSkill(id) {

    if (confirm("Are you sure you want to delete this?")) {
        if (id) {
            var itemIndex = findItemInArray(vizDataRaw.skills, id);
            if (itemIndex >= 0) {
                vizDataRaw.skills.splice(itemIndex, 1);
                saveChanges([generateViz, bindSkills]);
            }
        }
    }
}
function getSkill() {
    var skillJson = {};
    var name = $("input#sName").val();
    var years = $("select#sYears").val();
    var prof = $("select#sProf").val();

    skillJson.name = name;
    skillJson.years = years;
    skillJson.proficiency_id = prof;
    return skillJson;
}
function loadSkill(id) {
    $('div#newSkill').show('slow');
    var validator = $("#skillsForm").validate();
    validator.resetForm();
    $("#sSave").removeClass("edit-add");
    $("#sSave").addClass("edit-save");
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.skills, id);
        if (itemIndex >= 0) {
            var skillItem = vizDataRaw.skills[itemIndex];
            $("input#sName").val(skillItem.name);
            $("select#sYears").val(skillItem.years);
            $("select#sProf").val(skillItem.proficiency_id);
            $("#sSave > span").text("Save");
            $("#sSave").attr('value', id);
        }
    }
}
function resetSkills() {
    var validator = $("#skillsForm").validate();
    validator.resetForm();
    $("input#sName").val("");
    $("select#sYears").val("");
    $("select#sProf").val("");
    //$("#wSave > span").text("Save");
    $("#sSave").attr('value', "");
}

function bindSkills() {
    $("ul#ul-Skills").empty();
    if (vizDataRaw.skills && vizDataRaw.skills.length > 0) {
        $.each(vizDataRaw.skills, function (i, skill) {
            $("ul#ul-Skills").append('<li><span>' + trucateText(skill.name, globalListTextSize) + '</span><a href="#" id=' + skill.id + ' class=\'edit-delete\' onclick=deleteSkill(' + skill.id + ')><span>Delete</span></a><a href="#" class=\'edit-edit\' onclick=loadSkill(' + skill.id + ')><span>Edit</span></a></li>');
        });
        if (vizDataRaw.skills.length >= 5) {
            $('div#divNewSkillButton').hide();
        }
        else {
            $('div#divNewSkillButton').show();
        }
    }
}
function findItemInArray(list, id) {
    var itemIndex = -1;
    for (var i = 0; i < list.length; i++) {
        if (list[i].id && list[i].id == id) {
            itemIndex = i;
            break;
        }
    }
    return itemIndex;
}
function saveChanges(funcArray,element, dataToSave) {
    var saveData = dataToSave || vizDataRaw;
    $.ajax({
        type: 'PUT',
        url: '/user/data',
        data: jsonSerialize(saveData),
        success: function (resp) {
            //TODO: Find a better way
            if (resp.status === 'Success') {
                $.ajax({
                    type: 'GET',
                    url: '/user/data',
                    beforeSend: showEditLoadingImage(element),
                    statusCode: {
                        500: function () {
                            $.jnotify("Sorry an error occurred while processing your request.", "error", 300);
                        }
                    },
                    success: function (resp) {
                        vizDataRaw = resp;
                        if (funcArray) {
                            $.each(funcArray, function (i, func) {
                                func.call();
                            });
                        }
                        $.jnotify("Your changes have been successfully saved.", "success", 300);
                    },
					error: function (jqXHR, textStatus, errorThrown) {
						$.jnotify("Sorry there was an error while saving your changes. " + textStatus, "error", 1000);
						hideEditLoadingImage(element);
					}
                }).success(hideEditLoadingImage(element));
            }
            else
                $.jnotify("Sorry an error occurred while making your changes.", "error", 300);
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.jnotify("Sorry there was an error while saving your changes. " + textStatus, "error", 1000);
		}
    });
}
////////////////////////Languages/////////////////////////
function bindLanguages() {
    $("ul#ul-Language").empty();
    if (vizDataRaw.languages && vizDataRaw.languages.length>0) {
        $.each(vizDataRaw.languages, function (i, language) {
            var languageText = language.name + " : " + language.proficiency;
            $("ul#ul-Language").append('<li><span>' + trucateText(languageText, 28) + '</span><a href="#" id=' + language.id + ' class=\'edit-delete\' onclick=deleteLanguage(' + language.id + ')><span>Delete</span></a><a href="#" class=\'edit-edit\' onclick=loadLanguage(' + language.id + ')><span>Edit</span></a></li>');
        });
    }

}

function addEditLanguage() {
    if ($("#languagesForm").valid()) {
        var id = $("#lSave").attr('value');
        if (id) {
            editLanguage(id);
        }
        else
            addLanguage();
    }
}
function addLanguage() {
    var languageJson = getLanguage();
    if (languageJson) {
        vizDataRaw.languages.push(languageJson);
        saveChanges([resetLanguage, generateViz, bindLanguages, hideNewLanguage], "#languageSubmit");
    }
}
function editLanguage(id) {
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.languages, id);
        if (itemIndex >= 0) {
            var languageToChange = vizDataRaw.languages[itemIndex];
            var changedLanguage = getLanguage();
            languageToChange.name = changedLanguage.name;
            languageToChange.proficiency_id = changedLanguage.proficiency_id;
            languageToChange.is_bound = false;
            saveChanges([resetLanguage, generateViz, bindLanguages, hideNewLanguage], "#languageSubmit");

        }
    }
}
function deleteLanguage(id) {

    if (confirm("Are you sure you want to delete this?")) {
        if (id) {
            var itemIndex = findItemInArray(vizDataRaw.languages, id);
            if (itemIndex >= 0) {
                vizDataRaw.languages.splice(itemIndex, 1);
                saveChanges([generateViz, bindLanguages]);
            }
        }
    }
}
function getLanguage() {
    var languageJson = {};
    var name = $("input#lName").val();
    var prof = $("select#lProf").val();
    languageJson.name = name;
    languageJson.proficiency_id = prof;
    return languageJson;
}
function loadLanguage(id) {
    $('div#newLanguage').show('slow');
    var validator = $("#languagesForm").validate();
    validator.resetForm();
    $("#lSave").removeClass("edit-add");
    $("#lSave").addClass("edit-save");
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.languages, id);
        if (itemIndex >= 0) {
            var languageItem = vizDataRaw.languages[itemIndex];
            $("input#lName").val(languageItem.name);
            $("select#lProf").val(languageItem.proficiency_id);
            $("#lSave > span").text("Save");
            $("#lSave").attr('value', id);
        }
    }
}
function resetLanguage() {
    var validator = $("#languagesForm").validate();
    validator.resetForm();
    $("input#lName").val("");
    $("select#lProf").val("");
    //$("#wSave > span").text("Save");
    $("#lSave").attr('value', "");
}


///////////////////Interests////////////////////

function bindInterests() {
    $("ul#ul-Interest").empty();
    if (vizDataRaw.interests && vizDataRaw.interests.length > 0) {
        $.each(vizDataRaw.interests, function (i, interest) {
            $("ul#ul-Interest").append('<li><span>' + trucateText(interest.name, globalListTextSize) + '</span><a href="#" id=' + interest.id + ' class=\'edit-delete\' onclick=deleteInterest(' + interest.id + ')><span>Delete</span></a><a href="#" class=\'edit-edit\' onclick=loadInterest(' + interest.id + ')><span>Edit</span></a></li>');
        });
        if (vizDataRaw.interests.length >= 6) {
            $('div#divNewInterestButton').hide();
        }
        else {
            $('div#divNewInterestButton').show();
        }
    }
}

function addEditInterest() {
    if ($("#interestsForm").valid()) {
        var id = $("#iSave").attr('value');
        if (id) {
            editInterest(id);
        }
        else
            addInterest();
    }
}
function addInterest() {
    var interestJson = getInterest();
    if (interestJson) {
        vizDataRaw.interests.push(interestJson);
        saveChanges([resetInterest, generateViz, bindInterests, hideNewInterest], "#interestSubmit");
    }
}
function editInterest(id) {
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.interests, id);
        if (itemIndex >= 0) {
            var interestToChange = vizDataRaw.interests[itemIndex];
            var changedInterest = getInterest();
            interestToChange.name = changedInterest.name;
            interestToChange.weight = changedInterest.weight;
            interestToChange.is_bound = false;
            saveChanges([resetInterest, generateViz, bindInterests, hideNewInterest], "#interestSubmit");

        }
    }
}
function deleteInterest(id) {

    if (confirm("Are you sure you want to delete this?")) {
        if (id) {
            var itemIndex = findItemInArray(vizDataRaw.interests, id);
            if (itemIndex >= 0) {
                vizDataRaw.interests.splice(itemIndex, 1);
                saveChanges([generateViz, bindInterests]);
            }
        }
    }
}
function getInterest() {
    var interestJson = {};
    var name = $("input#iName").val();
    interestJson.name = name;
    interestJson.weight = $("select#iWeight").val();
    return interestJson;
}
function loadInterest(id) {
    $('div#newInterest').show('slow');
    var validator = $("#interestsForm").validate();
    validator.resetForm();
    $("#iSave").removeClass("edit-add");
    $("#iSave").addClass("edit-save");
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.interests, id);
        if (itemIndex >= 0) {
            var interestItem = vizDataRaw.interests[itemIndex];
            $("input#iName").val(interestItem.name);
            $("select#iWeight").val(interestItem.weight);
            $("#iSave > span").text("Save");
            $("#iSave").attr('value', id);
        }
    }
}
function resetInterest() {
    var validator = $("#interestsForm").validate();
    validator.resetForm();
    $("input#iName").val("");
    $("select#iWeight").val("");
    $("#iSave").attr('value', "");
    $("#iSave > span").text("Add");
    $("#iSave").removeClass("edit-save");
    $("#iSave").addClass("edit-add");
}

///////////////////My Stats///////////////////////

function bindStats() {
    $("ul#ul-Stats").empty();
    if (vizDataRaw.mystats && vizDataRaw.mystats.length>0) {
        $.each(vizDataRaw.mystats, function (i, stat) {
            var displayText = stat.label;
            $("ul#ul-Stats").append('<li><span>' + trucateText(displayText, globalListTextSize) + '</span><a href="#" id=' + stat.id + ' class=\'edit-delete\' onclick=deleteStat(' + stat.id + ')><span>Delete</span></a><a href="#" class=\'edit-edit\' onclick=loadStat(' + stat.id + ')><span>Edit</span></a></li>');
        });
        if (vizDataRaw.mystats.length >= 4) {
            $('div#divNewStatButton').hide();
        }
        else {
            $('div#divNewStatButton').show();
        }
    }
}
function addEditStat() {
    if ($("#statsForm").valid()) {
        var id = $("#mSave").attr('value');
        if (id) {
            editStat(id);
        }
        else
            addStat();
    }
}
function addStat() {
    var statJson = getStat();
    if (statJson) {
        vizDataRaw.mystats.push(statJson);
        saveChanges([resetStat, bindStats, hideNewStat, generateViz], "#statSubmit");
    }
}
function editStat(id) {
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.mystats, id);
        if (itemIndex >= 0) {
            var statToChange = vizDataRaw.mystats[itemIndex];
            var changedStat = getStat();
            statToChange.label = changedStat.label;
            statToChange.number = changedStat.number;
            statToChange.unit = changedStat.unit;
			statToChange.category=changedStat.category;
			statToChange.icon=changedStat.category;;
            statToChange.is_bound = false;
            saveChanges([resetStat, bindStats, hideNewStat, generateViz], "#statSubmit");

        }
    }
}
function deleteStat(id) {

    if (confirm("Are you sure you want to delete this?")) {
        if (id) {
            var itemIndex = findItemInArray(vizDataRaw.mystats, id);
            if (itemIndex >= 0) {
                vizDataRaw.mystats.splice(itemIndex, 1);
                saveChanges([ bindStats,generateViz]);
            }
        }
    }
}
function getStat() {
    var statJson = {};
    statJson.category = $('select#mCategory option:selected').val();
    statJson.label = $('select#mCategory option:selected').text();    
	statJson.icon=statJson.category;
    if( statJson.category==0)
    {
        statJson.label=$("input#mLabel").val();
        statJson.unit=$('select#mUnit option:selected').val();
        statJson.number = $("input#mStat").val();
    }
    else if( statJson.category==1)
    {
        statJson.number = $("input#mStat").val();
    }
    return statJson;
}
function loadStat(id) {
    $('div#newStat').show('slow');
    var validator = $("#statsForm").validate();
    validator.resetForm();
    $("#mSave").removeClass("edit-add");
    $("#mSave").addClass("edit-save");
    if (id) {
        var itemIndex = findItemInArray(vizDataRaw.mystats, id);
        if (itemIndex >= 0) {
            var statItem = vizDataRaw.mystats[itemIndex];

            $("select#mCategory").val(statItem.category);
            if (statItem.category == 0) {

                $("#divLabel").show();
                $("#divStat").show();
                $("#divUnit").show();
                $("input#mLabel").val(statItem.label);
                $("select#mUnit").val(statItem.unit);
                $("input#mStat").val(statItem.number);
            }
            else if (statItem.category == 1) {
                $("#divLabel").hide();
                //$("#divStat").show();
				$("#divStat").hide();
                $("#divUnit").hide();
                $("input#mStat").val(statItem.number);
            }
            else {
                $("#divLabel").hide();
                $("#divStat").hide();
                $("#divUnit").hide();
            }
            $("#mSave > span").text("Save");
            $("#mSave").attr('value', id);

        }
    }
}
function resetStat() {
    var validator = $("#statsForm").validate();
    validator.resetForm();    
    $("input#mLabel").val("");
    $('select#mCategory').val("");
    $('select#mUnit').val("");
    $("input#mStat").val("");
    $("#mSave").attr('value', "");
}


//////////////////////////////////////////////////
///////////////////Helper Methods/////////////////

function getUnixTimeStamp(year, month, day) {
    var d = 1;
    if (day)
        d = day;
    return Math.round(new Date(year, month - 1, d).getTime() / 1000);
}

function compare(a, b) {
    if (a.start_date < b.start_date)
        return -1;
    if (a.start_date > b.start_date)
        return 1;
    return 0;
}

function bindAllDialogs() {

	$("#edit-content-nav > li:not(#editProfile)").css("color","#333333");
	$('#edit-content-nav > li').qtip('hide');
	
	$('#editWork > a').click(function () {
		$("#dialog_work").dialog("open");
	});
	$('#editEducation > a').click(function () {
		$("#dialog_education").dialog("open");
	});
	$('#editSkills > a').click(function () {
		$("#dialog_skills").dialog("open");
	});
	$('#editLanguages > a').click(function () {
		$("#dialog_languages").dialog("open");
	});
	$('#editInterests > a').click(function () {
		$("#dialog_interests").dialog("open");
	});
	$('#editLinks > a').click(function () {
		$("#dialog_links").dialog("open");
	});
	$('#editAwards > a').click(function () {
		$("#dialog_awards").dialog("open");
	});
	$('#editRecommendations > a').click(function () {
		$("#dialog_Recommendations").dialog("open");
	});
	$('#editPortfolio > a').click(function () {
		$("#dialog_Portfolio").dialog("open");
	});
	$('#editMyStats > a').click(function () {
		$("#dialog_MyStats").dialog("open");
	});

}

function setDialogs() {
    //Open dialogs
    showDialog("dialog_profile");
    showDialog("dialog_work");
    showDialog("dialog_education");
    showDialog("dialog_skills");
    showDialog("dialog_languages");
    showDialog("dialog_interests");
    showDialog("dialog_links");
    showDialog("dialog_awards");
    showDialog("dialog_Recommendations");
	showDialog("dialog_Portfolio");
	showDialog("dialog_MyStats");

    //setUserContactInfo();
	$('#editProfile > a').click(function () {
		$.ajax({
			type: 'GET',
			url: '/user/data',        
			success: function (resp) {
				vizDataRaw = resp;
				console.log("ajax called");
				currentUsername = vizDataRaw.user_info.username;
				$('#urlName').val(currentUsername);
				$('#urlNameText').html(currentUsername);
			}
		});
        $("#dialog_profile").dialog("open");
    });
	
}

function setUserNameLogic() {
    var timeout;
    var delay = 1000;
    var isLoading = false;
    $('#urlName').keyup(function () {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (!isLoading) {
            var name = $(this).val();
            $('#urlNameText').html(name);
            if (name && name.length > 2) {
                timeout = setTimeout(function () {
                    isLoading = true;
                    $.ajax({
                        type: 'GET',
                        url: '/ajax/username?username=' + escape(name),                        
                        success: function (resp) {
                            var style = (resp && resp.code === 200) ? "color:Green" : "color:Red";
                            $('#divNameStatus').html("<span style='" + style + "'>" + resp.message + "</span>").fadeIn().delay(1000).fadeOut('slow');
                        }
                    });
                    setTimeout(function () { isLoading = false; }, 1000);
                }, delay);
            }
        }
    });
}

function showEditLoadingImage(element) {
    
    if (element) {        
        $('.edit-options').hide();
        $(element).append('<div id="loading-image" style="text-align:center;"><img src="/media/img/ajax-loader.gif" alt="Loading..." /></div>');
    }
}

function hideEditLoadingImage(element) {
   
    if (element) {       
        $('.edit-options').show();
        $('#loading-image').remove();
    }
}