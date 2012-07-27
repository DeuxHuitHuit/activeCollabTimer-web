/*
 * @author Deux Huit Huit
 * 
 * Active Collab Timer
 * TimerWidget Class
 */
(function () {
	
	"use strict";
	
	var 

	TimerWidget = {
		init: function (id, apiUrl) {
			this.container = $('#' + id);
			window.App.Timer.Controller.init(apiUrl);
			window.App.Timer.Projects.init(apiUrl);
			window.App.Timer.Projects.preLoad();
			
			window.App.widgets.Timer.PageTimer.init();
			window.App.widgets.Timer.PageProjects.init();
			window.App.widgets.Timer.PageProjectTasks.init();
			
		}
	};
	
	// export to App.widgets
	window.App.widgets.Timer = TimerWidget;
	
})();

/*
 * @author Deux Huit Huit
 * 
 * Active Collab Timer
 * Page Timer
 */
(function () {

	"use strict";
	
	var 
	
	startBtn = null,
	submitBtn = null,
	addBtn = null,
	currentTaskWrap = null,
	currentTaskNameHolder = null,
	timeoutAnim = null,
	timeoutAnimFlag = false,
	pageTimer = null,
	currentTime = null,
	
	
	showPage = function(currentPage) {
		updateUI();
		pageTimer.fadeTo(100,1);
		$(currentPage).fadeTo(100,0,function() {
			currentPage.hide();
		});
	},
	
	timeoutAnimCallback = function() {
		//refresh ui
		updateUI();
		$('#timer-time-current-separator',currentTime).toggle();
		if(window.App.Timer.Controller.hasTimer()) {
			var timerInfo = window.App.Timer.Controller.getTimerInfo();
			
			if(timerInfo.timer.isRunning()) {
				//relaunch ui refresh
				timeoutAnim = setTimeout(timeoutAnimCallback,980);
			}
		}
	},
	
	timerStartButtonClicked = function(e) {
		
		if(window.App.Timer.Controller.hasTimer()) {
			var timerInfo = window.App.Timer.Controller.getTimerInfo();
			if(!timerInfo.timer.isRunning()) {
				//Start timer
				timerInfo.timer.start();
				window.App.Timer.Controller.save();
				updateUI();
				//Launch timeout for ui refresh
				$('#timer-time-current-separator',currentTime).toggle(false);
				timeoutAnim = setTimeout(timeoutAnimCallback,980);
			}else {
				//stop timer
				timerInfo.timer.stop();
			}
		}
		return false;
	},
	
	timerSubmitButtonClicked = function(e) {
		if(window.App.Timer.Controller.hasTimer()) {
			var timerInfo = window.App.Timer.Controller.getTimerInfo();
			if(timerInfo.timer.getDuration() > 0) {
				//Do job
			}
		}
		return false;
	},
		
	timerAddButtonClicked = function(e) {
		window.App.widgets.Timer.PageProjects.show(pageTimer);
		return false;
	},
	
	initVariables = function() {
		pageTimer = $('#page-timer');
		startBtn = $('#timer-start',pageTimer);
		submitBtn = $('#timer-submit',pageTimer);
		addBtn = $('#timer-add',pageTimer);
		currentTime = $('#timer-time-current',pageTimer);
		currentTaskWrap = $('#timer-current-task',pageTimer);
		currentTaskNameHolder = $('span',currentTaskWrap);
	},
	
	updateUI = function() {
		if(window.App.Timer.Controller.hasTimer()) {
			var timerInfo = window.App.Timer.Controller.getTimerInfo();
			startBtn.css({opacity: 1}).removeClass('disabled');
			addBtn.hide();
			currentTaskNameHolder.html(timerInfo.project.name + ': ' + timerInfo.task.name);
			
			if(timerInfo.timer.getDuration() > 0) {
				submitBtn.css({opacity: 1}).removeClass('disabled');
			}else {
				submitBtn.css({opacity: .2}).addClass('disabled');
			}
			var dur = timerInfo.timer.getDuration(),
				hours  = Math.floor(dur / 1000 / 60 / 60),
				minutes = Math.floor(dur / 1000 / 60),
				secondes = Math.floor(dur / 1000 % 60),
				hoursFormat = (hours < 10) ? '0' + hours : '' + hours,
				minutesFormat = (minutes < 10) ? '0' + minutes : '' + minutes;
			$('#timer-time-current-hours',currentTime).html(hoursFormat);
			$('#timer-time-current-minutes',currentTime).html(minutesFormat);
			
			
			if(timerInfo.timer.isRunning()) {
				$('span span',startBtn).html('Stop');
			}else {
				$('span span',startBtn).html('Start');
			}
			
		}else {
			addBtn.show();
			startBtn.css({opacity: .2}).addClass('disabled');
			submitBtn.css({opacity: .2}).addClass('disabled');
			currentTime.html('00:00');
		}
	},
	
	bindButton = function() {
		//Attach to Start button
		startBtn.click(timerStartButtonClicked);
		//Attach to Submit button
		submitBtn.click(timerSubmitButtonClicked);
		//Attach to add timer button
		addBtn.click(timerAddButtonClicked);
	},
	
	pageTimerController = {
		init: function () {
			initVariables();
			updateUI();
			bindButton();
		}, 
		show : showPage,
	};
	
	// export to App.widgets
	window.App.widgets.Timer.PageTimer = pageTimerController;
	
})();

