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
	_timerProject = null,
	_timerTask = null,
	
	TIMER_COOKIE = 'active-collab-timer',
	
	_getNow = function () {
		return (new Date()).getTime();
	},
	
	createFromJson = function(json) {
		_timer = new Timer(jsonTimer.projectId, jsonTimer.taskId, jsonTimer.startDate, jsonTimer.duration);
		
	},
	
	Timer = function (projectId, taskId, duration, startDate ) {
		this.projectId = projectId;
		this.taskId = taskId;
		this.duration = duration || 0;
		this.startDate = startDate || null;
	},
	
	TimerController = {
		init: function () {
			var jsonTimer = JSON.parse($.cookie(TIMER_COOKIE));
			if (!!jsonTimer && !!jsonTimer.taskId && !!jsonTimer.projectId) {
				createFromJson(jsonTimer);
			}
		},
		create: function(project, task) {
			_timer = new Timer(project, task);
			_timerProject = project;
			_timerTask = task;
			this.save();
		},
		save: function () {
			$.cookie(TIMER_COOKIE, JSON.stringify(_timer), {expires:30, path: '/timer'});
		},
		
		remove: function () {
			$.cookie(TIMER_COOKIE, null);
			_timer = null;
		},
		hasTimer: function() {
			return !!_timer;
		},
		getTimerInfo : function() {
			return {
				timer: _timer,
				task: _timerTask,
				project: _timerProject
			}
		}
	};
	
	Timer.prototype.start = function() {
		this.startDate = _getNow();
	};
	
	Timer.prototype.stop = function() {
		this.duration = this.duration + (_getNow() - this.startDate);
		this.startDate = null;
	};
	
	Timer.prototype.getDuration = function () {
		var dur = this.duration;
		if(!!this.startDate) {
			dur = dur + (_getNow() - this.startDate);
		}
		return dur;
	};
	
	Timer.prototype.isRunning = function() {
		return !!this.startDate;
	};
	
	// export to App
	window.App.Timer = window.App.Timer || {};
	window.App.Timer.Controller = TimerController;
	
})();