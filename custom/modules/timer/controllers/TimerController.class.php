<?php

  // Build on top of backend controller
  AngieApplication::useController('backend', ENVIRONMENT_FRAMEWORK_INJECT_INTO);

  /**
   * System level timer
   *
   * @package activeCollab.modules.timer
   * @subpackage controllers
   */
  class TimerController extends BackendController  {

    /**
     * Active module
     *
     * @var string
     */
    protected $active_module = WEB_TIMER_MODULE;

    /**
     * Prepare controller
     */
    function __before() {
      parent::__before();

      $this->wireframe->tabs->clear();
      $this->wireframe->tabs->add('calendar', lang('Timer'), TimerModule::getTimerRoute(), null, true);

      // Custom event
      EventsManager::trigger('on_timer_tabs', array(&$this->wireframe->tabs, &$this->logged_user));

      $this->wireframe->breadcrumbs->add('timer', lang('Timer'), TimerModule::getTimerRoute());
      $this->wireframe->setCurrentMenuItem('timer');
    } // __construct

    /**
     * Timer
     */
    function index() {

    } // timer


  }