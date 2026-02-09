# Design Guidelines

[← Back to Master Plan](../PLAN.md)

---

## 🎨 UI/UX Design Principles

### Core Design Philosophy

**User-Centered Design**
- Design with user needs and behaviors as the primary focus
- Conduct user research and usability testing
- Iterate based on user feedback
- Prioritize accessibility and inclusivity

**Visual Hierarchy**
- Use size, color, contrast, and spacing to guide user attention
- Most important elements should be most prominent
- Create clear visual pathways through the interface
- Use typography to establish hierarchy

**Consistency**
- Maintain consistent patterns, components, and interactions
- Use the same visual language throughout the app
- Establish and follow design patterns
- Document design decisions

**Mobile-First Responsive Design**
- Design for mobile devices first, then scale up
- Ensure touch-friendly interfaces (min 44x44px targets)
- Test on multiple device sizes
- Use responsive breakpoints effectively

---

## 🎨 Design System

### Color System

#### Primary Colors
```css
/* Brand Primary */
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-200: #bfdbfe;
--color-primary-300: #93c5fd;
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6;  /* Main brand color */
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;
--color-primary-800: #1e40af;
--color-primary-900: #1e3a8a;
```

#### Semantic Colors
```css
/* Success - Income, Positive Actions */
--color-success-50: #f0fdf4;
--color-success-500: #10b981;
--color-success-700: #047857;

/* Warning - Budget Alerts */
--color-warning-50: #fffbeb;
--color-warning-500: #f59e0b;
--color-warning-700: #b45309;

/* Error - Expenses, Errors, Destructive Actions */
--color-error-50: #fef2f2;
--color-error-500: #ef4444;
--color-error-700: #b91c1c;

/* Info - Informational Messages */
--color-info-50: #f0f9ff;
--color-info-500: #06b6d4;
--color-info-700: #0e7490;
```

#### Neutral Colors
```css
/* Light Mode */
--color-gray-50: #f9fafb;   /* Background */
--color-gray-100: #f3f4f6;  /* Secondary background */
--color-gray-200: #e5e7eb;  /* Borders */
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;  /* Placeholders */
--color-gray-500: #6b7280;  /* Secondary text */
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;  /* Primary text */
--color-gray-900: #111827;  /* Headings */

/* Dark Mode */
--color-dark-50: #18181b;   /* Background */
--color-dark-100: #27272a;  /* Secondary background */
--color-dark-200: #3f3f46;  /* Borders */
--color-dark-300: #52525b;
--color-dark-400: #71717a;  /* Placeholders */
--color-dark-500: #a1a1aa;  /* Secondary text */
--color-dark-600: #d4d4d8;
--color-dark-700: #e4e4e7;
--color-dark-800: #f4f4f5;  /* Primary text */
--color-dark-900: #fafafa;  /* Headings */
```

---

### Typography

#### Font Families
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

#### Font Scale
```css
--text-xs: 0.75rem;     /* 12px - Small labels, captions */
--text-sm: 0.875rem;    /* 14px - Secondary text */
--text-base: 1rem;      /* 16px - Body text */
--text-lg: 1.125rem;    /* 18px - Large body */
--text-xl: 1.25rem;     /* 20px - Small headings */
--text-2xl: 1.5rem;     /* 24px - Section headings */
--text-3xl: 1.875rem;   /* 30px - Page headings */
--text-4xl: 2.25rem;    /* 36px - Hero headings */
--text-5xl: 3rem;       /* 48px - Display headings */
```

#### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

#### Line Heights
```css
--leading-tight: 1.25;    /* Headings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.75;  /* Long-form content */
```

---

### Spacing System

**Base Unit:** 4px (0.25rem)

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

**Usage Guidelines:**
- Use `space-4` (16px) for standard component padding
- Use `space-6` (24px) for section spacing
- Use `space-8` (32px) for larger section separations
- Maintain consistent spacing throughout

---

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;    /* 2px - Small elements */
--radius-base: 0.25rem;   /* 4px - Inputs, buttons */
--radius-md: 0.375rem;    /* 6px - Cards */
--radius-lg: 0.5rem;      /* 8px - Modals */
--radius-xl: 0.75rem;     /* 12px - Large cards */
--radius-2xl: 1rem;       /* 16px - Images */
--radius-full: 9999px;    /* Fully rounded - Badges, pills */
```

---

### Shadows

```css
/* Light Mode */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* Dark Mode - Lighter shadows */
--shadow-dark-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
--shadow-dark-base: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4);
--shadow-dark-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
--shadow-dark-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
```

---

### Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Usage:**
- Use `transition-fast` for hover states
- Use `transition-base` for most UI changes
- Use `transition-slow` for complex animations

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Small devices (tablets) */
--breakpoint-md: 768px;   /* Medium devices (tablets landscape) */
--breakpoint-lg: 1024px;  /* Large devices (desktops) */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* Ultra wide screens */
```

### Layout Guidelines

**Mobile (< 640px)**
- Single column layout
- Full-width components
- Hamburger menu
- Stack dashboard widgets vertically
- Bottom navigation (optional)

**Tablet (640px - 1024px)**
- Two-column layout where appropriate
- Sidebar can be toggled
- Cards in 2-column grid
- Larger touch targets

**Desktop (>= 1024px)**
- Persistent sidebar navigation
- Multi-column layouts
- Larger data tables
- Dashboard in grid layout

