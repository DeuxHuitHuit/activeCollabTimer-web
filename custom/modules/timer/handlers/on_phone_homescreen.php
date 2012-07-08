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
  function timer_handle_on_phone_homescreen(NamedList &$items, IUser &$user) {
	$items->add('timer',
			array(
				'text' => lang('Timer'),
				'url' => TimerModule::getTimerRoute(),
				'icon' => AngieApplication::getImageUrl('module.png',
							TIMER_MODULE,
							AngieApplication::INTERFACE_PHONE)
			)
		);
  } // timer_on_phone_homescreen