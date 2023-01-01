# The internet boardgame

This boardgame is meant as an educational tool.
It should give a decent understanding of how a complicated packet switching network works, while also highlighting what can go wrong.

And it should be somewhat fun to play as well to.


In order to understand all the complexity, the history of the internet is emulated step by step as well (but of course, with some omissions and simplifications).

## How to play


The game is split into many, sequential scenario's. Every single one builds upon the previous ones, they are designed to mimick the history of the internet.
Each one of them will introduce a new mechanic as it is used (more or less) in real life. Of course, many omissions and simplifications had to be made; and even more interesting applications and algorithms didn't make the cut!


A player gains points as specified on their scenario card. When the scenario is done, the card becomes a victory point. The card will state who will gain win this point and thus who can put it into their victory-stash. In some cases, no points are gained. Put the card on the discard-pile then.


A scenario is played into many turns.
Messages can travel through the network at a speed of one hop (one line) per turn.
The computers (and other network machines) - represented by squares - will have a few rules that are executed on the start of the turn.
Quite often, their main job is to forward messages, but there is a twist every now and then.


## Naming

You'll notice that 'Alice and Bob' are often the people communicating.
In many cryptography-papers, the examples are with Alice and Bob as their name starts with 'A' and 'B'. If more persons are needed, 'Charlie' and 'Dave' often join the party.

'Eve' is normally the attacker, who tries to intercept the communication. Her name is derived from "eavesdropping".
