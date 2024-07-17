# Intelligent Learning Platform

Welcome to the Intelligent Learning Platform repository. This project is a web-based application designed to enhance English learning through various interactive features. Below, you will find an overview of the project structure, key functionalities, and instructions for setting up and running the application.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Contributing](#contributing)
7. [License](#license)

## Project Structure

The project consists of the following files and directories:

### Backend

- `app.py`: Main application file that sets up the Flask server and integrates various modules.
- `Chat.py`: Handles chat interactions, including speech-to-text and OpenAI GPT-3.5 based responses.
- `CreateWordToUSer.py`: Manages the creation of custom word lists based on user input and OpenAI responses.
- `Database_Server.py`: Contains database models and configurations.
- `generate_image.py`: Endpoint for generating images using OpenAI.
- `login.py`: Handles user login functionality.
- `register.py`: Handles user registration functionality.
- `search_log.py`: Provides endpoints for retrieving search logs and statistics.
- `translate.py`: Manages translation services and related functionalities.
- `game.py`: Contains logic for generating words for educational games.

### Frontend

- `WordDetail.js`: Component for displaying detailed information about words, including definitions and related images.
- `Footer.js`: Footer component.
- `Home.js`: Home component with search functionality.
- `HomeMain.js`: Main content for the homepage, including category selection and daily learning progress.
- `MainContent.js`: Contains slides for games and quizzes.
- `Modal.js`: Modal component for displaying daily word lists.
- `Navbar.js`: Navigation bar component with links to different sections of the app.
- `QuestionModal.js`: Modal component for displaying and submitting custom learning questions.
- `DarkModeContext.js`: Context for managing dark mode state.
- `Login.js`: Login component with sign-in and sign-up forms.
- `MyPage.js`: Component for displaying user information and favorites.
- `MyStudy.js`: Component for displaying user's study statistics and logs.
- `Game.js`: Mini-game component for interactive word learning.
- `Chat.js`: Chat component for voice-based interaction with AI.
- `setupTests.js`: Setup file for testing configuration.
- `reportWebVitals.js`: File for reporting web vitals.

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Chat Interaction**: Converts speech to text and provides intelligent responses using GPT-3.5.
- **Word Creation**: Generates customized word lists for users based on their learning level.
- **Image Generation**: Creates images from text descriptions using OpenAI.
- **Translation**: Translates words between English and Korean with additional contextual information.
- **Educational Games**: Provides interactive word games for enhancing learning.
- **Search Logs and Statistics**: Tracks user search activities and provides statistical data.

## Installation

### Prerequisites

- Python 3.8 or higher
- Flask
- OpenAI API key
- Google Cloud credentials for speech-to-text functionality
- MySQL database

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/IntelligentLearningPlatform.git
    cd IntelligentLearningPlatform
    ```

2. Set up a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Configure environment variables:
    - Set `OPENAI_API_KEY` to your OpenAI API key.
    - Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of your Google Cloud service account key file.

5. Set up the database:
    ```bash
    flask db upgrade
    ```

6. Run the application:
    ```bash
    flask run
    ```

## Usage

### User Registration and Login

- **Register**: Send a POST request to `/register` with `id`, `name`, `email`, and `password`.
- **Login**: Send a POST request to `/login` with `id` and `password`.

### Chat Interaction

- Send a POST request to `/chat` with an audio file to get a text response using GPT-3.5.

### Word Creation

- Send a POST request to `/create-word` with `userId` and `answers` to generate a customized word list.

### Image Generation

- Send a POST request to `/generate-image` with `example_sentence` to generate an image from the text.

### Translation

- Send a POST request to `/translate` with `userId` and `text` to translate between English and Korean.

### Educational Games

- Send a GET request to `/game-words` with `user_id` to retrieve words for games.

### Search Logs and Statistics

- Various endpoints are available to retrieve category stats, monthly stats, daily stats, and search logs.

## API Endpoints

| Endpoint                  | Method | Description                                           |
|---------------------------|--------|-------------------------------------------------------|
| `/register`               | POST   | Register a new user                                   |
| `/login`                  | POST   | User login                                            |
| `/chat`                   | POST   | Chat interaction                                      |
| `/create-word`            | POST   | Create custom words                                   |
| `/generate-image`         | POST   | Generate image from text                              |
| `/translate`              | POST   | Translate text                                        |
| `/game-words`             | GET    | Get words for games                                   |
| `/category-stats/<user_id>`| GET    | Get category statistics                               |
| `/monthly-stats/<user_id>` | GET    | Get monthly statistics                                |
| `/daily-stats/<user_id>`   | GET    | Get daily statistics                                  |
| `/search-log/<user_id>/<date>` | GET | Get search log for a specific date                    |

## Contributing

We welcome contributions from the community. Please read our contributing guidelines before making any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Thank you for using the Intelligent Learning Platform. If you have any questions or need further assistance, please feel free to contact us.
