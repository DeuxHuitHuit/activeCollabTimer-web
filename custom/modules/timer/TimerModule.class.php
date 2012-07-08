<?php
  /**
   * WebTimer module definition
   *
   * @package activeCollab.modules.timer
   */
  class TimerModule extends AngieModule {

    /**
     * Short module name
     *
     * @var string
     */
    protected $name = 'timer';

    /**
     * Is system module flag
     *
     * @var boolean
     */
    var $is_system = false;

    /**
     * Module version
     *
     * @var string
     */
    protected $version = '1.0';

    /**
     * Name of the project object class (or classes) that this module uses
     *
     * @var string
     */
    protected $project_object_classes = array('Timer');

    /**
     * Define module routes
     */
    function defineRoutes() {
		// Timer routes
		Router::map('timer', 'timer', array('controller' => 'timer', 'action' => 'index'));
    } // defineRoutes


    static function getTimerRoute() {
    	return Router::assemble('timer');
    }

    /**
     * Define event handlers
     */
    function defineHandlers() {
    	EventsManager::listen('on_main_menu', 'on_main_menu');
    } // defineHandlers

    // ---------------------------------------------------
    //  Enable / Disable
    // ---------------------------------------------------

    /**
     * This module can be disabled
     *
     * @param User $user
     * @return boolean
     */
    function canDisable(User $user) {
      return true;
    } // canDisable

    // ---------------------------------------------------
    //  Name
    // ---------------------------------------------------

    /**
     * Get module display name
     *
     * @return string
     */
    function getDisplayName() {
      return lang('Web Timer');
    } // getDisplayName

    /**
     * Return module description
     *
     * @return string
     */
    function getDescription() {
      return lang('Adds a web interface for Active Collab\'s Timer desktop applications');
    } // getDescription

    /**
     * Return module uninstallation message
     *
     * @return string
     */
    function getUninstallMessage() {
      return lang('Module will be deactivated.');
    } // getUninstallMessage

  }