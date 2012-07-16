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

      // set wireframe
      $this->wireframe->breadcrumbs->add('timer', lang('Timer'), TimerModule::getTimerRoute());
      $this->wireframe->setCurrentMenuItem('timer');
      $this->wireframe->actions->clear();

      // assign template variable
      $this->smarty->assign('api_url', ROOT_URL . '/api.php?format=json&auth_api_token=1-HQVcG1x3xfSNIMypMkDsAVT8W670QwGwhI387Tta');
    } // __construct

    /**
     * Timer
     */
    function index() {

    } // timer


  }