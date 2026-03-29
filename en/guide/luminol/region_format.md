# Region Format
As you can see in luminol configuration, there is a option for the region format of your save and you could change it to use a non-vanilla region format for some cases

Here are 3 region formats available on Luminol:
 - MCA (The original region format of Minecraft)
 - LINEAR_V2 (A new format designed by xymb-endcrystalme, which is aimed to reduce the region file size and reduce the fragment produced by the old MCA format)
 - B_LINEAR (Aka. buffered linear region format, designed for lower memory usage, better scheduling and the same function of linear v2.)

 # Convert your save

There has a tools which can help you convert your save from mca to linear or do the reverse, and you could find it on https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools

<b>Note: There is still no way to convert back your linear v2 saving to mca(also the buffered linear format), so think twice before using these formats!!</b>

# Linear V2
Considering that linear v1 has some issues would cause data loss, we implemented the linear v2 format from [Abomination](https://github.com/xymb-endcrystalme/Abomination/blob/dev/patches/server/0012-Linear-Region-File-Format-v2-implementation-version-.patch)

The new version of linear uses a bucket to reduce the compression time of the region file, but its data (decompressed buckets) is still staying in the memory, so it could cost a lot of memory on some environments

The linear has 3 speific configurations in luminol config: the "linear_compression_level", "linear_io_flush_delay_ms" and "linear_use_virtual_thread". The "linear_compression_level" decieds the compression level of each bucket(the compression is using zstd) and the "linear_io_flush_delay_ms" decides when sync the data in memory to the local file(n ms after a write operation).Additionally, the "linear_use_virtual_thread" decides whether to use virtual threads for the flusher for linear region format, considering linear creates one thread for every opened region file, this is recommended to be enabled

# Buffered linear

Given that linear puts its decompressed data, we designed a new format buffered linear, which puts its decompressed data into a independent swap file in order to reduce memory usage

It has 3 speific configurations "blinear_io_thread_count", "blinear_io_flush_delay_ms" and "linear_compression_level", differ from the linear, buffered linear uses a thread pool (pool size is decided by "blinear_io_thread_count") instead of creating thread for each opened region file and it uses write time out mechanism (only do sync after there have no any written operations for n(n is represent "blinear_io_flush_delay_ms") ms), which makes it a bit cheaper than linear

Additionally, buffered linear supports directly loading the linear v1 format as you could just migrate linear v1 to it by renaming the file suffix from ".linear" to ".b_linear"