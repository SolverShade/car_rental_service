# README.md

## Project Title

Vehicle Rental Service

## Installation

### Prerequisites

- Node.js and npm: You can download Node.js and npm from [here](https://nodejs.org/en/download/). After installing, you can check the version by running the following commands in your terminal:

```bash
node -v
npm -v
```

- Python: You can download Python from [here](https://www.python.org/downloads/). After installing, you can check the version by running the following command in your terminal:

```bash
python --version
```

- Once Python is installed, you can install the pip packages with

```bash
pip install -r requirements.txt
```

### Clone the Repository

First, clone the repository to your local machine:

```bash
https://github.com/SolverShade/car_rental_service
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

Set the flask app environment variable:

- On Windows:

```bash
set FLASK_APP=run.py
```

- On Unix or MacOS:

```bash
export FLASK_APP=run.py
```

Run the Flask app:

```bash
flask run
```

The Flask app will start running on [http://localhost:5000](http://localhost:5000).

