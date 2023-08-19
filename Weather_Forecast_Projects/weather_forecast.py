'''
Weather forecast with Python
By: KARTIK JAIN
'''

#import the necessary package!
import requests

#input the city name
city = input('Input The City Name :\n')

# or you can also hard-code the value
# city = 'bhopal'

#Display the message!
print('Displaying Weater reports for: ' + city)

#fetch the weater details
url = 'https://wttr.in/{}'.format(city)
res = requests.get(url)

#display the result!
print(res.text)