---

## ♿ Accessibility Standards

### WCAG 2.1 AA Compliance

#### Color Contrast
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18px+ or 14px+ bold):** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators (outline or highlight)
- Logical tab order
- Escape key closes modals
- Arrow keys navigate lists/dropdowns

#### Screen Reader Support
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, etc.)
- Provide alt text for all images
- Use proper heading hierarchy (h1 → h2 → h3)
- Label all form inputs
- Use ARIA labels where necessary
- Announce dynamic content changes

#### Form Accessibility
```html
<!-- Good example -->
<label for="amount">Amount</label>
<input 
  id="amount" 
  type="number" 
  aria-describedby="amount-error"
  aria-invalid="true"
/>
<span id="amount-error" role="alert">
  Amount must be greater than 0
</span>
```

#### Focus Management
- Focus first input in forms
- Focus error messages when validation fails
- Return focus to trigger when closing modals
- Skip links for keyboard users

---

## 🎭 Component Design Patterns

### Buttons

**Variants:**
- **Primary:** Main actions (Submit, Save, Create)
- **Secondary:** Alternative actions
- **Outline:** Less emphasis
- **Ghost:** Minimal emphasis (icon buttons)
- **Danger:** Destructive actions (Delete)

**States:**
- Default
- Hover
- Active/Pressed
- Disabled
- Loading

**Accessibility:**
- Minimum size: 44x44px
- Clear focus indicator
- Descriptive labels
- Disabled state clearly visible

---

### Forms

**Best Practices:**
- Label above input
- Show validation inline
- Mark required fields
- Provide helpful error messages
- Use appropriate input types
- Disable submit while loading
- Show success confirmation

**Error Messages:**
- Specific and actionable
- Appear inline near the field
- Use red color + icon
- Announced to screen readers

---

### Cards

**Structure:**
- Header (title, actions)
- Body (main content)
- Footer (actions, metadata)

**Usage:**
- Dashboard widgets
- Account cards
- Transaction items
- Budget cards

---

### Modals/Dialogs

**Best Practices:**
- Focus first interactive element
- Trap focus within modal
- Close on Escape key
- Close on overlay click (optional)
- Return focus to trigger element
- Use for confirmations, forms, detail views

---

### Data Tables

**Features:**
- Sortable columns
- Filterable rows
- Pagination
- Responsive (stack on mobile)
- Hover states on rows
- Empty state message

---

## 🌙 Dark Mode

### Implementation

**CSS Variables Approach:**
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
}

[data-theme="dark"] {
  --bg-primary: #18181b;
  --text-primary: #fafafa;
}
```

**Design Considerations:**
- Reduce pure white to off-white for dark mode
- Adjust shadows (lighter in dark mode)
- Maintain contrast ratios
- Test all components in both modes
- Provide easy toggle (header/settings)

---

## 🎨 Visual Design Principles

### White Space
- Use generous white space for readability
- Group related elements together
- Separate distinct sections clearly
- Don't fill every pixel

### Alignment
- Use consistent grid system
- Align elements to baseline
- Use visual alignment over mathematical
- Center important content

### Contrast
- Use contrast to establish hierarchy
- High contrast for important elements
- Lower contrast for supporting elements
- Ensure readability

### Micro-interactions
- Button hover effects
- Input focus states
- Loading spinners
- Success animations
- Smooth transitions

**Examples:**
- Subtle scale on hover: `transform: scale(1.02)`
- Fade in for notifications
- Slide in for sidebars
- Progress indicators for forms

---

## 📐 Layout Patterns

### Dashboard Layout
```
┌─────────────────────────────────────┐
│ Navbar                              │
├─────┬───────────────────────────────┤
│ S   │ Dashboard Content             │
│ i   ├─────────────┬─────────────────┤
│ d   │ Widget 1    │ Widget 2        │
│ e   ├─────────────┼─────────────────┤
│ b   │ Widget 3    │ Widget 4        │
│ a   ├─────────────┴─────────────────┤
│ r   │ Transactions Table            │
│     │                               │
└─────┴───────────────────────────────┘
```

### Form Layout
```
┌─────────────────────────────────────┐
│ Form Title                          │
├─────────────────────────────────────┤
│ Label                               │
│ [Input Field                      ] │
│                                     │
│ Label                               │
│ [Input Field                      ] │
│                                     │
│ ┌─ Radio Group ──────────────────┐ │
│ │ ○ Option 1  ○ Option 2         │ │
│ └────────────────────────────────┘ │
│                                     │
│                  [Cancel] [Submit]  │
└─────────────────────────────────────┘
```

---

## ✅ Design Checklist

- [ ] All colors meet contrast requirements
- [ ] Consistent spacing throughout
- [ ] Typography scale applied correctly
- [ ] All interactive elements are accessible
- [ ] Focus indicators visible
- [ ] Error states designed
- [ ] Loading states designed
- [ ] Empty states designed
- [ ] Mobile responsive
- [ ] Dark mode supported
- [ ] Icons used consistently
- [ ] Micro-interactions implemented
- [ ] Forms validated and accessible

---

[← Previous: Phase 8 Enhancements](10-phase8-enhancements.md) | [Back to Master Plan](../PLAN.md) | [Next: Documentation →](12-documentation.md)
