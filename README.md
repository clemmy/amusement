# amusement

Born at HackWestern 2015, aMUSEment is a proof-of-concept that aims to keep the user's head in a calm and composed state by analyzing their EEG activity using the Muse and playing music from Spotify playlists correspondingly. It is the winner of the Muse sponsor prize, and it can be found on [Challengepost](http://challengepost.com/software/amusement-um9im).

## Building & Running

1. git clone git@github.com:Clemmy/amusement.git
2. cd amusement && npm install
3. cd public && npm install && bower install
4. muse-io --preset 14 --device "Muse-485D" --osc osc.udp://localhost:5000 --dsp
5. grunt build & cd .. (Optional, depending on if you point to dist in config/routes.js)
6. node bin/www

## Things you will need:

- a Muse headband and the [Developer kit](http://www.choosemuse.com/developer-kit/) (Particularly MuseIO)
