<?php

  /**
   * Timer module on_main_menu event handler
   *
   * @package activeCollab.modules.timer
   * @subpackage handlers
   */

  /**
   * Add options to main menu
   *
   * @param MainMenu $menu
   * @param User $user
   */
  function timer_handle_on_main_menu(MainMenu &$menu, User &$user) {
    $menu->addBefore('timer', lang('Timer'),
    				TimerModule::getTimerRoute(),
    				AngieApplication::getImageUrl('module.png',
    					TIMER_MODULE,
    					AngieApplication::INTERFACE_DEFAULT),
    				null,
    				'admin'); // before admin
  } // timer_handle_on_main_menu