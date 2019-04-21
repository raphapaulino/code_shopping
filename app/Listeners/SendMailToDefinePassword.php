<?php

namespace CodeShopping\Listeners;

use CodeShopping\Events\UserCreatedEvent;

class SendMailToDefinePassword
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserCreatedEvent  $event
     * @return void
     */
    public function handle(UserCreatedEvent $event)
    {
        //enviar mail
        echo $event->getUser()->name;
    }
}
