uvcdynctrl -s 'Exposure, Auto' 1
uvcdynctrl -s 'Exposure (Absolute)' 1000

uvcdynctrl -s 'Focus, Auto' 0
uvcdynctrl -s 'Focus (absolute)' 1



uvcdynctrl -s 'Brightness' 255
uvcdynctrl -s 'Contrast' 1
uvcdynctrl -s 'Saturation' 0
uvcdynctrl -s 'Gain' 255

uvcdynctrl -s 'White Balance Temperature, Auto' 0
uvcdynctrl -s 'White Balance Temperature' 2000

uvcdynctrl -s 'Sharpness' 10


#                     brightness (int)    : min=0 max=255 step=1 default=128 value=200
#                       contrast (int)    : min=0 max=255 step=1 default=128 value=100
#                     saturation (int)    : min=0 max=255 step=1 default=128 value=100
# white_balance_temperature_auto (bool)   : default=1 value=0
#                           gain (int)    : min=0 max=255 step=1 default=0 value=255
#           power_line_frequency (menu)   : min=0 max=2 default=2 value=2
#      white_balance_temperature (int)    : min=2000 max=6500 step=1 default=4000 value=2000
#                      sharpness (int)    : min=0 max=255 step=1 default=128 value=100
#         backlight_compensation (int)    : min=0 max=1 step=1 default=0 value=0
#                  exposure_auto (menu)   : min=0 max=3 default=3 value=1
#              exposure_absolute (int)    : min=3 max=2047 step=1 default=250 value=800
#         exposure_auto_priority (bool)   : default=0 value=1
#                   pan_absolute (int)    : min=-36000 max=36000 step=3600 default=0 value=0
#                  tilt_absolute (int)    : min=-36000 max=36000 step=3600 default=0 value=0
#                 focus_absolute (int)    : min=0 max=250 step=5 default=0 value=0
#                     focus_auto (bool)   : default=1 value=0
#                  zoom_absolute (int)    : min=100 max=500 step=1 default=100 value=100
