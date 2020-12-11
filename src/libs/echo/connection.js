import Echo from 'laravel-echo';
import cookies from 'axios/lib/helpers/cookies';

export default new Echo({
    broadcaster: 'socket.io',
    namespace: 'App.Events.Broadcasting',
    reconnectionAttempts: 2,
    reconnectionDelay: 5000,
    auth: {
        headers: {
            'X-XSRF-TOKEN': cookies.read('XSRF-TOKEN'),
        },
    },
});
