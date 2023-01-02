# IP Adresses

As you might already know, the internet is a 'packet switching machine'.
This means nothing more then that (digital) messages are delivered from one machine to another machine. There are various ways of connecting machines together (copper wires carrying digital signals; glass fibre carrying light or antenna's connecting wirelessly). While the engineering is definitively interesting, we'll just represent all of this with a single wire in this game.

More interesting to us is how those messages travel through the network. How does a message find it's way to the right machine, even if there is no (direct) connection to it? How can an attacker try to intercept or even modify those messages?

This is done by using 'Internet Addresses'. 

## Setup

- Place the ICANN-board on the table
- Place 3 mainframes on the table. 
- Connect two PC's two each of them; and place 'A' in one PC, place 'B' in a PC connected to the other mainframe and 'C' in a laptop connected to the last mainframe
- Place 'colleague'-tokens in the other PC's

## Mainframe program



## Story 1.1 (IP-addresses setup)
-

### Eve 1.3 - Employee of the NSA



She has two possible attack scenario's


#### Cutting the wire

- Order a special operation (Cut the wire by opening the connection between the two mainframes). End your turn
- Connect the male wire to your mainframe; place the appropriate IP-range label on this wire. End your turn.
- CConnect the female wire to your mainframe (via a male/male wire); place the appropriate IP-range label on this wire. End your turn

Now, all messages between ARPA and Boston will pass through your machine. Try to intercept the communication.

#### BGP-hijack with wire cut

- Peer with both ARPA and Boston, setup IP-range labels as previous
- _Forward_ the BGP-announcements you receive, increase the HOP-count with one.
- Order a special operation, which cuts the wire between ARPA-net and Boston

#### BGP-hijack

- Peer with both ARPA and Boston, setup IP-range labels as previous
- _Forward_ the BGP-announcements you receive, but lie about the hop-count: write 0


Both will now send all their messages via you.


If a recipe for a bomb passes by, change the word 'sand' with 'nitroglycerine'.



### Alice

Send a message to Bob to indicate that you are researching a new explosive for mining tunnels.

Wait a 5 turns
Then send a message to Bob which states

"Hey, we did a successfull experiment with 5kg dynamite and 10kg sand to make a stable bomb. Greetings, Alice"

### Bob

When you receive a message from Alice, answer her that you'll support her and replicate her experiments

Replicate her experiments. Be careful though...


## Story 1.4: Encryption







