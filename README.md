# FootInsights App

As the name suggests, the **FootInsights** app provides insights into the status of football players, helping coaches make informed decisions regarding their players. The insights include player conditions such as:
- **Risk of injury**
- **Pause**
- **Fatigue**
- **Dehydration**

These insights help coaches predict players' conditions, making strategic decisions based on the data.

## Features

1. **Dashboard for Player Status**: 
   - A dashboard feature displays the status of each player, offering real-time information about their health and game readiness.

2. **Player Management**: 
   - The app includes a component to manage players, allowing coaches to **add**, **edit**, and **delete** players as needed.

3. **Conversational Chatbot**: 
   - A chatbot component enables coaches to have a conversational interaction, simplifying the decision-making process by providing insights and suggestions.

## Technology Stack

- **Backend**: Developed using **Django**, which powers the application’s server-side logic.
- **Frontend**: Built using **React** and **Refine**, offering a flexible and user-friendly interface.
- **Database**: The app uses **MongoDB** for storing player data and other relevant information.

## Future Improvements

In the future, the project will be enhanced by:
- **Real-Time Data**: 
   - The goal is to implement real-time data processing, enabling coaches to make decisions during the match with real-time player insights.
  
- **Real-Time Chatbot**:
   - The chatbot will be upgraded to analyze data in real time and provide responses dynamically based on current game conditions.

## Installation and Setup for the frontend

To get the app running locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/khawla12-op/FootInsights.git
   cd frontend
2. **Install dependencies**:
   ```bash
   npm install
4. **Run the development server**:
   ```bash
   nmp run dev
## Installation and Setup for the Backend

1. **Change the directory**:
   ```bash
   cd backend

2. **Create a virtual environment**:
   ```bash
   python3 -m venv venv

3. **Activate the virtual environment**:
   ```bash
   .\venv\Scripts\Activate
4. **Intsall the requiremnets** :
   ```bash
   pip install -r requirements.txt
   
4. **run the server**:
   ```bash
    python manage.py runserver
   ```
  
After these steps, your application should be set up with the necessary services running and the required Python libraries installed in the virtual environment.


  
