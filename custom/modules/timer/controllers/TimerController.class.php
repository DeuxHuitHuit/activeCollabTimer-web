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
      
      //$this->wireframe->tabs->clear();
      //$this->wireframe->tabs->add('calendar', lang('Calendar'), Router::assemble('dashboard_calendar'), null, true);
      
      //EventsManager::trigger('on_calendar_tabs', array(&$this->wireframe->tabs, &$this->logged_user));

      $this->wireframe->breadcrumbs->add('timer', /*lang(*/'Timer'/*)*/, Router::assemble('timer'));
      $this->wireframe->setCurrentMenuItem('timer');
    } // __construct

    /**
     * Timer
     */
    function index() {
      
    } // timer


  }