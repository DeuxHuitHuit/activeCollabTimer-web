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
	_apiUrl = "",
	_compagnyItems = null,
	_userToken = "",
	_userId,
	
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
	
	/*findUserInCompagnyRecur(index) {
		var compagny = _compagnyItems[0],
			compagnyId = compagny.id;
			
		$.ajax({
			url: _apiUrl + "&path_info=people/" + compagnyId,
			success: function(data) {
				var c = 0,
					found = false;
				//Loop to find the user
				for(c = 0; c < 0; c++) {
					if(false == _userToken) {
						//_userId = 
						found = true;
						break;
					}
				}
				//the user is not found
				//look for an other compagny
				if(!found) {
					if (_compagnyItems.length > index) {
						findUserInCompagnyRecur(index + 1);
					}
				}
			}
		});
	}*/
	
	/*findUserId = function() {
		if(_compagnyItems.length > 0) {
			findUserInCompagnyRecur(0);
		}
	},*/
	
	/*loadCompagny = function(callback) {
		//load all company
		
		$.ajax({
			url: _apiUrl + "&path_info=people",
			success: function(data) {
				_compagnyItems = data;
				callback();
			}
		});
	},*/
	removeCurrentCookie = function() {
		$.cookie(TIMER_COOKIE, null, {path: '/timer'});
		_timer = null;
	},
	
	TimerController = {
		init: function(apiUrl,userId) {
			_apiUrl = $("<div/>").html(apiUrl).text();
			_userToken = _apiUrl.split("auth_api_token=")[1];
			_userId = userId;
			//loadCompagny(findUserId);
		},
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
			removeCurrentCookie();
		},
		
		submit: function(hours, minutes, projectId, taskId, deleteTimer, callback) {
			var 
			
			successCallback = function() {
				//Erase data
				if(deleteTimer) {
					removeCurrentCookie();
				}else {
					_timer.reset();
				}
				callback(true);
			},
			errorCallback = function() {
				callback(false);
			};
			/*
			submitted = submitted
			time[user_id] = 1
			time[value] = 3:30
			time[record_date] = 2008-05-01
			*/
			
			$.ajax({
				type: "POST",
				url: _apiUrl + "&path_info=projects/projects/tracking/time/add", //+ projectId + "/time/add",
				data : {submitted : "submitted",
						time_record : {
							user_id : '1',
							value : hours + ":" + minutes,
							record_date : "2012-08-09",
							job_type_id: '1'
						}
					},
				success: successCallback,
				error : errorCallback
			});
			
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
	
	Timer.prototype.reset = function() {
		this.isRunning = false;
		this.startDate = null;
		this.duration = 0;
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