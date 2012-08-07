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
	_projectId = 0,
	_taskId = 0,
	_tempCallback,
	_projectLoaded = false,
	_taskLoaded = false,
	
	TIMER_COOKIE = 'active-collab-timer',
	
	_getNow = function () {
		return (new Date()).getTime();
	},
	launchCallbackOnLoaded = function() {
		if(_projectLoaded && _taskLoaded) {
			_projectLoaded = false;
			_taskLoaded = false;
			if(_tempCallback) {
				_tempCallback();
				_tempCallback = null;
			}
		}
	},
	loadProjectListCallback = function(data) {
		var c = 0;
			
		for(c = 0; c < data.length; c++) {
			if(data[c].id == _projectId) {
				_timerProject = data[c];
				break;
			}
		}
		_projectLoaded = true;
		launchCallbackOnLoaded();
	},
	
	loadTaskListCallback = function(data) {
		var c = 0;
			
		for(c = 0; c < data.length; c++) {
			if(data[c].id == _taskId) {
				_timerTask = data[c];
				break;
			}
		}
		_taskLoaded = true;
		launchCallbackOnLoaded();
	},
	
	createFromJson = function(json) {
		_projectId = json.projectId;
		_taskId = json.taskId;
		_timer = new Timer(json.projectId, json.taskId, json.duration, json.startDate);
		
		//load associated project info
		window.App.Timer.Projects.getProjectsListAsync(loadProjectListCallback);
		
		//load associated task info
		window.App.Timer.Projects.getProjectTaskListAsync(json.projectId, loadTaskListCallback);
	},
	
	Timer = function (projectId, taskId, duration, startDate ) {
		this.projectId = projectId;
		this.taskId = taskId;
		this.duration = duration || 0;
		if(startDate) {
			this.isRunning = true;
		}else {
			this.isRunning = false;
		}
		this.startDate = startDate || null;
	},
	
	TimerController = {
		load: function (callback) {
			var jsonTimer = JSON.parse($.cookie(TIMER_COOKIE));
			if (!!jsonTimer && !!jsonTimer.taskId && !!jsonTimer.projectId) {
				_tempCallback = callback;
				createFromJson(jsonTimer);
			}else {
				if(callback) {
					callback();
				}
			}
		},
		create: function(project, task) {
			_projectId = project.idd;
			_taskId = task.id;
			_timer = new Timer(project.id, task.id);
			_timerProject = project;
			_timerTask = task;
			this.save();
		},
		save: function () {
			$.cookie(TIMER_COOKIE, JSON.stringify(_timer), {expires:30, path: '/timer'});
		},
		
		remove: function () {
			$.cookie(TIMER_COOKIE, null, {path: '/timer'});
			_timer = null;
		},
		hasTimer: function() {
			return _timer != null;
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
		this.isRunning = true;
		this.startDate = _getNow();
	};
	
	Timer.prototype.stop = function() {
		this.duration = this.duration + (_getNow() - this.startDate);
		this.startDate = null;
		this.isRunning = false;
	};
	
	Timer.prototype.getDuration = function () {
		var dur = this.duration;
		if(this.isRunning) {
			dur = dur + (_getNow() - this.startDate);
		}
		return dur;
	};
	
	// export to App
	window.App.Timer = window.App.Timer || {};
	window.App.Timer.Controller = TimerController;
	
})();