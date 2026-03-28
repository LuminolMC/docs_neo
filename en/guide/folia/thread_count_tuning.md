# Thread count tuning

In this page, I will give my experiences about the thread count settings of folia

## General
I recommend to adjust about 3 sections of the thread count setting. Here are what they are:
 - threaded-regions (config/paper-global.yml)
 - chunk-system (config/paper-global.yml)
 - netty-threads (spigot.yml)

In my experiences, I would recommend use the half of the 80% of available threads for tickregions(as tickregions usually take a high priority) and then the half of the other part for chunk-system and the remaining for plugins and netty-threads

Additionally, if you have pre-generated the whole world, the allocation of chunk-system could be reduce for about 30~50%

Also, as most situations that the server might not have their world pre-generated, it is still recommened to keep a secondary high priority for chunk-system in which keeps a smooth experience during some teleportations and player joining

The netty threads usually don't take too much usages so it could be lefted at the default value, if you are using some plugins that might have heavy and frequent modifications on packets, it would recommend to raise it by about 50% (4 -> 6)

This is out of my personal experience from my friends' server, it might be a bit unsuitable for some environments

## Chunk system

There are 2 sub sections on this config key, which are worker and io threads.

In general, you could follow the original documentation (~3 per 200-300 players) to configure the io threads and give the remaining to the worker threads

Additionally, if you are using fork with linear or bufferedlinear formats, it's recommended to raise the count of io threads by about 1/3 as they might run some heavy compression operations on the io threads and cause saving being behind

## Netty threads

The netty thread is responsible for managing the socket io for the server and process the decoding/encoding of each packets and accept the incoming connections.

In default cases, it's unnecessary to modify this setting(only takes about 28% of 4 threads under 110 players on my friend's server), if you are hosting more than 300 players, it's recommended to raise it by 50% (always keep 15% idle is mostly enough)