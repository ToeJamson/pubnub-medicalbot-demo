// Downloaded from https://dogaan.github.io
var generatePerson = function(online, first, last, avatarNum, key) {
        key = key || 'myChatUser';
        var myChatUser = JSON.parse(localStorage.getItem(key));

        if (myChatUser) {
            return myChatUser;
        }

        var person = {};
        var avatars = [
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg'
        ];

        person.first = first;
        person.last = last;
        person.full = [person.first, person.last].join(" ");
        person.uuid = String(new Date().getTime());
        person.avatar = avatars[avatarNum];
        person.online = online || false;
        person.lastSeen = Math.floor(Math.random() * 60);

        localStorage.setItem(key, JSON.stringify(person));

        return person;
    }