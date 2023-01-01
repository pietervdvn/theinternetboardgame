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

0. If a wire is broken, this is detected (due to a loss in voltage) by the mainframe. Turn the IP-label face-down to indicate a loss in connectivity.
   When the respective wire is repaired, turn the IP-label face-up again.
1. If a message reads 'IP-range <range> can be reached via this wire', place a label of the corresponding IP range in the slot of the wire. Place a dice next to it, indicating the number of hops needed
2. If a message reads 'from <ip> to <target-ip>': check all labels. If a label matches the IP-address exactly, send it via this wire.
   If no exact IP-address match is found, send it via the range-label starting with the same number and which has the lowest number of hops.
   If not possible, discard the message.
3.

## Story 1.1 (IP-addresses setup)

ARPAnet and Boston university have an internal computer network, but now want to send emails to each other to collaborate on top-secret research.
Alice and Bob are tasked with making this reality. But first, they have to setup IP-addresses within their own networks.



### Alice 1.1 - ARPAnet Administrator

1

### Bob 1.1 - Boston University Administrator

(Identical to Alice 1.1)

### Eve 1.1 - Employee of the NSA

(Identical to Alice 1.1)

### Charlie 1.1 - Employee of ICANN (NPC or player which also handles the mainframes)

If someone calls you and requests a range of IP-addresses, hand them a diamond-shaped address range



## Story 1.2

Time to connect Arpanet and Boston University.

### Alice 1.2

0. Place a wire with a pin in your mainframe, the other (male) side is still loose
1. Phone Bob from Boston University; ask him if they want to connect via direct wire. Also: ask him his IP-addresss
2. If Bob agrees, connect the two loose wires.

If a wire gets connected, send a message with text 'BGP-announcement: IP-range <your range here> can be reached via this wire in 1 hop' and send it via the wire.

3. Send an IP-message to the IP-address of Bob (you asked this in the phone earlier. If you've forgotten it, call again)
4. Wait for a reply; if the reply arrives, you have WON this scenario

### Bob 1.2

0. Place a wire with a pin in your mainframe. The other (female) end is still loose.

If Alice calls you, agree with her proposal.

If a wire gets connected, send a message with text 'BGP-announcement: IP-range <your range here> can be reached via this wire in 1 hop' and send it via the wire.

When you get an IP-message, send some answer. You WIN this scenario.


## Story 1.3

Arpanet and Boston University are connected. They can start their secret, joint research.
However, the NSA is curious to this research and might even want to sabotage it...



### Eve 1.3 - Employee of the NSA

Eve wants to know what research messages are sent between Arpanet and Boston university.

She wants to:

- Know _which_ employees are sending messages to each other?
- Know _what_ do these messages say?
- alter some of those messages...

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







