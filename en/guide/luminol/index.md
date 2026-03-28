# Intro
Luminol is the first project in our organization which is initially created for seeking a stable and functional fork of Folia

It contains the following features:
 - Bug fixes for the upstream
 - Useful vanilla features restoration
 - Useful features addition from another forks and our own written

# Requirements
According to the original document of [Folia](https://docs.papermc.io/folia/faq/), we strongly recommend you to use folia and 
its forks when you have one or more CPU with more than 16 physical cores, otherwise, we suggest you to use another fork which is not extending from Folia such as Paper, Leaf etc.

Also, playing any hard vanilla-feature-related redstone machines or facilities is generally not recommendend and unsuable in
Luminol, if you are seeking for a better one project for vanilla experiences, please check out [Lophine](https://github.com/LuminolMC/Lophine) but the restoration of vanilla features is still greatly limited as folia has rewritten many of them.

For the Java runtime, it's required for java version 21 or higher since mojang changed it.

# Tips
Generally, most users of Folia and its forks are using a large heap memory, in that case, we recommend you to use ZGC for lower pause time for gameplay. Additionally, if you are using Linux, configuring large page file is also recommended, which have a noticable improvement for performance.

# Quick Start
For downloading Luminol, please check out [release](https://github.com/LuminolMC/Luminol/releases) pages

Note: We don't recommend download any pre-release versions as they might be unstable and contain serious bugs that might cause server crashing or data loss.