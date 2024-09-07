# React Card App

## Overview

This application displays a list of cards loaded from a static JSON file. It supports drag-and-drop reordering, shows a modal with an image overlay on card click, and provides a loading spinner for images.

## Running the App

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.

## Features

- **Drag and Drop**: Reorder cards by dragging and dropping.
- **Modal View**: Click a card to view a larger image in a modal. Press ESC to close the modal.
- **Placeholder Spinner**: Displays a spinner while images are loading.

## Adding New Cards

You can add new cards via the provided form in the `AddCard` component (not included in the provided code but should be implemented similarly to the example given).

## Notes

- Ensure the `data.json` file is in the `public` directory.
- Thumbnails should be placed in the `src/images` directory.

## License

This project is licensed under the MIT License.
