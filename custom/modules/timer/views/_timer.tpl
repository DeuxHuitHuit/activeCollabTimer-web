<div id="timer" data-dividertheme="j" data-theme="j">
<div id="page-timer">
	<section>
		<div id="timer-display">
		<header>
			<div id="timer-start-wrap">
			{wrap_buttons id='timer-start'}
				{button}Start{/button}
			{/wrap_buttons}
			</div>
			<div id="timer-time-wrap">
				<div id="timer-time">
					<div id="timer-time-current">
						00:00
					</div>
				</div>
			</div>
			<div id="timer-submit-wrap">
			{wrap_buttons id='timer-submit'}
				{button}Submit{/button}
			{/wrap_buttons}
			</div>
		</header>
		</div>

		<div id="timer-current-task">
			<h3>Current Task</h3>
			<span><em>None...</em></span><br/>
			<a id="timer-current-task-delete">Delete</a>
		</div>

		<div id="timer-footer">
		<footer>
			<div id="timer-add-wrap">
				{wrap_buttons id='timer-add'}
					{button}Pick a Task{/button}
				{/wrap_buttons}
			</div>
		</footer>
		</div>

	</section>
</div>
<div id="page-projects">
	<p>Projects :</p>
	<section>
		<ul>
			
		</ul>
	</section>
</div>

<div id="page-project-tasks">
	<p>Tasks :</p>
	<section>
		<ul>
			
		</ul>
	</section>
</div>

</div>
<script type="text/javascript">
	App.widgets.Timer.init('timer', '{$api_url}');
</script>