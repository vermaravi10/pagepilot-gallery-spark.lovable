# PagePilot Gallery

A modern, beautiful file upload and gallery system built with React, TypeScript, and Tailwind CSS.

## Features

- **Drag & Drop Upload**: Intuitive drag-and-drop interface with visual feedback
- **Progress Tracking**: Real-time upload progress with animated indicators
- **File Validation**: Type and size validation with user-friendly error messages
- **Responsive Gallery**: Beautiful masonry-style grid that adapts to all screen sizes
- **Lightbox Viewer**: Full-screen image viewing with keyboard navigation
- **Local Storage**: Persistent gallery that saves between sessions
- **Modern Design**: Beautiful gradient themes with smooth animations

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd pagepilot-gallery
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:8080`

## Usage

### Upload Files
- **Drag & Drop**: Drag image files directly onto the upload zone
- **Click to Browse**: Use the "Choose Files" button to select images
- **Multiple Selection**: Select multiple files at once

### File Requirements
- **Supported Formats**: JPEG, PNG, GIF, WebP
- **Maximum Size**: 5MB per file
- **Multiple Files**: No limit on number of files

### Gallery Features
- **View Images**: Click any thumbnail to open in lightbox
- **Navigation**: Use arrow keys or on-screen buttons to navigate
- **Download**: Download original files from the lightbox
- **Remove Files**: Delete individual files or clear entire gallery

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, consistent icons

## Project Structure

```
src/
├── components/
│   ├── FileUpload/
│   │   ├── DropZone.tsx      # Drag & drop upload area
│   │   └── UploadQueue.tsx   # Progress tracking
│   ├── Gallery/
│   │   ├── ImageGallery.tsx  # Main gallery component
│   │   ├── ImageCard.tsx     # Individual image cards
│   │   ├── EmptyState.tsx    # Empty gallery state
│   │   └── Lightbox.tsx      # Full-screen image viewer
│   └── PagePilot.tsx         # Main application component
├── hooks/
│   └── useFileUpload.ts      # File upload logic and state
├── utils/
│   ├── fileValidation.ts     # File validation utilities
│   └── storage.ts            # Local storage helpers
├── types/
│   └── file.ts               # TypeScript type definitions
└── pages/
    └── Index.tsx             # Main page component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

The design system is fully customizable through the CSS variables in `src/index.css`. You can modify:

- **Colors**: Update HSL color values for theming
- **Gradients**: Customize gradient backgrounds
- **Shadows**: Adjust shadow effects
- **Animations**: Modify transition timing and effects

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features required
- File API and Drag & Drop API support needed

## License

This project is open source and available under the MIT License.