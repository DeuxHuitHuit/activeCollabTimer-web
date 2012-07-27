/*
 * @author Deux Huit Huit
 * 
 * Active Collab Timer
 * Projects Class
 */
(function () {
	
	"use strict";
	
	var 
	projectItems = null,
	lastLoad = null,
	apiProjectUrl = null,
	
	loadProjects = function (callback) {
		$.ajax({
			url: apiProjectUrl,
			success: function(data) {
				projectItems = data;
				
				if(!!callback) {
					callback(data);
				}
			}
		});
	},
	
	loadTasks = function (projectId, callback) {
		$.ajax({
			url: apiProjectUrl + '/' + projectId + '/tasks',
			success: function(data) {
				//todo: store data
				
				if(!!callback) {
					callback(data);
				}
			}
		});
	},
	
	Projects = {
		init : function(apiUrl) {
			apiProjectUrl = $("<div/>").html(apiUrl).text() + '&path_info=projects';
		},
		
		getProjectsListAsync : function(callback) {
			if(!!!projectItems) {
				loadProjects(callback)
			}else {
				if(!!callback) {
					callback(projectItems);
				}
			}
		},
		
		getProjectTaskListAsync : function(projectId, callback) {
			if(projectId > 0) {
				loadTasks(projectId,callback)
			}else {
				if(!!callback) {
					callback({});
				}
			}
		}
	};
	
	// export to App
	window.App.Timer = window.App.Timer || {};
	window.App.Timer.Projects = Projects;
	
})();