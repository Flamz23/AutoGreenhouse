import RPi.GPIO as GPIO
import time

#set the GPIO mode to BCM
pump_pin = 21
GPIO.setmode(GPIO.BCM)
GPIO.setup(pump_pin, GPIO.OUT)
GPIO.output(pump_pin, GPIO.LOW)

#set up GPIO pins for the water level sensor
level_sensor_pin = 26
GPIO.setup(level_sensor_pin, GPIO.IN)

#set up GPIO pins for the soil moisture sensor
moist_sensor_pin = 27
GPIO.setup(moist_sensor_pin, GPIO.IN)

#set the threshold moisture level
threshold_moist_level = 500

#Define a function to turn on the water pump
def turn_on_pump():
    GPIO.output(pump_pin, GPIO.HIGH)
    print("Water Pump Status: ON")
    
#Define a function to turn the water pump off
def turn_off_pump():
    GPIO.output(pump_pin, GPIO.LOW)
    print("Water Pump Status: OFF")
    
#Loop continuously
while True:
    #Check the water level sensor
    if GPIO.input(level_sensor_pin) == 0:
        #If water level is low, turn on the pump
        turn_on_pump()
    else:
        #Water level is normal, keep the pump turned off
        turn_off_pump()
        
    #Check the moisture sensor
    if GPIO.input(moist_sensor_pin) < threshold_moist_level:
        #Soil moisture is low, turn on the pump
        turn_on_pump()
    else:
        #soil moisture level is fine, turn off the pump
        turn_off_pump()
    #Wait a short period before checking again
    time.sleep(0.1)