#! /bin/sh
for arch in i386-linux-gnu x86_64-linux-gnu ; do
	if [   -f /lib/$arch/libudev.so.1 -a ! -f /lib/$arch/libudev.so.0 ] ; then
		ln -fs /lib/$arch/libudev.so.1 ./libudev.so.0
	fi
done
LD_LIBRARY_PATH=`pwd`:$LD_LIBRARY_PATH