/*
 * @author Deux Huit Huit
 * 
 * Active Collab Timer
 * Page Projects
 */
(function () {

	"use strict";
	
	var 
	
	pageProjects = null,
	projectList = null,
	projects = null,
	
	projectClicked = function(e) {
		var t = $(this),
			projectId = t.data('id'),
			c = 0,
			project = null;
			
		for(c = 0; c < projects.length; c++) {
			if(projects[c].id == projectId) {
				project = projects[c];
				break;
			}
		}
		window.App.widgets.Timer.PageProjectTasks.show(pageProjects,project);
	},
	
	getProjectListAsyncCallback = function(data) {
		//save projects
		projects = data;
		//todo : hide loading
		
		//Populate list
		projectList.html('');
		if(data) {
			var c = 0;
			for(c = 0; c < data.length; c++) {
				var it = $('<li>'),
					btn = $('<a>'); 
					btn.data({id:data[c].id});
					btn.html(data[c].name);
				it.html(btn);
				projectList.append(it);
			}
			$('a',projectList).click(projectClicked);
		}else {
			//no data
			var it = $('<li>'),
				btnRetour = $('<a>');
				
			btnRetour.html('Retour');
			
			it.html('No project');
			it.append('<br />');
			it.append(btnRetour);
			
			projectList.append(it);
		}
	},
	
	showPage = function(currentPage) {
		//todo : show loading
		
		//load data
		window.App.Timer.Projects.getProjectsListAsync(getProjectListAsyncCallback);
		
		//anim transition
		pageProjects.fadeTo(100,1);
		$(currentPage).fadeTo(100,0,function() {
			//after data
			currentPage.hide();
		});
	},
	
	initVariables = function() {
		pageProjects = $('#page-projects');
		projectList = $('ul',pageProjects);
	},
	
	pageProjectsController = {
		init: function () {
			initVariables();
		},
		show : showPage
	};
	
	// export to App.widgets
	window.App.widgets.Timer.PageProjects = pageProjectsController;
	
})();

/*
 * @author Deux Huit Huit
 * 
 * Active Collab Timer
 * Page project Tasks
 */
(function () {

	"use strict";
	
	var 
	
	pageProjectTasks = null,
	taskList = null,
	project = null,
	projectTasks = null,
	
	taskClicked = function() {
		var t = $(this),
			taskId = t.data('id'),
			c = 0,
			task = null;
			
		for(c = 0; c < projectTasks.length; c++) {
			if(projectTasks[c].id == taskId) {
				task = projectTasks[c];
				break;
			}
		}
		window.App.Timer.Controller.create(project,task);
		window.App.widgets.Timer.PageTimer.show(pageProjectTasks);
	},
	
	getProjectTaskListAsyncCallback = function(data) {
		//save task
		projectTasks = data;
		//todo : hide loading
		
		//Populate list
		taskList.html('');
		if(data) {
			var c = 0;
			for(c = 0; c < data.length; c++) {
				var it = $('<li>'),
					btn = $('<a>');
					btn.data({id : data[c].id});
					btn.html(data[c].name);
				it.html(btn);
				taskList.append(it);
			}
			$('a',taskList).click(taskClicked);
		}else {
			//no data
			var it = $('<li>'),
				btnRetour = $('<a>');
				
			btnRetour.html('Retour');
			
			it.html('No task');
			it.append('<br />');
			it.append(btnRetour);
			
			taskList.append(it);
		}
		
	},
	
	showPage = function(currentPage, projectItem) {
		//Save project info
		project = projectItem;
		
		//todo : show loading
		
		//load data
		window.App.Timer.Projects.getProjectTaskListAsync(project.id, getProjectTaskListAsyncCallback);
		
		//anim transition
		$(currentPage).fadeTo(100,0,function() {
			currentPage.hide();
			pageProjectTasks.fadeTo(100,1);
		});
	},
	
	initVariables = function() {
		pageProjectTasks = $('#page-project-tasks');
		taskList = $('ul',pageProjectTasks);
	},
	
	pageProjectTasksController = {
		init: function () {
			initVariables();
		},
		show : showPage
	};
	
	// export to App.widgets
	window.App.widgets.Timer.PageProjectTasks = pageProjectTasksController;
	
})();
