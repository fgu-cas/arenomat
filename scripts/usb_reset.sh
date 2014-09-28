#!/bin/sh
 
if [ "$(id -u)" != 0 ] ; then
    echo This must be run as root!
    exit 1
fi
 
#
# Look for the most comment cases
#
for driver in xhci_hcd ehci_hcd uhci_hcd ; do
 
    #
    #  The directory to operate within
    #
    dir=/sys/bus/pci/drivers/${driver}
 
    #
    #  If it exists we have the appropriate USB-driver
    #
    if [ -d $dir ]; then
 
        echo "Reseting: ${driver}"

        cd ${dir}
        for dev_id in ????:??:??.? ; do
            printf "${dev_id}" > unbind
            printf "${dev_id}" > bind
        done
    else
        echo "Not present: ${driver}"
    fi
done
