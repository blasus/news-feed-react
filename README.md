This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# News Feed React Application

This Next.js-based web application acts as news articles feed from various sources, allowing users to search, filter, and view articles from multiple set news providers.

## Live Demo

This app is deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

You can view the live application at: [news-feed-react.vercel.app](https://news-feed-react-56ifaeb6k-blasus-projects.vercel.app/)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Data Sources](#data-sources)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Important Note on API Request Restrictions](#important-note-on-api-request-restrictions)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project implements a news feed application using React.js, Next.js, and TypeScript. It provides a customizable and responsive user interface for fetching and displaying news articles from multiple sources.

## Features

1. **Search and Filter Articles**:
   - Search by keyword.
   - Filter articles by date, category, and source.

2. **Personalized News Feed**:
   - Customize your feed based on selected sources and categories.

3. **Responsive Design**:
   - Optimized for both desktop and mobile devices.

4. **Loading State**:
   - Creative and engaging loading animation while data is being fetched.

5. **Error Handling**:
   - Informative messages if articles cannot be fetched.

## Data Sources

The application integrates with the following APIs to retrieve news articles:

1. **GNewsAPI**: Aggregates articles from a wide range of news sources.
2. **The Guardian API**: Retrieves articles from The Guardian newspaper.
3. **The New York Times API**: Provides articles from The New York Times.

## Installation

To set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/blasus/news-feed-react.git
   cd news-feed-react
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

## Running the Application

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Containerizing with Docker

To build and run the application with Docker:

1. **Build the Docker Image**:

   ```bash
   docker build -t news-feed-react .
   ```

2. **Run the Docker Container**:

   ```bash
   docker run -p 3000:3000 news-feed-react
   ```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Usage

### Search and Filtering

- **Search Bar**: Use the search bar to enter keywords, select a date, choose a category, and specify a source.
- **Article List**: Articles are displayed based on the applied search and filter criteria.
- **Article Cards**: Each card shows the title, description, image, publication date, and source of the article.

### Favicon

A custom favicon is included for better branding.

## Folder Structure

The project structure is as follows:

- **components/**: Contains reusable components, like `ArticleCard` and `SearchBar`.
- **page.tsx**: This is the home page, using the `Home` component.
- **services/**: Contains API Interfaces as services.
- **model/**: Contains type definition of data model.

## Environment Variables

Create a `.env` file in the root directory with the following content:

```plaintext
NEXT_PUBLIC_REACT_APP_NEWS_API_KEY=your_newsapi_key_here
NEXT_PUBLIC_REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key_here
NEXT_PUBLIC_REACT_APP_NY_TIMES_API_KEY=your_ny_times_api_key_here
```

Replace the placeholders with your actual API keys.

## Troubleshooting

- **401 Unauthorized Error**: Check that API keys are correctly set in the `.env` file.
- **No Articles Found**: Ensure API endpoints and query parameters are correct and that the APIs are returning data.

### Future Enhancements:

To prevent this issue, the application can be enhanced with server-side API requests to protect API keys and avoid limitations imposed on browser-based requests.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

Please ensure your contributions are well-documented and tested.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
