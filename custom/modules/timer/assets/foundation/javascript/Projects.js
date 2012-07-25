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
	
	Projects = {
		init : function(apiUrl) {
			apiProjectUrl = $("<div/>").html(apiUrl).text() + '&path_info=projects';
		},
		load : function (callback) {
			$.ajax({
				url: apiProjectUrl,
				success: function(data) {
					projectItems = data;
					
					if(!!callback) {
						callback();
					}
				}
			});
		},
		getProjectsListAsync : function(callback) {
			if(!!projectItems) {
				this.load(callback)
			}else {
				if(!!callback) {
					callback.call(projectItems);
				}
			}
		},
		getProjectTaskListAsync : function(projectId, callback) {
			if(!!projectId) {
				this.load(callback)
			}else {
				if(!!callback) {
					callback.call(projectItems);
				}
			}
		}
	};
	
	// export to App
	window.App.Timer = window.App.Timer || {};
	window.App.Timer.Projects = Projects;
	
})();