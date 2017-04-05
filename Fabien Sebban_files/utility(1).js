//utility functions
function drawTooltip(item, tipText, atPosition) {
    var atPos = atPosition || 'bottom center';
    $(item).qtip({
        content: {
            text: tipText
        },
        position: {
			viewport: $(window),
			adjust: {
				method: 'flip'
			},
            my: 'top center',
            at: atPos
        },
        show: {            
            solo: true // Only show one tooltip at a time
        },
        hide: 'unfocus mouseleave',
        style: {
            classes: 'ui-tooltip-tipsy ui-dark'
        }
    });

}

function drawWizardTip(item, tipText, myPosition, atPosition, target) {
	var myPos = myPosition || 'left center';
	var atPos = atPosition || 'top center';
	var trigger = target || false;
    $(item).qtip({
        content: {
            text: tipText
        },
        position: {
			viewport: $(window),
			adjust: {
				method: 'flip'
			},
            my: myPos,
            at: atPos
        },
        style: {
            classes: 'ui-tooltip-tipsy ui-pink ui-tooltip-shadow'
        },
		show: {
			event: false, // Don't specify a show event...
			ready: true, // ... but show the tooltip when ready
			target: trigger
		},
		hide: {
			fixed: true,
			event: false,
			inactive: 3000
        }
    });
	
}

function drawTip(element, text, myPosition, atPosition, show, hide, style, showNow, showOnce, theTarget, isSolo) {
	var el = (typeof element === "string") ? $(element) : element;
	var myPos = myPosition || 'left center';
	var atPos = atPosition || 'top center';
	var tipShow = (typeof show === 'undefined') ? 'mouseenter' : show;
	var tipHide = (typeof hide === 'undefined') ? 'mouseleave' : hide;
	var tipStyle = style || 'ui-pink ui-tooltip-shadow';
	var now = showNow || false;
	var once = showOnce || false;
	var target = theTarget || el;
	target = (typeof target === "string") ? $(target) : target;
	
	var solo = isSolo || false;
	
	var hideFunction = !once ? false : function(event, api) {
		$(event.target).qtip('disable')
	}
	
	tipHide = !tipHide ? false : {'event': tipHide};
	el.qtip({
        content: {
            text: text
        },
        position: {
			adjust: {
				method: 'shift flip'
			},
            my: myPos,
            at: atPos
		},
		show: {
			event: tipShow,
			target: target,
			solo: solo
		},
		hide: tipHide,
        style: {
            classes: 'ui-tooltip-tipsy ' + tipStyle
        },
		events: {
			hide: hideFunction
		}
	});
	if (now) {
		el.qtip('show');
	}
}

function drawSaveTip(item, tipText, myPosition, atPosition) {
	var myPos = myPosition || 'left center';
	var atPos = atPosition || 'top center';
    $(item).qtip({
        content: {
			text: tipText
        },
        position: {
			viewport: $(window),
			adjust: {
				method: 'flip'
			},
            my: myPos,
            at: atPos
        },
        style: {
            classes: 'ui-tooltip-tipsy ui-dark ui-tooltip-shadow'
        },
		show: {
			event: false, // Don't specify a show event...
			ready: true, // ... but show the tooltip when ready
		},
		hide: {
			event: false,
			inactive: 3000
		}
    });
	
}

function sortByRange(a, b) {
	return a.range - b.range;
}
function sortByHeight(a, b) {
	return a.height - b.height;
}
function sortByStart(a, b) {
	return getDateFromString(a.start_date).getTime() - getDateFromString(b.start_date).getTime();
}

function trucateText(text, length) {
	var textSize = length || 25;
		
	var truncatedText = text || " ";
	if (truncatedText.length > textSize)
		truncatedText = truncatedText.substring(0, textSize) + "..";

	return truncatedText;
}
function getDateFromString(datestring) {
	//var ms = Date.parse(datestring);
	var date = new Date(datestring*1000);
	return date;
	//return new Date(ms);
}

function addNewlines(str, afterEvery) {
	var result = "";
	while (str.length > 0) {
		result += str.substring(0, afterEvery);
		if (str.length >= afterEvery)
			result += '\n';
		str = str.substring(afterEvery);
	}
	return result;
}
function getWrappedText(str, totalLength,lineBreakLength,maxLines) {
    var wrapped = "";

    if (str) {
        str = str.replace(/(<([^>]+)>)/ig, "");
        str = str.replace(/(\r\n|\n|\r)/gm, "");
        if (str.length == totalLength) {
            return str;
        }
        else {
            var strArray = str.split(" ");
            if (strArray && strArray.length > 0) {
                var lengthCounter = 1;
                var lengthToCompare = lineBreakLength;
                for (var i = 0; i < strArray.length; i++) {
                    wrapped = wrapped + " " + strArray[i];
                   
                    if (wrapped.length >= totalLength)
                        return wrapped + "..";
                    if (wrapped.length >= lengthToCompare) {
                        if (maxLines && lengthCounter >= maxLines)
                            return wrapped + "..";
                        wrapped = wrapped + '\n';
                        lengthCounter++;
                        lengthToCompare = wrapped.length + lineBreakLength;
                    }
                   
                                      
                }
            }
        }
    }
    return wrapped;
}
function executeFunctionByName(functionName, context /*, args */) {  
	vizData = clone(vizDataRaw);
	var args = Array.prototype.slice.call(arguments).splice(2);
	var namespaces = functionName.split(".");
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		if (namespaces[i] in context)
			context = context[namespaces[i]];
		else
			break;
	}
	if (func in context) {
		return context[func].apply(this, args);
	} else {
		// Try again only once
		context = window;
		var ns = ("temp1.generate").split(".");
		var fn = namespaces.pop();
		for (var i = 0; i < ns.length; i++) {
		if (ns[i] in context)
			context = context[ns[i]];
		else
			break;
		}
		return context.apply(this, args);	// This may fail if javascript doesn't load properly
	}
}

