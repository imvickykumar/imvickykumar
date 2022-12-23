
# https://learn.sparkfun.com/tutorials/graph-sensor-data-with-python-and-matplotlib/update-a-graph-in-real-time#:~:text=To%20create%20a%20real%2Dtime,new%20frame%20in%20the%20animation.

import datetime as dt
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import random, requests, json

r = requests.get(url = 'https://neosalpha-999-default-rtdb.firebaseio.com/Track%20Views.json')
print(dict(r.json()).values())

fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)
xs = []
ys = []

def animate(i, xs, ys):
    temp_c = random.random() # plot random number
    xs.append(dt.datetime.now().strftime('%H:%M:%S.%f'))
    ys.append(temp_c)

    xs = xs[-20:]
    ys = ys[-20:]

    ax.clear()
    ax.plot(xs, ys)

    plt.xticks(rotation=45, ha='right')
    plt.subplots_adjust(bottom=0.30)
    plt.title('TMP102 Temperature over Time')
    plt.ylabel('Temperature (deg C)')

ani = animation.FuncAnimation(fig, animate, fargs=(xs, ys), interval=1000)
plt.show()
