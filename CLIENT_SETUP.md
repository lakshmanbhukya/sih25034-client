# Client Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# API Configuration
VITE_API_URL=http://localhost:3000

# App Configuration
VITE_APP_NAME=Internship Finder
VITE_APP_VERSION=1.0.0
```

### 3. Start Development Server
```bash
npm start
```

The app will be available at `http://localhost:5173`

## 🎯 Features

### For Low-Digital-Literacy Users
- **Simple Navigation**: Large buttons with clear labels
- **Visual Icons**: Emojis and icons for better understanding
- **Step-by-Step Process**: Guided workflows
- **Accessibility Options**: Text size, contrast, screen reader support
- **Error Prevention**: Clear validation messages
- **Mobile-Friendly**: Responsive design for all devices

### Core Functionality
- **User Authentication**: Simple login/register forms
- **Profile Management**: Easy-to-fill profile forms with suggestions
- **Personalized Recommendations**: AI-powered internship suggestions
- **Browse All Internships**: Search and filter opportunities
- **One-Click Applications**: Direct links to apply

## 🛠️ Development

### Project Structure
```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── common/         # Reusable components
│   ├── internships/    # Internship-related components
│   ├── layout/         # Layout components
│   ├── pages/          # Page components
│   ├── profile/        # Profile management
│   └── ui/             # UI components
├── contexts/           # React contexts
├── services/           # API services
└── lib/                # Utilities
```

### Key Components

#### Authentication
- `LoginForm.jsx` - User login with validation
- `RegisterForm.jsx` - User registration
- `AuthPage.jsx` - Combined auth interface

#### Profile Management
- `ProfileForm.jsx` - Complete profile setup
- Skills and sectors with suggestions
- Education details (10th, 12th, graduation)

#### Internships
- `InternshipCard.jsx` - Individual internship display
- `RecommendationsPage.jsx` - Personalized recommendations
- `AllInternshipsPage.jsx` - Browse all opportunities

#### Accessibility
- `AccessibilityHelper.jsx` - Accessibility options panel
- `ErrorBoundary.jsx` - Error handling
- `LoadingSpinner.jsx` - Loading states

## 🎨 Design Principles

### User Experience
1. **Simplicity First**: Clear, uncluttered interfaces
2. **Visual Hierarchy**: Important elements stand out
3. **Consistent Patterns**: Similar actions work the same way
4. **Progressive Disclosure**: Show information gradually
5. **Error Prevention**: Validate inputs before submission

### Accessibility
1. **Keyboard Navigation**: All features accessible via keyboard
2. **Screen Reader Support**: Proper ARIA labels and roles
3. **High Contrast Mode**: Better visibility for users
4. **Text Scaling**: Adjustable font sizes
5. **Reduced Motion**: Respect user preferences

### Mobile Responsiveness
1. **Touch-Friendly**: Large tap targets (44px minimum)
2. **Responsive Grid**: Adapts to all screen sizes
3. **Mobile Navigation**: Collapsible menu for small screens
4. **Gesture Support**: Swipe and touch interactions

## 🔧 Customization

### Styling
- Uses Tailwind CSS for styling
- Custom CSS variables for theming
- Responsive breakpoints: sm, md, lg, xl

### API Integration
- Centralized API service in `services/api.js`
- Environment-based configuration
- Error handling and loading states

### State Management
- React Context for authentication
- Local state for component-specific data
- No external state management library needed

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Environment Variables for Production
```env
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=Internship Finder
VITE_APP_VERSION=1.0.0
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Profile completion
- [ ] Recommendation generation
- [ ] Internship browsing
- [ ] Mobile responsiveness
- [ ] Accessibility features
- [ ] Error handling

### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] High contrast mode
- [ ] Text scaling
- [ ] Focus indicators

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify API connection
3. Test with different browsers
4. Check network connectivity

## 🔄 Updates

To update the client:
1. Pull latest changes
2. Run `npm install`
3. Update environment variables if needed
4. Test all functionality
5. Deploy to production
