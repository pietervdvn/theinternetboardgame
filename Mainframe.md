# Email-server

The email server should be handled in the following-way:

1. If there is an administrator, the administrator may choose to 
	- read or copy any not-folded message
	- read or copy the public part of a folded message. 
	- discard any message (including folded messages)
	- place an unfolded message (or copy) into his personal stash
2. The computer will pick *one* message from the queue randomly. The other messages stay in the queue
3. If this message starts with 'from <username>@<machine> to <username>@<machine-target>;<username1>@<machine-target1>;..', then:
	1. Go over the 'labels' next to the server
	2. The label which matches the 'machine'-part of a recipient, gets (a copy of) the message
   If none of the labels match, the message is delivered to the administrator instead (or discarded if there is no administrator).
   
   
   
   
   Example: 
   
     The email server looks like
     
     
     
      <--- PC1 ----- + ----- +
      <--- PC2 ----- | EMAIL | (ICT'er/Director = Eve)
      <--- PC3 ----- |       |
      <--- PC4 ----- + ----- +
   
   
     A message 'to bob@pc2, charlie@pc3, dave@pc42 from alice@pc1: Hi everyone! Don't forget the meeting tomorrow!' is placed on top of it.
     
     The person who is responsible for running the email server (e.g. the ICT'er), will take this message.
     It will make a copy and send it via the wire connected to the label 'PC2', will make a copy and send it via the wire to 'PC3'.
     No wire for 'PC42' is found, so the final copy (for which you can use the original slip of paper) will be given to player Eve
