<div id="timer" data-dividertheme="c" data-theme="c" >
<div id="page-timer" data-theme="c" class="ui-body ui-body-c">
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
			<h3>Current Task : </h3>
			<span id="timer-current-task-name">None...</span><br/>
			
			<a id="timer-current-task-delete" data-icon="delete" data-role="button" >Delete</a>
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
<div id="page-projects" class="ui-body ui-body-c">
	<h2>Projects :</h2>
	<section>
		<ul data-role="listview">
			
		</ul>
	</section>
</div>

<div id="page-project-tasks" class="ui-body ui-body-c" >
	<h2>Tasks :</h2>
	<section>
		<ul data-role="listview">
			
		</ul>
	</section>
</div>

<div id="page-submit" class="ui-body ui-body-c">
	
	<section>
		<h2>Time submit</h2>
		<p><strong>Project : </strong><span id="page-submit-project"></span></p>
		<p><strong>Task : </strong><span id="page-submit-task"></span></p>
		<form>
		<div class="ui-grid-a">
			<div class="ui-block-a">
				<label for="input-hours">Hours</label>
				<input type="number" id="input-hours" />
			</div>
			<div class="ui-block-b">
				<label for="input-minutes">Minutes</label>
				<input type="number" id="input-minutes" />
			</div>
		</div>
		<div class="ui-body-e">
		<input type="checkbox" id="chk-delete-timer" data-mini="true"><label for="chk-delete-timer">Delete timer on submit</label>
		</div>
		<div class="ui-body-b">
			<a href="#submit" id="page-submit-btn" data-role="button">Submit</a>
		</div>
		</form>
	</section>
</div>

</div>
<script type="text/javascript">
	App.widgets.Timer.init('timer', '{$api_url}');
</script>