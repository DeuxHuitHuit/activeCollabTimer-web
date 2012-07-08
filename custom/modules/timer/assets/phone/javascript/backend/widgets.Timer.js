/*
 * @author Deux Huit Huit
 * 
 * Active Collab Timer
 * Timer Class
 */
(function () {
	
	"use strict";
	
	var 
	
	TimerWidget = {
		init: function (id) {
			this.container = $('#' + id);
		}
	},
	
	_getNow = function () {
		return (new Date()).getTime();
	},
	
	Timer = function () {
		this.start = _getNow();
	};
	
		Timer.prototype.getTime = function () {
			
		};
	
	// export to App.widgets
	window.App.widgets.Timer = TimerWidget;
	
})();