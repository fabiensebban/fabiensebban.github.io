// ======================================================
// Haxorz
// ======================================================
Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) { size++; }
    }
    return size;
};

var Viz = {};

(function () {
	function V() {	
		// Constructor
	}
	V.version = "0.0.1";
	V.widgets = {};
	
	// ======================================================
	// Event Bus
	// ======================================================
	V.eventBus = {
		channels: {},
		listen: function (event, callback) {	// Listen 
			if (!this.channels[event]) {
				this.channels[event] = {sequence: 0, listeners: {}};
			}
			var channel = this.channels[event],
				id = channel.sequence;
			channel.listeners[id] = callback;
			channel.sequence += 1;
			return id;
		},
		unlisten: function (event, listener_id) {
			this.channels[event].listeners[listener_id] = null;
			delete this.channels[event].listeners[listener_id];
		},
		shout: function (source, event, args) {
			if (!this.channels[event]) {
				return;
			}
			var id,
				listeners = this.channels[event].listeners;
			for (id in listeners) {
				if (listeners.hasOwnProperty(id)) {
					listeners[id](source, args);
				}
			}
		}
	};
	// ======================================================
	// Cache
	// ======================================================
	V.cache = {
		default_expiry: 60 * 5,	// 5 minutes
		list: {},
		now: function () {
			return Math.round((new Date()).getTime() / 1000);
		},
		put: function (key, data, expiry) {
			var expires = expiry || this.default_expiry;
			this.list[key] = {payload: data, expires: this.now() + expires};
		},
		get: function (key) {
			if (this.list.hasOwnProperty(key)) {
				if ((this.now() - this.list[key].expires) <= 0) {
					return this.list[key].payload;
				}
			}
			return null;
		},
		remove: function (key) {
			var result;
			if (this.list.hasOwnProperty(key)) {
				result = this.list[key];
				delete this.list[key];
			}
			return result;
		},
		exists: function (key) {
			if (typeof key !== "string") {
				var result = true,
					item;
				for (item in key) {
					if (key.hasOwnProperty(item)) {
						result = result && this.exists(key[item]);
					}
				}
				return result;
			} else {
				return this.list.hasOwnProperty(key);
			}
		},
		isExpired: function (key) {
			if (this.list.hasOwnProperty(key)) {
				if ((this.now() - this.list[key].expires) <= 0) {
					return false;
				}
			}
			return true;
		}
	};
	
	// ======================================================
	// AJAX Data Stream
	// ======================================================
	V.dataStream = {
		what_url_map: {
			"self_viz_data": "/user/data",
			"dashboard_stats": "/ajax/dashboard/quick",
			"dashboard_referral": "/ajax/dashboard/referral",
			"dashboard_industry": "/ajax/dashboard/industry",
			"dashboard_hits_30": "/ajax/dashboard/hits?days_back=30",
			"dashboard_hits_14": "/ajax/dashboard/hits?days_back=14",
			"dashboard_hits_7": "/ajax/dashboard/hits?days_back=7"
		},
		queue: {},
		bind: function (what, url) {
			var old = null;
			if (this.what_url_map.hasOwnProperty(what)) {
				old = this.what_url_map[what];
			}
			this.what_url_map[what] = url;
			return old;
		},
		unbind: function (what) {
			var result;
			if (this.what_url_map.hasOwnProperty(what)) {
				result = this.what_url_map[what];
				delete this.what_url_map[what];
				
				Viz.cache.remove(result);
			}
			return result;
		},
		request: function (source, what, options, callback) {
			var opt = options || {},
				url = this.what_url_map.hasOwnProperty(what) ? this.what_url_map[what] : null,
				ignoreCache = opt.ignoreCache || false;

			if (!url) {
				throw "Data Stream Request failed: No url mapped for name '" + what + "'";
			}

			// Cache
			if (!ignoreCache) {
				var cached = Viz.cache.get(url);
				if (cached && callback) {
					callback(source, true, Viz.clone(cached));
					return;
				}
			}
			
			// Queue
			if (Object.size(this.queue) === 0) {
				Viz.eventBus.shout(source, "viz.dataStream.queue_started", null);
			}
			
			if (this.queue.hasOwnProperty(url)) {
				this.queue[url].push({source: source, callback: callback});
				return;
			} else {
				this.queue[url] = [{source: source, callback: callback}];
			}
			//console.log(url);
			// Get resource
			$.ajax({
				type: 'GET',
				url: url,
				success: function (resp) {
					if (!resp) { return; }
					var queue = Viz.dataStream.queue;
					if (queue.hasOwnProperty(url)) {
						Viz.cache.put(url, resp);
						var i;
						for (i = 0; i < queue[url].length; ++i) {
							if (queue[url][i].callback) {
								queue[url][i].callback(queue[url][i].source, true, Viz.clone(resp));
							}
						}
					}
					Viz.eventBus.shout(source, "viz.dataStream.recieved", {what: what});	// Notify that a resource was recieved
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var queue = Viz.dataStream.queue;
					var i;
					for (i = 0; i < queue[url].length; ++i) {
						if (queue[url][i].callback) {
							queue[url][i].callback(queue[url][i].source, false, {code: jqXHR.status, message: textStatus});
						}
					}
					Viz.eventBus.shout(source, "viz.dataStream.error", {code: jqXHR.status, message: textStatus});	// Notify that a resource was recieved
				},
				complete: function (jqXHR, textStatus) {
					var queue = Viz.dataStream.queue;
					delete queue[url];
					if (Object.size(queue) === 0) {
						Viz.eventBus.shout(source, "viz.dataStream.queue_empty", null);
					}
				}
			});
		}
	};
	
	// ======================================================
	// Widget
	// ======================================================
	V.widget = {
		list: {},
		queue: {},
		fetch: function (url, callback, options) {
			var opt = options || {},
				cb = callback,
				ignoreCache = opt.ignoreCache || false;
			
			// Cache
			if (!ignoreCache) {
				var cached = Viz.cache.get(url);
				if (cached && callback) {
					callback(url);
					return;
				}
			}
			
			var fetchCallback = function (url, callback) {	// Callback function to handle queue
				Viz.cache.put(url, "Loaded JS");
				var queue = Viz.widget.queue;
				delete queue[url];
				
				if (Object.size(queue) === 0) {
					Viz.eventBus.shout(null, "kore.widget.queue.empty", null);
				}
				
				if (callback) {
					callback(url);
				}
			};
			
			if (typeof url === "string") {
				//console.log("Appending script " + url);
				if (Object.size(this.queue) === 0) {
					Viz.eventBus.shout(null, "kore.widget.queue.started", null);
				}
				
				if (this.queue.hasOwnProperty(url)) {
					this.queue[url].push({source: null, callback: callback});
					return;
				} else {
					this.queue[url] = [{source: null, callback: callback}];
				}

				var scriptTag = document.createElement('script');
				//scriptTag.type = 'text/javascript';
				//scriptTag.async = true;
				scriptTag.src = url;
				scriptTag.onreadystatechange = function () {
					if (this.readyState === 'complete' || this.readyState === 'loaded') {
						this.onreadystatechange = null;
						fetchCallback(scriptTag.src, cb);
					}
				};
				scriptTag.onload = function () {
					fetchCallback(scriptTag.src, cb);
				};
				
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(scriptTag, s);
			} else {
				//console.log("Processing script array...");
				// Assume an array
				var i;
				for (i in url) {
					if (url.hasOwnProperty(i)) {
						this.fetch(url[i], cb);
					}
				}
			}
		},
		
		register: function (name, dependencies, createWidgetFn) {
			if (arguments.length === 2) {
				createWidgetFn = dependencies;
				dependencies = null;
			}
			var result = (this.list.hasOwnProperty(name)) ? this.list[name].create : null;
			this.list[name] = {dependencies: dependencies, create: createWidgetFn};
			//Viz.eventBus.shout(this, "viz.widget.register", name);
			return result;
		},
		create: function (name, options, parent) {
			var i, errors = [];
			if (!this.list.hasOwnProperty(name)) {
				throw name + " does not exist";
			}
			var widget = this.list[name];
			// Check dependencies
			if (widget.dependencies) {
				for (i = 0; i < widget.dependencies.length; ++i) {
					if (!Viz.widget.exists(widget.dependencies[i])) {
						errors.push(widget.dependencies[i]);
					}
				}
				if (errors.length > 0) {
					throw "Widget dependency check failed: " + errors.join();
				}
			}
			
			var result = widget.create(options);

			// extend functionality
			if (options && options.hasOwnProperty("id")) {
				result.id = options.id;
			}
			if (options && options.hasOwnProperty("className")) {
				result.className = options["className"];
			}
			
			result.typeOf = name;
			
			if (parent) {
				result.parent = parent;
			}
			return result;
		},
		exists: function (name) {
			if (typeof name !== "string") {
				var result = true,
					item;
				for (item in name) {
					if (name.hasOwnProperty(item)) {
						result = result && this.exists(name[item]);
					}
				}
				return result;
			} else {
				return this.list.hasOwnProperty(name);
			}
		}
	};

	// ======================================================
	// Helper Functions
	// ======================================================
	V.preloadImage = function (image) {
		if (typeof image !== "string") {
			for (item in image) {
				if (image.hasOwnProperty(item)) {
					this.preloadImage(image[item]);
				}
			}
		} else {
			var img = new Image();
			img.src = image;
		}
	};
	function oralize(array, key, outputkey, func) {	// Helper function for normalize and abnormalize
		func = func || function (a, b) { return a + b; };
		outputkey = outputkey || 'norm';
		var i = 0,
			quantity = 0;
		if (typeof array[i] === 'object') {
			for (i = 0; i < array.length; ++i) {
				quantity = (typeof array[i][key] === 'undefined' || array[i][key] === null) ? quantity : func(quantity, array[i][key]);
			}
			for (i = 0; i < array.length; ++i) {
				array[i][outputkey] = (typeof array[i][key] === 'undefined' || array[i][key] === null) ? 0 : array[i][key] / quantity;
			}
		} else {
			for (i = 0; i < array.length; ++i) {
				quantity = (array[i] === null) ? quantity : func(quantity, array[i]);
			}
			for (i = 0; i < array.length; ++i) {
				array[i] = (array[i] === null) ? 0 : array[i] / quantity;
			}
		}
	}
	V.normalize = function (array, key, outputkey) {	// Percentage of pie
		oralize(array, key, outputkey);
		return array;
    };
	V.abnormalize = function (array, key, outputkey) {	// Percentage of max
		outputkey = outputkey || 'abnorm';
		oralize(array, key, outputkey, Math.max);
		return array;
    };
	V.stripHidden = function (data) {
		var i = 0,
			result = [];
		for (i = 0; i < data.length; ++i) {
			if (data[i].is_visible) { result.push(data[i]); }
		}
		return result;
	};
	V.clone = function (obj) {
		if (obj === null || typeof (obj) !== 'object') { return obj; }
		var key = {},
			temp = obj.constructor(); // changed
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				temp[key] = this.clone(obj[key]);
			}
		}
		return temp;
	};
	V.limit = function (array, limit) {
		array.splice(limit, array.length - limit);
		return array;
	};
	V.randomSample = function (array, size) {
		size = size || array.length;
		var result = [];
		var i;
		for (i = 0; i < size; i++) {
			var random = Math.floor(Math.random() * (size - 1));
			if (typeof array === 'string') {
				result += array.charAt(random);
			} else {
				result.push(array[random]);
			}
		}
	};
	V.createTag = function (tag, identifier) {
		var newTag = document.createElement(tag),
			id = identifier || null;
		if (id) { newTag.setAttribute('id', id); }
		return newTag;
	};
	V.getPageY = function (dom) {
		console.log(dom.offsetTop);
		return dom.offsetTop + (dom.offsetParent ? this.getPageY(dom.offsetParent) : 0);
	};
	V.getPageX = function (dom) {
		return dom.offsetLeft + (dom.offsetParent ? this.getPageX(dom.offsetParent) : 0);
	};
	V.isTooLight = function (hexcolor) {
		if (hexcolor[0] === "#") {
			hexcolor = hexcolor.slice(1);
		}
		var r = parseInt(hexcolor.substr(0, 2), 16);
		var g = parseInt(hexcolor.substr(2, 2), 16);
		var b = parseInt(hexcolor.substr(4, 2), 16);
		var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
		return yiq >= 128;
	};
	V.hexColor = function (color) {
		var t = document.createElement('div');
		t.style.display = 'none';
		t.style.color = color;
		document.body.appendChild(t);

		return color;
	};
	V.lightenColor = function (col, amt) {
		col = V.hexColor(col);
		if (col[0] === "#") {
			col = col.slice(1);
		}

		var num = parseInt(col, 16);

		var r = (num >> 16) + amt;
		r = Math.min(255, Math.max(0, r));

		var b = ((num >> 8) & 0x00FF) + amt;
		b = Math.min(255, Math.max(0, b));

		var g = (num & 0x0000FF) + amt;
		g = Math.min(255, Math.max(0, g));

		return "#" + (g | (b << 8) | (r << 16)).toString(16);
	};
	V.guid = function () {
		var S4 = function () {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};
	V.clamp = function(min, max, value) {
		return Math.min(max, Math.max(min, value));
	}
	V.snapTo = function(rounding, value) {
		var remainder = value % rounding;
		return (remainder < (rounding / 2)) ? value - remainder : value + (rounding - remainder);
	}
	V.jsonSerialize = function (o) {
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
	
	// ======================================================
	// Assign namespace
	// ======================================================
	Viz = V;
}());
