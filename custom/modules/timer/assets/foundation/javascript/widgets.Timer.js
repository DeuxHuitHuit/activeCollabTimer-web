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
			window.App.Timer.Projects.load();
			
			window.App.widgets.Timer.PageTimer.init();
			window.App.widgets.Timer.PageProjects.init();
			
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
	pageTimer = null,
	
	showPage = function(currentPage) {
		pageTimer.fadeTo(100,1);
		$(currentPage).fadeTo(100,0,function() {pageTimer.hide()});
	},
	
	getProjectListAsyncDelegate = function(data) {
		//Hide Project List loading
		
		//Populate list
		
	},
	
	timerStartButtonClicked = function(e) {
	
		return false;
	},
	
	timerSubmitButtonClicked = function(e) {
	
		return false;
	},
		
	timerAddButtonClicked = function(e) {
		window.App.widgets.Timer.PageProjects.show();
		
		//Show project list loading
		//window.App.Timer.Projects.getProjectListAsync(getProjectListAsyncDelegate);
		
		return false;
	},
	
	initVariables = function() {
		startBtn = $('#timer-start');
		submitBtn = $('#timer-submit');
		addBtn = $('#timer-add');
		pageProject = $('#page-projects');
		pageTimer = $('#page-timer');
	},
	
	updateUI = function() {
		if(window.App.Timer.Controller.hasTimer()) {
			startBtn.show();
			addBtn.hide();
		}else {
			startBtn.hide();
			submitBtn.hide();
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
		show : showPage
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
	
	getProjectListAsyncCallback = function(data) {
		//todo : hide loading
		
		//todo: Populate list
		
	},
	
	showPage = function(currentPage) {
		//todo : show loading
		
		//load data
		window.App.Timer.Projects.getProjectListAsync(getProjectListAsyncCallback);
		
		//anim transition
		pageProjects.fadeTo(100,1);
		$(currentPage).fadeTo(100,0,function() {
			//after data
			pageTimer.hide();
			
		});
	},
	
	initVariables = function() {
		pageProjects = $('#page-projects');
	},
	
	/*updateUI = function() {
	
	},*/
	
	bindBtns = function() {
		//Attach to Start button
		startBtn.click(timerStartButtonClicked);
		//Attach to Submit button
		submitBtn.click(timerSubmitButtonClicked);
		//Attach to add timer button
		addBtn.click(timerAddButtonClicked);
	},
	
	pageProjectsController = {
		init: function () {
			initVariables();
			//updateUI();
			bindBtns();
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
	
	getProjectTaskListAsyncCallback = function(data) {
		//todo : hide loading
		
		//todo: Populate list
		
	},
	
	showPage = function(currentPage) {
		//todo : show loading
		
		//load data
		window.App.Timer.Projects.getProjectTaskListAsync(getProjectTaskListAsyncCallback);
		
		//anim transition
		pageProjects.fadeTo(100,1);
		$(currentPage).fadeTo(100,0,function() {
			//after data
			pageTimer.hide();
			
		});
	},
	
	initVariables = function() {
		pageProjects = $('#page-projects');
	},
	
	/*updateUI = function() {
	
	},*/
	
	bindBtns = function() {
		//Attach to Start button
		startBtn.click(timerStartButtonClicked);
		//Attach to Submit button
		submitBtn.click(timerSubmitButtonClicked);
		//Attach to add timer button
		addBtn.click(timerAddButtonClicked);
	},
	
	pageProjectsController = {
		init: function () {
			initVariables();
			//updateUI();
			bindBtns();
		},
		show : showPage
	};
	
	// export to App.widgets
	window.App.widgets.Timer.PageProjects = pageProjectsController;
	
})();
