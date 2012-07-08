<?php

  /**
   * Timer module on_phone_homescreen event handler
   *
   * @package activeCollab.modules.timer
   * @subpackage handlers
   */

  /**
   * Add options to Home Screen
   *
   * @param NamedList $menu
   * @param User $user
   */
  function timer_on_phone_homescreen(NamedList &$menu, User &$user) {
	$menu->add('timer',
			array(
				'text' => lang('Timer'),
				'url' => TimerModule::getTimerRoute(),
				'icon' => AngieApplication::getImageUrl('module.png',
							TIMER_MODULE,
							AngieApplication::INTERFACE_DEFAULT)
			)
		);
  } // timer_on_phone_homescreen