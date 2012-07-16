/*
 * @author Deux Huit Huit
 * 
 * Active Collab Timer
 * Timer and TimerController Classes
 */
(function () {
	
	"use strict";
	
	var
	
	_timer = null,
	
	TIMER_COOKIE = 'active-collab-timer',
	
	_getNow = function () {
		return (new Date()).getTime();
	},
	
	Timer = function (taskId, start, end) {
		this.start = start || _getNow();
		this.end = end || null;
		this.taskId = taskId;
	},
	
	TimerController = {
		create: function(taskId) {
			_timer = new Timer(taskId);
		},
		save: function () {
			$.cookie(TIMER_COOKIE, JSON.stringify(_timer), {expires:30, path: '/timer'});
		},
		load: function () {
			var jsonTimer = JSON.parse($.cookie(TIMER_COOKIE));
			if (!!jsonTimer && !!jsonTimer.taskId) {
				_timer = new Timer(jsonTimer.taskId, jsonTimer.start, jsonTimer.end);
			}
		},
		remove: function () {
			$.cookie(TIMER_COOKIE, null);
			_timer = null;
		}
	};
	
	Timer.prototype.getDuration = function () {
		return this.end - this.start;
	};
	
	// export to App
	window.App.Timer = window.App.Timer || {};
	window.App.Timer.Controller = TimerController;
	
})();