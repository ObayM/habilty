# Habitly

> Track your habits simply (will defnitely change this name)

Check it out --> http://habilty.vercel.app/

![ScreenShot of the website](https://hc-cdn.hel1.your-objectstorage.com/s/v3/59701d48aa51f13d_849shots_so.png)

---

## Tech Stack

- **NextJs**
- **React**
- **Tailwind CSS**
- **Supabase**

## Getting Started

From the `habitly` directory(cd there):


```
# install dependencies
npm install

# run dev server
npm run dev

```
Open [http://localhost:3000](http://localhost:3000) during development.

Also you will find `schema.sql` you can run it in supabase to get the same schema :)


## Pages

- `/dashboard`: You can log and create habits here and connect your slack account!
- `/`: What is mentioned here is the final app but this is a WIP, also don't take everything i wrote there seriously XD

## Apis
- `/api/slack/command`: Here is where I recive the requests and process the slack commands
- `api/slack/send-reminders`: This is to send reminders for all the users about thier uncompleted habits 
- `api/user/connect-slack`: Generate code and make it easy to connect your slack with Habitly!
- `api/habits`: bunch of apis with the goal of adding/deleting habits or logging them

Thanks for reading, please start it if you like it :)