function clearPaper(paper) {
	var paperDom = paper.canvas;
	paperDom.parentNode.removeChild(paperDom);
}
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}

function clone(obj) {
	if (obj == null || typeof (obj) != 'object')
		return obj;

	var temp = obj.constructor(); // changed

	for (var key in obj)
		temp[key] = clone(obj[key]);
	return temp;
	//return jQuery.extend(true, obj.length?[]:{}, obj);
}
function formatXml(xml) {
	var formatted = '';
	var reg = /(>)(<)(\/*)/g;
	xml = xml.replace(reg, '$1\r\n$2$3');
	var pad = 0;
	jQuery.each(xml.split('\r\n'), function (index, node) {
		var indent = 0;
		if (node.match(/.+<\/\w[^>]*>$/)) {
			indent = 0;
		} else if (node.match(/^<\/\w/)) {
			if (pad != 0) {
				pad -= 1;
			}
		} else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
			indent = 1;
		} else {
			indent = 0;
		}

		var padding = '';
		for (var i = 0; i < pad; i++) {
			padding += '  ';
		}

		formatted += padding + node + '\r\n';
		pad += indent;
	});

	return formatted;
}
function quote(string) {
	var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
	var _meta = {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"' : '\\"',
		'\\': '\\\\'
	};
	if (string.match(_escapeable)) {
		return '"' + string.replace(_escapeable, function (a) {
			var c = _meta[a];
			if (typeof c === 'string') return c;
			c = a.charCodeAt();
			return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
		}) + '"';
	}
	return '"' + string + '"';
}

function jsonSerialize(o)
{
	if (typeof(JSON) == 'object' && JSON.stringify)
		return JSON.stringify(o);
	
	var type = typeof(o);
	if (o === null)
		return "null";
	if (type == "undefined")
		return undefined;
	if (type == "number" || type == "boolean")
		return o + "";
	if (type == "string")
		return $.quoteString(o);

	if (type == 'object')
	{
		if (typeof o.toJSON == "function") 
			return $.toJSON( o.toJSON() );
		
		if (o.constructor === Date)
		{
			var month = o.getUTCMonth() + 1;
			if (month < 10) month = '0' + month;

			var day = o.getUTCDate();
			if (day < 10) day = '0' + day;

			var year = o.getUTCFullYear();
			
			var hours = o.getUTCHours();
			if (hours < 10) hours = '0' + hours;
			
			var minutes = o.getUTCMinutes();
			if (minutes < 10) minutes = '0' + minutes;
			
			var seconds = o.getUTCSeconds();
			if (seconds < 10) seconds = '0' + seconds;
			
			var milli = o.getUTCMilliseconds();
			if (milli < 100) milli = '0' + milli;
			if (milli < 10) milli = '0' + milli;

			return '"' + year + '-' + month + '-' + day + 'T' +
						 hours + ':' + minutes + ':' + seconds + 
						 '.' + milli + 'Z"'; 
		}

		if (o.constructor === Array) 
		{
			var ret = [];
			for (var i = 0; i < o.length; i++)
				ret.push( $.toJSON(o[i]) || "null" );

			return "[" + ret.join(",") + "]";
		}
	
		var pairs = [];
		for (var k in o) {
			var name;
			var type = typeof k;

			if (type == "number")
				name = '"' + k + '"';
			else if (type == "string")
				name = $.quoteString(k);
			else
				continue;  //skip non-string or number keys
		
			if (typeof o[k] == "function") 
				continue;  //skip pairs where the value is a function.
		
			var val = $.toJSON(o[k]);
		
			pairs.push(name + ":" + val);
		}

		return "{" + pairs.join(", ") + "}";
	}
};
// Google Analytics shortcuts
function href(url, event, value) {
	track(event, value)
	setTimeout('window.location="'+url+'"',100);
}
function track(event, value) {
	var _gaq = _gaq || [];
	_gaq.push(['_trackEvent', event, value]);
}
// KISSmetrics shortcuts
function kissto(url, event, value) {
	kiss(event, value)
	setTimeout('window.location="'+url+'"',100);
}
/*
function kiss(event, value) {
	var _kmq = _kmq || [];
	_kmq.push( (value)? (["record", event, value]) : (["record", event]) );
}
*/
// catches url parameter
$.extend({
  getUrlVar: function(){
	var vars = window.location.href.substr(window.location.href.indexOf('?')+1);
	return vars;
  },
  getUrlStr: function(){
	return window.location.href.toString();
  }
});

function daysInMonth(iMonth, iYear)
{
	return 32 - new Date(iYear, iMonth, 32).getDate();
}

/** 
 * Attach keyup event on an element with an ajax call
**/
function attachKeyUpAjax(element, url, success, error) {
	var el = (typeof element === "string") ? $(element) : element;
	var timeout;
	var delay = 1000;
	var isLoading = false;
	el.keyup(function (event) {
		if (event.keyCode === '9'
				|| event.keyCode == '13'
				|| event.keyCode == '10') {
			return;
		}
		if (timeout) {
			clearTimeout(timeout);
		}
		if (!isLoading) {
			var value = $(this).val();
			timeout = setTimeout(function () {
				isLoading = true;
				$.ajax({
					type: 'GET',
					url: (typeof url === "function") ? url(value) : url,                        
					success: function (resp) {
						if (!resp) { return; }
						if (success) { success(resp, value); }
					}
				});
				setTimeout(function () { isLoading = false; }, 1000);
			}, delay);
		}
	});
}