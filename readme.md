# README.md

## Project Title

Vehicle Rental Service

## Installation

### Prerequisites


### Clone the Repository

First, clone the repository to your local machine:

```bash
https://github.com/SolverShade/car_rental_service
```

- Node.js and npm: You can download Node.js and npm from [here](https://nodejs.org/en/download/). After installing, you can check the version by running the following commands in your terminal:

```bash
node -v
npm -v
```

- Python: You can download Python from [here](https://www.python.org/downloads/). After installing, you can check the version by running the following command in your terminal:

```bash
python --version
```


## Building and Running the App

### React

Navigate to the React app directory:

```bash
cd client
```

Install the dependencies:

```bash
npm install
```

Start the React app:

```bash
npm start
```

The React app will start running on [http://localhost:3000](http://localhost:3000).

### Flask

Open a new terminal and navigate to the Flask app directory:

```bash
cd server
```

- Create a python virtual enviorment in /server

```bash
python -m venv venv
```

- source the environment

```bash
# On Linux/macOS
source venv/bin/activate

# On Windows
.\venv\Scripts\activate
```

- install all the libraries on your environment

```bash
pip install -r requirements.txt
```

Run the python application

```bash
python run.py
```

The Flask app will start running on [http://localhost:5000](http://localhost:5000).

### installing libraries on backend

When you want to install python libraries in our backend you can do the following
as long as your virtual enviorment is activated

```bash
pip freeze > requirements.txt
```

