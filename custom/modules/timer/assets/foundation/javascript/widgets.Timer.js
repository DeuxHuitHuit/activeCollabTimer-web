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
			console.log(apiUrl);
			
			window.App.Timer.Controller.load();
		}
	};
	
	// export to App.widgets
	window.App.widgets.Timer = TimerWidget;
	
})();